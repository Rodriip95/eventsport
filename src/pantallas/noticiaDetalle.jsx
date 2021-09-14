import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../componentes/footer';
import HeroTorneo from '../componentes/heroTorneo';
import Navbar from '../componentes/navbar';
import { db } from '../firebase';
import {useHistory, useLocation} from 'react-router-dom'

function NoticiaDetalle(){
    const {state} = useLocation()

    return(
        <>
            <Navbar home={false}/>
                <h1>{state.noticia.titulo}</h1>
            <Footer/>
        </>
    )
}

export default NoticiaDetalle;