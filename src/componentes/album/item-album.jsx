import React from 'react'
import "./album.scss"

export default function ItemAlbum( {noti} ){

    let styleAlbum = {
      backgroundImage: `url('${noti.image}')`     
    }
    return(
        <div class="col">
            <div class="card shadow-sm">
              
              <div class="img-fondo" style={styleAlbum}>
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