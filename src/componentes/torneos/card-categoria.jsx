import React from 'react'
import "./torneos.scss"
export default function CardCat(){
    let fondo = {
        backgroundImage: "url('https://images.unsplash.com/photo-1591498237542-1974148f6f02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=463&q=80)"
    }
    return(
        <div class="col">
          <div
            class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
            style={fondo}
          >
            <div class="fondo-opa d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                Categoria Libre, todas las edades
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
                  
                  <span>14</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )
}