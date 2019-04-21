import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import EditableLabel from 'react-inline-editing';
import 'containers/Coordinator/info.css'
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
        minWidth: 1000,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, student, date, comment, status, check) {
    id += 1;
    return { id, name, student, date, comment, status, check };
}

const rows = [
    createData('The Complete Software Developer', 'Phi Nguyen', '13-02-2018', 'good', true, true),
    createData('The Complete Software Developer', 'Phi Nguyen', '13-03-2019', 'not comment', false, false),
    createData('The Complete Software Developer', 'Phi Nguyen', '14-02-2018', 'not comment', false, false),
    createData('The Complete Software Developer', 'Phi Nguyen', '15-02-2018', 'good', true, true),
];

function MainView(props) {
    const { classes } = props;
    return (
        <div className="Faculty-Management-div">
            <div className="Faculty-Management-View">
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="right">No</CustomTableCell>
                                <CustomTableCell align="left">Name</CustomTableCell>
                                <CustomTableCell align="left">Student</CustomTableCell>
                                <CustomTableCell align="left">Date</CustomTableCell>
                                <CustomTableCell align="left">Comment</CustomTableCell>
                                <CustomTableCell align="left">Status</CustomTableCell>
                                <CustomTableCell align="right">Approve</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow className={classes.row} key={row.id}>
                                    <CustomTableCell align="right">
                                        <Checkbox
                                            checked={row.check}
                                            value={row.check ? 'approve' : 'not approve'}
                                        />
                                    </CustomTableCell>
                                    <CustomTableCell align="left">{row.name}</CustomTableCell>
                                    <CustomTableCell align="left">{row.student}</CustomTableCell>
                                    <CustomTableCell align="left">{row.date}</CustomTableCell>
                                    <CustomTableCell className="Comment" id="comment" align="left">
                                        <EditableLabel text={row.comment}
                                            labelClassName='comment'
                                            inputClassName='myInputClass'
                                            inputWidth='200px'
                                            inputHeight='30px'
                                            inputFontSize="15px"
                                            inputMaxLength='100'
                                        />
                                    </CustomTableCell>
                                    <CustomTableCell align="left">
                                        <Chip label={row.status ? 'approve' : 'not approve'} className={row.status ? 'aprove' : 'notapprove'} />
                                    </CustomTableCell>
                                    <CustomTableCell align="right">
                                        <Button variant="contained" color="primary" className="button-approve" onClick={
                                            (id) => {
                                                let data = document.getElementsByClassName("comment")
                                                let data2 = data[row.id -1].innerHTML
                                                console.log(data2)
                                            }}>
                                            Approve
                                        </Button>
                                    </CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    );
}

MainView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MainView);
