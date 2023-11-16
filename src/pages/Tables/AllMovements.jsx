import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export function AllMovements() {
    const navigate = useNavigate(),
        [dataR, setDataR] = useState([]),
        clientIdRef = useRef(0),
        [clientCodes, setClientCodes] = useState([]),
        [clients, setClients] = useState([]),
        [idCodes, setIdCodes] = useState([]),
        { state } = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/tables/getTableMovements');
                setDataR(response.data);
                axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                    .then((response) => setClients(response.data));
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const movementType = (type) => {
        if (type == 1) {
            return 'Crédito '
        } else {
            return 'Débito'
        }
    }

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
                        <br></br>

                        <div className='filter-grid-2row'>
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
                        </div>

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
                                        <td>{item.idOperation}</td>
                                        <td>{formatDate(item.Date)}</td>
                                        <td>{item.Code}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Amount}</td>
                                        <td>{movementType(item.MovementType)}</td>
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