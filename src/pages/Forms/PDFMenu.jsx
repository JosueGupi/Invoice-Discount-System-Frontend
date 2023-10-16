import React, { Fragment, useEffect, useState, useRef } from 'react'

import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'


export function PDFMenu() {
    const navigate = useNavigate(),
        { state } = useLocation();

    useEffect(() => {

        console.log('pantalla');
        if (state == null) {

        } else {

        }


    }, []);


    return (
        <Fragment >
            <div className='backgroundColor'>
                <br />


                <div className='container big-container'>
                    <div className='form-box'>
                        <center>
                            <img className='check-icon' alt="check icon"border="0"/>

                            <h2 className='form-subtitle'>Cesión agregada con éxito</h2>
                            <br />
                            <input className="form-button" type="button" value="Aceptar" />
                            <br />
                            <input className="form-button" type="button" value="Generar PDF" />
                            <br />
                            <input className="form-button" type="button" value="Enviar correo" />
                        </center>

                    </div>
                </div>

            </div>

        </Fragment>
    )
}