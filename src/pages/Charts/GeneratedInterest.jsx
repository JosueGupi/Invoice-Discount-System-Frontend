import React, { Fragment, useEffect, useState, useRef } from 'react'
import './Charts.css';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



export function GeneratedInterest() {
    const navigate = useNavigate();

    const [dataR, setDataR] = useState([]);
    const [myChart, setMyChart] = useState(null);
    const chartRef = useRef(null);

    const { state } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/charts/getMonthlyInterest');
                console.log(response.data);
                setDataR(response.data);
                renderChart(response.data);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        };

        fetchData();
    }, []);

    const renderChart = (data) => {
        console.log(data);
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (!myChart) {
                // Crear un nuevo gráfico si aún no existe
                const newChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: data.map(item => item.month),
                        datasets: [{
                            label: 'Intereses Generados',
                            data: data.map(item => item.interest),
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
                setMyChart(newChart);
            } else {
                // Actualizar los datos del gráfico existente
                myChart.data.labels = data.map(item => item.Name);
                myChart.data.datasets.forEach((dataset) => {
                    dataset.data = data.map(item => item.totalBalance);
                });
                myChart.update();
            }
        }
    };


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

                    <div className='chart-container'>
                        <div className='my-chart'>
                            <canvas ref={chartRef} id="myChart"></canvas>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}