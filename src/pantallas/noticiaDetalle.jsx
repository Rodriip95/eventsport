import React from 'react'
import Footer from '../componentes/footer';
import Navbar from '../componentes/navbar';
import { useLocation , useHistory } from 'react-router-dom'
import './screens.scss'

function NoticiaDetalle(){
    const {state} = useLocation()
    const navigation = useHistory()

    return(
        <>
            <Navbar home={false}/>
            <div className="container new-detail text-center">
                <img className="rounded" src={state.noticia.imagelink} alt={state.noticia.titulo}/>
                <h1>{state.noticia.titulo}</h1>
                <p>{state.noticia.description}</p>
                <button className="btn btn-warning mt-3" onClick={()=>navigation.goBack()}>Volver</button>
            </div>
            <Footer/>
        </>
    )
}

export default NoticiaDetalle;