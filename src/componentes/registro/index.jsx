import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';
import "./hero.scss"
export default function Registro(){
    const [state, setState] = useState({})

    const navigation = useHistory()

    return(
        <>
        <Navbar home={false}/>
        <div class="container">
            <h1>Formulario de inscripcion:</h1>
            <p>Este formulario de inscripcion es para obtener informacion del equipo que se va a jugar el torneo.</p>
            <div>
                <input className="form-control" type="text" placeholder={"Nombre del equipo..."}/>
            </div>

            <div>
                <input className="form-control" type="text" placeholder={"Nombre del capital/encargado..."}/>
            </div>

            <h4>
                Categoria:
            </h4>

            <h4>
                Ya participaron de Event Sport?
            </h4>

            <div>
                <input className="form-control" type="text" placeholder={"Mail de contacto..."}/>
            </div>

            <div>
                <input className="form-control" type="text" placeholder={"Telefono..."}/>
            </div>

            <div>
                <input className="form-control" type="text" placeholder={"Localidad del equipo..."}/>
            </div>            
        </div>
        <Footer/>
        </>
    )
};

