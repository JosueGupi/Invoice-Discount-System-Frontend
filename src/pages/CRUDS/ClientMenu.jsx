import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function ClientMenu() {
    const navigate = useNavigate();

    const { state } = useLocation()

    const [dataR, setDataR] = useState([]),
        [search, setSearch] = useState(""),
        [refresh, setRefresh] = useState(0),
        searcher = (e) => {
            setSearch(e.target.value)
        }
        , results = !search ? dataR : dataR.filter((customer) => customer.Name.toLowerCase().includes(search.toLocaleLowerCase()));

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/deleteClient', { idClient: id });
            setRefresh(refresh+1);
        } catch (err) {
            console.log(err)
        }

    };
    const goToDataMenu = () => {
        navigate("/dataMenu");

    };

    const handleModify = (id, username, email, idenCard) => {
        // Implementar la lógica de modificación aquí
        navigate("/clientForm", { state: { mode: 'edit', id: id, username: username, email: email, idenCard: idenCard} });
    };

    const handleCreate = () => {
        // Implementar la lógica de creación aquí
        navigate("/clientForm", { state: { mode: 'create' } });
    };
    useEffect(() => {
        axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
            .then((response) => setDataR(response.data))

    }, [refresh]);





    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div className='input_symbol'>

                            <input className='search-space ' placeholder='Buscar por nombre' type="text" value={search} onChange={searcher} />
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <button className='back-button' onClick={goToDataMenu}>Menú</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleCreate}>Nuevo cliente</button>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='container-fluid'>


                        <div className='row'>



                            {results.map((client) => <Card title={client.Name} caption={client.Email} description={client.IdentificationCard}
                                handleEdit={() => { handleModify(client.idClient, client.Name, client.Email, client.IdentificationCard) }} handleDelete={() => { handleDelete(client.idClient) }} />

                            )}







                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}