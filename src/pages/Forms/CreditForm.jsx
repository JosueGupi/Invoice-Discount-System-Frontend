import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'

export function CreditForm() {
    const navigate = useNavigate();
    const { state } = useLocation()
    const { register, handleSubmit } = useForm(),
    [operations, setOperations] = useState([]),
    [codes, setCodes] = useState([]);

    const goToFormMenu = () => {

        navigate('/formMenu', { state });
    },
    onSubmit = async (data) => {
        try {
            console.log(data);
            //const response = await axios.post('http://localhost:3001/operations/createOperation', data)
        } catch (err) {
            alert(err, 'Error');
        }
    };
    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {
            axios.get('http://localhost:3001/operations/getOperations')
                .then((response) => setOperations(response.data))
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getCodes')
                .then((response) => setCodes(response.data))
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

                                <select className='form-input'{...register('opNumber', { required: true })}>
                                        <option value="none" defaultValue disabled hidden>Operacion</option>
                                        {operations.map((operation) => <option value={operation.idOperation}>{operation.idOperation}</option>)}
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
                                    <select className='form-input' {...register('opCode', { required: true })}>
                                        <option value="none" defaultValue disabled hidden>Código</option>
                                        {codes.map((code) => <option value={code.idAccountingCodes}>{code.Code}</option>)}

                                    </select>
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