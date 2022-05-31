import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  const onChange = (e) => {
     setCredentials({...credentials, [e.target.name]: e.target.value}) 
  }

  const handleClick = async(e) => {
    e.preventDefault()
    const {name, email, password} = credentials
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },

      body: JSON.stringify({name, email, password})
    });
    const res = await response.json()
    console.log(res)

    if(res.success){
      //Redirect
      props.showAlert("Created a new user", "success")
      localStorage.setItem('token', res.authToken)
      navigate("/")
    } else {
      props.showAlert("Please enter valid credentials", "danger")
    }
  }
  return (
    <div>
      <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input value={credentials.name} required type="text" className="form-control" id="name" name='name' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input value={credentials.email} required type="text" className="form-control" id="email" name='email' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input value={credentials.password} minLength={5} required type="password" className="form-control" id="passsword" name='password' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input value={credentials.cpassword} minLength={5} required type="password" className="form-control" id="cpasssword" name='cpassword' onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    </div>
  )
}

export default Signup
