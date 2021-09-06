import React from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer';
import Check from '../componentes/check';
import About from '../componentes/about';

export default function AboutPage(){
    return(
        <>
            <Navbar home={false}/>
            <About/>
            <Check/>
            <Footer/>
        </>
    )
}

