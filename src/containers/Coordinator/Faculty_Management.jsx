import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import 'containers/Manager/Manager.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import uuid from "uuid";
import { authenticationService } from "utils/authentication.service";
import firebase from 'api/firebase';


class MainView extends React.Component {
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
                const urlFile = 'https://stormy-thicket-83266.herokuapp.com/api/getFileForCoordinator/' + facultyID;
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
    approveFile =(e,data)=>{
       let approveData ={
            Status:'approve',
            File_ID:data.File_ID
        }
        let url = 'https://stormy-thicket-83266.herokuapp.com/api/ApproveFile'
        axios.put(url, approveData).then(res => {
            if (res.status === 200) {
               
                alert('Approve success !')
                window.location.reload()
            } else {
                console.log("err")
            }
        }).catch(err => {
            console.err(err)
        })
    }
    rejectFile = (e,data) =>{
        let approveData ={
            Status:'reject',
            File_ID:data.File_ID
        }
        let url = 'https://stormy-thicket-83266.herokuapp.com/api/ApproveFile'
        axios.put(url, approveData).then(res => {
            if (res.status === 200) {
                
                alert('Reject success !')
                window.location.reload()
            } else {
                console.log("err")
            }
        }).catch(err => {
            console.err(err)
        })
    }
    SendComment = (e, data) => {
        var CommentContent = this.state.multiline
        var CreateDate = new Date();
        var dd = String(CreateDate.getDate()).padStart(2, '0');
        var mm = String(CreateDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = CreateDate.getFullYear();
        CreateDate = yyyy + '-' + mm + '-' + dd;
       
        var CommentData = {
            Comment_ID: uuid.v1(),
            Comment_Text: CommentContent,
            Customer_ID: authenticationService.currentUserValue.id,
            CreateDate: CreateDate,
            File_ID: data.File_ID
        }
        
        axios.post('https://stormy-thicket-83266.herokuapp.com/api/comment/', CommentData).then(res => {
            if (res.status === 200) {
                alert('send message success');
                window.location.reload()
            } else {
                console.log("err")
            }
        }).catch(err => {
            console.err(err)
        })
    }
    showComment = (e, data) => {
        var x = document.getElementById(data.File_ID);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        const url = 'https://stormy-thicket-83266.herokuapp.com/api/getComment/' + data.File_ID;
        let commentArray = []
        axios.get(url).then(res => {
            commentArray.push(res.data)
            return commentArray.map(Comments => this.setState({ Comments }))
        })
    }
    render() {
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
                                        <br />
                                        <TextField
                                            id="commentArea"
                                            label="Comment place"
                                            multiline
                                            rows="4"
                                            value={this.state.multiline}
                                            onChange={this.handleChange('multiline')}
                                            className='comment'
                                            margin="normal"
                                        />
                                        <Button size="small" onClick={
                                            (e) => this.SendComment(e, file)
                                        }>Send</Button>
                                    </CardContent>
                                    <CardActions>
                                        {
                                            (file.status === 'public' || file.status === 'approve' || file.status === 'reject')
                                                ? <Grid container direction="row"
                                                    justify="center"
                                                    alignItems="baseline" spacing={8}>
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <Button variant="contained" onClick={
                                                            (e) => this.DownLoadFile(e, file)
                                                        }>
                                                            Download
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <Button onClick={
                                                            (e) => this.showComment(e, file)
                                                        }>View Comment</Button>
                                                    </Grid>
                                                </Grid>
                                                : <Grid container direction="row"
                                                    justify="center"
                                                    alignItems="baseline" spacing={8}>
                                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                                        <Button variant="contained" onClick={
                                                            (e) => this.DownLoadFile(e, file)
                                                        }>
                                                            Download
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                                        <Button onClick={
                                                            (e) => this.showComment(e, file)
                                                        }>View Comment</Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                                        <Button variant="contained" color="primary" 
                                                        onClick ={
                                                            (e)=>this.approveFile(e,file)
                                                        }
                                                        >Approve</Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                                        <Button variant="contained" color="secondary"
                                                        onClick ={
                                                            (e)=>this.rejectFile(e,file)
                                                        }
                                                        >Reject</Button>
                                                    </Grid>
                                                </Grid>
                                        }
                                    </CardActions>
                                    <br />
                                    <div id={file.File_ID} style={{ display: 'none' }}>
                                        {(this.state.Comments === undefined || this.state.Comments.length === 0)
                                            ? <Typography component="p" >not have comment</Typography>
                                            : <div>
                                                {
                                                    this.state.Comments.map(comment => (
                                                        <div key={comment.Comment_ID}>
                                                            {
                                                                (comment.Customer_ID === authenticationService.currentUserValue.id)
                                                                    ? <Typography id={file.Customer_ID} component="p" className="comment-respone"> You: {comment.Comment_Text}</Typography>
                                                                    : <Typography id={file.Customer_ID} component="p" className="comment-respone-coordinator"> Coordinator: {comment.Comment_Text}</Typography>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </div>
        );
    }
}
export default MainView



