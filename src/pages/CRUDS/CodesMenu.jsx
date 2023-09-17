import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function CodesMenu() {
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
            //const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/deleteUser', { id: id });
            setRefresh(refresh + 1);
        } catch (err) {
            console.log(err)
        }
    };

    const handleModify = (id, name, code, description) => {
        navigate("/CodesForm", { state: { mode: 'edit', id: id, name: name, code: code, description: description, user: state.name, idUser: state.idUser, password: state.password } });
    };

    const handleCreate = () => {
        navigate("/CodesForm", { state: { mode: 'create', user: state.name, idUser: state.idUser, password: state.password } });
    };

    const goToDataMenu = () => {
        navigate("/dataMenu", { state });
    };

    useEffect(() => {
        if (state == null) {
            navigate('/')
        }
        else {
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getCodes')
                .then((response) => setDataR(response.data))
            console.log(dataR);
        }

    }, [refresh]);





    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div className='input_symbol'>


                            <input className='search-space' placeholder='Buscar por nombre' type="text" value={search} onChange={searcher} />
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <button className='back-button' onClick={goToDataMenu}>Menú</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleCreate}>Nuevo código</button>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='container-fluid'>


                        <div className='row'>

                            {results.map((code) => <Card title={code.Name} caption={code.Code} description={code.Description}
                                handleEdit={() => { handleModify(code.idAccountingCodes, code.Name, code.Code, code.Description) }} handleDelete={() => { handleDelete(code.idAccountingCodes) }} />

                            )}


                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}