import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import 'containers/Manager/Manager.css'
import axios from 'axios'
import firebase from 'api/firebase';
import { authenticationService } from "utils/authentication.service";

class GuessPage extends React.Component {
    state = {
        Files: [],
        fileDownload: [],
        Comments: [],
        multiline: '',
        modalShow: false,
        fileID: '',

    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    getData() {
        const url = 'https://stormy-thicket-83266.herokuapp.com/api/facultyID/' + authenticationService.currentUserValue.id;

        axios.get(url).then(res => {
            let facultyIDObject = res.data.find(x => x.Faculty_ID)
            for (let facultyID of Object.values(facultyIDObject)) {
                const urlFile = 'https://stormy-thicket-83266.herokuapp.com/api/GuessFile/' + facultyID;
                axios.get(urlFile).then(res => {
                    let fileArray = [];
                    fileArray.push(res.data)
                    return fileArray.map(Files => this.setState({ Files }))
                })
            }
        })
    }
    componentDidMount() {
        this.getData();

    }
    UpdateFile = (e, data) => {
        this.setState({ modalShow: true, fileID: data.File_ID })

    }
    DownLoadFile = (e, data) => {
        var storage = firebase.storage()
        var urlDownload = storage.ref(data.LinkDown)
        urlDownload.getDownloadURL().then(function (urlrequest) {
            window.open(urlrequest)
        })
    }
   
    render() {
        console.log(this.state.Comments)
        return (
            <div className="Manager-View">
                <Grid container spacing={40}>
                    {
                        this.state.Files.map(file => (
                            <Grid item xs={12} sm={6} md={6} lg={6} key={file.File_ID}>
                                <Card className={file.status + 'card'}>
                                    <CardContent>
                                        <Typography className={file.status} color="textSecondary" gutterBottom>
                                            {
                                                file.status
                                            }
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {file.File_Name}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {file.Faculty_Name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" onClick={
                                            (e) => this.DownLoadFile(e, file)
                                        }>
                                            Download
                                                        </Button>
                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </div>
        );
    }
}
export default GuessPage



