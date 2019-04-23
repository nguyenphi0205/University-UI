import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "containers/Guess/GuessPage.css"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
const styles = {
    card: {
        minWidth: 275,
    },
   
    pos: {
        marginBottom: 12,
    },
};


let id = 0;
function createData(name, calories, fat, carbs) {
    id += 1;
    return { id, name, calories, fat, carbs };
}

const rows = [
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 24),
];

function GuessPage(props) {
    const { classes } = props;

    return (

        <div className="Guess-View">
            <Grid container spacing={40}>
                {
                    rows.map(row => (
                        <Grid item xs={12} sm={3} md={3} lg={3} key={row.id}>
                            <Card className={classes.card}>
                                <CardContent>
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
                                    <Button size="small">Download</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}

            </Grid>
        </div>


    );
}

GuessPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(GuessPage);
