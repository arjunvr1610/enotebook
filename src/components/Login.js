import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const onChange = (e) => {
     setCredentials({...credentials, [e.target.name]: e.target.value}) 
  }

  const handleClick = async(e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },

      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const res = await response.json()

    if(res.success){
      //Redirect
      props.showAlert("Logged in to enotebook!", "success")
      localStorage.setItem('token', res.authToken)
      navigate("/")
    } else {
      props.showAlert("Enter valid user details", "danger")
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input value={credentials.email} required type="text" className="form-control" id="email" name='email' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input value={credentials.password} minLength={5} required type="password" className="form-control" id="passsword" name='password' onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
  )
}

export default Login
