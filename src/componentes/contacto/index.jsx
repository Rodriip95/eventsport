import React from 'react'
import './contacto.scss'

export default function Contacto(){

    return(
        <div class="container" id="contacto">
            <h2 class="pb-2 border-bottom mb-4">Contacto</h2>
            <div class="row d-flex justify-content-center">
                <div class="col-10 col-lg-8">
                    <div class="cont-cont">
                        <p>Podes dejarnos tu consulta o comentario completando el siguiente formulario:</p>
                    </div>
                    <div class="mb-3 form-floating">
                        <input type="name" class="form-control" id="exampleFormControlInput2" placeholder="Juan Perez..."/>
                        <label for="exampleFormControlInput2" class="form-label">Ingresa tu nombre y apellido</label>
                    </div>
                    <div class="mb-3 form-floating">
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        <label for="exampleFormControlInput1" class="form-label">Ingresa tu mail</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Comments</label>
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-lg px-4 text-white btn-warning">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}