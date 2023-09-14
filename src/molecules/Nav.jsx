import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";

import './Nav.css';
//import logo from "../resources/logo.jpg"
import { useLocation, useNavigate } from 'react-router';


export default function Nav() {
    const location = useLocation(),
        navigate = useNavigate(),
        [name,setName] = useState("patroclo"),
        [menuName,setMenuName] = useState('Menu patroclo');


        useEffect(() => {
            console.log('SE EJECUTA');
            console.log(location.pathname);
            setName((localStorage.getItem('name')).replace(/"/g, ''));
            setMenuName((localStorage.getItem('menuName')).replace(/"/g, ''));
            

        },[location]);





    return (
        <Fragment>
            <nav className='nav'>

                <div className='nav-container container-fluid'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label style={{width:100+"%"}} >{menuName}</label>
                        </div>

                        <div className='col-md-6'>
                            <div className=' name-container'>
                                <label >{name}</label>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
            <Outlet />
        </Fragment>
    )
}