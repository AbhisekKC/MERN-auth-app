import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { handleSuccess, handleError } from '../utility'
function Signup() {
    const [signupInfos, setSignupInfos] = useState({
        name: '',
        email: '',
        password: '',

    })

    const navigate = useNavigate()
    const handleChange = (e) => {

        const { name, value } = e.target;
        const copyInfo = { ...signupInfos };
        copyInfo[name] = value;
        setSignupInfos(copyInfo);

    }

    const handleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfos;
        if (!name || !email || !password) {
            return handleError('name, email and password are required!!!')
        }
        try {
            const url = 'http://localhost:8000/auth/signup';
            // Axios handles the JSON body stringification automatically
            const response = await axios.post(url, signupInfos);

            // Axios wraps the backend response inside the .data property
            const { success, message  } = response.data;

            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } 
            else if(!success) {
                handleError(message)
            }


        } catch (err) {
            const backendError = err.response?.data?.error;
            if(backendError?.details?.[0]?.message){
                handleError(backendError.details[0].message);
            }
            
    }


    }

    return (
        <div className='container'>
            <h1>SignUp!!!</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your  name.....'
                        value={signupInfos.name} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your  email.....'
                        value={signupInfos.email} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password.....'
                        value={signupInfos.password} />
                </div>
                <button type='submit'>SignUp</button>
                <span>Already have an account?
                    <Link to='/login'>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Signup