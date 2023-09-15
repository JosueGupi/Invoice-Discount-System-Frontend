import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function UserMenu() {
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
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/deleteUser', { idUser: id });
            setRefresh(refresh+1);
        } catch (err) {
            console.log(err)
        }

    };
    const goToDataMenu = () => {
        navigate("/dataMenu");

    };

    const handleModify = (id, username, email) => {
        // Implementar la lógica de modificación aquí
        navigate("/userForm", { state: { mode: 'edit', id: id, username: username, email: email } });
    };

    const handleCreate = () => {
        // Implementar la lógica de creación aquí
        navigate("/userForm", { state: { mode: 'create' } });
    };
    useEffect(() => {
        axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/getUsers')
            .then((response) => setDataR(response.data))

    }, [refresh]);





    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div>

                            <input className='search-space ' placeholder='Buscar por nombre' type="text" value={search} onChange={searcher} />
                            <button className='back-button' onClick={goToDataMenu}>Menú</button>
                            <br />
                            <br />
                            <button className='create-button' onClick={handleCreate}>Nuevo usuario</button>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='container-fluid'>


                        <div className='row'>



                            {results.map((user) => <Card title={user.Name} caption={user.Email} description={user.Password}
                                handleEdit={() => { handleModify(user.idUser, user.Name, user.Email) }} handleDelete={() => { handleDelete(user.idUser) }} />

                            )}







                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}