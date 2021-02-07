import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Popover from "@material-ui/core/Popover";


const useStyles = makeStyles((theme) => ({




}))

function StatusPopover(props) {
  const classes = useStyles();

const status = ["Review", "Assigned", "In Progress", "Completed"];
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


export default StatusPopover;