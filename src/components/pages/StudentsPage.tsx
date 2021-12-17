import * as React from "react";
import { useEffect } from "react";
import { fetchStudents } from "../../store/students";
import { useAppDispatch, useAppSelector } from "../../store";
import { LinearProgress } from "@material-ui/core";
import { StudentsList } from "../students/StudentsList";

export const StudentsPage = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div>
      <div>{state.loading && <LinearProgress />}</div>
      <StudentsList students={state.entities} />
    </div>
  );
};
