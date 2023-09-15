import React, { Fragment } from 'react'

import './Menu.css';

import { useNavigate } from 'react-router-dom';



export function DataMenu() {
    const navigate = useNavigate();


    const goToClientesMenu = () => {
        
        localStorage.setItem('menuName', JSON.stringify('Clientes Menu'));
        navigate('/clientesMenu');
    },
    goToUsersMenu = () => {
        
        localStorage.setItem('menuName', JSON.stringify('Usuarios Menú'));
        navigate('/userMenu');
    },
    goToAccountsMenu = () => {
        
        localStorage.setItem('menuName', JSON.stringify('Cuentas Menú'));
        navigate('/accountMenu');
    };



    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container'>
                    <div className='row'>

                        <br />
                        <br />
                        <br />

                        <center>
                            <div className="col-md-5">
                                <input className="form-button-menu" type="button" value="Manejar Clientes"  />
                                <br />
                                <br />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="Modificar Códigos" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Modificar Cuentas" onClick={goToAccountsMenu} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Manejar Usuarios" onClick={goToUsersMenu}/>
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