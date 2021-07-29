import React from 'react'
import "./album.scss"
export default function ItemAlbum(){

    let styleAlbum = {
      backgroundImage: "url('https://images.unsplash.com/photo-1615204318936-5fb910ff2de3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')",      
    }
    return(
        <div class="col">
            <div class="card shadow-sm">
              
              <div class="img-fondo" style={styleAlbum}>
              </div>

              <div class="card-body">
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger"
                    >
                      Ver Post
                    </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
    )
}