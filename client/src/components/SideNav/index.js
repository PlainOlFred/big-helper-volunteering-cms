import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Laptop, Person, EmojiPeople, Group, LocalFlorist} from "@material-ui/icons";


import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    
  },
});

function SideNav(props) {
  const classes = useStyles();
  const { open, onToggleSideNav } = props;

  const list = (anchor) => (
    <div
      role='presentation'
      className={classes.root}
      //   onClick={()=>onToggleSideNav(false)}
      //   onKeyDown={()=>onToggleSideNav(false)}
    >
      <List>
        <ListItem button>
          <Link to='/dashboard'>
            <ListItemIcon>
              <Laptop />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='/projects'>
            <ListItemIcon>
              <LocalFlorist />
            </ListItemIcon>
            <ListItemText primary={"Projects"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='/volunteers'>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={"Volunteers"} />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to='/charity'>
            <ListItemIcon>
              <EmojiPeople />
            </ListItemIcon>
            <ListItemText primary={"Charity"} />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link to='/profile'>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => onToggleSideNav(false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SideNav;
