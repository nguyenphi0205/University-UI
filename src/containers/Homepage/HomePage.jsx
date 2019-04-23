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
function createData(name, calories, fat, status, comment) {
    id += 1;
    return { id, name, calories, fat, status, comment };
}

const rows = [
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus commodi corrupti, optio incidunt provident dolores amet molestiae culpa ullam fugit ipsam sequi! Illo, consectetur ad repellat consequuntur sunt asperiores!'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus commodi corrupti, optio incidunt provident dolores amet molestiae culpa ullam fugit ipsam sequi! Illo, consectetur ad repellat consequuntur sunt asperiores!'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus commodi corrupti, optio incidunt provident dolores amet molestiae culpa ullam fugit ipsam sequi! Illo, consectetur ad repellat consequuntur sunt asperiores!'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus commodi corrupti, optio incidunt provident dolores amet molestiae culpa ullam fugit ipsam sequi! Illo, consectetur ad repellat consequuntur sunt asperiores!'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus commodi corrupti, optio incidunt provident dolores amet molestiae culpa ullam fugit ipsam sequi! Illo, consectetur ad repellat consequuntur sunt asperiores!'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'public'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'pending'),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'physical', 'not approve'),
];

function HomePage(props) {
    const { classes } = props;

    return (
        <div className="Manager-View">
            <Grid container spacing={40}>
                {
                    rows.map(row => (
                        <Grid item xs={12} sm={6} md={6} lg={6} key={row.id}>
                            <Card className={row.status + 'card'}>
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
                                    <Typography component="p" className="comment-respone">
                                        {row.comment}
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

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(HomePage);
