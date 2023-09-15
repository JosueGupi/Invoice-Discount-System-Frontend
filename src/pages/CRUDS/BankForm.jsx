import React, { Fragment, useEffect, useState } from 'react'
import Card from '../../atomics/Card';
import './Cruds.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function BankForm() {
    const navigate = useNavigate();

    const { state } = useLocation()
    const { register, handleSubmit } = useForm();
    const [mode, setMode] = useState("edit"),
        [idBank,setIdBank] = useState(0),
        [bank,setBank] = useState("");




    const onSubmit = async (data) => {
        try {
            if(mode === "edit") {
                data.idBank = idBank;
                console.log(data)
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/banks/updateBank',data);
                alert('Se actualizo el banco correctamente');
                navigate('/bankMenu');
            }else{
                const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/banks/createBank',data);
                alert('Se creo el banco correctamente');
                navigate('/bankMenu');
            }
        } catch (err) {
            alert(err, 'Error');
        }
    }
    const goToBankMenu = () => {
        navigate("/bankMenu");

    };
    useEffect(() => {
        if (state == null){
            navigate('/');
        }else{
            setMode(state.mode);
            
            if(state.mode === "edit"){
                setIdBank(state.id);
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
                            <button className='back-button' onClick={goToBankMenu}>Atras</button>

                        </div>
                    </div>
                    <center>
                        <div className='form-box'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <center>

                                    <input className="form-input" type="text"
                                        placeholder="Nombre"
                                        defaultValue={bank}
                                        {...register('name', { required: true })}
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