import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import './PasswordRecover.css';
//import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function EmailVerification() {
    const { register, handleSubmit } = useForm(),
        navigate = useNavigate();



    const onSubmit = async (data) => {
        try {

            console.log(data);
            navigate('/matrixVerification');

        } catch (err) {
            alert('Usuario invalido')
        }
    }



    return (
        <Fragment >
            <div className='backgroundColor'>
                <center>
                <div className='container'>
                    <div className="submit-email-box">
                        <h1>Ingrese el correo asociado a la cuenta</h1>
                        <br />
                        <br />
                        <br />

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <center>

                                <input className="form-input" type="email"
                                    placeholder="Correo electronico"
                                    {...register('email', { required: true })}
                                />
                                <br />
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