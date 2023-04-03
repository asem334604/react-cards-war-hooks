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


