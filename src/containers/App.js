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
import MainPage from "containers/Guess/MainPage";

//
import { Router, Link } from 'react-router-dom';
import LandingPage from 'components/LandingPage/LandingPage'
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
      isStudent: false,
      open: false,
    };
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
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
      isGuess: x && x.role === Role.Guess,
    }));
  }
  logout() {
    authenticationService.logout();
    history.push('/login');
  }
  render() {
    const { currentUser, isAdmin, isManager, isStudent,isGuess, anchorEl } = this.state;

    return (
      <Router history={history}>
        <div className="App">
          {currentUser &&
            <div className="nav">
              <Navbar bg="light" expand="lg" sticky="top" >
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
                        {authenticationService.currentUserValue.firstName} {authenticationService.currentUserValue.lastName} </Button>
                    }
                    {isManager &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                        {authenticationService.currentUserValue.firstName} {authenticationService.currentUserValue.lastName} </Button>
                    }
                    {isStudent &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                        {authenticationService.currentUserValue.firstName} {authenticationService.currentUserValue.lastName} </Button>
                    }
                    {
                      isGuess &&
                      <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick} >
                        {authenticationService.currentUserValue.firstName} {authenticationService.currentUserValue.lastName} </Button>
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
            <div className="s-layout__sidebar">

              <nav className="s-sidebar__nav">
                <ul>
                  {/* manager sidebar */}
                  {isAdmin &&
                    <li>
                      <Link to="/info-manager" className="s-sidebar__nav-link">
                        <i className="fa fa-user"></i><em>My Profile</em>
                      </Link>
                    </li>
                  }
                  {isAdmin &&
                    <li>
                      <Link to="/contribute" className="s-sidebar__nav-link">
                        <i className="fas fa-eye"></i><em>View Contribute</em>
                      </Link>
                    </li>
                  }
                  {isAdmin &&
                    <li>
                      <Link to="/statistic" className="s-sidebar__nav-link">
                        <i className="fas fa-chart-pie"></i><em>Statistic</em>
                      </Link>
                    </li>
                  }
                  {/* coordinator sidebar */}
                  {isManager &&
                    <li>
                      <Link to="/info-coordinator" className="s-sidebar__nav-link">
                        <i className="fa fa-user"></i><em>My Profile</em>
                      </Link>
                    </li>
                  }
                  {isManager &&
                    <li>
                      <Link to="/faculty-management" className="s-sidebar__nav-link">
                        <i className="fas fa-tasks"></i><em>Faculty Manager</em>
                      </Link>
                    </li>
                  }
                  {/* student */}
                  {isStudent &&
                    <li>
                      <Link to="/info-student" className="s-sidebar__nav-link">
                        <i className="fa fa-user"></i><em>My Profile</em>
                      </Link>
                    </li>

                  }
                  {isStudent &&
                    <li>
                      <Link to="/student-contribute" className="s-sidebar__nav-link">
                        <i className="fas fa-donate"></i><em>Contribute</em>
                      </Link>
                    </li>
                  }
                  {isStudent &&
                    <li>
                      <Link to="/Upload" className="s-sidebar__nav-link">
                        <i className="fas fa-upload"></i><em>Upload</em>
                      </Link>
                    </li>
                  }
                  {/* Guess */}
                  {isGuess &&
                    <li>
                      <Link to="/GuessFile" className="s-sidebar__nav-link">
                        <i className="fas fa-eye"></i><em>View File</em>
                      </Link>
                    </li>
                  }
                </ul>
              </nav>
            </div>

          }

          {!currentUser &&
            <NavBar></NavBar>
          }
          {!currentUser &&
            <LandingPage></LandingPage>
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
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/info-student" roles={[Role.User]} component={Info_Student} />
          <PrivateRoute exact path="/student-contribute" roles={[Role.User]} component={HomePage} />
          <PrivateRoute exact path="/Upload" roles={[Role.User]} component={ImageUpload} />
          {/* Guess */}
          <PrivateRoute exact path="/GuessFile" roles={[Role.Guess]} component={GuessPage} />
        </div>
      </Router>

    );
  }
}

export default App;
