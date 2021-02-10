import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";


import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";

import {AddBox} from "@material-ui/icons";

// Api
import { charityApi, projectsApi } from "../../../../../../API";
import { useProject, useOptions } from "../../../../../../App";

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
}))



function AddTaskModal() {
  const classes = useStyles();

  const [projects, projectDispatch] = useProject();
  const {currentProject: project} = projects;


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

  const curTask = " ";
  const curDesc = " ";

  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = React.useState(false);

  const [task, setTask] = React.useState({
    title: curTask,
    description: curDesc,
    status: "ASSIGNED",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleTaskSubmit = async () => {
    try {
      const {data} = await projectsApi.addTasksToProject({task, ...project});

      setOpen(false);
      
    } catch (error) {
      console.warn('error in adding task', error)
    }
    
  };

  const body = (
    <div style={modalStyle} className={classes.taskEditPaper}>
      <h2 id='edit-task-modal-title'>Task: {curTask}</h2>
      <p id='edit-task-description'>Add Task Title, and Description</p>
      <div className={classes.taskEditForm} noValidate autoComplete='off'>
        <div>
          <TextField
            required
            fullWidth
            className={classes.textField}
            id='edit-task-title'
            label='Task Title'
            variant='outlined'
            name='title'
            value={task.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            required
            multiline
            fullWidth
            rows={4}
            className={classes.textField}
            id='edit-task-description'
            label='Task Title'
            variant='outlined'
            name='description'
            value={task.description}
            onChange={handleInputChange}
          />
        </div>

        <Button variant='contained' color='primary' onClick={handleTaskSubmit}>
          Add Task
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

export default AddTaskModal