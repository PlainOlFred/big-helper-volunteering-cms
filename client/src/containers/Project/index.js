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
import { Alarm, Person,AddBox, Close, Edit } from "@material-ui/icons";

import { Doughnut, Bar } from "react-chartjs-2";

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
  bottomPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "30vh",
    position: "relative",
  },
  topPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "45vh",
    position: "relative",
  },
  list: {
    overflow: "auto",
  },
  projectDescription: {
    marginLeft: "2em",
    display: 'inline'
  }
}));

function Project() {
  const classes = useStyles();

  function generate(element) {
    return [0, 1, 2, 4, 5, 6].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const taskData = (assigned, progress, complete) => ({
    datasets: [
      {
        data: [assigned, progress, complete],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
    labels: ["Assigned", "Progress", "Completed"],
  });

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {/* Project Details */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.topPaper}>
            <h1>Projects Name - Team leader</h1>
            <h4>Taks</h4>

            {/* Tasks list */}
            <List className={classes.list}>
              <ListItem >
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon> 
                </ListItem>
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
                  <ListItemText primary={
                      <React.Fragment>
                        <Typography display="inline">
                          Single-line item
                        </Typography>
                        
                        <Typography className={classes.projectDescription}>
                          Blah Blah Blah Blah Blah
                        </Typography>
                      </React.Fragment>
                      } />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Overall Tasks */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.topPaper}>
            <h1>Tasks Status</h1>
            <Doughnut
                data={() => taskData(10, 20, 10)}
                height={50}
                width={50}
                options={{
                  cutoutPercentage: 0,
                  rotation: -0.75 * Math.PI,
                  circumference: 2 * Math.PI,
                }}
              />
          </Paper>
        </Grid>

        

        {/* Alerts  */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.bottomPaper}>
            <h1>Alerts</h1>
            <List className={classes.list}>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <Alarm />
                    </ListItemIcon>
                    <ListItemText primary={
                      <React.Fragment>
                        <Typography display="inline">
                          Single-line item
                        </Typography>
                      </React.Fragment>
                      } />
                    <ListItemSecondaryAction>
                      <IconButton edge='end' aria-label='delete'>
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
          </Paper>
        </Grid>

        {/* Volunteer list */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.bottomPaper}>
            <h1>Volunteers</h1>
            <List className={classes.list}>
              <ListItem >
                  <ListItemIcon>
                    <AddBox />
                  </ListItemIcon> 
                </ListItem>
              {generate(
                <ListItem>
                  <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                  <ListItemText 
                    primary='Single-line item' 
                    />
                  <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                      <Edit />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Project;
