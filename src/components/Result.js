import React, { useEffect, useState} from 'react';
import Game from "./Game";
import './style.css';


const Result = (props) => {

    const [newGame, setNewGame] = useState(false);

    useEffect(() => {
        setNewGame(false)
    },[]);

    if (newGame) {
        return <Game/>
    }
    return (
        <div className={'container'}>
            <h3>Games: {props.games}</h3>
            <h3>LOSE/WIN</h3>
            <h3>{props.looses} - {props.wins}</h3>
            <button onClick={() => setNewGame(true)} className={'btn'}>Again?</button>
        </div>
    );
};

export default Result;
