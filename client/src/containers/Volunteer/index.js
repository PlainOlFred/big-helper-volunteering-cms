import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Alarm, Person, AddBox, Close, Edit } from "@material-ui/icons";

import Popover from "@material-ui/core/Popover";

import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";


import Button from "@material-ui/core/Button";

import { Doughnut, Bar } from "react-chartjs-2";

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
  list: {
    overflow: "auto",
  },
  projectDescription: {
    marginLeft: "2em",
    display: "inline",
  },
  projectStatus: {
    marginLeft: "2em",
    display: "inline",
    backgroundColor: "green",
    padding: ".5em",
    borderRadius: "15px",
    color: "gold",
  },
  status: {
    display: "inline",
  },
}));

// Status Popover
function StatusPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (value) => {
    //update status
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { status } = props;

  return (
    <div className={classes.status}>
      <Button
        aria-describedby={id}
        variant='contained'
        color='primary'
        onClick={handleClick}
      >
        {status[0]}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          <List>
            {status.map((stat) => (
              <ListItem
                button
                onClick={() => handleListItemClick(stat)}
                key={stat}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={stat} />
              </ListItem>
            ))}
          </List>
        </Typography>
      </Popover>
    </div>
  );
}

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

function Volunteer() {
  const classes = useStyles();

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const taskData = (assigned, progress, complete) => ({
    datasets: [
      {
        data: [assigned, progress, complete],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
    labels: ["Assigned", "Progress", "Completed"],
  });

  const status = ["Review", "Assigned", "In Progress", "Completed"];

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {/* Project Details */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper>
            <h1>Volunteer Name - Team leader</h1>

            {/* Tasks list */}
            <h2>Taks </h2>
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
            </Box>
            <List>
              {generate(
                <ListItem>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography display='inline'>
                          Single-line item
                        </Typography>

                        <Typography className={classes.projectDescription}>
                          <StatusPopover status={status} />
                        </Typography>
                        <Typography className={classes.projectDescription}>
                          Blah Blah Blah Blah Blah
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Overall Tasks */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper>
            <h1>Tasks Status</h1>
            <Doughnut
              data={() => taskData(10, 20, 10)}
              height={50}
              width={50}
              options={{
                cutoutPercentage: 0,
                rotation: -0.75 * Math.PI,
                circumference: 2 * Math.PI,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Volunteer;
