import "./hero.scss"
import React, { useEffect, useState } from 'react'
import { db } from "../../firebase"

export default function TableTorneo({categoria}){
    const [historial, setHistorial] = useState([])

    const [equipos, setEquipos] = useState([])
    const [zone, setZone] = useState("A")

    useEffect(()=>{
        getCategoria(categoria)
    },[zone])

    const getCategoria = async(cat) => {
        let nuevoArr = []
        await db.collection(`${cat}_table`).where("zona", "==", zone).orderBy("P", "desc").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            })
            // setCargando(false)
        })
        .catch(err => console.log("Historial Table"))
        setEquipos(nuevoArr)
        getHistorial(categoria)

    }

    const getHistorial = async(categoria) =>{
        console.log("Esperando historial...")
        let nuevoArr = []
        await db.collection(`${categoria}_historial`)
        .where("zona", "==", zone)
        .orderBy("fecha", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            });
        })
        .catch(err => console.log(err))
        setHistorial(nuevoArr)
    }

    const handlerZone = (e) => {
        setZone(e.target.value)
    }

    return(
        <div className="container">
            <div className="d-flex align-items-center mt-3 mb-2">
                <h1 className="title-table m-0 p-0">Tabla de posiciones:</h1>
                <select style={{width: "120px"}} class="form-select" onChange={handlerZone} aria-label="Default select example">
                    <option value="A">Zona "A"</option>
                    <option value="B">Zona "B"</option>
                    <option value="C">Zona "C"</option>
                </select>
            </div>
            <div className="d-flex justify-content-between table-head-home bg-dark">
                <p className="table-p-name">Nombre</p>
                <p className="table-p">PJ</p>
                <p className="table-p">PG</p>
                <p className="table-p">PP</p>
                <p className="table-p">TT</p>
                <p className="table-p">Puntos</p>
            </div>
            {equipos.map(eq => (
                <div key={eq.id} className="d-flex justify-content-between table-head-home">
                <p>{eq.name}</p>
                <p>{eq.PJ}</p>
                <p>{eq.PG}</p>
                <p>{eq.PP}</p>
                <p>{eq.TT}</p>
                <p>{eq.P}</p>
            </div>
            ))}

            <div>
                <h1 className="title-table mt-3">Historial de Partidos:</h1>
            </div>
            <div>
                {historial.length > 0 ? 
                    <>
                        {historial.map( his => (
                            <div key={his.id} className="table-historial mx-auto my-3 border rounded-3">
                            <div className="his-fecha text-center">
                                <p>{his.fecha}</p>
                            </div>
                            <div className="d-flex justify-content-between his-data">
                                <p>{his.ganador}</p>
                                <p>{parseInt(his.puntosA) > parseInt(his.puntosB) ? parseInt(his.puntosA) : parseInt(his.puntosB)}</p>
                                <p>{"-"}</p>
                                <p>{parseInt(his.puntosA) < parseInt(his.puntosB) ? parseInt(his.puntosA) : parseInt(his.puntosB)}</p>
                                <p>{his.perdedor}</p>
                            </div>
                            </div>
                        ))}
                    </>
                    :
                    <div className="text-center">
                        <h5 className="text-secondary mt-3">Sin historial de partidos...</h5>
                    </div>
             }
            </div>
        </div>
    )
}