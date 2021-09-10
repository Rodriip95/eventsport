import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { auth } from '../../firebase'
import 'firebase/auth';

import './login.scss'
export default function Login(props){
    
    return(
        <div id="admin" class="container-fluid p-0" style={{height: "100vh"}}>
            <div id="fondo"></div>
            <FormLogin ApphandlerLogin={props.handlerLogin} handlerLogout={props.handlerLogout}/>
        </div>
    )
}

function FormLogin({ApphandlerLogin , handlerLogout}){

    const [log, setLog] = useState({
        mail: "",
        pass: ""
    })
    const [success, setSuc] = useState("")

    const navigation = useHistory()

    const handlerRead = (e) =>{
        setLog({...log, [e.target.name] : e.target.value})
    }

    const handlerLogin = (e) =>{
        e.preventDefault()
        setSuc("load")

        auth.signInWithEmailAndPassword(log.mail, log.pass)
        .then((userCredential) => {
          // Signed in
          setSuc("ok")
          var user = userCredential.user;
          var uid = user.uid;
          ApphandlerLogin(uid)
          navigation.push("/admin/dashboard")
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setSuc("error")
          console.log(errorCode)
          console.log(errorMessage)
        });
        
        // navigation.push("/admin/dashboard")
    }

    const cancelLogin = () => {
        handlerLogout()
        navigation.push("/")
    }

    return(
        <div class="row d-flex justify-content-center text-center align-items-center h-100">
            <main class="form-signin col-11 col-md-8 col-lg-6 col-xl-4 rounded-3">
                <form onSubmit={handlerLogin} class="pt-4">
                    <div class="d-flex justify-content-center">
                        <div class="logoLog">
                            <p class="event3">EVENT</p>
                            <p class="event2">SPORT</p>
                        </div>
                    </div>
                    <h1 class="h3 mb-3">Bienvenido Admin</h1>

                    <div class="form-floating">
                        <input type="email" name="mail" onChange={handlerRead} class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Ingresar Mail</label>
                    </div>
                    <div class="form-floating mt-1">
                        <input type="password" name="pass" onChange={handlerRead} security={true} class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Contraseña</label>
                    </div>

                    <div class="checkbox my-2">
                        {success === "error" && 
                            <div class="alert alert-danger" role="alert">
                                Mail o Contraseña incorrecta
                            </div>
                        }

                        {success === "ok" && 
                            <div class="alert alert-primary" role="alert">
                                Ingresando...
                            </div>
                        }
                    </div>
                    <button class="w-100 btn btn-lg btn-warning btnlogin" type="submit">
                        {success === "load" ? 
                            <div className="d-flex justify-content-center">
                                <div class="spinner-border text-dark" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                            :
                            "Iniciar sesión"
                        }
                    </button>
                    <button onClick={cancelLogin} class="w-50 btn btn-light btnlogin mt-2 border">Cancelar</button>
                    <p class="mt-5 mb-3 text-muted">© Devrops–2021</p>
                </form>
            </main>
        </div>
    )
}