import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Containers
import Dashboard from "./containers/Dashboard";
import Volunteers from "./containers/Volunteers";
import Projects from "./containers/Projects";
import Profile from "./containers/Profile";

// Components
import NavBar from "./components/NavBar";
import SideNav from "./components/SideNav";

// API
import { projectsApi, teamApi, charityApi } from "./API";

// Reducer
function projectReducer(state, action) {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: [...action.projects],
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: state.projects.concat([{ ...action.payload }]),
      };
    default: {
      throw new Error(`${action.type} not supported`);
    }
  }
}

// Context
const ProjectContext = createContext();

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("Not in ProjectProvider");
  }
  return context;
}

function ProjectProvider(props) {
  const [state, dispatch] = useReducer(projectReducer, {
    projects: props.projects || [],
    currentProject: {},
  });

  const value = useMemo(() => [state, dispatch], [state]);

  return <ProjectContext.Provider value={value} {...props} />;
}

function optionReducer(state, action) {
  switch (action.type) {
    case "SET_OPTIONS":
      return {
        ...state,
        [action.opt]: action.options,
      };
    default: {
      throw new Error(`${action.type} not supported`);
    }
  }
}
const OptionContext = createContext(); // simplified options

export function useOptions() {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error("Not in OptionProvider");
  }

  return context;
}

function OptionProvider(props) {
  const [state, dispatch] = useReducer(optionReducer, props.options);

  const value = useMemo(() => [state, dispatch], [state]);

  return <OptionContext.Provider value={value} {...props} />;
}

function App() {
  const [state, setState] = useState({
    isSideNavOpen: false,
  });
  const [projects, setProjects] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data: projects } = await projectsApi.getProjects();

      // options 
      const {data: charityOptions } =  await charityApi.getCharityOptions();
      const {data: teamOptions} = await teamApi.getTeamsOptions(); 
      
      setOptions({charityOptions, teamOptions})
      setProjects(projects);

    }
    fetchData();
  }, []);

  const toggleSideNav = (open) => {
    setState({ ...state, isSideNavOpen: open });
  };

  return (
    <Router>
      <div>
        <nav>
          <NavBar open={state.isSideNavOpen} onToggleSideNav={toggleSideNav} />
        </nav>
        <SideNav open={state.isSideNavOpen} onToggleSideNav={toggleSideNav} />
        <Switch>
          {options && <OptionProvider options={options}>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='/projects'>
              {projects && (
                <ProjectProvider projects={projects}>
                  <Projects />
                </ProjectProvider>
              )}
            </Route>
            <Route path='/volunteers'>
              <Volunteers />
            </Route>
            <Route path='/charity'>
              <Charity />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route exact path='/'>
              <Home />
            </Route>
          </OptionProvider>}
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Charity() {
  return <h2>Charity</h2>;
}

export default App;
