import React, { Fragment, useEffect, useState } from 'react'

import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function AccountForm() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState("edit"),
        [number, setNumber] = useState(""),
        [owner, setOwner] = useState(""),
        [idAccount, setIdAccount] = useState(0),
        [bank, setBank] = useState(""),
        [bankOptions, setBankOptions] = useState([]),
        [clientOptions, setClientOptions] = useState([]);




    const onSubmit = async (data) => {
        try {
            console.log(data);
            if (mode === "edit") {
                data.idAccount = idAccount;
                
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/accounts/updateAccount', data);
                alert('Se actualizo la cuenta correctamente');
                navigate('/accountMenu',{state});
            } else {
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/accounts/createAccount', data);
                alert('Se creo la cuenta correctamente');
                navigate('/accountMenu',{state});
            }
        } catch (err) {
            alert(err, 'Error');
        }
    }
    const goToAccountMenu = () => {
        navigate("/accountMenu",{state});

    };
    useEffect(() => {
        if (state == null) {
            navigate('/');
        } else {
            setMode(state.mode);
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/banks/getBanks')
                .then((response) => setBankOptions(response.data));
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                .then((response) => setClientOptions(response.data));
            

            if (state.mode === "edit") {
                setIdAccount(state.id)
                setNumber(state.number);
                setOwner(state.owner);
                setBank(state.bank);

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
                            <button className='back-button' onClick={goToAccountMenu}>Atras</button>

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
                                        placeholder="No. de Cuenta"
                                        maxLength="32"
                                        defaultValue={number}

                                        {...register('number', { required: true })}
                                    />
                                    <br />
                                    <br />
                                    <br />

                                    <select className="form-input"
                                        placeholder="Banco"

                                        {...register('idBank', { required: true })}>
                                        <option  value="none" selected disabled hidden>Banco</option>
                                        {bankOptions.map((bank) => <option value={bank.idBank}>{bank.Name}</option>)}

                                    </select>

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