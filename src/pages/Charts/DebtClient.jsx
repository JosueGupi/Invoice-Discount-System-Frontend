import React, { Fragment, useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export function DebtClient() {
    const navigate = useNavigate();

    const { state } = useLocation()

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
                </div>
            </div>
        </Fragment>
    )
}