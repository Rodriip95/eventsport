import React from "react";
import CardCat from "./card-categoria";

export default function Torneos() {
  return (
    <div class="container px-4 py-5" id="custom-cards">
      <h2 class="pb-2 border-bottom">Categorias</h2>

      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        
        <CardCat/>
        <CardCat/>
        <CardCat/>

      </div>
    </div>
  );
}
