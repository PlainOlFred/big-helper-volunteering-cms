import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DataGrid, RowsProp, ColDef } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { volunteerSample } from "./utils";

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

function Volunteers() {
  const classes = useStyles();

  const rows: RowsProp = [...volunteerSample];

  const columns: ColDef[] = [
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "locationRole", headerName: "Role", width: 100 },
    {
      field: "progress",
      headerName: "Progress",
      width: 200,
      renderCell: (params: ValueFormatterParams) => (
        <Box
          color='palevioletred'
          bgcolor='palevioletred'
          width={`${params.value * 100}%`}
        >
          {"."}
        </Box>
      ),
    },
    { field: "team", headerName: "Team", width: 150 },
    {
      field: "project",
      headerName: "Current Project",
      width: 200,
      renderCell: (params: ValueFormatterParams) => (
        <strong>
          <Button
            variant='contained'
            color='primary'
            size='small'
            style={{ marginLeft: 16 }}
            onClick={handleProjectClick}
          >
            {params.value}
          </Button>
        </strong>
      ),
    },
  ];

  const handleProjectClick = (e) => {
     console.log("open Project")
  };

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Volunteers */}
          <Grid item xs={12}>
            <Paper>
              <h1>Volunteers</h1>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Volunteers;
