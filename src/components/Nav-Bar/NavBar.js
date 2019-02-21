import React, { Component } from 'react';
import { Navbar, } from 'react-bootstrap';
import Logo from '../Nav-Bar/Logo.PNG';
import './NavBar.css'
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
                            <Navbar.Text>
                                Signed in as: <a href="#login">Mark Otto</a>
                            </Navbar.Text>
                        </Navbar.Collapse>

                    </Navbar.Collapse>
                </Navbar>;
            </div>
        );
    }
}

export default NavBar;
