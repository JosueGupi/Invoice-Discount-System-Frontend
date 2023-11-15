import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export function AllMovements() {
    const navigate = useNavigate();

    const [dataR, setDataR] = useState([]);

    const { state } = useLocation()

    useEffect(() => {
        /*const fetchData = async () => {
            try {
                const response = await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/charts/getClientDeb');
                setDataR(response.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();*/
    }, []);




    const goToDataMenu = () => {
        navigate("/showDataMenu", { state });
    };

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <div>
                        <h2>Tabla de Movimientos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>No operación</th>
                                    <th>Fecha movimiento</th>
                                    <th>Código contable</th>
                                    <th>Cliente</th>
                                    <th>Monto</th>
                                    <th>Tipo movimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataR.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.noOperacion}</td>
                                        <td>{item.fechaMovimiento}</td>
                                        <td>{item.codigoContable}</td>
                                        <td>{item.cliente}</td>
                                        <td>{item.monto}</td>
                                        <td>{item.tipoMovimiento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}