import React, { useEffect } from 'react';
import "./hero.scss"
import TableTorneo from './tableTorneo';

export default function HeroTorneo({categoria, equipos}){

    let urlImage = "url('https://images.unsplash.com/photo-1521830101529-057b1dfd9784?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"

    useEffect(()=>{
        window.scroll(0,0)
    },[])
    return(
        <>
        <div class="container-fluid p-0 m-0 position-relative">
            <div className="torneo-portada" style={{backgroundImage: urlImage}}></div>
            <div className="portada-text position-absolute text-center top-50 start-50 translate-middle w-50">
                <h1>{categoria.toUpperCase()}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex laudantium nobis repudiandae, nulla tenetur corporis officia sapiente nesciunt ab adipisci vitae veniam itaque vero non officiis eos, incidunt ad labore!</p>
            </div>
        </div>
        <TableTorneo categoria={categoria} equipos={equipos}/>
        </>
    )
};

