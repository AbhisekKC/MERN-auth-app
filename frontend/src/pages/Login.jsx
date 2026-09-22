import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { handleSuccess, handleError } from '../utility'
function Login() {
  const [loginInfos, setLoginInfos] = useState({

    email: '',
    password: '',

  })

  const navigate = useNavigate()
  const handleChange = (e) => {

    const { name, value } = e.target;
    const copyInfo = { ...loginInfos };
    copyInfo[name] = value;
    setLoginInfos(copyInfo);

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfos;
    if (!email || !password) {
      return handleError('Email and password are required!!!')
    }
    try {
      const url = 'http://localhost:8000/auth/login';
      // Axios handles the JSON body stringification automatically
      const response = await axios.post(url, loginInfos);

      // Axios wraps the backend response inside the .data property

      const { success, message, jwToken, name, error } = response.data;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwToken);
        localStorage.setItem('loggedUser', name);
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      }
      else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if (!success) {
        handleError(message)
      }


    } catch (err) {
      const backendError = err.response?.data?.error;
      if (backendError?.details?.[0]?.message) {
        handleError(backendError.details[0].message);
      } else {
        handleError(err.response?.data?.message || 'An error occurred during login.');
      }
    }


  }

  return (
    <div className='container'>
      <h1>Login!!!</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your  email.....'
            value={loginInfos.email} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password.....'
            value={loginInfos.password} />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account?  
          <Link to='/signup'>  Signup</Link>
        </span>
      </form>
    </div>
  )
}

export default Login