import React, { Fragment, useEffect } from 'react'



import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'


export function InvoiceForm() {
    const navigate = useNavigate();
    const { state } = useLocation()

    const goToInvoiceForm = () => {

        navigate('/clientMenu', { state });
    },
        goToFormMenu = () => {
            localStorage.setItem('menuName', JSON.stringify('Menú Principal'));
            navigate("/formMenu", { state });
        },
        testClick = () => {
            console.log('CLick')
        };
    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {

        }


    }, []);



    return (
        <Fragment >
            <div className='backgroundColor'>
                <br />
                <button className='back-button' onClick={goToFormMenu}>Atras</button>

                <div className='container-fluid big-container'>
                    <div className='form-container'>
                        <form action="">
                            <div className='row'>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>No. Operación</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='No. Operación' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Cliente</h2>
                                </div>
                                <div className='col-1'>
                                    <select className='form-input-space' >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Código Contable</h2>
                                </div>
                                <div className='col-1'>
                                    <select className='form-input-space' >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Dólares</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' type="checkbox" />
                                </div>

                            </div>
                            <br />
                            <div className='row'>
                                <h1 className='form-title'>Agregar Facturas</h1>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>No. Factura</h2>
                                    <br />
                                    <h2 className='form-subtitle'>Fecha</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='No. Factura' type="text" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' placeholder='Fecha' type="date" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Monto</h2>
                                    <br />
                                    <br />
                                    <h2 className='form-subtitle'>Pagador</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Monto' type="number" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' placeholder='Pagador' type="text" />
                                </div>
                                <div className='col-1'>
                                    <button className='form-button-space' type="button" onClick={testClick} >Agregar</button>
                                </div>
                                <div className='col-4'>
                                    <div className='scroll-table2'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th class="th-sm">No. Factura
                                                    </th>
                                                    <th class="th-sm">Fecha
                                                    </th>
                                                    <th class="th-sm">Monto
                                                    </th>
                                                    <th class="th-sm">Pagador
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Tiger Nixon</td>
                                                    <td>System Architect</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Garrett Winters</td>
                                                    <td>Accountant</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Ashton Cox</td>
                                                    <td>Junior Technical Author</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Cedric Kelly</td>
                                                    <td>Senior Javascript Developer</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Airi Satou</td>
                                                    <td>Accountant</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Brielle Williamson</td>
                                                    <td>Integration Specialist</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Herrod Chandler</td>
                                                    <td>Sales Assistant</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Rhona Davidson</td>
                                                    <td>Integration Specialist</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Colleen Hurst</td>
                                                    <td>Javascript Developer</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Sonya Frost</td>
                                                    <td>Software Engineer</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Jena Gaines</td>
                                                    <td>Office Manager</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Quinn Flynn</td>
                                                    <td>Support Lead</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Charde Marshall</td>
                                                    <td>Regional Director</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Haley Kennedy</td>
                                                    <td>Senior Marketing Designer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Tatyana Fitzpatrick</td>
                                                    <td>Regional Director</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Michael Silva</td>
                                                    <td>Marketing Designer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Paul Byrd</td>
                                                    <td>Chief Financial Officer (CFO)</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Gloria Little</td>
                                                    <td>Systems Administrator</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Bradley Greer</td>
                                                    <td>Software Engineer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Dai Rios</td>
                                                    <td>Personnel Lead</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Jenette Caldwell</td>
                                                    <td>Development Lead</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Yuri Berry</td>
                                                    <td>Chief Marketing Officer (CMO)</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Caesar Vance</td>
                                                    <td>Pre-Sales Support</td>
                                                    <td>New York</td>


                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                            </div>
                            <br />

                            <br />
                            <div className='row'>
                                <center>
                                    <div className='grand-line'></div>
                                </center>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Costo de Depósito </h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Costo' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Honorarios</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Honorarios' type="number" />
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Comisión</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Comisión' type="number" />
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Intereses</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Intereses' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Plazo</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Plazo' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Impuesto de Renta</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' type="checkbox" />
                                </div>

                            </div>
                            <br />
                            <div className='row'>
                                <center>
                                    <div className='grand-line'></div>
                                </center>
                            </div>
                            <br />
                            <div className='row'>
                                <h1 className='form-title'>Agregar Deducciones</h1>
                            </div>
                            <br />


                            <div className='row'>
                                <div className='col-2'>
                                    <h2 className='form-subtitle'>No. de Operación</h2>
                                    <br />
                                    <br />
                                    <h2 className='form-subtitle'>Código Contable</h2>
                                    <br />
                                    <br />
                                    <h2 className='form-subtitle'>Monto</h2>

                                </div>
                                <div className='col-2'>
                                    <select className='form-input-space' >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <select className='form-input-space' >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' placeholder='Monto' type="number" />
                                </div>
                                <div className='col-2'>
                                    <textarea className='form-text-area-space' placeholder='Descripción' type="text" ></textarea>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className='form-button-space' type="button" onClick={testClick} >Agregar</button>
                                </div>
                                <div className='col-3'>
                                    <div className='scroll-table'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th class="th-sm">No. Operacion
                                                    </th>
                                                    <th class="th-sm">Código
                                                    </th>
                                                    <th class="th-sm">Monto
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Tiger Nixon</td>
                                                    <td>System Architect</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Garrett Winters</td>
                                                    <td>Accountant</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Ashton Cox</td>
                                                    <td>Junior Technical Author</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Cedric Kelly</td>
                                                    <td>Senior Javascript Developer</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Airi Satou</td>
                                                    <td>Accountant</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Brielle Williamson</td>
                                                    <td>Integration Specialist</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Herrod Chandler</td>
                                                    <td>Sales Assistant</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Rhona Davidson</td>
                                                    <td>Integration Specialist</td>
                                                    <td>Tokyo</td>


                                                </tr>
                                                <tr>
                                                    <td>Colleen Hurst</td>
                                                    <td>Javascript Developer</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Sonya Frost</td>
                                                    <td>Software Engineer</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Jena Gaines</td>
                                                    <td>Office Manager</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Quinn Flynn</td>
                                                    <td>Support Lead</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Charde Marshall</td>
                                                    <td>Regional Director</td>
                                                    <td>San Francisco</td>


                                                </tr>
                                                <tr>
                                                    <td>Haley Kennedy</td>
                                                    <td>Senior Marketing Designer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Tatyana Fitzpatrick</td>
                                                    <td>Regional Director</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Michael Silva</td>
                                                    <td>Marketing Designer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Paul Byrd</td>
                                                    <td>Chief Financial Officer (CFO)</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Gloria Little</td>
                                                    <td>Systems Administrator</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Bradley Greer</td>
                                                    <td>Software Engineer</td>
                                                    <td>London</td>


                                                </tr>
                                                <tr>
                                                    <td>Dai Rios</td>
                                                    <td>Personnel Lead</td>
                                                    <td>Edinburgh</td>


                                                </tr>
                                                <tr>
                                                    <td>Jenette Caldwell</td>
                                                    <td>Development Lead</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Yuri Berry</td>
                                                    <td>Chief Marketing Officer (CMO)</td>
                                                    <td>New York</td>


                                                </tr>
                                                <tr>
                                                    <td>Caesar Vance</td>
                                                    <td>Pre-Sales Support</td>
                                                    <td>New York</td>


                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='scroll-table'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th class="th-sm">Mes
                                                    </th>
                                                    <th class="th-sm">Monto
                                                    </th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Tiger Nixon</td>
                                                    <td>System Architect</td>



                                                </tr>
                                                <tr>
                                                    <td>Garrett Winters</td>
                                                    <td>Accountant</td>



                                                </tr>
                                                <tr>
                                                    <td>Ashton Cox</td>
                                                    <td>Junior Technical Author</td>



                                                </tr>
                                                <tr>
                                                    <td>Cedric Kelly</td>
                                                    <td>Senior Javascript Developer</td>



                                                </tr>
                                                <tr>
                                                    <td>Airi Satou</td>
                                                    <td>Accountant</td>



                                                </tr>
                                                <tr>
                                                    <td>Brielle Williamson</td>
                                                    <td>Integration Specialist</td>



                                                </tr>
                                                <tr>
                                                    <td>Herrod Chandler</td>
                                                    <td>Sales Assistant</td>



                                                </tr>
                                                <tr>
                                                    <td>Rhona Davidson</td>
                                                    <td>Integration Specialist</td>



                                                </tr>
                                                <tr>
                                                    <td>Colleen Hurst</td>
                                                    <td>Javascript Developer</td>



                                                </tr>
                                                <tr>
                                                    <td>Sonya Frost</td>
                                                    <td>Software Engineer</td>



                                                </tr>
                                                <tr>
                                                    <td>Jena Gaines</td>
                                                    <td>Office Manager</td>



                                                </tr>
                                                <tr>
                                                    <td>Quinn Flynn</td>
                                                    <td>Support Lead</td>



                                                </tr>
                                                <tr>
                                                    <td>Charde Marshall</td>
                                                    <td>Regional Director</td>



                                                </tr>
                                                <tr>
                                                    <td>Haley Kennedy</td>
                                                    <td>Senior Marketing Designer</td>



                                                </tr>
                                                <tr>
                                                    <td>Tatyana Fitzpatrick</td>
                                                    <td>Regional Director</td>



                                                </tr>
                                                <tr>
                                                    <td>Michael Silva</td>
                                                    <td>Marketing Designer</td>



                                                </tr>
                                                <tr>
                                                    <td>Paul Byrd</td>
                                                    <td>Chief Financial Officer (CFO)</td>



                                                </tr>
                                                <tr>
                                                    <td>Gloria Little</td>
                                                    <td>Systems Administrator</td>



                                                </tr>
                                                <tr>
                                                    <td>Bradley Greer</td>
                                                    <td>Software Engineer</td>



                                                </tr>
                                                <tr>
                                                    <td>Dai Rios</td>
                                                    <td>Personnel Lead</td>



                                                </tr>
                                                <tr>
                                                    <td>Jenette Caldwell</td>
                                                    <td>Development Lead</td>



                                                </tr>
                                                <tr>
                                                    <td>Yuri Berry</td>
                                                    <td>Chief Marketing Officer (CMO)</td>



                                                </tr>
                                                <tr>
                                                    <td>Caesar Vance</td>
                                                    <td>Pre-Sales Support</td>



                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>
                                </div>

                            </div>
                            <br />
                            <div className='row'>
                                <center>
                                    <div className='grand-line'></div>
                                </center>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Sub-total </h2>
                                </div>
                                <div className='col-2'>
                                    <input className='form-input-space' placeholder='Sub-total' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Total</h2>
                                </div>
                                <div className='col-2'>
                                    <input className='form-input-space' placeholder='Total' type="number" />
                                </div>
                                <div className='col-2'>
                                    <button className='form-button-space' type="button" onClick={testClick} >Guardar</button>
                                </div>
                            </div>
                        </form>



                    </div>
                </div>

            </div>

        </Fragment>
    )
}