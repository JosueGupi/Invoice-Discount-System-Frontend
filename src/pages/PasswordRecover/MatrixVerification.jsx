import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './PasswordRecover.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';



export function MatrixVerification() {
    
    const { register, handleSubmit } = useForm(),
        {state} = useLocation(),
        navigate = useNavigate(),
        [cord1,setCord1] = useState(0),
        [cord2,setCord2] = useState(0),
        [cord3,setCord3] = useState(0),
        [username,setUsername] = useState(),
        [idUser,setIdUser] = useState();
        useEffect(() => {
            let xCords = ['A', 'B', 'C', 'D', 'E'],
                yCords = [1, 2, 3, 4, 5];
            var xCord1,yCord1,xCord2,yCord2,xCord3,yCord3;
            xCord1 = Math.floor(Math.random() * 5);
            yCord1 = Math.floor(Math.random() * 5)
            xCord2 = Math.floor(Math.random() * 5)
            yCord2 = Math.floor(Math.random() * 5)
            xCord3 = Math.floor(Math.random() * 5)
            yCord3 = Math.floor(Math.random() * 5)
            
            setCord1(xCords[xCord1]+''+yCords[yCord1]);
            setCord2(xCords[xCord2]+''+yCords[yCord2]);
            setCord3(xCords[xCord3]+''+yCords[yCord3]);
            
            if (state == null){
                navigate('/')
            }else{
                setUsername(state.user);
                setIdUser(state.idUser);
            }
            

        },[]);
    

    const onSubmit = async (data) => {
        try {
            data.cord1Showed = cord1;
            data.cord2Showed = cord2;
            data.cord3Showed = cord3;
            data.idUser = idUser
            
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/users/evalMatrix',data);
            
            if(response.data === 0){
                navigate('/newPassword',{state:{user:username, idUser:idUser}});
            }
            else{
                alert('Las claves son incorrectas, por favor vuelva a digitar los valores')
            }
            

        } catch (err) {
            alert('Error del servidor')
        }
    }



    return (
        <Fragment >
            <div className='backgroundColor'>
                <center>
                    <div className='container'>
                        <div className="submit-matrix-box">
                            <h1>Hola {username}</h1>
                            <h3>Por favor ingresa los siguientes valores según la tarjeta que se le fue facilitada</h3>
                            <br />
                            <br />

                            <div className='row'>
                                <div className='col-md-4'>
                                    <h1>{cord1}</h1>
                                </div>
                                <div className='col-md-4'>
                                    <h1>{cord2}</h1>
                                </div>
                                <div className='col-md-4'>
                                    <h1>{cord3}</h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <input className="matrix-input" type="number" min='0' max='99'

                                            {...register('cord1', { required: true })}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <input className="matrix-input" type="number" min='0' max='99'

                                            {...register('cord2', { required: true })}
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <input className="matrix-input" type="number" min='0' max='99'

                                            {...register('cord3', { required: true })}
                                        />
                                    </div>

                                </div>
                                <br />
                                <br />


                                <center>
                                    <input className="form-button" type="submit" value="Enviar información" />
                                </center>
                            </form>



                        </div>
                    </div>
                </center>
            </div>
        </Fragment>
    )
}