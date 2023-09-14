import { useState } from "react"


export default function Profile({token}){
    const [username, setUsername] = useState(" ")
    const [messages, setMessages] = useState([])
    return(
        <div>
         <h1>Profile</h1>
        </div>
    )
}