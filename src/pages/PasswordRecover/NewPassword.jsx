import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './PasswordRecover.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function NewPassword() {
    const { register, handleSubmit } = useForm(),
        navigate = useNavigate(),
        {state} = useLocation(),
        [username,setUsername] = useState(),
        [idUser,setIdUser] = useState();

    

    const onSubmit = async (data) => {
        try {
            data.idUser = idUser;
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/changePassword',data);
            if(response.data){
                alert('Contraseña cambiada correctamente');
                navigate('/');
            }else{
                alert('Error del servidor');
            }
            

        } catch (err) {
            alert('Error del servidor');
        }
    }
    useEffect(() => {
        
        if (state == null){
            navigate('/')
        }else{
            setUsername(state.user);
            setIdUser(state.idUser);
        }
        

    },[]);



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
                                        maxLength="16"
                                        {...register('password', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    
                                    <input className="newpassword-input" type="password" 
                                        placeholder='Confirme la contraseña'
                                        maxLength="16"
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