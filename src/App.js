import Start from "./components/Start";
import Game from "./components/Game";

import React, {useState} from 'react';

const App = () => {
    const [fullName, setFullName] = useState();

    const setUser = (name) => {
        setFullName(name)
    }

    if (!fullName) {
        return <Start setUser={setUser}/>
    } else {
        return <Game/>
    }
};

export default App;

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {fullName: null}
//     }
//
//     setUser = (name) => {
//         this.setState({...this.state, fullName: name});
//         console.log(this.state);
//     }
//
//     render() {
//         if (!this.state.fullName) {
//             return <Start setUser={this.setUser}/>
//         } else {
//             return <Game/>
//         }
//     }
// }

