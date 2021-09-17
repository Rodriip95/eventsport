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

    const getInscrip = async() => {
        let nuevoArr = []
        await db.collection("inbox").where("comentario", "==", false).get()
        .then( querySnapshot => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            })
        })
        setInscripciones(nuevoArr)
    }

    const getContactos = async() => {
        let nuevoArr = []
        await db.collection("inbox").where("comentario", "==", true).get()
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
                <div key={obj.id} className="border rounded my-2">
                    <p className="my-0 mx-2 p-0 text-end">{obj.fecha}</p>
                    <div className="d-flex justify-content-between">
                        <p className="my-0 mx-2 p-0">Equipo: {obj.name}</p>
                        <p className="my-0 mx-2 p-0">Capitan: {obj.capitan}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-0 mx-2 p-0">Categoria: {obj.categoria}</p>
                        <p className="my-0 mx-2 p-0">Localidad: {obj.location}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-0 mx-2 p-0">Mail: {obj.mail}</p>
                        <p className="my-0 mx-2 p-0">Tel: {obj.tel}</p>
                    </div>
                    <div className="border rounded m-2">
                    <p className="m-0 p-2">{obj.description}</p>
                    </div>
                    <p className="mb-2 mx-2 p-0">Ya jugaron en el torneo? {obj.estuvieron.toUpperCase()}</p>
                </div>
            ))}
        </div>
    )
}

function MapContactos({arr}) {
    return(
        <div>
            {arr.map( obj => (
                <div key={obj.id} className="border rounded my-2">
                    <p className="my-0 mx-2 p-0 text-end">{obj.fecha}</p>
                    <div className="d-flex justify-content-between">
                        <p className="my-0 mx-2 p-0">{obj.nombre}</p>
                        <p className="my-0 mx-2 p-0">{obj.email}</p>
                    </div>
                    <div className="border rounded m-2">
                        <p className="m-0 p-2">{obj.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}