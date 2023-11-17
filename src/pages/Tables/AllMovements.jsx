import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';


export function AllMovements() {
    const navigate = useNavigate(),
        [dataR, setDataR] = useState([]),
        clientIdRef = useRef(0),
        [clientCodes, setClientCodes] = useState([]),
        [clients, setClients] = useState([]),
        { state } = useLocation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/tables/getTableMovements')
                    .then((response) => setDataR(response.data));
                axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                    .then((response) => setClients(response.data));
                axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getCodes')
                    .then((response) => setClientCodes(response.data));
                console.log(dataR)
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, [dataR]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const movementType = (type) => {
        if (type === 1) {
            return 'Crédito '
        } else {
            return 'Débito'
        }
    }

    const goToDataMenu = () => {
        navigate("/showDataMenu", { state });
    };

    //Owner Name
    const [searchName, setSearchName] = useState("");
    const nameSearcher = (e) => {
        setSearchName(e.target.value)
        console.log(searchName)
    };

    //State
    const [searchType, setsearchType] = useState("");
    const typeSearcher = (e) => {
        setsearchType(e.target.value)
    };

    //Start Date
    const [searchStartDate, setsearchStartDate] = useState("");
    const StartDateSearcher = (e) => {
        setsearchStartDate(e.target.value)
    };

    //Accounting code
    const [searchCode, setsearchCode] = useState("");
    const CodeSearcher = (e) => {
        setsearchCode(e.target.value)
    };

    //Apply filters
    var results = searchName === 'Todos' ? dataR : dataR.filter((customer) => customer.Name.toLowerCase().includes(searchName.toLocaleLowerCase())
            && (searchType === 'Todos' ? customer.MovementType : movementType(customer.MovementType).toLowerCase().includes(searchType.toLocaleLowerCase()))
            && (!searchStartDate ? customer.Date : new Date(customer.Date) > new Date(searchStartDate))
            && (searchCode === 'Todos' ? customer.Code : customer.Code.toLowerCase().includes(searchCode.toLocaleLowerCase())));

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <div>
                        <br></br>

                        <div className='filter-grid-2'>
                            <p>Cliente</p>
                            <select id='clientSelect' className='selectFilter' ref={clientIdRef} onChange={nameSearcher}>
                                <option value=''>Todos</option>
                                {clients.map((client) => <option value={client.Name}>{client.Name}</option>)}
                            </select>
                            <p>Fecha</p>
                            <input
                                type="date"
                                id="startDateSelect"
                                className="selectFilter"
                                placeholder="Fecha Creación"
                                onChange={StartDateSearcher}
                            />
                            <p>Tipo</p>
                            <select id='stateSelect' className='selectFilter' onChange={typeSearcher}>
                                <option value='Todos'>Todos</option>
                                <option value="Crédito" >Credito</option>
                                <option value="Débito" >Debito</option>
                            </select>

                            <p>Codigo Contable</p>
                            <select id='codeSelect' className='selectFilter' onChange={CodeSearcher}>
                                <option value=''>Todos</option>
                                {clientCodes.map((code) => <option value={code.Code}>{code.Code}</option>)}
                            </select>

                        </div>

                        <div className='scroll-table'>
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
                                    {results.map((item, index) => (
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
                        <br></br>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}