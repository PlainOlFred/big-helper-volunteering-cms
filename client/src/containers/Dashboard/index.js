import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Components
import Projects from "./components/Projects";
import TasksStatus from "./components/TasksStatus";
import ProjectQueue from "./components/ProjectQueue";
import Alerts from "./components/Alerts";

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
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Project */}
          <Grid item xs={12} md={8} lg={9}>
            <Projects />
          </Grid>

          {/* Overall Tasks */}
          <Grid item xs={12} md={4} lg={3}>
            <TasksStatus />
          </Grid>

          {/* Alerts  */}
          <Grid item xs={12} md={6}>
            <Alerts />
          </Grid>

          {/* Project Queue */}
          <Grid item xs={12} md={6}>
            <ProjectQueue />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Dashboard;
