import React, { Component } from 'react';
import Logo from 'images/Logo3.png';
import './landing.css'

class LandingPage extends Component {
    render() {
        return (
            <div className="nav">
                <div>
                    <iframe src="https://player.vimeo.com/video/295767861?background=1&loop=0" frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="Content">
                    <p><b>
                        Welcome to the University of Greenwich. Established in 1890, we are located on the banks of the River Thames in London and the historic Chatham Maritime in Kent. Apply for our degree courses online.
                    </b></p>
                </div>
            </div>
        );
    }
}

export default LandingPage;