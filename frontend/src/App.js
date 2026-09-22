 import {ToastContainer} from 'react-toastify'
 import { Routes , Route }  from 'react-router-dom'
 import { Navigate } from 'react-router-dom';
 import {useState} from 'react'
 import Home from './pages/Home';
 import Login from './pages/Login';
 import Signup from './pages/Signup';
 import RefreshHandler from './pages/RefreshHandler';

function App() {
     const [ isAuthenticated, setIsAuthenticated] = useState(false)
      
     const PrivateRoute = ({element}) =>{
         return  isAuthenticated ? element : <Navigate to='/login' /> 
     }
    

  return (
    <div className="App">
      <h1>Simple Auth-app with MERN!</h1>
         <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
         <Routes>
             <Route path='/' element={<Navigate to='/login'  />} />
             <Route path='/home' element={<Home />} />
             <Route path='/login' element={<Login />} />
             <Route path='/signup' element={<Signup />} />
             <Route path='/home'  element={ <PrivateRoute element={<Home />} />} />

         </Routes>

      

      

      <ToastContainer />
    </div>

  );
}

export default App;
