import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { AddBox } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

// Components and Container

// Api
import { charityApi, projectsApi } from "../../../../API";



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  projectEditPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  projectEditForm: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "warp",
  },

  textField: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  dateField: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "40%",
  },
}));

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

function AddProjectModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState({
    name: "",
    charity: "",
    startDate: "1-1-1990",
    dueDate: "1-1-1990",
  });
  const [charityOptions, setCharityOptions] = React.useState([]);

  useEffect(() => {
    charityApi.getCharities().then((result) => {
      setCharityOptions(result.data)
    });
  }, [])

  

  const [modalStyle] = React.useState(getModalStyle);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCharityChange = (event) => {
    setProject({
      ...project,
      charity: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };

  const handleProjectSubmit = () => {
    console.log("submit", project);
    projectsApi.createNewProject(project).catch((err) => {
      console.warn("you have and err", err)
    })
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.projectEditPaper}>
      <h2 id='create-project-modal-name'>Project {project.name}</h2>
      <p id='create-project-description'>
        Add a new Project Task Title, Status, and Description
      </p>
      <div className={classes.projectEditForm} noValidate autoComplete='off'>
        <div>
          <TextField
            required
            fullWidth
            className={classes.textField}
            id='create-project-name'
            label='Project Title'
            variant='outlined'
            name='name'
            value={project.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            select
            fullWidth
            className={classes.textField}
            id='create-project-charity'
            label='Charity'
            value={project.charity}
            onChange={handleCharityChange}
            helperText='Update Status'
            variant='outlined'
          >
            {charityOptions.map((option) => (
              <MenuItem key={option.charity_id} value={option.charity_id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            id='date'
            label='Start Date'
            type='date'
            defaultValue='2017-05-24'
            className={classes.dateField}
            InputLabelProps={{
              shrink: true,
            }}
            name='startDate'
            onChange={handleInputChange}
          />
          <TextField
            id='date'
            label='Due Date'
            type='date'
            defaultValue='2017-05-24'
            className={classes.dateField}
            InputLabelProps={{
              shrink: true,
            }}
            name='dueDate'
            onChange={handleInputChange}
          />
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={handleProjectSubmit}
        >
          Add Project
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <IconButton edge='end' aria-label='edit' onClick={handleOpen}>
        <AddBox fontSize='large' />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='create-project-modal-name'
        aria-describedby='create-project-description'
      >
        {body}
      </Modal>
    </div>
  );
}

export default AddProjectModal;
