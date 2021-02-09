import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Button from "@material-ui/core/Button";



// Components
import StatusPopover from './components/StatusPopover'
import EditTaskModal from './components/EditTaskModal'
import AddTaskModal from './components/AddTaskModal'



const useStyles = makeStyles((theme) => ({
  root: {
       padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "45vh",
    position: "relative"
   
  },
  list: {
    overflow: "auto",
  },
  listItem: {
      display: "flex",
      borderBottom: "1px solid black"

  },
  projectDescription: {
    marginLeft: "2em",
    display: "inline-block",
    color: "red"
  },
 

}));




function TasksList(props) {
  const classes = useStyles();
  const {tasks} = props;

   function generate(element) {
    return tasks.map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
       <Paper className={classes.root}>
            <h1>Projects Name </h1>
            <h4>Tasks</h4>

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

            {/* Tasks list */}
            <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <AddTaskModal />
                </ListItemIcon>
              </ListItem>
              {tasks.map((task) =>
                <ListItem >
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography display='inline'>
                          {task.title}
                        </Typography>

                        <Typography className={classes.projectDescription}>
                          <StatusPopover status={task.status}/>
                        </Typography>

                        <Typography className={classes.projectDescription}>
                          {task.description}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <EditTaskModal />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          </Paper>
  );
}

export default TasksList;
