import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

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
  },
}));

function Project() {
  const classes = useStyles();

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {/* Project Details */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper>
            <h1>Projects Name - Team leader</h1>
            <h4>Projects Name - Team leader</h4>

            {/* Tasks list */}
            <h2>Taks -- add Task</h2>
            <List>
              {generate(
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                    //   inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText primary='Single-line item' />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Overall Tasks */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper>
            <h1>Tasks Status</h1>
          </Paper>
        </Grid>

        {/* Volunteer list */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h1>Volunteers -- add volunteer</h1>
            <List>
              {generate(
                <ListItem>
                  <ListItemText primary='Single-line item' />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Alerts  */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h1>Alerts</h1>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Project;
