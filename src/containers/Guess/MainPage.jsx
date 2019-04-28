import React, { Component } from 'react';
import Logo from 'images/Logo3.png';
import 'components/LandingPage/landing.css'
import Background from 'images/background.jpg'

class MainPage extends Component {
    render() {
        return (
            <div className="nav">
             <img className="Background" src={Background}></img>
            </div>
        );
    }
}

export default MainPage;