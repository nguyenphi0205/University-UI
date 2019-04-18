import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Logo from 'images/Logo3.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import 'components/Login/Login.css'
class LoginTab extends Component {
    state = {
        name: 'nguyenphi0511@yahoo.com.vn',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <img src={Logo} alt="Logo" className="logo"></img>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Grid container spacing={24}>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="Email-input"
                                    label="Email"
                                    className="Email-input"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="password-input"
                                    label="Password"
                                    className="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={9}></Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary">
                                    Log In
                                 </Button>
                            </Grid>
                        </Grid>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <a href="#"> <i class="fas fa-unlock-alt"></i> Can't log in?</a>
                        </Grid>
                        <Grid item xs={5}>
                            <a href="#"><i class="fas fa-question-circle"></i> Need more help?</a>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginTab;
