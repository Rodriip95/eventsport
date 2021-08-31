import React from "react";
import CardCat from "./card-categoria";

export default function Torneos() {

  let libres = "https://images.unsplash.com/photo-1591498237542-1974148f6f02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=463&q=80"
  let maxi = "https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  let veteranos = "https://images.pexels.com/photos/6292444/pexels-photo-6292444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

  let libre_titulo = "Categoria Libre, todas las edades"
  let maxi_titulo = "Categoria Maxi, desde los 35 años"
  let veteran_titulo = "Categoria Veteranos, de los 40 años en adelante"


  return (
    <div class="container px-4 py-5" id="custom-cards">
      <h2 class="pb-2 border-bottom">Categorias</h2>

      <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        
        <CardCat foto={libres} titulo={libre_titulo} categoria="libres"/>
        <CardCat foto={maxi} titulo={maxi_titulo} categoria="maxi"/>
        <CardCat foto={veteranos} titulo={veteran_titulo} categoria="veteranos"/>

      </div>
    </div>
  );
}
