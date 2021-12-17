import * as React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { MenuDrawer } from "./MenuDrawer";
import { TopBar } from "./TobBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
      <TopBar />
      {/* Side Drawer */}
      <MenuDrawer />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
