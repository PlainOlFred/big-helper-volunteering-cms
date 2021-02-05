import React, { useState } from "react";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

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
      justifyContent: "space-around"
  }
}));

function Volunteers() {
  const classes = useStyles();

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows: RowsProp = [...projectSample];

  const columns: ColDef[] = [
    { field: "project", headerName: "Project Name", width: 150 },
    { field: "charity", headerName: "Charity", width: 150 },
    { field: "email", headerName: "Charity Email", width: 200 },
    { field: "startDate", headerName: "Start Date", width: 150 },
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
    { field: "dueDate", headerName: "Due Date", width: 150 },
    {
      field: "completeDate",
      headerName: "Completion Date",
      width: 200
    },
  ];

  const handleProjectClick = (e) => {
    console.log("open Project");
  };

  return (
    <main className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={3}>
          {/* Volunteers */}
          <Grid item xs={12}>
            <Paper>
              <h1>Projects</h1>
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
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='team-select'>
                    Charity
                  </InputLabel>
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
    </main>
  );
}

export default Volunteers;
