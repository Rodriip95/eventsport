import React from 'react'
import "./navbar.scss"

export default function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand logo" href="#">
                    <p class="event">EVENT</p>
                    <p>SPORT</p>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <div class="w-100 d-flex justify-content-start justify-content-lg-end">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                            <a class="nav-link" href="#">Inicio</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Torneo</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Noticias</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Contacto</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}