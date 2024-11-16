import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className='border shadow-2xl bg-green-400 h-12 flex items-center space-x-5 text-white text-lg font-bold hover:shadow-lg'>
        <Link to="/" >Home</Link>
        <Link to="/profile" >Profile</Link>
        <Link to="/upload" >Upload</Link>
        <Link to="/login" >Login</Link>
        <button onClick={handleLogout} >Log Out</button>

    </div>
)
}

export default Header