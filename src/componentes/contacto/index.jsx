import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { db } from '../../firebase'
import firebase from 'firebase'
import './contacto.scss'

export default function Contacto(){

    const [state, setState] = useState({
        nombre: "",
        comentario: "",
        email: ""
    })

    const handlerChange = (e) => {
        setState({...state, [e.target.name] : e.target.value})
    }

    const handlerRegistro = () => {
        let t = firebase.firestore.Timestamp.fromDate(new Date());
        let d = t.toDate().toLocaleDateString();
        db.collection("inbox").add({
            ...state, 
            fecha: d, 
            comentario: true
        })
        .then( res => {
            Swal.fire(
                'Comentario Enviado!',
                'Te estaremos contestando via mail',
                'success'
              )
            setState({
                nombre: "",
                comentario: "",
                email: ""
            })
        })
    }

    return(
        <div class="container" id="contacto">
            <h2 class="pb-2 border-bottom mb-4">Contacto</h2>
            <div class="row d-flex justify-content-center">
                <div class="col-10 col-lg-8">
                    <div class="cont-cont">
                        <p>Podes dejarnos tu consulta o comentario completando el siguiente formulario:</p>
                    </div>
                    <div class="mb-3 form-floating">
                        <input value={state.nombre} type="text" name="nombre" onChange={handlerChange} class="form-control" id="exampleFormControlInput2" placeholder="Juan Perez..."/>
                        <label for="exampleFormControlInput2" class="form-label">Ingresa tu nombre y apellido</label>
                    </div>
                    <div class="mb-3 form-floating">
                        <input value={state.email} type="text" name="email" onChange={handlerChange} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        <label for="exampleFormControlInput1" class="form-label">Ingresa tu mail</label>
                    </div>
                    <div class="form-floating">
                        <textarea value={state.comentario} name="comentario" onChange={handlerChange} class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Comentario</label>
                    </div>
                    <div className="text-center mt-3">
                        <button onClick={handlerRegistro} disabled={ state.nombre !== "" && state.email !== "" && state.comentario !== "" ? false : true} className="btn btn-lg px-4 text-white btn-warning">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}