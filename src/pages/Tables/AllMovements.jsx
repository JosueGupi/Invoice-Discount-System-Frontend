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

    const getUserCodes = (e) => {
        try {

            const idClient = clientIdRef.current.value,
                data = { idClient: idClient };

            axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getClientCodes', data)
                .then((response) => {
                    let codesArray = [0, 0, 0, 0];
                    let idCodesArray = [0, 0, 0, 0];

                    for (let i = 0; i < response.data.length; i++) {
                        codesArray[response.data[i].CodeType] = response.data[i].Code;
                        idCodesArray[response.data[i].CodeType] = response.data[i].idAccountingCodes
                    }
                    console.log("codesArray", codesArray)
                    setClientCodes(codesArray);
                    setIdCodes(idCodesArray)
                })
        } catch (err) {
            console.log(err)
        }

    };

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <div>

                        <h2 className='title'>Tabla de Movimientos</h2>
                        <h3 className='title' >Filtros</h3>
                        <p>Cliente</p>
                        <select id='clientSelect' className='selectFilter' ref={clientIdRef} onChange={getUserCodes}>
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