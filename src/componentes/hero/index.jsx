import React from 'react';
import { useHistory } from 'react-router-dom';
import "./hero.scss"
export default function Hero(){

    const navigation = useHistory()

    const goAbout = () => {
        navigation.push("/about")
    }
    return(
        <div class="container">
            <div class="row flex-lg-row align-items-center g-5 pb-5">
    
                <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-1 mb-3">Torneo de Basquet Amateur</h1>
                <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate dignissimos maiores mollitia minima commodi, dolore exercitationem aliquam aut, deleniti veniam libero tempora totam suscipit excepturi reiciendis odit impedit? Doloribus, molestias.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 btn-hero">Unirme</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4" onClick={goAbout}>Mas Info</button>
                    </div>
                </div>

                <div class="col-12 col-lg-6 d-flex justify-content-center">
                    
                    <img src="https://images.unsplash.com/photo-1615204318936-5fb910ff2de3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" height="500" loading="lazy"/>
                    
                </div>
                
            </div>
        </div>
    )
};

