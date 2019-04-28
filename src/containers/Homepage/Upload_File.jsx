import React, { Component } from 'react'
import 'containers/Homepage/Student.css'
import { Input } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { authenticationService } from "utils/authentication.service";
import uuid from "uuid";
import firebase from 'api/firebase';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        checkedA: true,
        faculties: []
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

    };


    handleCombobox = event => {
        this.setState({ [event.target.name]: event.target.value });

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
            <div className="Upload-div">
                <Paper className="Info-Paper" elevation={1}>
                    <Typography className="Info-Title" variant="h4" component="h3">
                        Upload document
                     </Typography>
                    <Input type="select" className="faculty-select" id="faculty-select">
                        {
                            this.state.faculties.map(faculty =>
                                <option value={faculty.Faculty_ID} key={faculty.Faculty_ID}>{faculty.Faculty_Name}</option>
                            )}
                    </Input>
                    <input className="fileInput" id="fileInput"
                        type="file"
                        accept=".pdf" />
                    <div>
                        <Checkbox
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA"
                        />
                        <em className="term">
                            Agree terms and conditions
                        </em>
                        <div className="Upload-btn">
                            <Button id="upload-btn" variant="contained" color="default" onClick={
                                m => {
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
                                    //upload firebase

                                    var storage = firebase.storage()
                                    var file = document.getElementById('fileInput').files[0];
                                    var fileName = authenticationService.currentUserValue.firstName + '-' + authenticationService.currentUserValue.lastName + '-' + authenticationService.currentUserValue.id + '-' + yyyy + '-' + mm + '-' + dd + '-' + file.name
                                    var storageRef = storage.ref(Faculty_ID + '/' + fileName)
                                    var downloadURL = Faculty_ID + '/' + fileName
                                    storageRef.put(file).then(() => {
                                        const File_Data = {
                                            File_ID: uuid.v1(),
                                            File_Name: File_name,
                                            DateCreate: CreateDate,
                                            Faculty_ID: Faculty_ID,
                                            Customer_ID: authenticationService.currentUserValue.id,
                                            Status: 'pending',
                                            LinkDown: downloadURL
                                        }
                                    
                                        axios.post('https://stormy-thicket-83266.herokuapp.com/api/files/', File_Data).then(res => {
                                            if (res.status === 200) {

                                                alert('Upload success')
                                                this.props.history.push('/student-contribute');
                                            }
                                            else {
                                                console.log("err")
                                            }
                                        }).catch(err => {
                                            console.err(err)
                                        })
                                    })
                                }
                            }>
                                Upload
                            <CloudUploadIcon />
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>

        )
    }
}
export default ImageUpload