import React from 'react'
import { useHistory } from 'react-router'
import "./check.scss"
export default function Check(){
    const navigation = useHistory()
    return(
        <div id="check" className="container-fluid text-center mb-5 py-5 d-flex align-items-center justify-content-center">
            <div>
                <h1>Participa del torneo con tu equipo</h1>
                <button onClick={()=>navigation.push("/registro")} className="btn btn-light">Inscribirse</button>
            </div>
        </div>
    )
}