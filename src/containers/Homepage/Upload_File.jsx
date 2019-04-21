import React, { Component } from 'react'
import 'containers/Homepage/Student.css'
import { Input } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '' };
    }

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
                <Grid container spacing={12}>

                    <Grid item xs={12}>
                        <Input type="select" name="faculty-select" id="faculty-select">
                            {rows.map(faculty =>
                                <option value={faculty.id} key={faculty.id}>{faculty.name}</option>
                            )}
                        </Input>
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <input className="fileInput"
                                type="file"
                                onChange={(e) => this._handleImageChange(e)} />
                        </form>
                    </Grid>
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload </button>
                </Grid>
            </div>

        )
    }
}
export default ImageUpload