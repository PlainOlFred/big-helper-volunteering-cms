import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Laptop from "@material-ui/icons/Laptop";
import Profile from "@material-ui/icons/Person";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function SideNav(props) {
  const classes = useStyles();
  const { open, onToggleSideNav } = props;

  const list = (anchor) => (
    <div
      role='presentation'
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
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link to='/'>
            <ListItemIcon>
              <Profile />
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
