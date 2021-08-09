import React, { useState } from 'react'
import Dashboard from './dashboard/index.jsx'
import ContenidoDash from './contenido-dash/index.jsx'

export default function DashboardMenu(){
    const [activo, setActivo] = useState("home")

    const handlerClickOption = ( opt ) => {
        setActivo(opt)
    }
    return(
        <>
            <div className="d-flex justify-content-between">
                <Dashboard activo={activo} handlerClickOption={handlerClickOption}/>
                <ContenidoDash activo={activo}/>
            </div>
        </>
    )
}