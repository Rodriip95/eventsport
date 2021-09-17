import React from 'react'
import "./cont-dash.scss"
import DashNews from './dash-componentes/dash-news'
import DashHome from './dash-componentes/dash-home'
import DashTable from './dash-componentes/dash-table'
import DashPlayers from './dash-componentes/dash-players'
import DashInbox from './dash-componentes/dash-inbox'


export default function ContenidoDash({activo}){
    return(
        <div class="w-100">
            <div class="m-4">
                {activo === "home" && <DashHome activo={activo}/>}
                {activo === "news" && <DashNews activo={activo}/>}
                {activo === "table" && <DashTable activo={activo}/>}
                {activo === "jugadores" && <DashPlayers activo={activo}/>}
                {activo === "inbox" && <DashInbox activo={activo}/>}
            </div>
        </div>
    )
}

