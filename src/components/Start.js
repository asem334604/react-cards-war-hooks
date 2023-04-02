import React, {Component} from 'react';
import './style.css';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
    }

    setValue = (e) => {
        this.setState({inputVal: e.target.value});
        console.log(this.state.inputVal);
    }

    setUser = () => {
        if (this.state.inputVal) {
            this.props.setUser(this.state.inputVal)
        }
    }
    render() {
        return (
            <div className={'container'}>
                <h2 className={'start_header'}>Ready for WAR</h2>
                <input className={'start_input'} placeholder={'Enter your name'}
                       type="text" onChange={this.setValue}/>
                <button className={'btn'} onClick={this.setUser}>start</button>
            </div>
        );
    }
}

export default Start;