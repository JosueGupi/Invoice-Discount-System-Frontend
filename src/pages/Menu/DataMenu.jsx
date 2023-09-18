import React, { Fragment, useEffect } from 'react'

import './Menu.css';

import { useNavigate, useLocation } from 'react-router-dom';



export function DataMenu() {
    const navigate = useNavigate();
    const { state } = useLocation()

    const goToClientMenu = () => {

        navigate('/clientMenu', { state });
    },
        goToUsersMenu = () => {

            navigate('/userMenu', { state });
        },
        goToAccountsMenu = () => {

            navigate('/accountMenu', { state });
        },
        goToCodesMenu = () => {

            navigate('/codesMenu', { state });
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
                                <input className="form-button-menu" type="button" value="Manejar Clientes" onClick={goToClientMenu} />
                                <br />
                                <br />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Modificar Códigos" onClick={goToCodesMenu} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Modificar Cuentas" onClick={goToAccountsMenu} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Manejar Usuarios" onClick={goToUsersMenu} />
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