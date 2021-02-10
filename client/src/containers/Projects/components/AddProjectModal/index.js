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
import { useProject, useOptions } from "../../../../App";





const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
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

  const [projects, projectDispatch] = useProject();
  const [options] = useOptions();


  const [project, setProject] = React.useState({});
 

  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setProject({
      name: "",
      team: "",
      charity: "",
      startDate: "",
      dueDate: ""
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleInputChange = (event) => {
    
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };

  const handleProjectSubmit = async () => {
    try {
      
    console.log("submit", project);
    const {data} = await projectsApi.createNewProject(project);

    const payload = {
      id: data.id,
      name: project.name, 
      date_started: project.startDate, 
      date_target: project.dueDate, 
      date_completed: null, 
      description: "default",
      charity_charity_id: project.charity, 
      team_team_id: project.team

    }
    console.log("New Project", payload)

    projectDispatch({type:"ADD_PROJECT", payload})

    setOpen(false);
    } catch (error) {
      console.warn('error while creating new project', error)
    }
  };

  const body = (
    <div style={modalStyle} className={classes.projectEditPaper}>
      <h2 id='create-project-modal-name'>Project {project.name}</h2>
      <p id='create-project-description'>
        Add a new Project Title, Team, and Charity
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
            id='create-project-team'
            label='Team'
            value={project.team}
            name="team"
            onChange={handleInputChange}
            variant='outlined'
          >
            {options.teamOptions.map((option) => (
              <MenuItem key={option.team_id} value={option.team_id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            select
            fullWidth
            className={classes.textField}
            id='create-project-charity'
            label='Charity'
            value={project.charity}
            name="charity"
            onChange={handleInputChange}
            variant='outlined'
          >
            {options.charityOptions.map((option) => (
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
