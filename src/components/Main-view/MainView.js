import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "components/Main-view/MainView.css"
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, calories, fat, carbs) {
    id += 1;
    return { id, name, calories, fat, carbs };
}

const rows = [
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'Adam', 24, ),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'Adam', 24, ),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'Adam', 24, ),
    createData('The Complete Software Developer’s Career Guide', 'Phi Nguyen', 'Adam', 24, ),
];

function MainView(props) {
    const { classes } = props;

    return (
        <div className="Main-View">
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Name</CustomTableCell>
                            <CustomTableCell align="right">Author</CustomTableCell>
                            <CustomTableCell align="right">Faculty</CustomTableCell>
                            <CustomTableCell align="right">Download</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow className={classes.row} key={row.id}>
                                <CustomTableCell component="th" scope="row">
                                    {row.name}
                                </CustomTableCell>
                                <CustomTableCell align="right">{row.calories}</CustomTableCell>
                                <CustomTableCell align="right">{row.fat}</CustomTableCell>
                                <CustomTableCell align="right">{row.carbs}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>

    );
}

MainView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MainView);
