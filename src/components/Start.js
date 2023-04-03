import './style.css';

import React, {useState} from 'react';

const Start = (props) => {

    const [inputVal, setInputVal] = useState('');

    const setValue = (e) => {
        setInputVal(e.target.value);
    }

    const setUser = () => {
        if (inputVal) {
            props.setUser(inputVal)
        }
    }
    return (
        <div className={'container'}>
            <h2 className={'start_header'}>Ready for WAR</h2>
            <input className={'start_input'} placeholder={'Enter your name'}
                   type="text" onChange={setValue}/>
            <button className={'btn'} onClick={setUser}>start</button>
        </div>
    );
};

export default Start;

