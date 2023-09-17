import React, { Fragment, useEffect } from 'react'

import './Menu.css';

import { useNavigate, useLocation } from 'react-router-dom';



export function MainMenu() {
    const navigate = useNavigate();
    const { state } = useLocation()

    const goToDataMenu = () => {
        
        localStorage.setItem('menuName',JSON.stringify('Data Menu'));
        console.log('antes de enviar',state)
        navigate('/dataMenu',{state});
      };
      useEffect(() => {
            
         
        if (state == null){
            navigate('/')
        }
        

    },[]);

    return (
        <Fragment >
            <div className='backgroundColor'>
                <div className='container container2'>
                    <div className='row'>




                        <br />
                        <br />
                        <br />


                        <center>
                            <div className="col-md-5">
                                <input className="form-button-menu" type="button" value="Modificar Datos" onClick={goToDataMenu}/>
                                <br />
                                <br />
                                <br />
                                <br />


                                <input className="form-button-menu" type="button" value="Formularios" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="Datos" />
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