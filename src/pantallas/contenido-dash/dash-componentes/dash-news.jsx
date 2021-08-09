import React, { useEffect, useState } from 'react'
import "../cont-dash.scss"
import firebase from 'firebase'
import {db} from '../../../firebase'

export default function DashNews(){

    const [titulo, setTitulo] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const [datos, setDatos] = useState([])

    const [cargando , setCargando] = useState(false)

    const handlerAddNews = () => {
        console.log("Procesando posteo...")
        setCargando(true)
        let t = firebase.firestore.Timestamp.fromDate(new Date());
        let d = t.toDate().toLocaleDateString();

        db.collection("news").add({
                titulo,
                description,
                image,
                fecha : d
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setCargando(false)
                setTitulo("")
                setImage("")
                setDescription("")
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setCargando(false)
                setTitulo("")
                setImage("")
                setDescription("")
            });

            setTitulo("")
            setImage("")
            setDescription("")
        
            newsCollection()
    
    }

    const newsCollection = () => {
        setCargando(true)

        let nuevoArr = []
        db.collection("news").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let res = doc.data()
                res.id = doc.id
                nuevoArr.push( res )
            });
            setCargando(false)
        });
        setDatos(nuevoArr)

    }

    useEffect(()=>{
        newsCollection()
    },[])

    return(
        <div>
            <div class="d-flex justify-content-end mb-4">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span>{"Nuevo Posteo "}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </button>
            </div>

            {cargando &&
            <div class="d-flex justify-content-center align-items-center">
                <span class="spinner-border text-warning" role="status"></span>
                <span class="text-warning px-3">Cargando...</span>
            </div>
            }

            { datos.length > 0 ? 
                <>
                <div class="row bg-dark">
                    <div class="col-4 text-light border">
                        <p>Titulo</p>
                    </div>
                    <div class="col-4 text-light border">
                        <p>Descripcion</p>
                    </div>
                    <div class="col-2 text-light border">
                        <p>Imagen</p>
                    </div>
                    <div class="col-2 text-light border">
                        <p>Acciones</p>
                    </div>
                </div>
                {
                    datos.map( post => (
                        <PosteoData key={post.id} post={post}/>
                    ))
                }
                </>
            :
                <div class="text-center my-4">
                    <p style={{color:"#ccc"}}>No hay información</p>
                </div>
            }

            {/* Modal Start */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Datos del posteo:</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex justify-content-center">
                            <input class="form-control" type="text" placeholder="Link de imagen..."
                            value={image}
                            onChange={(evt)=> setImage(evt.target.value)}/>
                        </div>
                        <div class="d-flex justify-content-end px-1">
                            <span class="form-text">Insertar el link de la imagen</span>
                        </div>

                        <div class="d-flex justify-content-center mt-3">
                            <input class="form-control" type="text" maxLength={150} placeholder="Titulo..." 
                            value={titulo}
                            onChange={(evt)=> setTitulo(evt.target.value)}/>
                        </div>
                        <div class="d-flex justify-content-end px-1">
                            <span class="form-text">{`${titulo.length}/150`}</span>
                        </div>

                        <div class="d-flex justify-content-center mt-3">
                            <textarea value={description} onChange={(evt)=> setDescription(evt.target.value)} class="form-control" maxLength={400} placeholder="Comentario del posteo..."/>
                        </div>
                        <div class="d-flex justify-content-end px-1">
                            <span class="form-text">{`${description.length}/400`}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-bs-dismiss="modal" onClick={handlerAddNews}
                            disabled={ titulo.length > 0 && description.length > 0 && image.length > 0 ? false : true}
                        >Guardar</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Modal Finish */}
        </div>
    )
}

function PosteoData( {post} ){
    const [posteo, setPost] = useState(post)

    const handlerEditNew = () => {
        var editar = db.collection("news").doc(posteo.id);
        editar.update({
            titulo: posteo.titulo,
            description: posteo.description
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const [dele, setDelete] = useState(false)
    const handlerDelete = () => {
        setDelete(true)
        document.getElementById("cont"+posteo.id).style.opacity = "0.4"
        db.collection("news").doc(posteo.id).delete().then(() => {
            console.log("Document successfully deleted!");
            setDelete(false)
            document.getElementById("cont"+posteo.id).style.display = "none"
        }).catch((error) => {
            setDelete(false)
            console.error("Error removing document: ", error);
            document.getElementById("cont"+posteo.id).style.opacity = "1"
        });
    }

    return(
        <>
        <div id={"cont"+posteo.id} class="row mb-2 position-relative">
            {dele && <div class="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                <span class="spinner-border text-danger" role="status"></span>
            </div>}
            <div class="col-4 border p-2">
                <p>{posteo.titulo}</p>
            </div>
            <div class="col-4 border p-2">
                <p>{posteo.description}</p>
            </div>
            <div class="col-2 border p-2">
                <img class="w-100 rounded" src={posteo.image} alt={posteo.titulo} />
            </div>
            <div class="col-2 border p-2">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#${post.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
                <button class="btn btn-danger mx-1" data-bs-toggle="modal" data-bs-target={`#delete${post.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>

        {/* Delete Start */}
        <div class="modal fade" id={"delete"+post.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Datos del posteo: {`${posteo.id}`}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Estas seguro que deseas eliminar este posteo?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-bs-dismiss="modal" onClick={handlerDelete}
                    >Eliminar</button>
                </div>
                </div>
            </div>
        </div>
        {/* Delete Finish */}

        {/* Edit Start */}
        <div class="modal fade" id={post.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Datos del posteo: {`${posteo.id}`}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="d-flex justify-content-center mt-3">
                            <input class="form-control" type="text" maxLength={150} placeholder="Titulo..." value={posteo.titulo} onChange={(evt)=> setPost({...posteo, titulo: evt.target.value})}/>
                        </div>
                        <div class="d-flex justify-content-end px-1">
                            <span class="form-text">{`${posteo.titulo.length}/150`}</span>
                        </div>

                        <div class="d-flex justify-content-center mt-3">
                            <textarea rows={4} value={posteo.description} onChange={(evt)=> setPost({...posteo, description: evt.target.value})} class="form-control" maxLength={400} placeholder="Comentario del posteo..."/>
                        </div>
                        <div class="d-flex justify-content-end px-1">
                            <span class="form-text">{`${posteo.description.length}/400`}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-bs-dismiss="modal" onClick={handlerEditNew}
                            disabled={ posteo.titulo.length > 0 && posteo.description.length > 0 ? false : true}
                        >Editar</button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Edit Finish */}
        </>
    )
}

