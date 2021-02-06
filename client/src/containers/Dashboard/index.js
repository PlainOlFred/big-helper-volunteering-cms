import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

import { Alarm, LocalFlorist, Close } from "@material-ui/icons";

import { Doughnut, Bar } from "react-chartjs-2";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

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
}));

function Dashboard() {
  const classes = useStyles();

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const taskData = (assigned, progress, complete) => ({
    datasets: [
      {
        data: [assigned, progress, complete],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
    labels: ["Assigned", "Progress", "Completed"],
  });

  const projectData = () => ({
    datasets: [
      {
        data: [105, 55, 45, 45, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        label: "Projects Completed",
        backgroundColor: "blue",
      },
    ],
    labels: [
      "Jan,",
      "Feb,",
      "Mar,",
      "Apr,",
      "May,",
      "Jun,",
      "Jul,",
      "Aug,",
      "Sep,",
      "Oct,",
      "Nov,",
      "Dec,",
    ],
  });

  function generate(element) {
    return [0, 1, 2, 3, 4].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const handleAlertClick = () => { 
    // should update status
    console.log("handle alert")
  }

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Project */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <Box className={classes.projectFilterSection}>
                <h1>Projects</h1>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='team-select'>Scope</InputLabel>
                  <Select
                    labelId='scope-select'
                    id='scope-select'
                    value={"10"}
                    onChange={handleChange}
                    label='Age'
                  >
                    <MenuItem value={"10"}>Self</MenuItem>
                    <MenuItem value={"20"}>Team</MenuItem>
                    <MenuItem value={"20"}>Overall</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Bar data={() => projectData()} height={"40vh"} width={"100%"} />
            </Paper>
          </Grid>

          {/* Overall Tasks */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper>
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
            <Paper className={classes.paper}>
              <h1>Alerts</h1>
              <List className={classes.list}>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <Alarm />
                    </ListItemIcon>
                    <ListItemText primary='Single-line item' />
                    <ListItemSecondaryAction>
                      <IconButton edge='end' aria-label='delete' onClick={handleAlertClick}>
                        <Close />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>

          {/* Project Queue */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <h1>Project Queue</h1>
              <List className={classes.list}>
                {generate(
                  <ListItem>
                    <ListItemIcon>
                      <Link to={`/projects/${"1"}`}>
                    
                      <LocalFlorist />
                    </Link>
                    </ListItemIcon>
                    <ListItemText primary='Single-line item' />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Dashboard;
