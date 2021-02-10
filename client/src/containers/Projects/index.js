import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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

import { useProject } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "2em"
  },
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
}));

function Projects() {
  const classes = useStyles();
  const [projects, dispatch] = useProject();
  let { path, url } = useRouteMatch();

  const rows = [...projects.projects];

  const columns = [
    {
      field: "name",
      headerName: "Project Name",
      width: 150,
      renderCell: (params) => (
        <Link to={`${url}/${params.row.id}`}>{params.value}</Link>
      ),
    },
    { field: "team", headerName: "Team", width: 100 },
    { field: "charity_name", headerName: "Charity", width: 150 },
    { field: "dateStarted", headerName: "Start Date", width: 150 },
    {
      field: "total_task",
      headerName: "Progress",
      width: 200,
      renderCell: (params) => (
        <Box
          color='palevioletred'
          bgcolor='palevioletred'
          width={`${
            (params.row.completed_task /
              params.rowtotal_task) *
            100
          }%`}
        >
          {params.row.completed_task === 0 ? "No Progress Made " : "."}
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
                  <div style={{ height: "60vh", width: "100%" }}>
                    <DataGrid rows={rows} columns={columns} />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Route>
        <Route path={`${path}/:projectId`} children={<Project />}>
        </Route>
      </Switch>
    </main>
  );
}

export default Projects;
