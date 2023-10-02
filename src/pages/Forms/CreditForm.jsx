import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form';


import { useNavigate, useLocation } from 'react-router-dom';



export function CreditForm() {
    const navigate = useNavigate();
    const { state } = useLocation()
    const { register, handleSubmit } = useForm();

    const goToFormMenu = () => {

        navigate('/formMenu', { state });
    },
    onSubmit = async (data) => {
        try {
            
        } catch (err) {
            alert(err, 'Error');
        }
    };
    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {

        }


    }, []);



    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div>


                            <br />
                            <br />
                            <button className='back-button' onClick={goToFormMenu}>Atras</button>

                        </div>
                    </div>
                    <center>
                        <div className='form-box'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center>

                                    <select className="form-input"
                                        placeholder="Dueño"

                                        {...register('idClient', { required: true })}>
                                    </select>
                                    <br />
                                    <br />
                                    <br />

                                    <input className="form-input" type="text"
                                        placeholder="Monto"
                                        
                                        maxLength="32"
                                        {...register('amount', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-input" type="text"
                                        placeholder="Código"
                                        
                                        maxLength="32"
                                        {...register('code', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />

                                    <input className="form-input" type="text"
                                        placeholder="Descripción"
                                        
                                        maxLength="128"
                                        {...register('description', { required: true })}
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