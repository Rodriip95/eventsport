import React,{ useEffect , useState } from 'react'
import firebase from 'firebase'
import "./album.scss"
import { useHistory } from 'react-router'

export default function ItemAlbum( {noti} ){
    const [noticia, setNoticia] = useState(noti)

    useEffect(()=>{
      if(!noti.imagelink){
          getStorage(noti.id)
      }
    },[])

    const getStorage = (id) => {
      const storageRef = firebase.storage().ref(`/news/${id}`)
      storageRef.getDownloadURL().then((res)=>{
        setNoticia({...noticia, imagelink: res})
      })
      .catch(err => console.log(err))
    }

    const navigation = useHistory()

    const handlerPushNew = () => {
      navigation.push(`/new/${noticia.id}`, {noticia})
    }

    return(
        <div class="col">
            <div class="card shadow-sm">
              
              <div class="img-fondo" style={{backgroundImage: `url('${noticia.imagelink}')`}}>
              </div>

              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">{noti.titulo}</h5>
                  <p class="card-text">
                    {noti.description.length > 120 ? noti.description.slice(0, 120) + "..." : noti.description}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                      onClick={handlerPushNew}
                    >
                      Ver Post
                    </button>
                  </div>
                  <small class="text-muted">{noti.fecha}</small>
                </div>
              </div>
            </div>
          </div>
    )
}