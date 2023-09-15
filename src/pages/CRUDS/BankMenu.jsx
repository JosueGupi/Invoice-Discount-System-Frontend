import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function BankMenu() {
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
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/banks/deleteBank', { idBank: id });
            setRefresh(refresh+1);
        } catch (err) {
            console.log(err)
        }

    };
    const goToAccountMenu = () => {
        navigate("/accountMenu");

    };

    const handleModify = (id, bank) => {
        // Implementar la lógica de modificación aquí
        navigate("/bankForm", { state: { mode: 'edit', id: id, bank:bank} });
    };

    const handleCreate = () => {
        // Implementar la lógica de creación aquí
        navigate("/bankForm", { state: { mode: 'create' } });
    };
    
    useEffect(() => {
        axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/banks/getBanks')
            .then((response) => setDataR(response.data))

    }, [refresh]);





    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div>

                            <input className='search-space ' placeholder='Buscar por nombre' type="text" value={search} onChange={searcher} />
                            <button className='back-button' onClick={goToAccountMenu}>Atras</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleCreate}>Nuevo banco</button>
                            

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='container-fluid'>


                        <div className='row'>


                            {results.map((bank) => <Card title={bank.Name}
                                handleEdit={() => { handleModify(bank.idBank, bank.Name) }} handleDelete={() => { handleDelete(bank.idBank) }} />

                            )}


                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}