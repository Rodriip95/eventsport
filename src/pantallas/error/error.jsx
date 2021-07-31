import React from "react";
import { useLocation } from "react-router";
import Footer from "../../componentes/footer";
import Navbar from "../../componentes/navbar";
import imgError from "./404.svg"
export default function NoMatch() {
    let location = useLocation();
  
    return (
        <>
        <Navbar/>
        <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-xl-6">
                <h3 className="text-center">
                Not Found 404!
                </h3>
                <img className="text-center w-100 h-100" src={imgError} alt="404" />
            </div>
        </div>
        <Footer/>
        </>
    );
  }