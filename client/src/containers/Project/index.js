import React, {useEffect, useState} from "react";
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
import { Alarm, Person, AddBox, Close, Edit } from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";

import { Doughnut, Bar } from "react-chartjs-2";

import {
  useParams
} from "react-router-dom";



// Components
import TasksList from './components/TasksList'

// Api
import { projectsApi } from "../../API";



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
    display: "inline",
  },
  status: {
    display: "inline",
  },
  taskEditPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  taskEditForm: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "warp",
  },
  editTask: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  volunteers: {
    display: "flex",
    flexDirection: "column",
  },
}));

// Status Popover


// Task Edit Modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: 500,
  };
}


function AssignVolunteerModal() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [volunteers, setVolunteers] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = volunteers.indexOf(value);
    const newVoluntees = [...volunteers];

    if (currentIndex === -1) {
      newVoluntees.push(value);
    } else {
      newVoluntees.splice(currentIndex, 1);
    }

    setVolunteers(newVoluntees);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVolunteerCheck = (event) => {};

  const handleTaskSubmit = () => {
    console.log("submit", volunteers);
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.taskEditPaper}>
      <h2 id='edit-task-modal-title'>Voulunteers</h2>
      <p id='edit-task-description'>Add Volunteers to this Project</p>
      <div className={classes.taskEditForm} noValidate autoComplete='off'>
        <div>
          <List dense className={classes.volunteers}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button>
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge='end'
                      onChange={handleToggle(value)}
                      checked={volunteers.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>

        <Button variant='contained' color='primary' onClick={handleTaskSubmit}>
          Add Volunteers
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton edge='end' aria-label='add' onClick={handleOpen}>
        <AddBox />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='add-task-modal-title'
        aria-describedby='add-taskl-description'
      >
        {body}
      </Modal>
    </div>
  );
}

function Project() {
  const classes = useStyles();

  const [project, setProject] = useState(null)
 


  const {projectId} = useParams();
  useEffect(() => {
  
      projectsApi.getProjectById(projectId).then((result) => {

        console.log(result.data.tasks)
        setProject(result.data)
      })

  },[])

  function generateTasks(element) {
    return project.tasks.map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  

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

  const handleAssignVolunteer = () => {};

  const handleUnassignVolunteer = () => {
    console.log("unassign Voulunteer");
  };

  const handleRemoveAlert = () => {
    console.log("Remove Alert");
  };

  // Status
  const status = ["Review", "Assigned", "In Progress", "Completed"];

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {/* Project Details */}
        <Grid item xs={12} md={8} lg={9}>
          {project && <TasksList tasks={project.tasks}/> }
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
              {project && generateTasks(
                <ListItem>
                  <ListItemIcon>
                    <Alarm />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography display='inline'>
                          Single-line item
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={handleRemoveAlert}
                    >
                      {/* !TODO: Change status of alert and render different Icon  */}
                      <Close />
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
              <ListItem>
                <ListItemIcon>
                  <AssignVolunteerModal />
                </ListItemIcon>
              </ListItem>
              {generate(
                <ListItem>
                  <ListItemIcon>
                    <Link to={`/volunteers/${"1"}`}>
                      <Person />
                    </Link>
                  </ListItemIcon>
                  <ListItemText primary='Single-line item' />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={handleUnassignVolunteer}
                    >
                      <Close />
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
