import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function AccountMenu() {
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
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/accounts/deleteAccount', { idAccount: id });
            setRefresh(refresh+1);
        } catch (err) {
            console.log(err)
        }

    };
    const goToDataMenu = () => {
        navigate("/dataMenu");

    };

    const handleModify = (id, owner, number, bank) => {
        // Implementar la lógica de modificación aquí
        navigate("/accountForm", { state: { mode: 'edit', id: id, owner: owner, number: number, bank:bank} });
    };

    const handleCreate = () => {
        // Implementar la lógica de creación aquí
        navigate("/accountForm", { state: { mode: 'create' } });
    };
    const handleBanks = () => {
        // Implementar la lógica de creación aquí
        navigate("/bankMenu", { state: { mode: 'create' } });
    };
    useEffect(() => {
        axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/accounts/getAccounts')
            .then((response) => setDataR(response.data))

    }, [refresh]);





    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div className='input_symbol'>

                            <input className='search-space ' placeholder='Buscar por dueño' type="text" value={search} onChange={searcher} />
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <button className='back-button' onClick={goToDataMenu}>Menú</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleCreate}>Nueva cuenta</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleBanks}>Ver Bancos</button>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='container-fluid'>


                        <div className='row'>


                            {results.map((account) => <Card title={account.Name} caption={account.Number} description={account.BankName}
                                handleEdit={() => { handleModify(account.idAccount, account.Name, account.Number, account.BankName) }} handleDelete={() => { handleDelete(account.idAccount) }} />

                            )}


                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}