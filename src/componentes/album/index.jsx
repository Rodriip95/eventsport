import React from "react";
import ItemAlbum from "./item-album";
import "./album.scss"

export default function Album() {
  return (
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        
            <ItemAlbum/>
            <ItemAlbum/>
            <ItemAlbum/>
          
        </div>
      </div>
    </div>
  );
}
