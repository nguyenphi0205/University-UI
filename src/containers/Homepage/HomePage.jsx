import React, { Component } from 'react';
// import './MainView.css';
import MainView from "components/Main-view/MainView";
class HomeLayout extends Component {
    render() {
        return (
            <div className="Main-View">
                <MainView></MainView>
           </div>
        );
    }
}

export default HomeLayout;
