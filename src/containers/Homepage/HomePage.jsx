import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Input } from 'reactstrap';
import 'containers/Manager/Manager.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import uuid from "uuid";
import { authenticationService } from "utils/authentication.service";
import { Modal, ButtonToolbar } from 'react-bootstrap';
import firebase from 'api/firebase';
class UpdateFileModel extends React.Component {
    state = {
        faculties: []
    };
    getData() {
        const url = 'https://stormy-thicket-83266.herokuapp.com/api/faculty/' + authenticationService.currentUserValue.id;;
        let test = []
        axios.get(url).then(res => {
            test.push(res.data)
            return test.map(faculties => this.setState({ faculties }))
        })
    
    }
    componentDidMount() {
        this.getData();
    }
    
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update File
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Upload document</h4>
                    <Input type="select" className="faculty-select" id="faculty-select">
                        {
                            this.state.faculties.map(faculty =>
                                <option value={faculty.Faculty_ID} key={faculty.Faculty_ID}>{faculty.Faculty_Name}</option>
                            )}
                    </Input>
                    <input className="fileInput" id="fileInput"
                        type="file"
                        accept=".pdf" />

                    <Button onClick={
                        e => {
                            let fileID = this.props.itemID;
                            let Faculty_ID = document.getElementById('faculty-select').value
                            var CreateDate = new Date();
                            var dd = String(CreateDate.getDate()).padStart(2, '0');
                            var mm = String(CreateDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = CreateDate.getFullYear();
                            CreateDate = yyyy + '-' + mm + '-' + dd;
                            let get_file_name = document.getElementById('fileInput').value
                            let File_name = get_file_name.substring(12, 20000);
                            //get name file
                            var n = File_name.indexOf('.');
                            File_name = File_name.substring(0, n !== -1 ? n : File_name.length);

                            //getlink urldownload and delete
                            const url = 'https://stormy-thicket-83266.herokuapp.com/api/getFileDowload/' + fileID;
                            axios.get(url).then(res => {
                                let linkDown = res.data.find(x => x.LinkDown)
                                for (let linkDownURL of Object.values(linkDown)) {
                                    var storage = firebase.storage()
                                    let urlDelete = storage.ref(linkDownURL)
                                    urlDelete.delete().then(() => {
                                        var storage = firebase.storage()
                                        var file = document.getElementById('fileInput').files[0];
                                        var fileName = authenticationService.currentUserValue.firstName + '-' + authenticationService.currentUserValue.lastName + '-' + authenticationService.currentUserValue.id + '-' + yyyy + '-' + mm + '-' + dd + '-' + file.name
                                        var storageRef = storage.ref(Faculty_ID + '/' + fileName)
                                        var downloadURL = Faculty_ID + '/' + fileName
                                        storageRef.put(file).then(() => {
                                            let UpdateData = {
                                                File_Name: File_name,
                                                DateCreate: CreateDate,
                                                LinkDown: downloadURL,
                                                Status: 'pending',
                                                File_ID: fileID
                                            }
                                            let url = 'https://stormy-thicket-83266.herokuapp.com/api/UpdateFile'
                                            axios.put(url, UpdateData).then(res => {
                                                if (res.status === 200) {
                                                   
                                                    alert('Update success !')
                                                    window.location.reload()
                                                } else {
                                                    console.log("err")
                                                }
                                            }).catch(err => {
                                                console.err(err)
                                            })

                                        })
                                    })
                                }

                            })
                        }
                    }>Upload</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


class HomePage extends React.Component {
    
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
        const url = 'https://stormy-thicket-83266.herokuapp.com/api/getFile/' + authenticationService.currentUserValue.id;
        let test = []
        axios.get(url).then(res => {
            test.push(res.data)
            return test.map(Files => this.setState({ Files }))
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
        let modalClose = () => this.setState({ modalShow: false });
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
                                            (file.status === 'public' || file.status === 'approve')
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
                                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                                        <Button variant="contained" onClick={
                                                            (e) => this.DownLoadFile(e, file)
                                                        }>
                                                            Download
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                                        <Button onClick={
                                                            (e) => this.showComment(e, file)
                                                        }>View Comment</Button>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                                        <ButtonToolbar>
                                                            <Button onClick={
                                                                (e) => this.UpdateFile(e, file)
                                                            }>
                                                                Update file
                                                            </Button>

                                                            <UpdateFileModel
                                                                itemID={this.state.fileID}
                                                                show={this.state.modalShow}
                                                                onHide={modalClose}
                                                            />
                                                        </ButtonToolbar>

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
export default HomePage



