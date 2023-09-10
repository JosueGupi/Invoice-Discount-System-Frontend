import React,{Fragment} from 'react'
import {useForm} from 'react-hook-form';

//import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function LoginPage () {
    const {register,handleSubmit} = useForm(),
    navigate = useNavigate();
  
    
  
    const onSubmit = async (data) => {
        try{
          
          console.log(data);
          
        } catch(err){
          alert('Usuario invalido')
        }
    }
  
    const SendPassword = () => {
      console.log('Send Password');
    };
   
    return (
      <Fragment>
        
          
          <body className = "login-body">
            <div className="login-box">
              
              <h1>Inicio de sesión</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
               
                <label htmlFor="username">Correo electrónico</label>
                <input type="text" 
                  placeholder="Ingrese su correo"
                  {...register('email',{required:true})}
                />
                  
                
                <label htmlFor="password">Contraseña</label>
                <input type="password" 
                  placeholder="Ingrese su contraseña"
                  {...register('password',{required:true})}
                />
                <input type="submit" value="Iniciar sesión"/>
                <label class= "login-label" onClick = {SendPassword}>Olvidaste la contraseña?</label>
              </form>
            </div>
          </body>
  
        
      </Fragment>
    )
  }