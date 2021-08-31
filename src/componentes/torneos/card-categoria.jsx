import React, { useEffect, useState } from 'react'
import "./torneos.scss"
import {db} from '../../firebase'
import { Link } from 'react-router-dom'

export default function CardCat({foto, titulo, categoria}){

  const [equipos, setEquipos] = useState([])

  useEffect(()=>{
    getCategoria(categoria)
  },[])

  let fondo = {
      backgroundImage: "url('"+foto+"')"
  }

  const getCategoria = async(cat) => {
    let nuevoArr = []
    await db.collection(cat).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let res = doc.data()
            res.id = doc.id
            nuevoArr.push( res )
        });
        // setCargando(false)
    });
    setEquipos(nuevoArr)
  }

    return(
      <div class="col">
        <Link to={`/torneo/${categoria}`} className="dashexit">
        <div
          class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
          style={fondo}
          >
          <div class="fondo-opa d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
            <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
              {titulo}
            </h2>
            <ul class="d-flex list-unstyled mt-auto">
              <li class="me-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
              </li>
              <li class="d-flex align-items-center me-3">
                <span>Equipos:</span>
              </li>
              <li class="d-flex align-items-center">
                <span>{equipos.length}</span>
              </li>
            </ul>
          </div>
        </div>
        </Link>
      </div>
    )
}