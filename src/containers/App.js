import React, { Component } from 'react'
import NavBar from "components/NavBar/NavBar";
import { Navbar } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//test
import GuessPage from "containers/Guess/GuessPage";
import Info_Coordiantor from "containers/Coordinator/Info_Coordinator";
import Info_Student from "containers/Homepage/Info_Student";
import HomePage from "containers/Homepage/HomePage";
import Info_Manager from "containers/Manager/Info_Manager";
import Contribute_View from "containers/Manager/Contribute_view";
import MainView from "containers/Coordinator/Faculty_Management";
import ImageUpload from 'containers/Homepage/Upload_File'
import Statistic from "containers/Manager/Statistic";
//
import { Router, Link } from 'react-router-dom';
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute";
import { authenticationService } from "utils/authentication.service";
import { Role } from 'api/role'
import { history } from 'utils/history'
import 'components/NavBar/NavBar.css'
import 'components/Side-Bar/SideBar.css'
import Logo from 'images/Logo3.png';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      anchorEl: null,
      isAdmin: false,
      isManager: false,
      isStudent: false
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin,
      isManager: x && x.role === Role.Coordianator,
      isStudent: x && x.role === Role.User,
    }));
  }
  logout() {
    authenticationService.logout();
    history.push('/login');
  }
  render() {
    const { currentUser, isAdmin, isManager, isStudent, anchorEl } = this.state;
    return (
      <Router history={history}>
        <div className="App">
          {currentUser &&
            <div className="nav">
              <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                  <Link to="/" className="nav-item nav-link">
                    <img src={Logo} alt="Logo" className="logo"></img>
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Navbar.Collapse className="justify-content-end">
                    {isAdmin &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                      MARKETING MANAGER </Button>
                    }
                    {isManager &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                      MARKETING COORDINATOR </Button>
                    }
                    {isStudent &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                      STUDENT </Button>
                    }
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem>
                        {isAdmin && <Link to="/info-manager" className="nav-item nav-link">Info</Link>}
                        {isManager && <Link to="/info-coordinator" className="nav-item nav-link">Info</Link>}
                        {isStudent && <Link to="/info-student" className="nav-item nav-link">Info</Link>}
                      </MenuItem>
                      <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>
                    {/* <Button variant="contained" onClick={this.logout}>Log out</Button> */}
                  </Navbar.Collapse>
                </Navbar.Collapse>
              </Navbar>;
            </div>
          }
          {
            currentUser &&
            <div className="sidenav">
              {/* manager sidebar */}
              {isAdmin && <Link to="/info-manager" className="nav-item nav-link">Info</Link>}
              {isAdmin && <Link to="/contribute" className="nav-item nav-link">View Contribute</Link>}
              {isAdmin && <Link to="/statistic" className="nav-item nav-link">Statistic</Link>}
              {/* coordinator sidebar */}
              {isManager && <Link to="/info-coordinator" className="nav-item nav-link">Info</Link>}
              {isManager && <Link to="/faculty-management" className="nav-item nav-link">Faculty Manager</Link>}
              {/* student */}
              {isStudent && <Link to="/info-student" className="nav-item nav-link">Info</Link>}
              {isStudent &&
                <Link to="/student-contribute" className="nav-item nav-link">Contribute</Link>
              }
              {isStudent &&
                <Link to="/Upload" className="nav-item nav-link">Upload</Link>
              }
            </div>
          }

          {!currentUser &&
            <NavBar></NavBar>
          }
          {!currentUser &&
            <GuessPage></GuessPage>
          }

          {/* define route */}
          {/* manager */}
          <PrivateRoute path="/info-manager" roles={[Role.Admin]} component={Info_Manager} />
          <PrivateRoute path="/contribute" roles={[Role.Admin]} component={Contribute_View} />
          <PrivateRoute path="/statistic" roles={[Role.Admin]} component={Statistic} />
          {/* coordinator */}
          <PrivateRoute path="/info-coordinator" roles={[Role.Coordianator]} component={Info_Coordiantor} />
          <PrivateRoute path="/faculty-management" roles={[Role.Coordianator]} component={MainView} />
          {/* student */}
          <PrivateRoute exact path="/" component={Contribute_View} />
          <PrivateRoute exact path="/info-student" roles={[Role.User]} component={Info_Student} />
          <PrivateRoute exact path="/student-contribute" roles={[Role.User]} component={HomePage} />
          <PrivateRoute exact path="/Upload" roles={[Role.User]} component={ImageUpload} />
        </div>
      </Router>

    );
  }
}

export default App;
