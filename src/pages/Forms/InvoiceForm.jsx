import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios'

import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css'


export function InvoiceForm() {
    const navigate = useNavigate(),
        { state } = useLocation(),
        { register, handleSubmit } = useForm(),
        [invoices, setInvoices] = useState([]),
        [reductions, setReductions] = useState([]),
        [codes, setCodes] = useState([]),
        [operations, setOperations] = useState([]),
        [clients, setClients] = useState([]),
        [totalTransfer, setTotalTransfer] = useState(0),
        [subTotalTransfer, setSubTotalTransfer] = useState(0),
        [months, setMonths] = useState([]),
        [clientCodes, setClientCodes] = useState([]),
        [idCodes, setIdCodes] = useState([]),
        [opNumberOg, setOpNumberOg] = useState([]),
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
        rentTaxRef = useRef(0),
        clientIdRef = useRef(0),
        retentionsRef = useRef(0);

    function obtainDates(term) {
        const result = [];
        let dateInfo = new Date();

        while (term > 0) {
            const month = dateInfo.toLocaleString('default', { month: 'long' });
            const daysMonth = new Date(dateInfo.getFullYear(), dateInfo.getMonth() + 1, 0).getDate();
            const daysInMonth = daysMonth - dateInfo.getDate() + 1;
            const takenDays = Math.min(term, daysInMonth);

            result.push({ month: month, days: takenDays, interest: 0 });
            term -= takenDays;
            dateInfo.setMonth(dateInfo.getMonth() + 1, 1);
        }

        return result;
    }


    const goToFormMenu = () => {
        localStorage.setItem('menuName', JSON.stringify('Menú Principal'));
        navigate("/formMenu", { state });
    },

        addInvoice = (event) => {

            const newInvoiceNumber = invoiceNumberRef.current.value,
                newInvoicePayer = invoicePayerRef.current.value,
                newInvoiceAmount = invoiceAmountRef.current.value,
                newInvoiceDate = invoiceDateRef.current.value;
            console.log('Invoice');

            if (newInvoiceNumber === '' || newInvoicePayer === '' || newInvoiceAmount === '' || newInvoiceDate === '') {
                return;
            }
            setInvoices((prevInvoices) => {
                return [...prevInvoices, { number: newInvoiceNumber, amount: newInvoiceAmount, date: newInvoiceDate, payer: newInvoicePayer }];
            })
            invoiceNumberRef.current.value = null;
            invoicePayerRef.current.value = null;
            invoiceAmountRef.current.value = null;
            invoiceDateRef.current.value = null;

        },
        cleanInvoices = (event) => {
            setInvoices([]);
        },
        addReductions = (event) => {


            const newReductionNumber = reductionNumberRef.current.value,
                newReductionCode = reductionCodeRef.current.value,
                newReductionAmount = reductionAmountRef.current.value,
                newReductionDescription = reductionDescriptionRef.current.value;

            if (newReductionNumber === '' || newReductionAmount === '') {
                return;
            }
            setReductions((prevReductions) => {
                return [...prevReductions, { number: newReductionNumber, code: newReductionCode, amount: newReductionAmount, description: newReductionDescription }];
            })
            reductionNumberRef.current.value = null;
            reductionCodeRef.current.value = null;
            reductionAmountRef.current.value = null;
            reductionDescriptionRef.current.value = null;


        },
        cleanReductions = (event) => {
            setReductions([]);
        },
        updateTotals = () => {

            let total = 0,
                subTotal = 0;
            const cost = Number(costRef.current.value),
                honoraries = Number(honorariesRef.current.value),
                comission = Number(comissionsRef.current.value),
                interest = Number(interestRef.current.value),
                rentTax = Number(rentTaxRef.current.checked),
                term = Number(termRef.current.value),
                retentions = Number(retentionsRef.current.value);


            for (let i = 0; i < invoices.length; i++) {

                total += Number(invoices[i].amount);
            }
            let totalInterest = (((interest / 100) / 30) * term * total);
            total -= (cost
                + honoraries
                + ((comission / 100) * total)
                + totalInterest
                + (rentTax * 0.02 * total)
                + ((retentions / 100) * total));


            subTotal = total;
            for (let i = 0; i < reductions.length; i++) {
                total -= Number(reductions[i].amount);
            }
            setSubTotalTransfer(subTotal);
            setTotalTransfer(total);
            let interestList = obtainDates(term);
            let index = 1;
            for (let i = 0; i < interestList.length; i++) {
                interestList[i].interest = (interestList[i].days / term) * totalInterest;
                interestList[i].code = clientCodes[index === 1 ? index : 2]
                index = 0;
            }
            setMonths(interestList);

        },
        getUserCodes = (e) => {
            try {

                const idClient = clientIdRef.current.value,
                    data = { idClient: idClient };

                axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getClientCodes', data)
                    .then((response) => {
                        let codesArray = [0, 0, 0, 0];
                        let idCodesArray = [0, 0, 0, 0];

                        for (let i = 0; i < response.data[0].length; i++) {
                            codesArray[response.data[0][i].CodeType] = response.data[0][i].Code;
                            idCodesArray[response.data[0][i].CodeType] = response.data[0][i].idAccountingCodes
                        }
                        console.log("codesArray", codesArray)
                        setClientCodes(codesArray);
                        setIdCodes(idCodesArray)
                    })
            } catch (err) {
                console.log(err)
            }

        },
        saveCesion = () => {
            // save cesion 
            // ???

            // navigate to pdfmenu
            navigate("/pdfMenu", { state });
        };

    useEffect(() => {


        if (state == null) {
            navigate('/')
        } else {
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/codes/getCodes')
                .then((response) => setCodes(response.data))
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/clients/getClients')
                .then((response) => setClients(response.data))
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/getLastNumberOP')
                .then((response) => setOpNumberOg(response.data[0].opNumber))
            axios.get('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/getOperations')
                .then((response) => setOperations(response.data))
        }


    }, []);

    useEffect(() => { updateTotals() }, [invoices, reductions]);
    const onSubmit = async (data, event) => {



        data.idClient = clientIdRef.current.value;
        data.transferCost = costRef.current.value;
        data.honoraries = honorariesRef.current.value;
        data.comission = comissionsRef.current.value;
        data.interest = interestRef.current.value;
        data.term = termRef.current.value;
        data.fee = rentTaxRef.current.checked;
        data.total = totalTransfer;
        data.subTotal = subTotalTransfer;
        data.reductions = reductions;
        data.invoices = invoices;
        data.retention = retentionsRef.current.value;
        data.comissionCode = idCodes[0];
        data.retentionCode = idCodes[3];
        data.realInterestCode = idCodes[1];
        data.deferredInterestCode = idCodes[2];
        console.log("aqui", data);

        try {
            const response = await axios.post('https://inversiones-ellens-7b3ebbfa2822.herokuapp.com/operations/createOperation', data)
            console.log(response, response);
            //navigate('/userMenu',{state});
        } catch (err) {

        }
    }




    return (
        <Fragment>
            <div className='backgroundColor'>
                <br />
                <button className='back-button' onClick={goToFormMenu}>Atras</button>

                <div className='container-fluid big-container'>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit(onSubmit)}>



                            <div className='form-grid'>
                                <h2 for="nOperacion" className='form-subtitle'>No. Operación</h2>
                                <input id='nOperacion' className='form-input-space' value={opNumberOg} placeholder='No. Operación' type="number"
                                    disabled />

                                <h2 className='form-subtitle'>Cliente</h2>


                                <select className='form-input-space' ref={clientIdRef} onChange={getUserCodes}>

                                    <option value="none" defaultValue disabled hidden>Cliente</option>
                                    {clients.map((client) => <option value={client.idClient}>{client.Name}</option>)}
                                </select>

                                <h2 className='form-subtitle'>Código Contable</h2>
                                <select className='form-input-space' {...register('opCode', { required: true })}>
                                    <option value="none" defaultValue disabled hidden>Código</option>
                                    {codes.map((code) => <option value={code.idAccountingCodes}>{code.Code}</option>)}

                                </select>

                                <h2 className='form-subtitle'>Dólares</h2><input className='form-input-space' type="checkbox" {...register('dollars', { required: false })} />
                            </div>



                            <h1 className='form-title'>Agregar Facturas</h1>

                            <div className='form-grid'>
                                <h2 className='form-subtitle'>No. Factura</h2>

                                <input className='form-input-space' ref={invoiceNumberRef} placeholder='No. Factura' type="text" />
                                <h2 className='form-subtitle'>Fecha</h2>
                                <input className='form-input-space' ref={invoiceDateRef} placeholder='Fecha' type="date" />
                                <h2 className='form-subtitle'>Monto</h2>
                                <input className='form-input-space' ref={invoiceAmountRef} placeholder='Monto' type="number" />
                                <h2 className='form-subtitle'>Pagador</h2>
                                <input className='form-input-space' ref={invoicePayerRef} placeholder='Pagador' type="text" />
                                <button className='form-button-space' type="button" onClick={addInvoice}>Agregar</button>
                                <button className='form-button-space' type="button" onClick={cleanInvoices}>Limpiar</button>
                            </div>


                            <div className='scroll-table2'>
                                <table className='table table-striped' >
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





                            <div className='form-grid'>
                                <h2 className='form-subtitle'>Comisión</h2>
                                <input className='form-input-space' value={clientCodes[0]} placeholder='Codigo Comisión'
                                    type="number" disabled {...register('comissionCode', { required: false })} />

                                <h2 className='form-subtitle'>Gastos Legales</h2>
                                <select className='form-input-space' {...register('legalExpenseCode', { required: true })}>
                                    <option value="none" defaultValue disabled hidden>Código Gastos Legales</option>
                                    {codes.map((code) => <option value={code.idAccountingCodes}>{code.Code}</option>)}

                                </select>
                            </div>



                            <div>
                                <center>
                                    <div className='grand-line'></div>
                                </center>
                            </div>
                            <br />



                            <div className='form-grid-4'>
                                <h2 className='form-subtitle'>Costo de Transferencia </h2>
                                <input className='form-input-space-4' placeholder='Costo' type="number" ref={costRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Código de Transferencia </h2>
                                <select className='form-input-space-4' {...register('transferCode', { required: true })}>
                                    <option value="none" defaultValue disabled hidden>Código Costo Transferencia</option>
                                    {codes.map((code) => <option value={code.idAccountingCodes}>{code.Code}</option>)}

                                </select>

                                <h2 className='form-subtitle'>Gastos Legales</h2>
                                <input className='form-input-space-4' placeholder='Honorarios' type="number" ref={honorariesRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Retención</h2>
                                <input className='form-input-space-4' placeholder='Retención' type="number" ref={retentionsRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Comisión</h2>
                                <input className='form-input-space-4' placeholder='Comisión' type="number" ref={comissionsRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Intereses</h2>
                                <input className='form-input-space-4' placeholder='Intereses' type="number" ref={interestRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Plazo</h2>
                                <input className='form-input-space-4' placeholder='Plazo' type="number" ref={termRef}
                                    onChange={updateTotals} />

                                <h2 className='form-subtitle'>Impuesto de Renta</h2>
                                <input className='form-input-space-4' type="checkbox" ref={rentTaxRef} onChange={updateTotals} />

                                <h2 className='form-subtitle'>Código Retención</h2>
                                <input className='form-input-space-4' placeholder='Codigo Retención' type="number"
                                    value={clientCodes[3]} disabled {...register('retentionCode', { required: false })} />

                            </div>

                            <div className='grand-line'></div>

                            <h1 className='form-title'>Agregar Deducciones</h1>
                            <div className='form-grid-4'>
                                <h2 className='form-subtitle'>No. de Operación</h2>
                                <select className='form-input-space-4' ref={reductionNumberRef}>
                                    <option value="none" defaultValue disabled hidden>Código</option>
                                    {operations.map((operation) => <option value={operation.idOperation}>
                                        {operation.idOperation}</option>)}
                                </select>

                                <h2 className='form-subtitle'>Código Contable</h2>
                                <select className='form-input-space-4' ref={reductionCodeRef}>
                                    <option value="none" defaultValue disabled hidden>Código</option>
                                    {codes.map((code) => <option value={code.Code}>{code.Code}</option>)}

                                </select>

                                <h2 className='form-subtitle'>Monto</h2>
                                <input className='form-input-space-4' placeholder='Monto' type="number" ref={reductionAmountRef} />
                            </div>
                            <h2 className='form-subtitle'>Descripción</h2>
                            <textarea className='form-text-area-space' placeholder='Descripción' type="text"
                                ref={reductionDescriptionRef}></textarea>

                            <button className='form-button-space' type="button" onClick={addReductions}>Agregar</button>
                            <p> </p>
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
                            <p> </p>
                            <div className='scroll-table'>
                                <table className='table table-striped' width="100%">
                                    <thead className='table-own'>
                                        <tr>
                                            <th className="th-sm">Mes
                                            </th>
                                            <th className="th-sm">Monto
                                            </th>
                                            <th className="th-sm">Código
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {months.map((month) =>
                                            <tr>
                                                <td>{month.month}</td>
                                                <td>{month.interest.toFixed(2)}</td>
                                                <td>{month.code}</td>
                                            </tr>

                                        )}
                                    </tbody>

                                </table>
                            </div>


                            <br />
                            <div className='row'>
                                <center>
                                    <div className='grand-line'></div>
                                </center>
                            </div>

                            <div className='form-grid'>
                                <h2 className='form-subtitle'>Total </h2>
                                <h2 className='form-subtitle'>Sub-Total</h2>

                                <input className='form-input-space-4' placeholder='Sub-total' type="number"
                                    value={totalTransfer.toFixed(2)} {...register('total', { required: false })} />

                                <input className='form-input-space-4' placeholder='Total' type="number"
                                    value={subTotalTransfer.toFixed(2)} {...register('subTotal', { required: false })} />
                            </div>

                            <input className="form-button-space" type="submit" value="Guardar" onClick={saveCesion} />
                            <br /><br />
                        </form>
                        <br /><br />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}