import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiltersReceivablesFunction } from './FiltersReceivables';

export function AllReceivables() {
    const navigate = useNavigate(),
        clientIdRef = useRef(0),
        [clientCodes, setClientCodes] = useState([]),
        [clients, setClients] = useState([]),
        [idCodes, setIdCodes] = useState([]),
        [dataR, setDataR] = useState([]);

    const { state } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/tables/getTableReceivables')
                    .then((response) => setDataR(response.data));
                axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                    .then((response) => setClients(response.data));
                //FiltersReceivablesFunction();
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
                        <h2 className='title' >Cuentas por cobrar</h2>
                        <h3 className='title' >Filtros</h3>
                        <p>Cliente</p>
                        <select id='clientSelect' className='selectFilter' ref={clientIdRef}>
                            {clients.map((client) => <option value={client.idClient}>{client.Name}</option>)}
                        </select>
                        <p>Fecha Creación</p>
                        <input
                            type="date"
                            id="startDateSelect"
                            className="selectFilter"
                            placeholder="Fecha Creación"
                        />
                        <p>Fecha Vencimiento</p>
                        <input
                            type="date"
                            id="endDateSelect"
                            className="selectFilter"
                            placeholder="Fecha Vencimiento"
                        />
                        <p>Estado</p>
                        <select id='stateSelect' className='selectFilter'>
                            <option value="0" defaultValue>Cancelado</option>
                            <option value="1" defaultValue>Atrasado</option>
                            <option value="2" defaultValue>En proceso</option>
                        </select>
                        <br />
                        <p>Rangos</p>
                        <input className='selectFilter' type="number" id="min_value" name="min_value" placeholder='Mínimo' />
                        <input className='selectFilter' type="number" id="max_value" name="max_value" placeholder='Máximo' />
                        <table id='receivablesTable'>
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
        </Fragment >
    )
}