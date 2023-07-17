/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './UnitSetUp.scss';

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';


import unitService from "../../../services/unitService";
import { trackPromise } from 'react-promise-tracker';


export default function UnitSetUp() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [verticalActive, setVerticalActive] = useState('tabV1');
    const [unitName, setunitName] = useState('')
    const [shortName, setShortName] = useState('')
    const [group, setGroup] = useState('')
    const [division, setdivision] = useState('')
    const [tinNo, setTinNo] = useState('')
    const [regNo, setRegNo] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [pinNo, setPinNO] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [contactNoRec, setContactNoRec] = useState('')
    const [faxNo, setFaxNo] = useState('')
    const [mailId, setMailId] = useState('')
    const [website, setWebsite] = useState('')
    const [state, setState] = useState('')

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        let payload = {
            "Unit_Full_Name": unitName,
            "Unit_Short_Name": shortName,
            "Group_Id": group,
            "Division_Id": division,
            "Tin_Num": tinNo,
            "Reg_Num": regNo,
            "Address_Line_1": addressLine1,
            "Address_Line_2": addressLine2,
            "Street": street,
            "City": city,
            "State": state,
            "Pin_Code": pinNo,
            "Contact_No": contactNo,
            "Contact_No_Rec" : contactNoRec,
            "Email_Id": mailId,
            "Website_Link": website,
            "Fax_No": faxNo


        }
        alert('suceess')
        trackPromise(unitService.saveCompanyUnits(payload).then((response) => {
            //check login response
            if (response.data.status == 'Success') {
                alert(response.data.message);

            }
            else if (response.data.status == 'Failed') {
                alert(response.data.message);
            }

        }).catch((error) => {
            //console.log(error.response.data.error)
            alert(error.response.data.error);
        })
        );


    }
    const handleUnitSetup = (e) => {
        e.preventDefault();

        console.log('hello');
    }

    useEffect(() => {

    }, [])

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
        hideSizePerPage: true,
        onPageChange: function (page, sizePerPage) { },
        onSizePerPageChange: function (page, sizePerPage) { },
    });
    const iconActionHandler = (cell, row, rowIndex) => {
        return (
            <>
                <i className="fas fa-edit action-icon" title="Edit" > </i>
            </>
        );
    };

    const products = [
        {
            id: 1,
            logo: "",
            unit: "NGA II",
            full_name_unit: "New Generation Apparels II",
            address: "Shed #№.4/6 & 20/3, Gharve Bhavi Palya, Kudlu Gate, Hangasandra Viillage, Housor Road,  Bangalore - 560068, Karnataka.",
            status: "Active",
            action: "",
        },
        {
            id: 2,
            logo: "",
            unit: "SLA I",
            full_name_unit: "Style Line Apparels I",
            address: "Shed # №.1/100, Main, Layout, Area, City -560000, Karnataka",
            status: "Banned",
            action: "",
        },
    ];
    const columns = [{
        dataField: 'id',
        text: 'No',
        sort: true
    }, {
        dataField: 'logo',
        text: 'Logo'
    }, {
        dataField: 'unit',
        text: 'Unit',
        sort: true
    },
    {
        dataField: 'full_name_unit',
        text: 'Full Name of Unit',
        sort: true
    },
    {
        dataField: 'registration',
        text: 'Reg No',
        sort: true
    },
    {
        dataField: 'address',
        text: 'Address',
        sort: true
    },
    {
        dataField: 'status',
        text: 'Status',
        sort: true
    },
    {
        dataField: "action",
        text: "Action",
        formatter: iconActionHandler,
        sort: false,
        classes: "actions-column"
    }
    ];

    return <>
        <MDBRow>
            <MDBCol size='2' className='no-pad-right'>
                <MDBTabs className='flex-column text-center vertical-tab'>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
                            Base Line
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBCol>
            <MDBCol size='10' className='no-pad-left'>
                <MDBTabsContent className='unit-tab-content'>
                    <MDBTabsPane show={verticalActive === 'tabV1'}>
                        <div className='row'>
                            <div className='col-12 text-right '>
                                <Button className='primary-btn' onClick={() => setShow(true)}>
                                    Add New Units
                                </Button>
                                <Modal 
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="modal-90w"
                                backdrop="static"
                                keyboard={false}>

                                <Modal.Header closeButton>
                                        <Modal.Title> Create New Units </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-3'>
                                                <label> Unit Logo </label>
                                                <MDBInput wrapperClass='mb-4' type="file" onChange={(e) => { setunitName(e.target.value)}} value={unitName} name='logo' />

                                                <MDBInput wrapperClass='mb-2' label='Name Of Unite' onChange={(e) => { setunitName(e.target.value)}} value={unitName} name='unitName' />

                                                <MDBInput wrapperClass='mb-2' label='Short Name' onChange={(e) => { setShortName(e.target.value) }} value={shortName} name='shortName' />

                                            </div>
                                            <div className='col-3'>
                                                
                                                <MDBInput wrapperClass='mb-2' label='Group' onChange={(e) => { setGroup(e.target.value) }} value={group} name='group' />

                                                <MDBInput wrapperClass='mb-2' type='email' label='Division' onChange={(e) => { setdivision(e.target.value);}} value={division} name='division' />

                                                <MDBInput wrapperClass='mb-2' type='tel' label='Tin No' onChange={(e) => { setTinNo(e.target.value) }} value={tinNo} name='tinNo' />

                                                <MDBInput wrapperClass='mb-2' type='tel' label='Reg No' onChange={(e) => { setRegNo(e.target.value) }} value={regNo} name='regNo' />

                                            </div>

                                            <div className='col-3'>
                                                <MDBInput label='Address Line 1' wrapperClass='mb-2' onChange={(e) => { setAddressLine1(e.target.value) }} value={addressLine1} name='addressLine1' />

                                                <MDBInput wrapperClass='mb-2' label='Address Line 2' onChange={(e) => { setAddressLine2(e.target.value) }} value={addressLine2} name='addressLine2'  />
                                                
                                                <MDBInput wrapperClass='mb-2'  label='WebSite' onChange={(e) => { setWebsite(e.target.value) }} value={website} name='setWebsite' />

                                                <MDBInput wrapperClass='mb-2'  label='Pin No' onChange={(e) => { setPinNO(e.target.value)}} value={pinNo} name='pinNo' />

                                                <MDBInput wrapperClass='mb-2' type='tel' label='Fax No' onChange={(e) => { setFaxNo(e.target.value); }} value={faxNo} name='faxNo' />
                                               
                                            </div>

                                            <div className='col-3'>
                                            <MDBInput wrapperClass='mb-2' label='Street / Area' onChange={(e) => { setStreet(e.target.value) }} value={street} name='street' />

                                            <MDBInput wrapperClass='mb-2' label='City' onChange={(e) => { setCity(e.target.value)}} value={city} name='city' />

                                            <MDBInput wrapperClass='mb-2' label='State' onChange={(e) => { setState(e.target.value) }} value={state} name='state' />

                                            <MDBInput wrapperClass='mb-2' label='Mail Id' onChange={(e) => { setMailId(e.target.value) }} value={mailId} name='mailId' />

                                            <MDBInput wrapperClass='mb-2' type='tel' label='Contact No Office' onChange={(e) => { setContactNo(e.target.value) }} value={contactNo} name='contactNo' />

                                            <MDBInput wrapperClass='mb-2' type='tel' label='Contact No Rec' onChange={(e) => { setContactNoRec(e.target.value) }} value={contactNoRec} name='contactNoRec' />

                                            </div>
                                        </div>
                                    </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type='submit' block onClick={handleUnitSetup}>
                                            Save 
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className='col-12'>
                                <br/>
                                <BootstrapTable
                                    keyField='id'
                                    pagination={pagination}
                                    data={products}
                                    columns={columns}
                                />
                            </div>
                        </div>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>
        </MDBRow>
    </>
}