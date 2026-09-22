import React from 'react'
import {useEffect , useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { handleSuccess } from '../utility'
import axios from 'axios'

function Home() {
      const [ userName , setUserName] = useState('')
      const [products , setProducts] = useState([])
      const navigate = useNavigate();

     useEffect(()=>{
     // 1. fetch the items from local storeage
     const user = localStorage.getItem('loggedUser');
     const token = localStorage.getItem('token');
     // 2. prints value
     console.log("LocalStorage data on mount:",{user ,token})
     //3. security check: if no exists, boot them back to login
     if(!token) {
      navigate('/login');
     }
     else{
      setUserName(user);
     }

     } ,[navigate]);

   const handleLogout= () =>{
    // clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    handleSuccess('User logged out!!')
    setTimeout(()=>{
      navigate('/login');
    },1000)
    
   }

  const fetchProducts = async () =>{
    const token = localStorage.getItem('token');

    try {
      const url ='https://mern-auth-app-api-nu.vercel.app/products'

      const response = await axios.get(url,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });

      const result = response.data;
      setProducts(result);
        
    } catch (error) {
        console.log(error)
    }

  }

  useEffect(()=>{fetchProducts()},[])


  return (
    <div className='container'>
      <h1>Welcome back, { userName || 'User'}</h1>
      <p>You have successfully authenticated into your dashboard.</p>
      <div> 
        <h3>Some products are as follows:-</h3>
        <ul>
        {
         products.map((item, index)=>{
          return(
            
             <li key={index}>{item.name} : {item.price}</li>
            
          )
          
         })
        }
        </ul>

      </div>
      <button onClick={handleLogout}>
        Logout!
      </button>

    </div>
  )
}

export default Home
