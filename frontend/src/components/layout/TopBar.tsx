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
import { RootState, useAppDispatch } from "../../store";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

interface TopBarProps {
  schoolName: string
}

const TopBar = (props: TopBarProps) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchSystemInfo());
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap
              onClick={() => navigate("/")}
        >
          {props.schoolName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: RootState) => ({
  schoolName: state.systemInfo.schoolName
})

export default connect(mapStateToProps)(TopBar)
