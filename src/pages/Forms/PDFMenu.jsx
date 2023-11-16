import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { useNavigate, useLocation } from 'react-router-dom';
import checkImg from '../../images/check.png'
import './Form.css'


export function PDFMenu() {
    const navigate = useNavigate(),
        { state } = useLocation();

    const responseOperation = useRef(null);

    useEffect(() => {
        console.log(state.idOperation);
        console.log('pantalla');
        if (state == null) {

        } else {

        }


    }, []);

    const handleEmail = async () => {

        try {
            const json = {
                idOperation: state.idOperation
            }
            console.log(json);
            responseOperation = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/operationDetail', json);
            console.log("--------------------------------------------------")
            console.log(responseOperation);
        }
        catch (err) {
            console.log(err);
            alert('Error getting data for email. Please try again later.');
        }

        const formData = {
            numero: responseOperation.idOperation,
            fecha: responseOperation.Date,
            monto: responseOperation.Total,
            pagador: responseOperation.Name
        };

        try {
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/email/send-email', formData);
            console.log(response.data);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again later.');
        }
    };

    const goToFormMenu = () => {
        localStorage.setItem('menuName', JSON.stringify('Menú de Formularios'));
        navigate("/formMenu", { state });
    };

    return (
        <Fragment >
            <div className='backgroundColor'>
                <br />


                <div className='container big-container'>
                    <div className='form-box'>
                        <center>
                            <img className='check-icon' alt="check icon" border="0" src={checkImg} />

                            <h2 className='form-subtitle'>Cesión agregada con éxito</h2>
                            <br />
                            <input className="form-button" type="button" value="Aceptar" onClick={goToFormMenu} />
                            <br />
                            <input className="form-button" type="button" value="Generar PDF" />
                            <br />
                            <input className="form-button" type="button" value="Enviar correo" onClick={handleEmail} />
                        </center>

                    </div>
                </div>

            </div>

        </Fragment>
    )
}