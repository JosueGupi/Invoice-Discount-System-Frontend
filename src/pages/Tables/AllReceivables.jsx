import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export function AllReceivables() {
    const navigate = useNavigate();

    const [dataR, setDataR] = useState([]);

    const { state } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/tables/getTableReceivables');
                setDataR(response.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, []);




    const goToDataMenu = () => {
        navigate("/showDataMenu", { state });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <div>
                        <h2>Cuentas por cobrar</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>No operación</th>
                                    <th>Fecha creación</th>
                                    <th>Vencimiento</th>
                                    <th>Cliente</th>
                                    <th>Monto</th>
                                    <th>Saldo</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataR.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Operation}</td>
                                        <td>{formatDate(item.StartDate)}</td>
                                        <td>{formatDate(item.EndDate)}</td>
                                        <td>{item.ClientName}</td>
                                        <td>{item.Total}</td>
                                        <td>{item.Balance}</td>
                                        <td>{item.State}</td>
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