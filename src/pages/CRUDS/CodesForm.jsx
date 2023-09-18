import React, { Fragment, useEffect, useState } from 'react'

import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function CodesForm() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState("edit"),
        [name, setName] = useState(""),
        [code, setCode] = useState(""),
        [description, setDescription] = useState(""),
        [idenCard, setIdenCard] = useState(""),
        [idAccountingCodes, setIdAccountingCodes] = useState(0),
        [clientOptions, setClientOptions] = useState([]);



    const onSubmit = async (data) => {
        try {
            if (mode === "edit") {
                data.idAccountingCodes = idAccountingCodes;
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/updateCode', data);
                alert('Se actualizo el código correctamente');
                navigate('/codesMenu', { state });
            } else {
                console.log(data)
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/createCode', data);
                alert('Se creo el código correctamente');
                navigate('/codesMenu', { state });
            }
        } catch (err) {
            alert(err, 'Error');
        }
    }
    const goToCodesMenu = () => {
        navigate("/codesMenu", { state });

    };
    useEffect(() => {
        if (state == null) {
            navigate('/');
        } else {
            setMode(state.mode);
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                .then((response) => setClientOptions(response.data));

            if (state.mode === "edit") {
                setIdAccountingCodes(state.id);
                setName(state.name);
                setCode(state.code);
                setDescription(state.description);
            }
        }
    }, [])



    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container-cards'>
                    <div className='row'>
                        <div>


                            <br />
                            <br />
                            <button className='back-button' onClick={goToCodesMenu}>Atras</button>

                        </div>
                    </div>
                    <center>
                        <div className='form-box'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center>

                                    <select className="form-input"
                                        placeholder="Dueño"

                                        {...register('idClient', { required: true })}>
                                        <option value="none" selected disabled hidden>Dueño</option>
                                        {clientOptions.map((owners) => <option value={owners.idClient}>{owners.Name}</option>)}

                                    </select>
                                    <br />
                                    <br />
                                    <br />

                                    <input className="form-input" type="text"
                                        placeholder="Código"
                                        defaultValue={code}
                                        maxLength="32"
                                        {...register('code', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />

                                    <input className="form-input" type="text"
                                        placeholder="Descripción"
                                        defaultValue={description}
                                        maxLength="128"
                                        {...register('description', { required: true })}
                                    />


                                    <br />
                                    <br />
                                    <br />
                                    <input className="form-button" type="submit" value="Guardar" />


                                </center>
                            </form>
                        </div>
                    </center>
                </div>
            </div>

        </Fragment>
    )
}