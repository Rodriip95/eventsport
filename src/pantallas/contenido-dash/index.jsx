import React, { useEffect, useState } from 'react'
import "./cont-dash.scss"
import firebase from 'firebase'
import {db} from '../../firebase'
import DashNews from './dash-componentes/dash-news'
import DashHome from './dash-componentes/dash-home'

export default function ContenidoDash({activo}){
    return(
        <div class="w-100">
            <div class="m-4">
                {activo === "home" && <DashHome activo={activo}/>}
                {activo === "news" && <DashNews activo={activo}/>}
            </div>
        </div>
    )
}

