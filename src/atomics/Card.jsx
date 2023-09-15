import React, { Fragment } from 'react';
import './Card.css';

function Card({ title, caption, description, handleEdit, handleDelete }) {

    return (
        <Fragment>

            <div className='col-xl-3'>
                <div className='tarjeta'>
                    <center>
                        <h2>{title}</h2>
                        <p>{caption}</p>
                        <p>{description}</p>
                        <button onClick={handleEdit} >Modificar</button>
                        <button onClick={handleDelete} >Eliminar</button>
                    </center>
                </div>
            </div>

        </Fragment>
    )
}

export default Card