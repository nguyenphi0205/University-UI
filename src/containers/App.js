import React, { Component } from 'react'
import NavBar from "components/NavBar/NavBar";
import HomeLayout from "containers/Homepage/HomePage";
class App extends Component {

  render() {
    return (
      <div className="App">
      <NavBar></NavBar>
      <HomeLayout></HomeLayout>
      </div>
    );
  }
}

export default App;
