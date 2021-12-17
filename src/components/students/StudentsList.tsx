import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student } from "../../model/student";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type StudentsListProps = {
  students: Student[]
}

export const StudentsList = (props: StudentsListProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Birthday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.students.map((student) => (
            <TableRow key={student.id}>
              <TableCell align="right">{student.id} </TableCell>
              <TableCell align="right">{student.firstName}</TableCell>
              <TableCell align="right">{student.lastName}</TableCell>
              <TableCell align="right">{student.birthday}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
