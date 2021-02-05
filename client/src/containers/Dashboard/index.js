import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Project */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper>
              <h1>Projects</h1>
            </Paper>
          </Grid>

          {/* Overall Tasks */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper>
              <h1>Tasks Status</h1>
            </Paper>
          </Grid>

          {/* Alerts  */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <h1>Alerts</h1>
            </Paper>
          </Grid>

          {/* Project Queue */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <h1>Project Queue</h1>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </main>
  );
}

export default Dashboard;
