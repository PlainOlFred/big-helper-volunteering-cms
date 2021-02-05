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




export default App;
