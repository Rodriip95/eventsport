import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';
import {db} from '../../firebase'
import firebase from 'firebase';
import "./hero.scss"
import Swal from 'sweetalert2'

export default function Registro(){
    const [state, setState] = useState({})

    const navigation = useHistory()

    useEffect(()=>{
        window.scroll(0,0)
    },[])

    const handlerChange = (e) => {
        setState({...state, [e.target.name] : e.target.value})
    }

    const handlerRegistro = () => {
        let t = firebase.firestore.Timestamp.fromDate(new Date());
        let d = t.toDate().toLocaleDateString();
        db.collection("inbox").add(
            {
                ...state,
                fecha: d,
                comentario: false
            })
        .then( res => {
            Swal.fire(
                'Solicitud Enviada!',
                'Nos estaremos comunicando con vos para informarte el estado de tu solicitud de admisión al torneo.',
                'success'
              )
            navigation.push("/")
            setState({})
        })
    }

    return(
        <>
        <Navbar home={false}/>
        <div class="container registro-container">
            <h1>Formulario de inscripcion:</h1>
            <p>Este formulario de inscripcion es para obtener informacion del equipo que se va a jugar el torneo.</p>
            
            <div class="form-floating mb-3">
                <input type="text" name="name" onChange={handlerChange} class="form-control" id="inputNameTeam" placeholder="Ingrese nombre..."/>
                <label for="inputNameTeam">Nombre del Equipo</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="capitan" onChange={handlerChange} id="inputCapTeam" placeholder="Ingrese nombre..."/>
                <label for="inputCapTeam">Nombre del Capitan / Encargado del Equipo</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" name="mail" onChange={handlerChange} class="form-control" id="floatingInput" placeholder="Mail de contacto..."/>
                <label for="floatingInput">Mail de contacto</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" name="tel" onChange={handlerChange} class="form-control" id="floatingInputTel" placeholder="Telefono de contacto..."/>
                <label for="floatingInputTel">Telefono de contacto</label>
            </div>

            <div className="d-flex align-items-center my-2">
                <h4 className="m-0 p-0">
                    Categoria:
                </h4>
                <select class="form-select" aria-label="Default select example" onChange={(e)=>setState({...state, categoria: e.target.value})}>
                    <option selected>Seleccione una categoria</option>
                    <option value="libres">Libres</option>
                    <option value="maxi">Maxi +35</option>
                    <option value="vateranos">Veteranos +40</option>
                </select>
            </div>

            <div className="d-flex align-items-center">
                <h4>
                    Ya participaron de Event Sport?
                </h4>
                <div className="mx-2">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="si" onChange={(e)=>setState({...state, estuvieron: e.target.value})}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            Si
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" value="no" id="flexRadioDefault2" onChange={(e)=>setState({...state, estuvieron: e.target.value})}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            No
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-floating my-3">
                <input type="text" name="location" onChange={handlerChange} class="form-control" id="floatingInputLoc" placeholder="Localidad..."/>
                <label for="floatingInputLoc">Localidad del equipo</label>
            </div>

            <div>
                <p>En el siguiente campo ingresar el nombre, apellido y DNI de los jugadores que pertenecerian al equipo:</p>
                <textarea name="description" placeholder="Informacion del equipo..." onChange={handlerChange} className="form-control" id="description" rows="6"></textarea>
            </div>

            <div className="mt-4 text-center">
                <button onClick={handlerRegistro} className="btn btn-lg btn-warning">Enviar Formulario</button>    
            </div>           
        </div>
        <Footer/>
        </>
    )
};

