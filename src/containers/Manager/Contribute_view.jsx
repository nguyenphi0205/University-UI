import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import 'containers/Manager/Manager.css'
const styles = {
    card: {
        minWidth: 275,
    },

    pos: {
        marginBottom: 12,
    },
};


let id = 0;
function createData(name, calories, fat, status) {
    id += 1;
    return { id, name, calories, fat, status };
}

const rows = [
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve'),
];

function Contribute_View(props) {
    const { classes } = props;

    return (
        <div className="Manager-View">
            <Grid container spacing={40}>
                {
                    rows.map(row => (
                        <Grid item xs={12} sm={6} md={6} lg={6} key={row.id}>
                            <Card className={row.status +'card'}>
                                <CardContent>
                                    <Typography className={row.status} color="yellow" gutterBottom>
                                        {
                                            row.status
                                        }
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {row.name}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {row.fat}
                                    </Typography>
                                    <Typography component="p">
                                        {row.calories}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {
                                        (row.status === 'pending')
                                            ? <Grid container direction="row"
                                                justify="center"
                                                alignItems="baseline" spacing={8}>
                                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                                    <Button size="small">Download</Button>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                                    <Button variant="contained" color="primary">Public</Button>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                                    <Button variant="contained" color="secondary">Not approve</Button>
                                                </Grid>
                                            </Grid>
                                            : <Button size="small">Download</Button>
                                    }
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

            </Grid>
        </div>

    );
}

Contribute_View.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Contribute_View);
