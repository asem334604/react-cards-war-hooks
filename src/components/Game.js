import Result from "./Result";
import newCardDeck from "../utils/NewCardDeck";
import RandomNumber from "../utils/RandomNumber";
import './style.css';

import React, {useEffect, useState} from 'react';


const Game = (props) => {

        const [playerDeal, setPlayerDeal] = useState([]);
        const [compDeal, setCompDeal] = useState([]);
        const [playerTakes, setPlayerTakes] = useState(0);
        const [compTakes, setCompTakes] = useState(0);
        const [games, setGames] = useState(0);
        const [wins, setWins] = useState(0);
        const [losses, setLosses] = useState(0);
        const [isGameEnded, setIsGameEnded] = useState(false);


        const getFromSessionStore = (storeName) => {
            const storage = sessionStorage.getItem(storeName)
            return storage ? JSON.parse(storage) : null;
        }

        const updSessionStore = (storeName, item) => {
            sessionStorage.removeItem(storeName);
            sessionStorage.setItem(storeName, JSON.stringify(item));
        }

        const dealCards = async () => {
            let pArr = [], cArr = [], newDeck = newCardDeck();
            if (newDeck) {
                while (newDeck.length > 26) {
                    let cardPos = RandomNumber(newDeck.length);
                    pArr.push(newDeck[cardPos]);
                    newDeck.splice(cardPos, 1);
                }
                while (newDeck.length > 0) {
                    let cardPos = RandomNumber(newDeck.length);
                    cArr.push(newDeck[cardPos]);
                    newDeck.splice(cardPos, 1);
                }
            }
            setPlayerDeal(pArr);
            setCompDeal(cArr);
        }


        const nextMove = () => {
            let playerTakesNow = 0, compTakesNow = 0;
            if (compDeal.length > 0 || playerDeal.length > 0) {
                (compDeal[0] < playerDeal[0]) ? playerTakesNow++ : compTakesNow++;
                let compArr = [...compDeal], playerArr = [...playerDeal];
                let prevPlayerTakes = playerTakes, prevCompTakes = compTakes;
                compArr.splice(0, 1);
                playerArr.splice(0, 1);
                setPlayerTakes(prevPlayerTakes + playerTakesNow);
                setCompTakes(prevCompTakes + compTakesNow);
                setCompDeal(compArr);
                setPlayerDeal(playerArr);
            } else {
                let winsNow = 0, lossesNow = 0;
                if (playerTakes > compTakes) {
                    winsNow++
                    updSessionStore('wins', wins + winsNow);
                    updSessionStore('games', games + 1);
                } else {
                    lossesNow++;
                    updSessionStore('losses', losses +lossesNow);
                    updSessionStore('games', games + 1);
                }
                setIsGameEnded(true);
            }
        }
        useEffect(() => {
            setGames(getFromSessionStore('games'));
            setWins(getFromSessionStore('wins'));
            setLosses(getFromSessionStore('losses'));
            dealCards();
        }, []);

        useEffect(() => {
            setGames(getFromSessionStore('games'));
            setWins(getFromSessionStore('wins'));
            setLosses(getFromSessionStore('losses'));
        }, [wins, losses, games]);


        if (isGameEnded) {
            return <Result
                games={games}
                wins={wins}
                looses={losses}
            />
        } else {
            return <div className={'container'}>
                <h2>COMPUTER</h2>
                <div className="card">{compDeal[0]}</div>
                <div className="card">{playerDeal[0]}</div>
                <h2>YOU</h2>
                <button className={'btn'} onClick={nextMove}>Next</button>
            </div>
        }
    }
;

export default Game;


// class Game extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             playerDeal: [],
//             compDeal: [],
//             isGameEnded: false,
//             playerTakes: 0,
//             compTakes: 0,
//             games: 0,
//             wins: 0,
//             looses: 0
//         }
//     }
//
//     componentDidMount() {
//         this.dealCards();
//     }
//
//     dealCards = () => {
//         let pArr = [], cArr = [], newDeck = newCardDeck();
//         if (newDeck) {
//             while (newDeck.length > 26) {
//                 let cardPos = RandomNumber(newDeck.length);
//                 pArr.push(newDeck[cardPos]);
//                 newDeck.splice(cardPos, 1);
//             }
//             while (newDeck.length > 0) {
//                 let cardPos = RandomNumber(newDeck.length);
//                 cArr.push(newDeck[cardPos]);
//                 newDeck.splice(cardPos, 1);
//             }
//         }
//         this.setState({...this.state, playerDeal: pArr, compDeal: cArr},
//             () => {
//                 console.log('state in function deal cards:', this.state);
//                 const savedState = sessionStorage.getItem('gameState');
//                 if (savedState) {
//                     const prevState = JSON.parse(savedState);
//                     this.setState({
//                         games: prevState.games,
//                         wins: prevState.wins,
//                         looses: prevState.looses
//                     }, () => {
//                         console.log('update after restore', this.state)
//                     })
//                 }
//             });
//     }
//
//     nextMove = () => {
//         if (this.state.compDeal.length > 0 && this.state.playerDeal.length > 0) {
//             let compTakesNow = 0, playerTakesNow = 0;
//             if (this.state.compDeal[0] < this.state.playerDeal[0]) {
//                 playerTakesNow++;
//             } else {
//                 compTakesNow++
//             }
//             let compArr = [...this.state.compDeal], playerArr = [...this.state.playerDeal];
//             let prevPlayerTakes = this.state.playerTakes, prevCompTakes = this.state.compTakes;
//             compArr.splice(0, 1);
//             playerArr.splice(0, 1);
//             this.setState({
//                 ...this.state,
//                 playerTakes: prevPlayerTakes + playerTakesNow,
//                 compTakes: prevCompTakes + compTakesNow,
//                 compDeal: compArr,
//                 playerDeal: playerArr
//             }, () => {
//                 console.log('state changed after move', this.state)
//             })
//         } else {
//             let wins = this.state.wins, looses = this.state.looses, games = this.state.games
//             if (this.state.playerTakes > this.state.compTakes) {
//                 wins++;
//             } else {
//                 looses++;
//             }
//             this.setState({
//                     ...this.state, isGameEnded: true, wins, looses, games: games + 1
//                 },
//                 () => {
//                     console.log('state changed after game ended', this.state);
//                     sessionStorage.removeItem('gameState')
//                     sessionStorage.setItem('gameState', JSON.stringify(this.state));
//                 });
//         }
//     }
//
//
//     render() {
//         if (this.state.isGameEnded) {
//             return <Result
//                 games={this.state.games}
//                 wins={this.state.wins}
//                 looses={this.state.looses}
//             />
//         } else {
//             return <div className={'container'}>
//                 <h2>COMPUTER</h2>
//                 <div className="card">{this.state.compDeal[0]}</div>
//                 <div className="card">{this.state.playerDeal[0]}</div>
//                 <h2>YOU</h2>
//                 <button className={'btn'} onClick={this.nextMove}>Next</button>
//             </div>
//         }
//     }
// }
//
// export default Game;