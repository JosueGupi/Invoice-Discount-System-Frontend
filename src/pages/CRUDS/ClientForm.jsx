import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function ClientForm() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState("edit"),
        [name,setName] = useState(""),
        [email,setEmail] = useState(""),
        [idenCard,setIdenCard] = useState(""),
        [idClient,setIdUser] = useState(0);




    const onSubmit = async (data) => {
        try {
            if(mode === "edit") {
                data.idClient = idClient;
                console.log(data)
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/updateClient',data);
                alert('Se actualizo el cliente correctamente');
                navigate('/clientMenu');
            }else{
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/updateClient',data);
                alert('Se creo el cliente correctamente');
                navigate('/clientMenu');
            }
        } catch (err) {
            alert(err, 'Error');
        }
    }
    const goToClientMenu = () => {
        navigate("/ClientMenu");

    };
    useEffect(() => {
        if (state == null){
            navigate('/');
        }else{
            setMode(state.mode);
            
            if(state.mode === "edit"){
                setName(state.username);
                setEmail(state.email)
                setIdenCard(state.idenCard)
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
                            <button className='back-button' onClick={goToClientMenu}>Atras</button>

                        </div>
                    </div>
                    <center>
                        <div className='form-box'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center>

                                    <input className="form-input" type="text"
                                        placeholder="Nombre"
                                        defaultValue={name}
                                        {...register('name', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-input" type="email"
                                        placeholder="Correo"
                                        defaultValue = {email}
                                        
                                        {...register('email', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />



                                    <input className="form-input" type="text"
                                        placeholder="Identificación"
                                        defaultValue = {idenCard}
                                        
                                        {...register('idenCard', { required: true })}
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