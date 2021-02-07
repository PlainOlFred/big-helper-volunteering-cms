import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut, Bar } from "react-chartjs-2";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
   
  },
  projectFilterSection: {
    display: "flex",
    justifyContent: "space-between",
  },
  projectGraph: {
    height: "35vh",
  },
}));

function Projects(props) {
  const classes = useStyles();

  const [scope, setScope] = React.useState("self");


  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };


  const projectData = () => ({
    datasets: [
      {
        data: [105, 55, 45, 45, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        label: "Projects Completed",
        backgroundColor: "blue",
      },
    ],
    labels: [
      "Jan,",
      "Feb,",
      "Mar,",
      "Apr,",
      "May,",
      "Jun,",
      "Jul,",
      "Aug,",
      "Sep,",
      "Oct,",
      "Nov,",
      "Dec,",
    ],
  });

  return (
    <Paper className={classes.root}>
      <Box className={classes.projectFilterSection}>
        <h1>Projects</h1>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='scope-select-label'>Scope</InputLabel>
          <Select
            labelId='scope-select-label'
            id='scope-select'
            value={scope}
            onChange={handleScopeChange}
            label="scope"
          >
            <MenuItem value={"self"}>Self</MenuItem>
            <MenuItem value={"team"}>Team</MenuItem>
            <MenuItem value={"org"}>Overall</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.projectGraph}>
        <Bar
          data={() => projectData()}
          options={{ maintainAspectRatio: false }}
        />
      </Box>
    </Paper>
  );
}

export default Projects;
