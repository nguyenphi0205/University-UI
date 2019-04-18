import React, { Component } from 'react';
import { Navbar} from 'react-bootstrap';
import Logo from 'images/Logo3.png';
import './NavBar.css'
import Button from '@material-ui/core/Button';
import LoginTab from "components/Login/LoginTab";
class NavBar extends Component {
    constructor(...args) {
        super(...args);
        this.state = { modalShow: false };
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false });
        return (
            <div className="nav">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">
                        <img src={Logo} alt="Logo" className="logo"></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Collapse className="justify-content-end">
                            <Button
                                variant="contained" onClick={() => this.setState({ modalShow: true })}>
                                Log In
                                   </Button>
                            <LoginTab
                                show={this.state.modalShow}
                                onHide={modalClose} />
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        );
    }
}

export default NavBar;
