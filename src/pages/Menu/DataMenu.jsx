import React, { Fragment } from 'react'

import './Menu.css';

import { useNavigate } from 'react-router-dom';



export function DataMenu() {
    const navigate = useNavigate();


    



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
                                <input className="form-button-menu" type="button" value="CRUD 1"  />
                                <br />
                                <br />
                                <br />
                                <br />

                                <input className="form-button-menu" type="button" value="CRUD 2" />
                                <br />
                                <br />
                                <br />
                                <br />
                                <input className="form-button-menu" type="button" value="CRUD 3" />
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