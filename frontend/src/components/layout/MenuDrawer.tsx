import * as React from "react";
import {
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { LocalLibrary, School } from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
  }))
export const MenuDrawer = () => {

  const classes = useStyles();

  const links = [
    {
      text: "Teacher",
      icon: <School />,
      path: "teacher",
    },
    {
      text: "Students",
      icon: <LocalLibrary />,
      path: "students",
    },
  ];

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      {/* List / Links */}
      <div className={classes.drawerContainer}>
        <List>
          {links.map((link) => (
              <ListItem
                button
                component={Link}
                key={link.text}
                to={link.path}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
