import * as React from "react";
import {
    AppBar, createStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles, Theme,
    Toolbar,
    Typography
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { LocalLibrary, School } from "@material-ui/icons"

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

type LayoutProps = {
    children?: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {

    const classes = useStyles()

    const history = useHistory()

    const links = [
        {
            text: "Teacher",
            icon: <School />,
            path: "teacher"
        },
        {
            text: "Students",
            icon: <LocalLibrary />,
            path: "students"
        },
    ]

    return (
        <div className={ classes.root }>
            { /* Top Navigation */ }
            <AppBar position="fixed" className={ classes.appBar }>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            { /* Side Drawer */ }
            <Drawer
                className={ classes.drawer }
                variant="permanent"
                classes={ {
                    paper: classes.drawerPaper,
                } }
            >
                <Toolbar />
                { /* List / Links */ }
                <div className={ classes.drawerContainer }>
                    <List>
                        { links.map((link) => (
                            <ListItem
                                button
                                key={ link.text }
                                onClick={ () => history.push(link.path) }
                            >
                                <ListItemIcon>{ link.icon }</ListItemIcon>
                                <ListItemText primary={ link.text } />
                            </ListItem>
                        )) }
                    </List>
                </div>
            </Drawer>
            <main className={ classes.content }>
                <Toolbar />
                { children }
            </main>
        </div>
    );
};
