import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';




export function AllMovements() {
    const navigate = useNavigate();

    const [dataR, setDataR] = useState([]);

    const { state } = useLocation()

    useEffect(() => {
        /*const fetchData = async () => {
            try {
                const response = await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/charts/getClientDeb');
                setDataR(response.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();*/
    }, []);




    const goToDataMenu = () => {
        navigate("/showDataMenu", { state });
    };

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div>
                    <br />
                    <br />
                    <button className='back-button' onClick={goToDataMenu}>Atras</button>

                    <h1>hola</h1>

                </div>
            </div>
        </Fragment>
    )
}