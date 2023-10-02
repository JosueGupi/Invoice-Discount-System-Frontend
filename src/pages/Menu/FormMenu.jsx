import React, { Fragment, useEffect } from 'react'

import './Menu.css';

import { useNavigate, useLocation } from 'react-router-dom';



export function FormMenu() {
    const navigate = useNavigate();
    const { state } = useLocation()

    const goToInvoiceForm = () => {

        navigate('/invoiceForm', { state });
    },
        goToLoanForm = () => {

            navigate('/loanForm', { state });
        },
        goToCreditForm = () => {

            navigate('/creditForm', { state });
        },

        goToMainMenu = () => {
            localStorage.setItem('menuName', JSON.stringify('Menú Principal'));
            navigate("/mainMenu", { state });
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
                <br />
                <button className='back-button' onClick={goToMainMenu}>Menú</button>
                <div className='container'>
                    <div className='row'>

                        <br />
                        <br />
                        <br />

                        <center>
                            <div className="col-md-5">
                                <input className="form-button-menu" type="button" value="Generar Cesión" onClick={goToInvoiceForm} />
                                <br />
                                <br />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Ingresar Prestamo" onClick={goToLoanForm} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Ingresar Nota" onClick={goToCreditForm} />
                                <br />
                                <br />
                                <br />
                                <br />

                            </div>
                        </center>




                    </div>
                </div>
            </div>

        </Fragment>
    )
}