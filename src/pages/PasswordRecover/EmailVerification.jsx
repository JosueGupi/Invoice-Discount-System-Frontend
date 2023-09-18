import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import './PasswordRecover.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export function EmailVerification() {
    const { register, handleSubmit } = useForm(),
        navigate = useNavigate();



    const onSubmit = async (data) => {
        try {
            
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/evalEmail',data);
            
            const name = response.data[0].Name,
                idUser = response.data[0].idUser;
                
            if (name !== undefined) {
                 navigate('/matrixVerification',{state:{user:name, idUser:idUser}});
            }else{
                alert('Este correo no pertenece a ninguna cuenta dentro del sistema.')
            }

           

        } catch (err) {
            alert('Este correo no pertenece a ninguna cuenta dentro del sistema.')
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
                                    maxLength="128"
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