import React from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../componentes/footer';
import HeroTorneo from '../componentes/heroTorneo';
import Navbar from '../componentes/navbar';

function TorneoDetalle(){
    let {categoria} = useParams()

    return(
        <>
            <Navbar home={false}/>
            <HeroTorneo categoria={categoria}/>
            <Footer/>
        </>
    )
}

export default TorneoDetalle;