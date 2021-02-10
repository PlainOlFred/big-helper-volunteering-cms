import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

import {  Edit } from "@material-ui/icons";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";

import { charityApi, projectsApi } from "../../../../../../API";
import { useProject, useOptions } from "../../../../../../App";



const useStyles = makeStyles((theme) => ({
  root: {
  
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  }
}));


function EditTaskModal(props) {
  const classes = useStyles();
  const {task: taskIntial} = props;

  useEffect(() => {
    console.log(props.task)
  })

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
  const task_id =taskIntial.task_id
  const curTask = taskIntial.title;
  const curDesc = taskIntial.description;
  const curStatus = taskIntial.status;

  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = React.useState(false);

  const [task, setTask] = React.useState({
    id: task_id,
    title: curTask,
    description: curDesc,
    status: curStatus,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setTask({
      ...task,
      status: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleTaskSubmit = async () => {
    try {
      console.log("SUM Tak", task)
      const {data} = await projectsApi.editTasksOnProject({...task });

      setOpen(false);
      
    } catch (error) {
      console.warn('error in editing task', error)
    }
    
  };

  const statusSelect = [
    { value: "REVIEW", label: "Submit For Review" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const body = (
    <div style={modalStyle} className={classes.taskEditPaper}>
      <h2 id='edit-task-modal-title'>Task: {curTask}</h2>
      <p id='edit-task-description'>Edit Task Title, Status, and Description</p>
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

        <div>
          <TextField
            select
            fullWidth
            className={classes.textField}
            id='edit-task-status'
            label='Task Status'
            value={task.status}
            onChange={handleStatusChange}
            helperText='Update Status'
            variant='outlined'
          >
            {statusSelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button variant='contained' color='primary' onClick={handleTaskSubmit}>
          Update Task
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton edge='end' aria-label='edit' onClick={handleOpen}>
        <Edit />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='edit-task-modal-title'
        aria-describedby='edit-taskl-description'
      >
        {body}
      </Modal>
    </div>
  );
}

export default EditTaskModal