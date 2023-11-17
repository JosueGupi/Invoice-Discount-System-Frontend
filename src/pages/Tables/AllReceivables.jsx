import React, { Fragment, useEffect, useState, useRef } from 'react'

import './Table.css';

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';

export function AllReceivables() {
    const navigate = useNavigate(),
        clientIdRef = useRef(0),
        [clients, setClients] = useState([]),
        [dataR, setDataR] = useState([])

    const { state } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/tables/getTableReceivables')
                    .then((response) => setDataR(response.data));
                axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                    .then((response) => setClients(response.data));
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



    //Filters
    //Owner Name
    const [searchName, setSearchName] = useState("");
    const nameSearcher = (e) => {
        setSearchName(e.target.value)
    };

    //State
    const [searchState, setSearchState] = useState("");
    const stateSearcher = (e) => {
        setSearchState(e.target.value)
    };

    //StartDate
    const [searchStartDate, setsearchStartDate] = useState("");
    const StartDateSearcher = (e) => {
        setsearchStartDate(e.target.value)
    };

    //EndDate
    const [searchEndDate, setsearchEndDateDate] = useState("");
    const EndDateSearcher = (e) => {
        setsearchEndDateDate(e.target.value)
    };

    //Min total
    const [searchMinValue, setsearchMinValue] = useState("");
    const MinValueSearcher = (e) => {
        setsearchMinValue(e.target.value)
    };

    //Max total
    const [searchMaxValue, setsearchMaxValue] = useState("");
    const MaxValueSearcher = (e) => {
        setsearchMaxValue(e.target.value)
    };

    //Apply filters
    var results = searchName === 'Todos' ? dataR : dataR.filter((customer) => customer.ClientName.toLowerCase().includes(searchName.toLocaleLowerCase())
            && (searchState === 'Todos' ? customer.State : customer.State.toLowerCase().includes(searchState.toLocaleLowerCase()))
            && (!searchMinValue ? customer.Total : customer.Total >= searchMinValue)
            && (!searchMaxValue ? customer.Total : customer.Total <= searchMaxValue)
            && (!searchStartDate ? customer.StartDate : new Date(customer.StartDate) > new Date(searchStartDate))
            && (!searchEndDate ? customer.EndDate : new Date(customer.EndDate) > new Date(searchEndDate)));


    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <div>
                        
                        <br></br>

                        <div className='filter-grid'>
                            <p>Cliente</p>
                            <select id='clientSelect' className='selectFilter' ref={clientIdRef} onChange={nameSearcher}>
                                <option value=''>Todos</option>
                                {clients.map((client) => <option value={client.Name}>{client.Name}</option>)}
                            </select>
                            <p>Fecha Creación</p>
                            <input
                                type="date"
                                id="startDateSelect"
                                className="selectFilter"
                                placeholder="Fecha Creación"
                                onChange={StartDateSearcher}
                            />
                            <p>Fecha Vencimiento</p>
                            <input
                                type="date"
                                id="endDateSelect"
                                className="selectFilter"
                                placeholder="Fecha Vencimiento"
                                onChange={EndDateSearcher}
                            />
                            <p>Estado</p>
                            <select id='stateSelect' className='selectFilter' onChange={stateSearcher}>
                                <option value='Todos'>Todos</option>
                                <option value="Cancelado" defaultValue>Cancelado</option>
                                <option value="Atrasado" defaultValue>Atrasado</option>
                                <option value="En proceso" defaultValue>En proceso</option>
                            </select>
                            
                            <p>Rangos</p>
                            <input className='selectFilter' type="number" id="min_value" name="min_value" placeholder='Mínimo' onChange={MinValueSearcher}/>
                            <input className='selectFilter' type="number" id="max_value" name="max_value" placeholder='Máximo' onChange={MaxValueSearcher}/>
                        </div>

                        <div className='scroll-table'>
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
                                    {results.map((item, index) => (
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

                        <br></br>

                    </div>

                </div>
            </div>
        </Fragment >
    )
}