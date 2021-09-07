import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import {db} from '../../../firebase'

export default function DashHome({activo}){
    const [categoria, setCat] = useState("")

    const handlerSelect = (seleccion) => {
        setCat( seleccion )
    }

    let classelect = "btn btn-lg btn-primary w-25"
    let clasnoselect = "btn btn-lg btn-outline-primary w-25"


    return(
        <>
            <h1 class="px-2">Jugadores</h1>
            <hr class="w-50"/>
            <div className="d-flex justify-content-around">
                <button onClick={()=> handlerSelect("libres")} className={categoria == "libres" ? classelect : clasnoselect}>Libres</button>
                <button onClick={()=> handlerSelect("maxi")} className={categoria == "maxi" ? classelect : clasnoselect}>Maxi +35</button>
                <button onClick={()=> handlerSelect("veteranos")} className={categoria == "veteranos" ? classelect : clasnoselect}>Veteranos +40</button>
            </div>

            {categoria == "libres" && <ListPlayers categoria={"libres"} />}
            {categoria == "maxi" && <ListPlayers categoria={"maxi"} />}
            {categoria == "veteranos" && <ListPlayers categoria={"veteranos"} />}

        </>
    )
}

function ListPlayers({categoria}) {
    
}

