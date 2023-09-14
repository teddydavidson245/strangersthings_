import {Link} from "react-router-dom"
import AuthContainer from "./AuthForm"

export default function Navbar({token}){
    // TODO show diff links if logged in or not.
    // TODO Implement logout functionality
   return (
    <nav id="navbar">
    <ul>
        
            <Link to = "/posts"> Posts</Link>
        
            <Link to = "/profile"> Profile</Link>
        
            {/* <Link to = "/login"> Login</Link> */}
       
            {/* <Link to = "/register"> Register</Link> */}

            <Link to = "/auth"> Authenticate{AuthContainer}</Link>

            <Link to = "/createpost"> Create Listing</Link>
       
        <button>Logout</button>
    </ul>
        </nav>
   )
}