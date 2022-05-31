import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  
  let location = useLocation();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    props.showAlert("Logged out from enotebook", "success")
  } 
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">E-Notebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                </li>
            </ul>
            {localStorage.getItem('token')===null?<form className="d-flex">
                <Link type="button" className="btn btn-primary mx-2" to="/login">Login</Link>
                <Link type="button" className="btn btn-primary mx-2" to="/signup">Sign up</Link>
            </form>:<button type='button' className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>}
            </div>           
        </div>
        </nav>
    </div>
  )
}

export default Navbar
