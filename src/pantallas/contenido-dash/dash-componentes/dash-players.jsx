import React, { useEffect, useState } from 'react'
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
                <button onClick={()=> handlerSelect("libres")} className={categoria === "libres" ? classelect : clasnoselect}>Libres</button>
                <button onClick={()=> handlerSelect("maxi")} className={categoria === "maxi" ? classelect : clasnoselect}>Maxi +35</button>
                <button onClick={()=> handlerSelect("veteranos")} className={categoria === "veteranos" ? classelect : clasnoselect}>Veteranos +40</button>
            </div>

            {categoria === "libres" && <ListPlayers categoria={"libres"} />}
            {categoria === "maxi" && <ListPlayers categoria={"maxi"} />}
            {categoria === "veteranos" && <ListPlayers categoria={"veteranos"} />}

        </>
    )
}

function ListPlayers({categoria}) {
    const [jugadores, setJugadores] = useState([])
    const [jugadoresFiltrados, setJugadoresFiltrado] = useState([])
    const [load, setLoad] = useState(false)
    const [filtro, setFiltro] = useState([])

    useEffect(()=>{
        getPlayers(categoria)
        getEquipos(categoria)
    },[categoria])

    const getPlayers = (categoria) =>{
        let lista = []
        setLoad(true)

        db.collection("jugadores").where("categoria", "==", categoria).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let res = doc.data()
                res.id = doc.id
                lista.push( res )
            });
            setLoad(false)

        })
        .catch((error) => {
            console.log("Error al borrar tabla: ", error);
        });
        setJugadores(lista)
        setJugadoresFiltrado(lista)
    }

    const getEquipos = async(categoria) => {
        let nuevoArr= []
        await db.collection(categoria).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                nuevoArr.push( res.equipo )
            });
        });
        setFiltro(nuevoArr)
    }

    const applyFilter = (e) => {
        console.log(e.target.value)
        if(e.target.value != "Mostrar todos los equipos"){
            let filtrado = jugadores.filter( eq => eq.equipo === e.target.value)
            setJugadoresFiltrado(filtrado)
        } else {
            setJugadoresFiltrado(jugadores)
        }
    }

    return(
        <div className="container mt-3">
            <h2 className="text-center">{categoria.toUpperCase()}</h2>
            {load ?
                <div className="d-flex justify-content-center">
                    <div class="spinner-border text-warning" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            :
                <>
                    {jugadores.length > 0 ? 
                        <>
                        <h4>Listado:</h4>
                        {filtro.length > 0 &&
                            <div className="mb-2">
                            <select class="form-select" onChange={applyFilter} aria-label="Default select example">
                                <option selected>Mostrar todos los equipos</option>
                                {filtro.map( f => (
                                    <option key={f} value={f}>{f}</option>
                                    ))}
                            </select>
                            </div>
                        }
                        <div className="row">
                            {jugadoresFiltrados.map( j => (
                                <div className="col-12 col-lg-6 mb-2" key={j.dni}>
                                    <div className="border d-flex justify-content-between p-1 rounded">
                                        <p className="p-0 m-0 w-100">{j.name}</p>
                                        <p className="p-0 m-0 w-50">{j.dni}</p>
                                        <p className="p-0 m-0 w-100" style={{textAlign: 'end'}}>{j.equipo}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    <div className="text-center text-secondary">
                        <p>No hay jugadores</p>
                    </div>
                    }
                </>
            }
        </div>
    )
}

