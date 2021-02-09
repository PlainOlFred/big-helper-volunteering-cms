import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import { Alarm, Person, AddBox, Close, Edit } from "@material-ui/icons";

import { sizing } from '@material-ui/system';


import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Components and Container
import Project from "../Project";

// Api
import { projectsApi } from "../../API";

import { projectSample } from "./utils";

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
  slider: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  filterSection: {
    display: "flex",
    justifyContent: "space-around",
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
  dateField: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "40%",
  },
  progress: {
    width:'34%'
  }
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

  const curTitle = "New Project";
  const curCharity = "Helping Hands";

  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = React.useState(false);

  const charitySelect = [
    { value: "helpHands", label: "Helping Hands" },
    { value: "OneForOne", label: "One For One" },
  ];

  const [project, setProject] = React.useState({
    title: curTitle,
    charity: curCharity,
    startDate: "1-1-1990",
    dueDate: "1-1-1990",
  });

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
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.projectEditPaper}>
      <h2 id='create-project-modal-title'>Project {project.title}</h2>
      <p id='create-project-description'>
        Add a new Project Task Title, Status, and Description
      </p>
      <div className={classes.projectEditForm} noValidate autoComplete='off'>
        <div>
          <TextField
            required
            fullWidth
            className={classes.textField}
            id='create-project-title'
            label='Project Title'
            defaultValue={curTitle}
            variant='outlined'
            name='title'
            value={project.title}
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
            defaultValue={charitySelect[0]}
            onChange={handleCharityChange}
            helperText='Update Status'
            variant='outlined'
          >
            {charitySelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
        aria-labelledby='create-project-modal-title'
        aria-describedby='create-project-description'
      >
        {body}
      </Modal>
    </div>
  );
}

function Projects() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("fetching...");
    projectsApi.getProjects().then((result) => {
      setProjects(result.data);
    });
  },[]);

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows: RowsProp = [...projects];

  const columns: ColDef[] = [
    {
      field: "name",
      headerName: "Project Name",
      width: 150,
      renderCell: (params: ValueFormatterParams) => (
        <Link to={`${url}/${params.getValue("id")}`}>{params.value}</Link>
      ),
    },
    { field: "charity_name", headerName: "Charity", width: 150 },
    { field: "charity_email", headerName: "Charity Email", width: 200 },
    { field: "dateStarted", headerName: "Start Date", width: 150 },
    {
      field: "total_task",
      headerName: "Progress",
      width: 200,
      renderCell: (params: ValueFormatterParams) => (
        <Box 
          color='palevioletred'
          bgcolor='palevioletred'
          width={`${(params.getValue("completed_task") / params.getValue("total_task")) * 100}%`}
        >
          {params.getValue("completed_task") === 0 ?  "No Progress Made " : "."}
        </Box>
      ),
    },
    { field: "dateTarget", headerName: "Due Date", width: 150 },
    {
      field: "dateCompleted",
      headerName: "Completion Date",
      width: 200,
    },
  ];

  const handleProjectClick = (e) => {
    console.log("open Project");
  };

  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path={path}>
          <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
              {/* Volunteers */}
              <Grid item xs={12}>
                <Paper>
                  <Box className={classes.title}>
                    <h1>Projects</h1>

                    <ButtonGroup
                      color='primary'
                      aria-label='primary button group'
                    >
                      <Button>
                        <AddProjectModal />
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Box className={classes.filterSection}>
                    {/* Role Button Filter */}
                    <ButtonGroup
                      color='primary'
                      aria-label='outlined primary button group'
                    >
                      <Button>Assigned</Button>
                      <Button>In Progress</Button>
                      <Button>Complete</Button>
                    </ButtonGroup>
                    {/* Progress Silder */}
                    <div className={classes.slider}>
                      <Typography id='range-slider' gutterBottom>
                        Completion Range
                      </Typography>
                      <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        getAriaValueText={(value) => value}
                      />
                    </div>

                    {/* Team Dropdown */}
                    <FormControl
                      variant='outlined'
                      className={classes.formControl}
                    >
                      <InputLabel id='team-select'>Charity</InputLabel>
                      <Select
                        labelId='team-select'
                        id='team-select'
                        value={"10"}
                        onChange={handleChange}
                        label='Age'
                      >
                        <MenuItem value=''>
                          <em>Any</em>
                        </MenuItem>
                        <MenuItem value={"10"}>Helping Hands</MenuItem>
                        <MenuItem value={"20"}>One For One</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <div style={{ height: 300, width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Route>
        <Route path={`${path}/:projectId`}>
          <Project />
        </Route>
      </Switch>
    </main>
  );
}

export default Projects;
