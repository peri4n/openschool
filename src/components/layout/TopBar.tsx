import * as React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

export const TopBar = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap
              onClick={() => history.push("/")}
        >
          Open School
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
