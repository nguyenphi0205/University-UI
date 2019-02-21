import React, { Component } from 'react';
import './App.css';
import NavBar from '../src/components/Nav-Bar/NavBar';
import Example from '../src/components/Side-Bar/SideBar'
import MainView from '../src/components/Main-view/ManView'
class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Example></Example>
        <MainView></MainView>
     </div>
    );
  }
}

export default App;
