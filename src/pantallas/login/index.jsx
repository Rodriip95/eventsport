import React from 'react'
import './login.scss'
export default function Login(){
    
    return(
        <div id="admin" class="container-fluid p-0" style={{height: "100vh"}}>
            <div id="fondo"></div>
            <FormLogin/>
        </div>
    )
}

function FormLogin(){
    const handlerLogin = (e) =>{
        e.preventDefault() 
        console.log("Hola Login")
    }
    return(
        <div class="row d-flex justify-content-center text-center align-items-center h-100">
            <main class="form-signin col-12 col-md-8 col-lg-6 col-xl-4 rounded-3">
                <form onSubmit={handlerLogin} class="pt-4">
                    <div class="d-flex justify-content-center">
                        <div class="logo">
                            <p class="event3">EVENT</p>
                            <p class="event2">SPORT</p>
                        </div>
                    </div>
                    <h1 class="h3 mb-3">Bienvenido Admin</h1>

                    <div class="form-floating">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Ingresar Mail</label>
                    </div>
                    <div class="form-floating mt-1">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Contraseña</label>
                    </div>

                    <div class="checkbox my-2">
                        <input id="remem" type="checkbox" value="remember-me"/>
                        <label for="remem">Recordar seccion</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-warning btnlogin" type="submit">Iniciar sección</button>
                    <button class="w-50 btn btn-light btnlogin mt-2 border">Cancelar</button>
                    <p class="mt-5 mb-3 text-muted">© Devrops–2021</p>
                </form>
            </main>
        </div>
    )
}