import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from 'images/Logo3.png';
import './NavBar.css'
import LoginTab from "components/Login/LoginTab";
import { Route } from 'react-router-dom';
class NavBar extends Component {
    render() {
        return (
            <div className="nav">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        <img src={Logo} alt="Logo" className="logo"></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Collapse className="justify-content-end">
                            <Route path="/login" component={LoginTab} />
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        );
    }
}

export default NavBar;
