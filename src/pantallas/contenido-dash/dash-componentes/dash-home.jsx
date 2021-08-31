import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import {db} from '../../../firebase'

export default function DashHome({activo}){
    const [categoria, setCat] = useState("")

    const handlerSelect = (seleccion) => {
        setCat( seleccion )
    }

    let classelect = "btn btn-lg btn-primary w-25"
    let clasnoselect = "btn btn-lg btn-outline-primary w-25"


    return(
        <>
            <h1 class="px-2">Categorias</h1>
            <hr class="w-50"/>
            <div className="d-flex justify-content-around">
                <button onClick={()=> handlerSelect("libres")} className={categoria == "libres" ? classelect : clasnoselect}>Libres</button>
                <button onClick={()=> handlerSelect("maxi")} className={categoria == "maxi" ? classelect : clasnoselect}>Maxi +35</button>
                <button onClick={()=> handlerSelect("veteranos")} className={categoria == "veteranos" ? classelect : clasnoselect}>Veteranos +40</button>
            </div>

            {categoria == "libres" && <DetalleCategoria categoria={"libres"} />}
            {categoria == "maxi" && <DetalleCategoria categoria={"maxi"} />}
            {categoria == "veteranos" && <DetalleCategoria categoria={"veteranos"} />}

        </>
    )
}

function DetalleCategoria({categoria}){

    const [equipo, setEquipo] = useState("")
    
    const [cargando, setCargando] = useState(false)


    const handlerAddTeam = () => {
        console.log("Procesando Equipo...")
        setCargando(true)
        let t = firebase.firestore.Timestamp.fromDate(new Date());
        let d = t.toDate().toLocaleDateString();

        db.collection(`${categoria}_table`).add({
            name: equipo,
            PJ: 0,
            PG: 0, 
            PP: 0,
            TT: 0,
            P: 0   
        })
        .then((docRef) => {
            console.log("New register on table team ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        db.collection(categoria).add({
                equipo,
                jugadores: listadoAdd,
                createAt: d
            })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            setEquipo("")
            setListado([])
            setCargando(false)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            setEquipo("")
            setListado([])
            setCargando(false)
        });

        teamsCollection()
    }

    const [listadoAdd, setListado] = useState([])
    const [newPlayer, setNewPlayer] = useState({
        name: "",
        dni: ""
    })
    const handlerAddPlayerList = () =>{
        setListado([...listadoAdd, newPlayer])
        setNewPlayer({
            name: "",
            dni: ""
        })
    }

    const removePlayerList=(dni)=>{
        setListado( listadoAdd.filter( player => player.dni !== dni))
    }

    const [listadoEquipos, setListTeams] = useState([])

    const teamsCollection = () => {
        setCargando(true)

        let nuevoArr = []
        db.collection(categoria).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            });
            setCargando(false)
        });
        setListTeams(nuevoArr)
    }

    const refresh = () => teamsCollection()

    useEffect(()=>{
        teamsCollection()
    },[])

    return(
        <>
            <div class="my-3 border rounded">
                <h3 class="text-center mt-3">{categoria.toUpperCase()}</h3>
                <hr class="mx-4"/>
                <div class="d-flex justify-content-between px-1 px-lg-4 m-lg-2">
                    <div>
                        <h4>Listado de equipos</h4>
                    </div>
                    <div>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewTeam">
                        <span>{"Nuevo Equipo "}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="d-flex justify-content-between px-1 px-lg-5 mt-4">
                    <p>Equipo</p>
                    <p>N° Jugadores</p>
                    <p>Acciones</p>
                </div>
                <hr class="mx-4"/>
                
                {
                    cargando ? 
                    <div class="d-flex justify-content-center align-items-center mb-4">
                        <span class="spinner-border text-warning" role="status"></span>
                        <span class="text-warning px-3">Cargando...</span>
                    </div>
                    :
                    listadoEquipos.map( t => (
                        <TeamLine team={t} refresh={refresh} categoria={categoria} key={t.id}/>
                    ))
                }

                {/* Modal Add New Team */}
                <div class="modal fade" id="addNewTeam" tabindex="-1" aria-labelledby="addNewTeamLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addNewTeamLabel">Agregar nuevo Equipo</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="m-0 p-0 p-1">Nombre del equipo:</p>
                            <input value={equipo} onChange={(e)=>setEquipo(e.target.value)} class="form-control" placeholder="Ingrese el nombre..."/>

                            <p class="m-0 p-0 p-1 mt-3">Listado de jugadores: { listadoAdd.length > 0 ? `${listadoAdd.length}/15` : ""}</p>

                            {
                                listadoAdd.map( (jug, index) => (
                                    <div key={index} class="d-flex justify-content-between align-items-center m-1 border rounded p-2">
                                        <span class="w-50">{jug.name}</span>
                                        <span class="w-25">{jug.dni}</span>
                                        <button class="btn btn-danger rounded" onClick={()=>removePlayerList(jug.dni)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            }

                            {
                                listadoAdd.length < 15 ?
                                <div class="d-flex justify-content-between m-1 py-2">
                                    <input value={newPlayer.name} onChange={(e)=>setNewPlayer({...newPlayer, name: e.target.value})} class="form-control" placeholder="Nombre del Jugador..."/>
                                    <input value={newPlayer.dni} onChange={(e)=>setNewPlayer({...newPlayer, dni: e.target.value})} class="form-control mx-1" placeholder="DNI..."/>
                                    <button disabled={ (newPlayer.name !== "" && newPlayer.dni !== "") ? false : true} onClick={handlerAddPlayerList} class="btn btn-success rounded" style={{fontWeight:'bold'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                    </button>
                                </div>
                                :
                                <div>
                                    <p class="m-0 px-1 text-muted">La lista de jugadores no puede superar los 15 jugadores</p>
                                </div>
                            }

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={ (equipo !== "" && listadoAdd.length > 5) ? false : true} data-bs-dismiss="modal" class="btn btn-primary" onClick={handlerAddTeam}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
                {/* End Modal Add New Team */}
            </div>
    
        </>
    )
}

function TeamLine({team, categoria, refresh}){

    const [state, setState] = useState(team)

    const [dele, setDelete] = useState(false)

    const handlerDeleteTeam = () => {
        setDelete(true)
        document.getElementById("cont"+team.id).style.opacity= "0.4"
        db.collection(categoria).doc(team.id).delete().then(() => {
            console.log("Document successfully deleted!");
            refresh()
            setDelete(false)
        }).catch((error) => {
            setDelete(false)
            console.error("Error removing document: ", error);
        });
    }

    const handlerEditNew = () => {
        var editar = db.collection(categoria).doc(team.id);

        editar.update({
            ...team,
            equipo: state.equipo
        })
        .then(() => {
            console.log("Document successfully updated!");
            refresh()
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    return(
        <>
            <div id={"cont"+team.id} class="border rounded d-flex justify-content-between mx-1 mx-lg-4 p-2 align-items-center mb-2 position-relative">
                {dele && <div class="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                    <span class="spinner-border text-danger" role="status"></span>
                </div>}
                <div className="w-25">
                    <span>{team.equipo}</span>
                </div>
                <div class="text-center w-25 ">
                    <span>{team.jugadores.length}</span>
                </div>
                <div class="text-end">
                    <button class="btn btn-warning mx-1" data-bs-toggle="modal" data-bs-target={`#team${team.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                        </svg>
                    </button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${team.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </button>
                    <button class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target={`#delete${team.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/*  */}
            <ListadoPlayerEdit categoria={categoria} refresh={refresh} data={team}/>

            {/* Edit Start */}
            <div class="modal fade" id={team.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detalles del Equipo: {`${state.equipo}`}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input class="form-control" type="text" value={state.equipo} onChange={(e)=>setState({...state, equipo: e.target.value})} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-bs-dismiss="modal" onClick={handlerEditNew}
                            disabled={ state.equipo !== team.equipo ? false : true}
                        >Editar</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Edit Finish */}
            
            {/* Delete Start */}
            <div class="modal fade" id={"delete"+team.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Eliminar Equipo: {`${team.id}`}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Estas seguro que deseas eliminar este equipo?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" 
                            class="btn btn-danger" 
                            data-bs-dismiss="modal" onClick={handlerDeleteTeam}
                        >Eliminar</button>
                    </div>
                    </div>  
                </div>
            </div>
            {/* Delete Finish */}
        </>
    )
}

function ListadoPlayerEdit({data, categoria, refresh}){
    const [arrPlayers, setArr] = useState(data.jugadores)
    const [aux, setAux] = useState(data.jugadores)

    const [nuevo, setnuevo] = useState({
        name:"",
        dni:""
    })

     const removeArr = ( p ) => {
         setArr(arrPlayers.filter( v => v.dni != p.dni))
     }

     const alterArr = ( p ) => {
         setArr( arrPlayers.concat(p))
     }

     const handlerAddNewPlayer = () => {
        setArr( arrPlayers.concat(nuevo))
        setAux( aux.concat(nuevo))

        setnuevo({
            name:"",
            dni:""
        })
     }

     const handlerEditPlayer =()=>{
        console.log(arrPlayers.length)
        var editar = db.collection(categoria).doc(data.id);

        editar.update({
            ...data,
            jugadores: arrPlayers
        })
        .then(() => {
            console.log("Document successfully updated!");
            refresh()
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }
    return(
        <>
            {/* Players Start */}
            <div class="modal fade" id={"team"+data.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Jugadores: {`${data.equipo}`}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <span>Agregar nuevo jugador</span>
                        <div class="d-flex justify-content-between m-1 py-2">
                            <input value={nuevo.name} onChange={(e)=>setnuevo({...nuevo, name: e.target.value})} class="form-control" placeholder="Nombre del Jugador..."/>
                            <input value={nuevo.dni} onChange={(e)=>setnuevo({...nuevo, dni: e.target.value})} class="form-control mx-1" placeholder="DNI..."/>
                            <button disabled={ (nuevo.name !== "" && nuevo.dni !== "") ? false : true} onClick={handlerAddNewPlayer} class="btn btn-success rounded" style={{fontWeight:'bold'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                        </div>
                        {aux.map( (player, index) => (
                            <JugadorList key={index} jugador={player} removeArr={removeArr} alterArr={alterArr}/>
                        ))}
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-bs-dismiss="modal" onClick={handlerEditPlayer}
                        >Terminar</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Players Finish */}
        </>
    )
}

function JugadorList({jugador, alterArr, removeArr}){
    const [active, setActive] = useState(true)
    
    const handlerInactivePlayer = ( obj ) =>{
        if(active){
            document.getElementById(jugador.dni).style.textDecoration = "line-through wavy red 4px"
            setActive(!active)
            removeArr(obj)
        } else {
            document.getElementById(jugador.dni).style.textDecoration = "none"
            setActive(!active)
            alterArr(obj)
        }
    }
    return(
        <div class="border rounded mb-2 p-2 d-flex justify-content-between">
            <p id={jugador.dni} class="m-0 px-1">{jugador.name+": "+jugador.dni}</p>
            <button class="btn btn-danger" onClick={()=>handlerInactivePlayer(jugador)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    )
}