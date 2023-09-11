import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './PasswordRecover.css';
//import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function NewPassword() {
    const { register, handleSubmit } = useForm(),
        navigate = useNavigate();

    var username = "TEST"

    const onSubmit = async (data) => {
        try {

            console.log(data);
            navigate('/');

        } catch (err) {
            alert('Usuario invalido')
        }
    }



    return (
        <Fragment >
            <div className='backgroundColor'>
                <center >
                    <div className='container'>
                        <div className="submit-password-box">
                            <h1>Listo {username}</h1>
                            <h3>Ingrese la nueva contraseña</h3>
                            <br />
                            <br />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center >

                                    <input className="newpassword-input" type="password" 
                                        placeholder='Nueva contraseña'
                                        {...register('password', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    
                                    <input className="newpassword-input" type="password" 
                                        placeholder='Confirme la contraseña'
                                        {...register('confirmPassword', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-button" type="submit" value="Enviar" />


                                </center>
                            </form>
                        </div>
                    </div>
                </center>
            </div>
        </Fragment>
    )
}