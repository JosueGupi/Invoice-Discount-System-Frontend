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
        searcher = (e) => {
            setSearch(e.target.value)
        }
        , results = !search ? dataR: dataR.filter((customer) => customer.Name.toLowerCase().includes(search.toLocaleLowerCase()));

    useEffect(() => {
        axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/getUsers')
            .then((response) => setDataR(response.data))
            
    }, [])



    const handleDelete = (id) => {
        // Implementar la lógica de delete aquí
        //const updatedPeople = people.filter((person) => person.id !== id);
        //setPeople(updatedPeople);
        alert(`Eliminar cliente con ID ${id}`);
    };

    const handleModify = (id) => {
        // Implementar la lógica de modificación aquí
        alert(`Modificar cliente con ID ${id}`);
    };

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container'>
                    <div className='row'>
                        <input type="text" value={search} onChange={searcher} />
                    </div>
                    <div className='row'>

                        <br />
                        <br />
                        <br />

                        <center>
                            <div className="col-md-5">
                                {results.map((user)=> <Card title={user.Name} caption={user.Email} description={user.Password} 
                                handleEdit={()=>{handleModify(user.idUser)}} handleDelete={()=>{handleDelete(user.idUser)}}/>

)}

                                

                                <br />
                                <br />
                                <br />
                                <br />


                            </div>
                        </center>




                    </div>
                </div>
            </div>

        </Fragment>
    )
}