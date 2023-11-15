import React, { Fragment, useEffect } from 'react'

import './Menu.css';

import { useNavigate, useLocation } from 'react-router-dom';



export function ShowDataMenu() {
    const navigate = useNavigate();
    const { state } = useLocation()

    const goToCalendar = () => {
        navigate('/calendar', { state });
    },
        goToClientDebt = () => {
            localStorage.setItem('menuName', JSON.stringify('Deuda por cliente'));
            navigate("/clientDebt", { state });
        },
        goToInterestEarned = () => {
            //interes generado
        },
        goToReceivables = () => {
            localStorage.setItem('menuName', JSON.stringify('Cuentas por cobrar'));
            navigate("/allReceivables", { state });
        },
        goToMovements = () => {
            localStorage.setItem('menuName', JSON.stringify('Todos los movimientos'));
            navigate("/allMovements", { state });
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

                        <center>
                            <div className="col-md-5">
                                <input className="form-button-menu" type="button" value="Fechas de pago" onClick={goToCalendar} />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Deuda por cliente" onClick={goToClientDebt} />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Interés generado" onClick={goToInterestEarned} />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Cuentas por cobrar" onClick={goToReceivables} />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Ver Movimientos" onClick={goToMovements} />
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