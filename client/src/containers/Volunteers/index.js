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
import {Person} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import {  AddBox, Close, Edit } from "@material-ui/icons";

import { volunteerSample } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

// Components and Container
import Volunteer from "../Volunteer";

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
  },
   title: {
    display: "flex",
    justifyContent: "space-between",
  },
  volunteerEditPaper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  volunteerEditForm: {
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
  nameField: {
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


function AddVolunteerModal() {
  const classes = useStyles();


  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = React.useState(false);

  const teamSelect = [
    { value: "redTeam", label: "Red Team" },
    { value: "blueTeam", label: "Blue Team" },
  ];

  const roleSelect = [
    { value: "admin", label: "Admin" },
    { value: "supvisor", label: "Supervisor" },
    { value: "team", label: "Team Member" },

  ];

  const [volunteer, setVolunteer] = React.useState({
    firstName: " ",
    lastName: " ",
    email: " ",
    team: "",
    role: ""
  
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setVolunteer({
      ...volunteer,
      [event.target.name]: event.target.value,
    });
  };

  const handleVolunteerSubmit = () => {
    console.log("submit", volunteer);
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.volunteerEditPaper}>
      {/* <h2 id='create-volunteer-modal-title'>{volunteer.firstName}</h2> */}
      <p id='create-volunteer-description'>Add a new Volunteer Team and Role</p>
      <div className={classes.volunteerEditForm} noValidate autoComplete='off'>
        <div>
          <TextField
            required
            fullWidth
            className={classes.nameField}
            id='create-volunteer-first-name'
            label='First Name'
            
            variant='outlined'
            name='firstName'
            value={volunteer.firstName}
            onChange={handleInputChange}
          />
        
          <TextField
            required
            fullWidth
            className={classes.nameField}
            id='create-volunteer-first-name'
            label='Last Name'
            variant='outlined'
            name='lastName'
            value={volunteer.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            required
            fullWidth
            className={classes.textField}
            id='create-volunteer-first-name'
            label='Email'
            variant='outlined'
            name='email'
            value={volunteer.email}
            onChange={handleInputChange}
          />

        </div>

        <div>
          <TextField
            select
            fullWidth
            className={classes.textField}
            id='create-volunteer-team'
            label='Team'
            value={volunteer.team}
            name="team"
            onChange={handleInputChange}
            variant='outlined'
          >
            {teamSelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            select
            fullWidth
            className={classes.textField}
            id='create-volunteer-role'
            label='Role'
            value={volunteer.role}
            name="role"
            onChange={handleInputChange}
            variant='outlined'
          >
            {roleSelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button
          variant='contained'
          color='primary'
          onClick={handleVolunteerSubmit}
        >
          Add Volunteer
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
        aria-labelledby='create-volunteer-modal-title'
        aria-describedby='create-volunteer-description'
      >
        {body}
      </Modal>
    </div>
  );
}

function Volunteers() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();

  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows: RowsProp = [...volunteerSample];

  const columns: ColDef[] = [
    { field: "icon", headerName: " ", width: 50, renderCell: (params: ValueFormatterParams) => (
        <Link to={`${url}/${params.getValue('id')}`}><Person /></Link>
      ) },
    { field: "lastName", headerName: "Last Name", width: 150,  },
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
      field: "volunteer",
      headerName: "Current Volunteer",
      width: 200,
      renderCell: (params: ValueFormatterParams) => (
        <strong>
          <Button
            variant='contained'
            color='primary'
            size='small'
            style={{ marginLeft: 16 }}
            onClick={handleVolunteerClick}
          >
            {params.value}
          </Button>
        </strong>
      ),
    },
  ];

  const handleVolunteerClick = (e) => {
    console.log("open Volunteer");
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
                <h1>Volunteers</h1>
                <ButtonGroup
                  color='primary'
                  aria-label='outlined primary button group'
                >
                  <AddVolunteerModal />
                </ButtonGroup>
              </Box>
              <Box className={classes.filterSection}>
                {/* Role Button Filter */}
                <ButtonGroup
                  color='primary'
                  aria-label='outlined primary button group'
                >
                  <Button>Admin</Button>
                  <Button>Supervisor</Button>
                  <Button>Team Member</Button>
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
                    Team
                  </InputLabel>
                  <Select
                    labelId='team-select'
                    id='team-select'
                    value={"10"}
                    onChange={handleChange}
                    label='Age'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"10"}>Blue Team</MenuItem>
                    <MenuItem value={"20"}>Red Team</MenuItem>
                  </Select>
                </FormControl>
                {/* Volunteer Dropdown */}
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='volunteer-select'>
                    Current Volunteer
                  </InputLabel>
                  <Select
                    labelId='volunteer-select'
                    id='volunteer-select'
                    value={"10"}
                    onChange={handleChange}
                    label='Current Volunteer'
                  >
                    <MenuItem value=''>
                      <em>None</em>
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
        <Route path={`${path}/:volunteerId`}>
          <Volunteer />
        </Route>

      </Switch>
      
    </main>
  );
}

export default Volunteers;
