import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.scss"

export default function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <Link class="navbar-brand logo" to="/">
                    <p>EVENT</p>
                    <p class="event">SPORT</p>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <svg style={{color: "#000"}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <div class="w-100 d-flex justify-content-start justify-content-lg-end">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link" to="/admin">
                                    <span>Inicio</span>
                                </Link>
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