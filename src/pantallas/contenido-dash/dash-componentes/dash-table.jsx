import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import {db} from '../../../firebase'
import "../cont-dash.scss"


export default function DashTable({activo}){
    const [categoria, setCat] = useState("")

    const handlerSelect = (seleccion) => {
        setCat( seleccion )
    }

    let classelect = "btn btn-lg btn-primary w-25"
    let clasnoselect = "btn btn-lg btn-outline-primary w-25"


    return(
        <>
            <h1 class="px-2">Tabla de posiciones</h1>
            <hr class="w-50"/>
            <div className="d-flex justify-content-around">
                <button onClick={()=> handlerSelect("libres")} className={categoria == "libres" ? classelect : clasnoselect}>Libres</button>
                <button onClick={()=> handlerSelect("maxi")} className={categoria == "maxi" ? classelect : clasnoselect}>Maxi +35</button>
                <button onClick={()=> handlerSelect("veteranos")} className={categoria == "veteranos" ? classelect : clasnoselect}>Veteranos +40</button>
            </div>

            {
                categoria.length > 0 && <TablaPosiciones categoria={categoria} />
            }
        </>
    )
}

function TablaPosiciones({categoria}){
    const [equipos, setEquipos] = useState([])
    const [load, setLoad] = useState(false)

    const [result, setResult] = useState({
        equipoA: "",
        equipoB: "",
        puntosA: 0,
        puntosB: 0,
        ganador: "",
        perdedor: ""
    })

    useEffect(()=>{
        getTable(categoria)
    },[categoria, equipos])

    const getTable = (cat) => {
        let nuevoArr = []
        db.collection(`${cat}_table`).orderBy("P", "desc")
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            })
            setEquipos(nuevoArr)
        })
    }

    const subirResultado = () => {
        if(
            result.equipoA != "" &&
            result.equipoB != "" &&
            result.puntosA != 0 &&
            result.puntosB != 0 
        ){
            setLoad(true)
            let ganador = result.puntosA > result.puntosB ? result.equipoA : result.equipoB
            let perdedor = result.puntosA > result.puntosB ? result.equipoB : result.equipoA
            
            let ganadorTT = result.puntosA > result.puntosB ? result.puntosA : result.puntosB
            let perdedorTT = result.puntosA > result.puntosB ? result.puntosB : result.puntosA
            
            updateTabla( ganador,perdedor, parseInt(ganadorTT), parseInt(perdedorTT))
            setEquipos([])
        }
    }

    const updateTabla = ( ganador, perdedor , ganadorTT , perdedorTT ) =>{
        let ganadorName, perdedorName = ""

        db.collection(`${categoria}_table`).doc(ganador).get()
        .then((doc) => doc.exists ? doc.data() : console.log("Equipo no encontrado"))
        .then( res => {
            console.log(res)
            ganadorName = res.name
            db.collection(`${categoria}_table`).doc(ganador).update({
                P: res.P + 2,
                PJ: res.PJ + 1,
                PG: res.PG + 1 ,
                PP: res.PP,
                TT: res.TT + ganadorTT
            })
            .then(() => {
                db.collection(`${categoria}_table`).doc(perdedor).get()
                .then((doc) => doc.exists ? doc.data() : console.log("Equipo no encontrado"))
                .then( per => {
                    console.log(per)
                    perdedorName = per.name
                    db.collection(`${categoria}_table`).doc(perdedor).update({
                        P: per.P + 1,
                        PJ: per.PJ + 1,
                        PG: per.PG ,
                        PP: per.PP + 1,
                        TT: per.TT + perdedorTT
                    })
                })
                .then(()=> {
                    tableHistorial(ganadorName, perdedorName)
                })
            })
        })
        .catch( er => console.log(er.message))
    }

    const tableHistorial = (ganadorName , perdedorName) => {
        db.collection(`${categoria}_historial`).add(
            {...result, 
                ganador: ganadorName, 
                perdedor: perdedorName
            }
            )
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setLoad(false)
            cancelResultado()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setLoad(false)
            cancelResultado()
        });
    }

    const cancelResultado = () => {
        setResult({
            equipoA: "",
            equipoB: "",
            puntosA: 0,
            puntosB: 0,
            ganador: "",
            perdedor: ""
        })
    }

    const onChangeInput = (e) => {
        console.log(e.target.value)
        setResult({...result, [e.target.name]: e.target.value})
    }

    const onChangeSelect = (e) => {
        console.log(e.target.value)
        setResult({...result, [e.target.name]: e.target.value})
    }

    return(
        <>
        <div className="mt-5 border pb-3 rounded">
            <div className="text-center mb-2 d-flex justify-content-between px-4">
                <h1>{categoria.toUpperCase()}</h1>
                <button class="btn btn-primary h-50 mt-2" data-bs-toggle="modal" data-bs-target="#addNewGame">
                    <span>{"Nuevo Partido "}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>
            </div>
            {
                equipos.length > 0 ?
                <>
                    <div className="container">
                        <div className="d-flex justify-content-between bg-dark text-white">
                            <div className="table-name border text-center">
                                <span>Nombre</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>PJ</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>PG</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>PP</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>Total</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>Puntos</span>
                            </div>
                        </div>
                    </div>
                    {equipos.map( e => (
                        <div className="d-flex justify-content-between container">
                            <div className="table-name border text-start">
                                <span className="mx-2">{e.name}</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>{e.PJ}</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>{e.PG}</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>{e.PP}</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>{e.TT}</span>
                            </div>
                            <div className="table-head border text-center">
                                <span>{e.P}</span>
                            </div>
                        </div>
                    ))}
                </>
                : 
                <div className="d-flex justify-content-center">
                    <div class="spinner-border text-warning" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            }
        </div>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="addNewGame" tabindex="-1" aria-labelledby="addNewGameLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewGameLabel">Nuevo Partido: {categoria}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="w-100 text-center">
                            <label for="equipoA">Equipo A:</label>
                            <select name="equipoA" id="equipoA" value={result.equipoA} onChange={onChangeSelect}>
                                <option value={null}>Seleccione equipo</option>
                                {equipos.map( eq => (
                                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                                ))}
                            </select>
                            <div className="d-flex justify-content-center">
                                <input className="form-control mt-2 w-50" name="puntosA" type="number" value={result.puntosA} placeholder="Puntos A..." onChange={onChangeInput}/>
                            </div>
                        </div>
                        <div>
                            <h1>VS.</h1>
                        </div>
                        <div className="w-100 text-center">
                            <label for="equipoB">Equipo B:</label>
                            <select name="equipoB" id="equipoB" value={result.equipoB} onChange={onChangeSelect}>
                                <option value={null}>Seleccione equipo</option>
                                {equipos.map( eq => (
                                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                                ))}
                            </select>
                            <div className="d-flex justify-content-center">
                                <input className="form-control mt-2 w-50" name="puntosB" type="number" value={result.puntosB} placeholder="Puntos B..." onChange={onChangeInput}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={cancelResultado}>Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={subirResultado}>
                        {!load ?
                        "Subir Resultado"
                        :
                        <div class="spinner-border  text-warning" role="status">
                            <span class="sr-only"></span>
                        </div>
                        }
                    </button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}