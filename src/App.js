import React from 'react'
import Home from './pantallas/home'
import TorneoDetalle from './pantallas/torneoDetalle'
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
import DashboardMenu from './pantallas/dashboard.jsx';
import AboutPage from './pantallas/about';

export default function App (){
  return(
    <Router>
        <Switch>

            <Route path="/torneo/:categoria" children={<TorneoDetalle/>}/>
              
            <Route exact path="/admin/dashboard">
              <DashboardMenu />
            </Route>

            <Route exact path="/about">
              <AboutPage/>
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
