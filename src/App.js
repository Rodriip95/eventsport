import React from 'react'
import Home from './pantallas/home'
import "./variables/constants.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Navbar from './componentes/navbar';
import NoMatch from './pantallas/error/error';
import Footer from './componentes/footer';
import Login from './pantallas/login';
import Dashboard from './pantallas/dashboard';

export default function App (){
  return(
    <Router>
        <Switch>
            <Route exact path="/admin/dashboard">
              <Dashboard />
            </Route>

            <Route exact path="/admin">
              <Login />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>
        </Switch>
    </Router>
  )
}
