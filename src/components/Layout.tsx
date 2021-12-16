import * as React from "react";
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MenuDrawer } from "./MenuDrawer";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      {/* Top Navigation */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Side Drawer */}
      <MenuDrawer/>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
