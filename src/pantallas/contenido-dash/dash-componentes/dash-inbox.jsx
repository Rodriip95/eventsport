import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import {db} from '../../../firebase'
import "../cont-dash.scss"


export default function DashInbox({activo}){

    const [inscripciones, setInscripciones] = useState([])
    const [contactos, setContactos] = useState([])

    const [actual, setActual] = useState("")

    useEffect(()=>{
        getInscrip()
        getContactos()
    },[])

    const getInscrip = () => {
        let nuevoArr = []
        db.collection("inbox").where("comentario", "==", false).get()
        .then( querySnapshot => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            })
        })
        setInscripciones(nuevoArr)
    }

    const getContactos = () => {
        let nuevoArr = []
        db.collection("inbox").where("comentario", "==", true).get()
        .then( querySnapshot => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            })
        })
        setContactos(nuevoArr)
    }


    return(
        <>
            <h1>{activo.toUpperCase()}</h1>
            <div className="d-flex justify-content-between">
                <button onClick={()=>setActual("inscripciones")} className="btn btn-lg mx-1 w-100 btn-outline-primary">Inscripciones</button>
                <button onClick={()=>setActual("contactos")} className="btn btn-lg mx-1 w-100 btn-outline-primary">Contactos</button>
            </div>

            {actual === "inscripciones" && <MapInscripciones arr={inscripciones}/>}
            {actual === "contactos" && <MapContactos arr={contactos}/>}
        </>
    )
}

function MapInscripciones({arr}) {
    return(
        <div>
            {arr.map( obj => (
                <div key={obj.id} className="border">
                    <p className="m-0 p-0">{obj.fecha}</p>
                    <p className="m-0 p-0">{obj.name}</p>
                    <p className="m-0 p-0">{obj.capitan}</p>
                    <p className="m-0 p-0">{obj.mail}</p>
                    <p className="m-0 p-0">{obj.tel}</p>
                    <p className="m-0 p-0">{obj.categoria}</p>
                    <p className="m-0 p-0">{obj.location}</p>
                    <p className="m-0 p-0">{obj.description}</p>
                    <p className="m-0 p-0">{obj.estuvieron}</p>
                </div>
            ))}
        </div>
    )
}

function MapContactos({arr}) {
    return(
        <div>
            {arr.map( obj => (
                <div>
                    <p>{obj.nombre}</p>
                </div>
            ))}
        </div>
    )
}