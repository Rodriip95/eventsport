import React, { useState } from 'react'
import Home from './pantallas/home'
import TorneoDetalle from './pantallas/torneoDetalle'
import NoticiaDetalle from './pantallas/noticiaDetalle'
import "./variables/constants.scss"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoMatch from './pantallas/error/error';
import Login from './pantallas/login';
import DashboardMenu from './pantallas/dashboard.jsx';
import AboutPage from './pantallas/about';
import Registro from './componentes/registro'

export default function App (){
  const [login, setLogin] = useState(null)

  const handlerLogin = ( id ) => {
    setLogin( id )
  }

  const handlerLogout = ( ) => {
    setLogin( null )
  }

  return(
    <Router>
        <Switch>
 
            {login &&
              <Route exact path="/admin/dashboard">
                <DashboardMenu handlerLogout={handlerLogout}/>
              </Route>
            }

            <Route path="/torneo/:categoria" children={<TorneoDetalle/>}/>

            <Route path="/new/:newId" children={<NoticiaDetalle/>}/>

            <Route exact path="/registro">
              <Registro/>
            </Route>

            <Route exact path="/about">
              <AboutPage/>
            </Route>

            <Route exact path="/admin">
              <Login handlerLogin={handlerLogin} handlerLogout={handlerLogout}/>
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
