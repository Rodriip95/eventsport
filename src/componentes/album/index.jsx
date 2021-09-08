import React, { useEffect, useState } from "react";
import ItemAlbum from "./item-album";
import "./album.scss"
import { db } from "../../firebase";

export default function Album() {

  const [noticias, setNoticias] = useState([])
  const [cargando, setCargando] = useState(false)
  const [pag, setPag] = useState(1)

  const newsCollection = () => {
    setCargando(true)

    let nuevoArr = []
    db.collection("news").orderBy("fecha", "desc").get().then((querySnapshot) => {
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
        <h2 id="noticias" class="pb-2 mb-4 border-bottom">Noticias</h2>
        {cargando ? 
          <div class="py-4 d-flex justify-content-center">
            <div class="spinner-grow text-warning" style={{width: "3rem", height: "3rem"}} role="status"/>
          </div>
        :
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            {noticias.map(( noti, i) =>
               {
                if( i<(pag * 6) && i>=((pag-1)*6)){
                  return(
                    <ItemAlbum key={noti.id} noti={noti}/>
                  )
                }
              }
              )}
          </div>
          }
          <div className="mt-3 d-flex justify-content-center">
            
              <ul class="pagination">
                <li class="page-item">
                  <span class="page-link">Anterior</span>
                </li>
                <li class="page-item">
                  <span class="page-link">{pag}</span>
                </li>
                <li class="page-item">
                  <span class="page-link">Siguiente</span>
                </li>
              </ul>
            
          </div>
      </div>
    </div>
  );
}
