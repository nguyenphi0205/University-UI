import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'containers/Coordinator/info.css'
import EditableLabel from 'react-inline-editing';
import Grid from '@material-ui/core/Grid';
class Info_Manager extends Component {
    constructor(props) {
        super(props);
        this._handleFocus = this._handleFocus.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
    }

    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }
    render() {
        return (
            <div className="Paper-Div">
                <Paper className="Info-Paper" elevation={1}>
                    <Typography className="Info-Title" variant="h4" component="h3">
                        Info Manager.
                     </Typography>
                    <EditableLabel text='Adam Charlie'
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputHeight='30px'
                        inputFontSize="15px"
                        inputMaxLength='100'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                    <EditableLabel text='adam@gmail.com'
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputHeight='30px'
                        inputFontSize="15px"
                        inputMaxLength='100'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                    <EditableLabel text='636-48018'
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputFontSize="15px"
                        inputHeight='30px'
                        inputMaxLength='100'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                    <EditableLabel text='16 Streets'
                        labelClassName='myLabelClass'
                        inputClassName='myInputClass'
                        inputWidth='200px'
                        inputFontSize="15px"
                        inputHeight='30px'
                        inputMaxLength='100'
                        onFocus={this._handleFocus}
                        onFocusOut={this._handleFocusOut}
                    />
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={12} md={9} lg={9}>
                            <Button className="Edit-info" variant="contained" color="primary">EDIT</Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={3} lg={3}>
                            <Button className="ChangePassword" variant="contained" color="secondary">
                                <em>Change password</em></Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
export default Info_Manager