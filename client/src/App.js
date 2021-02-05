import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

// Containers
import Dashboard from "./containers/Dashboard";
import Volunteers from "./containers/Volunteers";

// Components
import NavBar from './components/NavBar'
import SideNav from './components/SideNav';

function App() {

  const [state, setState] = useState({
    isSideNavOpen: false,
  });

  const toggleSideNav = (open) => {
   
    setState({ ...state, isSideNavOpen: open });
  }; 



  return (
    <Router>
      <div>
        <nav>
          <NavBar open={state.isSideNavOpen} onToggleSideNav={toggleSideNav}/>
        </nav>
        <SideNav open={state.isSideNavOpen} onToggleSideNav={toggleSideNav}/>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/volunteers">
            <Volunteers />
          </Route>
          <Route path="/charity">
            <Charity />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
function Profile() {
  return <h2>Profile</h2>;
}
function Projects() {
  return <h2>Projects</h2>;
}
function Charity() {
  return <h2>Charity</h2>
}




export default App;
