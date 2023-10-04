import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'


import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'


export function InvoiceForm() {
    const navigate = useNavigate(),
    { state } = useLocation(),
    [invoices, setInvoices] = useState([]),
    [reductions, setReductions] = useState([]),
    [codes, setCodes] = useState([]),
    [clients, setClients] = useState([]),
    [totalTransfer, setTotalTransfer] = useState([]),
    [subTotalTransfer, setSubTotalTransfer] = useState([]),
    [months, setMonths] = useState([]),
    invoiceNumberRef = useRef(),
    invoicePayerRef = useRef(),
    invoiceAmountRef = useRef(),
    invoiceDateRef = useRef(),
    reductionNumberRef = useRef(),
    reductionCodeRef = useRef(),
    reductionAmountRef = useRef(),
    reductionDescriptionRef = useRef(),
    costRef = useRef(0),
    honorariesRef = useRef(0),
    comissionsRef = useRef(0),
    interestRef = useRef(0),
    termRef = useRef(),
    rentTaxRef = useRef(0);

    function obtainDates(term) {
        const result = [];
        let dateInfo = new Date();
      
        while (term > 0) {
          const month = dateInfo.toLocaleString('default', { month: 'long' });
          const daysMonth = new Date(dateInfo.getFullYear(), dateInfo.getMonth() + 1, 0).getDate();
      
          // Calcular cuántos días quedan en este mes sin pasar al siguiente
          const daysInMonth = daysMonth - dateInfo.getDate() + 1;
      
          // Determinar cuántos días se pueden tomar en este mes
          const takenDays = Math.min(term, daysInMonth);
      
          result.push({ month:month, days: takenDays, interest:0 });
      
          // Restar los días tomados de la cantidad total de días
          term -= takenDays;
      
          // Avanzar al siguiente mes
          dateInfo.setMonth(dateInfo.getMonth() + 1, 1);
        }
      
        return result;
      }


    const goToFormMenu = () => {
        localStorage.setItem('menuName', JSON.stringify('Menú Principal'));
        navigate("/formMenu", { state });
    },
        testClick = () => {
            console.log('CLick')
        },
        addInvoice = (event) => {
            const newInvoiceNumber =  invoiceNumberRef.current.value,
            newInvoicePayer = invoicePayerRef.current.value,
            newInvoiceAmount = invoiceAmountRef.current.value,
            newInvoiceDate = invoiceDateRef.current.value;

            if (newInvoiceNumber === '' || newInvoicePayer === '' || newInvoiceAmount === '' || newInvoiceDate === ''){
                return;
            }
            setInvoices((prevInvoices)=> {
                return [...prevInvoices,{number: newInvoiceNumber, amount: newInvoiceAmount, date:newInvoiceDate,payer:newInvoicePayer}];
            })
            invoiceNumberRef.current.value = null;
            invoicePayerRef.current.value = null;
            invoiceAmountRef.current.value = null;
            invoiceDateRef.current.value = null;
           
        },
        cleanInvoices = (event) =>{
            setInvoices([]);
        },
        addReductions = (event) => {
            

            const newReductionNumber = reductionNumberRef.current.value,
            newReductionCode = reductionCodeRef.current.value,
            newReductionAmount = reductionAmountRef.current.value,
            newReductionDescription = reductionDescriptionRef.current.value;

            if (newReductionNumber === '' || newReductionAmount === '' ){
                return;
            }
            setReductions((prevReductions)=> {
                return [...prevReductions,{number: newReductionNumber, code: newReductionCode, amount:newReductionAmount,description:newReductionDescription}];
            })
            reductionNumberRef.current.value = null;
            reductionCodeRef.current.value = null;
            reductionAmountRef.current.value = null;
            reductionDescriptionRef.current.value = null;
            
            
        },
        cleanReductions = (event) =>{
            setReductions([]);
        },
        updateTotals = () =>{
            console.log('update')
            let total = 0, 
            subTotal = 0;
            const cost = Number(costRef.current.value),
                honoraries = Number(honorariesRef.current.value),
                comission = Number(comissionsRef.current.value),
                interest = Number(interestRef.current.value),
                rentTax = Number(rentTaxRef.current.checked),
                term = Number(termRef.current.value);

               
            for(let i = 0; i < invoices.length; i++){
                
                total += Number(invoices[i].amount);
            }
            let totalInterest = (((interest/100)/30)*term*total);
            total -= (cost 
            + honoraries
            +((comission/100)*total)
            +totalInterest
            +(rentTax*0.02*total));
            setTotalTransfer(total);
            
            subTotal = total;
            for(let i = 0; i < reductions.length; i++){
                subTotal -= Number(reductions[i].amount);
            }
            setSubTotalTransfer(subTotal);
            let interestList = obtainDates(term);

            for(let i = 0; i < interestList.length; i++){
                interestList[i].interest = (interestList[i].days / term) * totalInterest; 
            }
            setMonths(interestList);

        };
        
    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getCodes')
                .then((response) => setCodes(response.data))
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                .then((response) => setClients(response.data))
        }


    }, []);

    useEffect(() => {updateTotals()}, [invoices, reductions]); 

    



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
                                <div className='col-2'>
                                    <input className='form-input-space' placeholder='No. Operación' type="number" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Cliente</h2>
                                </div>
                                <div className='col-2'>
                                    <select className='form-input-space' >
                                    <option value="none" selected disabled hidden>Cliente</option>
                                        {clients.map((client)=> <option value={client.idClient}>{client.Name}</option>)}
                                    </select>
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Código Contable</h2>
                                </div>
                                <div className='col-2'>
                                    <select className='form-input-space' >
                                    <option value="none" selected disabled hidden>Código</option>
                                        {codes.map((code)=> <option value={code.Code}>{code.Code}</option>)}
                                        
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
                                    <input className='form-input-space' ref={invoiceNumberRef} placeholder='No. Factura' type="text" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' ref={invoiceDateRef}placeholder='Fecha' type="date" />
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Monto</h2>
                                    <br />
                                    <br />
                                    <h2 className='form-subtitle'>Pagador</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' ref={invoiceAmountRef} placeholder='Monto' type="number" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' ref={invoicePayerRef} placeholder='Pagador' type="text" />
                                </div>
                                <div className='col-1'>
                                    <button className='form-button-space' type="button" onClick={addInvoice} >Agregar</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className='form-button-space' type="button" onClick={cleanInvoices} >Limpiar</button>
                                </div>
                                <div className='col-4'>
                                    <div className='scroll-table2'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th className="th-sm">No. Factura
                                                    </th>
                                                    <th className="th-sm">Fecha
                                                    </th>
                                                    <th className="th-sm">Monto
                                                    </th>
                                                    <th className="th-sm">Pagador
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoices.map((invoice) =>
                                                    <tr>
                                                        <td>{invoice.number}</td>
                                                        <td>{invoice.date}</td>
                                                        <td>{invoice.amount}</td>
                                                        <td>{invoice.payer}</td>
                                                    </tr>

                                                )}
                                              
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
                                    <input className='form-input-space' placeholder='Costo' type="number" ref={costRef} onChange={updateTotals}/>
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Honorarios</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Honorarios' type="number" ref={honorariesRef} onChange={updateTotals}/>
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Comisión</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Comisión' type="number" ref={comissionsRef} onChange={updateTotals}/>
                                </div>

                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Intereses</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Intereses' type="number" ref={interestRef} onChange={updateTotals}/>
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Plazo</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' placeholder='Plazo' type="number" ref={termRef} onChange={updateTotals}/>
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Impuesto de Renta</h2>
                                </div>
                                <div className='col-1'>
                                    <input className='form-input-space' type="checkbox" ref={rentTaxRef} onChange={updateTotals}/>
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
                                    <select className='form-input-space' ref={reductionNumberRef}>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <select className='form-input-space' ref={reductionCodeRef} >
                                    <option value="none" selected disabled hidden>Código</option>
                                        {codes.map((code)=> <option value={code.Code}>{code.Code}</option>)}
                                      
                                    </select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <input className='form-input-space' placeholder='Monto' type="number" ref={reductionAmountRef}/>
                                </div>
                                <div className='col-2'>
                                    <textarea className='form-text-area-space' placeholder='Descripción' type="text" ref={reductionDescriptionRef}></textarea>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className='form-button-space' type="button" onClick={addReductions} >Agregar</button>
                                </div>
                                <div className='col-3'>
                                    <div className='scroll-table'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th className="th-sm">No. Operacion
                                                    </th>
                                                    <th className="th-sm">Código
                                                    </th>
                                                    <th className="th-sm">Monto
                                                    </th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                            {reductions.map((reduction) =>
                                                    <tr>
                                                        <td>{reduction.number}</td>
                                                        <td>{reduction.code}</td>
                                                        <td>{reduction.amount}</td>
                                                       
                                                    </tr>

                                                )}

                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='scroll-table'>
                                        <table className='table table-striped' width="100%">
                                            <thead className='table-own'>
                                                <tr>
                                                    <th className="th-sm">Mes
                                                    </th>
                                                    <th className="th-sm">Monto
                                                    </th>



                                                </tr>
                                            </thead>
                                            <tbody>
                                            {months.map((month) =>
                                                    <tr>
                                                        <td>{month.month}</td>
                                                        <td>{month.interest.toFixed(2)}</td>
                                                    </tr>

                                                )}
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
                                    <input className='form-input-space' placeholder='Sub-total' type="number" value={totalTransfer}/>
                                </div>
                                <div className='col-1'>
                                    <h2 className='form-subtitle'>Total</h2>
                                </div>
                                <div className='col-2'>
                                    <input className='form-input-space' placeholder='Total' type="number" value={subTotalTransfer}/>
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