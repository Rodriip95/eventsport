import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../componentes/footer';
import Navbar from '../componentes/navbar';
import { db } from '../firebase';

function TorneoDetalle(){
    let {categoria} = useParams()

    const [equipos, setEquipos] = useState([])

    useEffect(()=>{
        getCategoria(categoria)
    },[])

    const getCategoria = async(cat) => {
        let nuevoArr = []
        await db.collection(`${cat}_table`).orderBy("P", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            });
            // setCargando(false)
        });
        setEquipos(nuevoArr)
    }

    return(
        <>
            <Navbar/>
            {console.log(equipos)}
            <h1>{equipos.length}</h1>
            <Footer/>
        </>
    )
}

export default TorneoDetalle;