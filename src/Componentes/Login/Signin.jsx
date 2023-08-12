import React, { useState, useEffect,useContext }  from 'react';
import {MDBContainer,MDBCol,MDBRow,MDBBtn,MDBIcon,MDBInput,MDBCheckbox} from 'mdb-react-ui-kit';
import {EstadoUsersGlobal} from '../Context/StateUsersGlobals'
import Loading from '../Loading/Loading';
import MyALert from '../Alerts/Alerts';
import SideBar from '../Sidebar/Sidebar'
import { Navigate, useNavigate} from "react-router-dom"
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../Sidebar/Sidebar';

function Signin() {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [data,setData] = useState({})
  const userContext = React.useContext(EstadoUsersGlobal)
  const [message,setMessage] = useState()
  const navigate = useNavigate()
  
  const  handleSubmit =  async e =>{
    e.preventDefault()
    setLoading(true)
    let dataForm = {
      'username':username,
      'password':password
      }
     try{
             let config ={
              method:'POST',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  },
                  body: JSON.stringify(dataForm)
             }
            
             let res = await fetch('http://127.0.0.1:8000/Login/',config)
             if (res.status != 401){
              let data = await res.json()
              console.log(data)
              localStorage.setItem('refresh', data.refresh)
              localStorage.setItem('access', data.access )
              localStorage.setItem('expiration', data.expiration)
              localStorage.setItem('username', data.username)
              localStorage.setItem('firstname', data.first_name) // guardar user y token en el Navegador
             //console.log(JSON.parse(localStorage.getItem('user')).token) //si queremos obtener el token del usuario
             userContext.setData(data.username) 
             setLoading(false)
             
            
            } else {
             setMessage("No se econtro al usuario")
             setLoading(false)
             }
              
    }catch(error){
      setError(error)
      setLoading(false)
     }
   
  }

  

   return (
    <div>
      
      {error && <h1>{error.message}</h1>}
      
      {!localStorage.getItem('access')?
    <MDBContainer  className="p-3 my-5">
       
      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <form onSubmit={handleSubmit}>
          <MDBInput wrapperClass='mb-4' name='username' label='nombre de usuario' id='formControlLg' type='text' size="lg" onChange={ e => setUsername(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' name='password' label='contraseña' id='formControlLg' type='password' size="lg" onChange={ e => setPassword(e.target.value)}/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Recordar' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg">Logearse</MDBBtn>
          </form>
          <div style={{textAlign: "center"}}>
             {loading && <Loading></Loading>}
          </div>
          {message && <MyALert message={message} />}
         
       </MDBCol>

      </MDBRow>
     

    </MDBContainer>
    : navigate("/")}
    </div>
  );
}

export default Signin;