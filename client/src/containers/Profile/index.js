import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { Avatar } from "@material-ui/core";

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
    maxHeight: "75vh",
    maxWidth: "50vw",
    position: "relative",
    margin: "0 auto",
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  largeAva: {
    height: "25vh",
    width: "25vh",
  },
  bio: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Profile() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Box className={classes.avatar}>
                <Avatar className={classes.largeAva} />
              </Box>
              <Box className={classes.bio}>
                <h1>Demo Admin</h1>
                <h1>Role: Admin</h1>
                <h1> Volunteering Since: 2015</h1>
                <p> Email: demo.admin@example.com</p>
                <p>Total Projects: 109</p>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Profile;
