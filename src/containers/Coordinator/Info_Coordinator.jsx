import React, { Component } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'containers/Coordinator/info.css'
import EditableLabel from 'react-inline-editing';
import Grid from '@material-ui/core/Grid';
import { userService } from 'services/user.service';
import { authenticationService } from "utils/authentication.service";
import axios from 'axios';
class Info_Coordiantor extends Component {
    constructor(props) {
        super(props);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            showPassword: false,
        };
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    render() {
        const { currentUser, userFromApi } = this.state;
        
        return (
            <div className="Paper-Div">
                <Paper className="Info-Paper" elevation={1}>
                    <Typography className="Info-Title" variant="h4" component="h3">
                        Info Coordinator.
                     </Typography>
                    {userFromApi &&
                        <EditableLabel text={userFromApi.First_Name}
                            labelClassName='first_name'
                            inputClassName='first_name'
                            inputWidth='200px'
                            inputHeight='30px'
                            inputFontSize="15px"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    }
                    {userFromApi &&
                        <EditableLabel text={userFromApi.Last_Name}
                            labelClassName='Last_name'
                            inputClassName='Last_name'
                            inputWidth='200px'
                            inputHeight='30px'
                            inputFontSize="15px"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    }
                    {userFromApi &&
                        <EditableLabel text={userFromApi.Email}
                            labelClassName='Email'
                            inputClassName='Email'
                            inputWidth='200px'
                            inputHeight='30px'
                            inputFontSize="15px"
                            onFocus={this._handleFocus}
                            onFocusOut={this._handleFocusOut}
                        />
                    }
                    {userFromApi &&
                        <Input
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={userFromApi.Password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}>
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    }
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <Button className="Edit-info" variant="contained" color="primary"
                                onClick={
                                    m => {
                                        let firstName = document.getElementsByClassName('first_name')[0].innerText
                                        let lastName = document.getElementsByClassName('Last_name')[0].innerText
                                        let email = document.getElementsByClassName('Email')[0].innerText
                                        let password = document.getElementById('password').value
                                        let updateData = {
                                            First_Name: firstName,
                                            Last_Name: lastName,
                                            Email: email,
                                            Password: password,
                                            User_ID: authenticationService.currentUserValue.id
                                        }
                                      
                                        let url = 'https://stormy-thicket-83266.herokuapp.com/api/UpdateUser'
                                        if (!!firstName && !!lastName && !!email) {
                                            axios.put(url, updateData).then(res => {
                                                if (res.status === 200) {
                                                  
                                                    alert('Update success !')
                                                    window.location.reload()
                                                } else {
                                                    console.log("err")
                                                }
                                            }).catch(err => {
                                                console.err(err)
                                            })
                                        }
                                        else{
                                            alert('the information not is empty')
                                            window.location.reload()
                                        }

                                    }
                                }
                            >EDIT</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Button className="ChangePassword" variant="contained" color="secondary" onClick={
                                m => {
                                    var randomPassword = Math.random().toString(36).slice(-8);

                                }
                            }>
                                <em>Change password</em></Button>
                        </Grid>
                    </Grid>

                </Paper>
            </div>
        );
    }
}
export default Info_Coordiantor