import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Link from "@material-ui/core/Link";
import { Alarm, LocalFlorist, Close } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    maxHeight: "25vh",
    position: "relative",
  },
  paperTitle: {
    // position: "f"
  },
  list: {
    overflow: "auto",
  },
  projectFilterSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  projectGraph: {
    height: "35vh",
  },
}));


function ProjectQueue(props) {
    const classes = useStyles();

function generate(element) {
    return [0, 1, 2, 3, 4].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Paper className={classes.paper}>
      <h1>Project Queue</h1>
      <List className={classes.list}>
        {generate(
          <ListItem>
            <ListItemIcon>
              <Link href={`/projects/${"1"}`}>
                <LocalFlorist />
              </Link>
            </ListItemIcon>
            <ListItemText primary='Single-line item' />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

export default ProjectQueue;
