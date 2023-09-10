import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';

//import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function LoginPage() {
  const { register, handleSubmit } = useForm(),
    navigate = useNavigate();



  const onSubmit = async (data) => {
    try {

      console.log(data);

    } catch (err) {
      alert('Usuario invalido')
    }
  }

  const SendPassword = () => {
    console.log('Send Password');
  };

  return (
    <Fragment >
      <div className='backgroundImage'>
        <div className="container">
          <div className='row'>
            <div className='col-md-8 '>

              <h1 className="inversion-title" >Inversiones </h1>
              <h1 className="inversion-title2" >Ellens</h1>

            </div>
            <div className='col-md-4'>

              <div className="login-box">
                <h1>LOGIN</h1>
                <br />
                <br />
                <br />

                <form onSubmit={handleSubmit(onSubmit)}>
                  <center>

                    <input className="form-input" type="text"
                      placeholder="Correo"
                      {...register('email', { required: true })}
                    />
                    <br />
                    <br />
                    <br />
                    <br />


                    <input className="form-input" type="password"
                      placeholder="Contraseña"
                      {...register('password', { required: true })}
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <input className="form-button" type="submit" value="Iniciar sesión" />

                    <label className="login-label" onClick={SendPassword}>Recuperar Contraseña</label>
                  </center>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}