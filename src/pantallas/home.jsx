import React from 'react'
import Album from '../componentes/album';
import Check from '../componentes/check';
import Contacto from '../componentes/contacto';
import Footer from '../componentes/footer';
import Hero from '../componentes/hero';
import Navbar from '../componentes/navbar';
import Torneos from '../componentes/torneos';

function Home(){
    return(
        <>
            <Navbar home={true}/>
            <Hero/>
            <Album/>
            <Torneos/>
            <Check/>
            <Contacto/>
            <Footer/>
        </>
    )
}

export default Home;