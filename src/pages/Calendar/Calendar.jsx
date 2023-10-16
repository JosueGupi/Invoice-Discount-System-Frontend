import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import './Calendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es'; //Calendar in spanish


export function Calendar() {
    const navigate = useNavigate();
    const { state } = useLocation(),
        [events, setEvents] = useState([]),
        goToMainMenu = () => {
            localStorage.setItem('menuName', JSON.stringify('Menú de ver datos'));
            navigate("/showDataMenu", { state });
        };
    localStorage.setItem('menuName', JSON.stringify('Fechas de pago'));


    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/calendarOperations')
                .then((response) => setEvents(response.data))

            console.log(events)
        }
    
    
    }, []);


    return (
        <Fragment>
            <div className="backgroundColor">
            <br />
            <button className='back-button' onClick={goToMainMenu}>Menú</button>
            <br/>
            <br/>

            <div className='calendar-box'>  
                <div>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        themeSystem="Simplex"
                        plugins={[dayGridPlugin]}
                        events={events}
                        locale={esLocale}
                    />
                </div>
            </div>
            
                
            </div>
        </Fragment>
    
    );
  }