import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Axios from 'axios'
import FileDownload from 'js-file-download'
import { useNavigate, useLocation } from 'react-router-dom';
import checkImg from '../../images/check.png'
import './Form.css'


export function PDFMenu() {
    const navigate = useNavigate(),
        { state } = useLocation();

    useEffect(() => {
        console.log(state.idOperation);
        if (state == null) {

        } else {

        }


    }, []);
    const downloadFile = () => {
        console.log(state.idOperation);
        /*Axios({
            url: 'http://localhost:3001/users/getPDFOp',
            method: 'GET',
            responseType: 'blob', // Important
            data :{ idOperation: state.idOperation }
        }).then((response) => {
            FileDownload(response.data, 'file.pdf');
        });*/
        axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/getPDFOp',{ idOperation: state.idOperation },{ responseType: 'blob' })
        .then((response) => {
            FileDownload(response.data, 'file.pdf');
        });





    }
    const handleEmail = async () => {

        try {
            /*const json = {
                idOperation: state.idOperation
            }*/
            //const email = await axios.post('http://localhost:3001/users/sendEmailOP', { idOperation: state.idOperation });
            console.log("llamando al back...")
            console.log(state.idOperation);
            const responseOperation = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/operationDetail', { idOperation: state.idOperation });

            const formData = {
                numero: responseOperation.data[0].idOperation,
                fecha: responseOperation.data[0].Date,
                monto: responseOperation.data[0].Total,
                pagador: responseOperation.data[0].Name
            };
            
            try {
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/email/send-email', formData);
                console.log(response.data);
                alert('Email sent successfully!');
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Error sending email. Please try again later.');
            }
        }
        catch (err) {
            console.log(err);
            alert('Error getting data for email. Please try again later.');
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
                            <input className="form-button" type="button" value="Generar PDF" onClick={downloadFile} />
                            <br />
                            <input className="form-button" type="button" value="Enviar correo" onClick={handleEmail} />
                        </center>

                    </div>
                </div>

            </div>

        </Fragment>
    )
}