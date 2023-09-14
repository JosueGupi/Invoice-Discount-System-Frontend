import React, { Fragment } from 'react'

import './Menu.css';

import { useNavigate } from 'react-router-dom';



export function DataMenu() {
    const navigate = useNavigate();


    const goToClientesMenu = () => {
        localStorage.setItem('name', JSON.stringify('Lola'));
        localStorage.setItem('menuName', JSON.stringify('Clientes Menu'));
        navigate('/clientesMenu');
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
                                <input className="form-button-menu" type="button" value="Modificar Cuentas" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Manejar Usuarios" />
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