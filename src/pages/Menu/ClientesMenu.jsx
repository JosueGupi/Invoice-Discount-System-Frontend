import React, { Fragment } from 'react'

import './Menu.css';

import { useNavigate } from 'react-router-dom';



export function ClientesMenu() {
    const navigate = useNavigate();





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

                        <br />
                        <br />
                        <br />

                        <center>
                            <div className="col-md-5">
                                {/*Agregar despues un map para que itere por todos los clientes*/}

                                <div key={1} className="person-box">
                                    <h2>Nombre</h2>
                                    <p>Cédula</p>
                                    <p>Correo</p>
                                    <button onClick={() => handleModify(1)}>Modificar</button>
                                    <button onClick={() => handleDelete(1)}>Eliminar</button>
                                </div>

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