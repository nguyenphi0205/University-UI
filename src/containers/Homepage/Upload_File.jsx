import React, { Component } from 'react'
import 'containers/Homepage/Student.css'
import { Input } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
class ImageUpload extends Component {

    state = {
        checkedA: true,
        checkedB: true,
        checkedF: true,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    _handleSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    handleCombobox = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        //dumb data
        let id = 0;
        function createData(name) {
            id += 1;
            return { id, name };
        }

        const rows = [
            createData('Adam Charlie'),
            createData('Sui Lily'),
            createData('Billy J'),

        ];

        return (
            <div className="Upload-div">
                <Paper className="Info-Paper" elevation={1}>
                    <Typography className="Info-Title" variant="h4" component="h3">
                        Upload document
                     </Typography>
                    <Input type="select" className="faculty-select" id="faculty-select">
                        {rows.map(faculty =>
                            <option value={faculty.id} key={faculty.id}>{faculty.name}</option>
                        )}
                    </Input>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
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
                        <Button variant="contained" color="default">
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