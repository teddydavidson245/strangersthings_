import { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css'
import Posts from '../../strangersthings/strangersthings/src/components/Posts';
import Profile from '../../strangersthings/strangersthings/src/components/Profile';
import Login from '../../strangersthings/strangersthings/src/components/Login';
import Register from '../../strangersthings/strangersthings/src/components/Register';
import Navbar from '../../strangersthings/strangersthings/src/components/Navbar';
import AuthContainer from '../../strangersthings/strangersthings/src/components/AuthForm';
import ListingCreationForm from '../../strangersthings/strangersthings/src/components/Createpost';

function App(){
  const [token, setToken] = useState(localStorage.getItem("token"));
  // *setting to local storage prevents the login token from getting lost with each page refresh
  return (
    <div>
      <Navbar token = {token} setToken= {setToken}/>
      <Routes> 
        <Route path="/posts" element={<Posts token = {token}/>}/>
        <Route path="/profile" element={<Profile token = {token}/>}/>
        {/* <Route path="/login" element={<Login setToken = {setToken}/>}/> */}
        {/* <Route path="/register" element={<Register setToken = {setToken} />}/> */}
        <Route path="/auth" element={<AuthContainer setToken = {setToken} />}/>
        <Route path="/createpost" element={<ListingCreationForm setToken = {setToken} />}/>
      </Routes>
      
    </div>
  )
}
export default App
