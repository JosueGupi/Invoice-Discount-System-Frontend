import React, { Fragment, useEffect, useState } from 'react'

import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function UserForm() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState("edit"),
        [name,setName] = useState(""),
        [email,setEmail] = useState(""),
        [idUser,setIdUser] = useState(0);




    const onSubmit = async (data) => {
        try {
            if(mode === "edit") {
                data.idUser = idUser;
                console.log(data)
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/updateUser',data);
                alert('Se actualizo el usuario correctamente');
                navigate('/userMenu',{state});
            }else{
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/createUser',data);
                alert('Se creo el usuario correctamente');
                navigate('/userMenu',{state});
            }
        } catch (err) {
            alert(err, 'Error');
        }
    }
    const goToUserMenu = () => {
        navigate("/userMenu",{state});

    };
    useEffect(() => {
        if (state == null){
            navigate('/');
        }else{
            setMode(state.mode);
            
            if(state.mode === "edit"){
                setName(state.username);
                setEmail(state.email)
                setIdUser(state.id)
                
            }
        }
    }, [])



    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                <div className='row'>
                        <div>

                            
                            <br />
                            <br />
                            <button className='back-button' onClick={goToUserMenu}>Atras</button>

                        </div>
                    </div>
                    <center>
                        <div className='form-box'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center>

                                    <input className="form-input" type="text"
                                        placeholder="Nombre"
                                        defaultValue={name}
                                        maxLength="64"
                                        {...register('name', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-input" type="email"
                                        placeholder="Correo"
                                        defaultValue = {email}
                                        maxLength="128"                                        
                                        {...register('email', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />



                                    <input className="form-input" type="password"
                                        placeholder="Contraseña"
                                        
                                        hidden={ (mode !== 'create') }
                                        maxLength="16"
                                        {...register('password', { required: mode === 'create' })}
                                    />


                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-button" type="submit" value="Guardar" />


                                </center>
                            </form>
                        </div>
                    </center>
                </div>
            </div>

        </Fragment>
    )
}