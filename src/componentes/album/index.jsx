import React, { useEffect, useState } from "react";
import ItemAlbum from "./item-album";
import "./album.scss"
import { db } from "../../firebase";

export default function Album() {

  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(false)

  const newsCollection = () => {
    setCargando(true)

    let nuevoArr = []
    db.collection("news").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let res = doc.data()
            res.id = doc.id
            nuevoArr.push( res )
        });
        setCargando(false)
    });
    setNoticias(nuevoArr)
  }

  useEffect(()=>{
    newsCollection()
  },[])

  return (
    <div class="album py-5 bg-light">
      <div class="container">
        {cargando ? 
          <div class="py-4 d-flex justify-content-center">
            <div class="spinner-grow text-warning" style={{width: "3rem", height: "3rem"}} role="status"/>
          </div>
        :
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {noticias.map( noti => (
              <ItemAlbum key={noti.id} noti={noti}/>
              ))}
          </div>
          }
      </div>
    </div>
  );
}
