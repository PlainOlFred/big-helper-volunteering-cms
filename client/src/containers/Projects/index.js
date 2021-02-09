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

import { sizing } from "@material-ui/system";

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
import AddProjectModal from "./components/AddProjectModal";

// Api
import { projectsApi, charityApi } from "../../API";


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
    width: "34%",
  },
}));

function Projects() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    projectsApi.getProjects().then((result) => {
      console.log("getPRo", result.data)
      setProjects(result.data);
    });
    

  }, []);

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
        <Link to={`${url}/${params.row.id}`}>{params.value}</Link>
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
          width={`${
            (params.getValue("completed_task") /
              params.getValue("total_task")) *
            100
          }%`}
        >
          {params.getValue("completed_task") === 0 ? "No Progress Made " : "."}
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
