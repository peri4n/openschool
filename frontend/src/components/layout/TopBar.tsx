import * as React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { fetchSystemInfo } from "../../store/systemInfo";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

export const TopBar = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const state = useAppSelector(state => state.systemInfo);

  useEffect(() => {
      dispatch(fetchSystemInfo());
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap
              onClick={() => navigate("/")}
        >
          {state.schoolName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
