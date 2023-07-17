/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './UserSetUp.scss';

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


// import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';


export default function UserSetUp() {

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
        // trackPromise(unitService.saveCompanyUnits(payload).then((response) => {
        //     //check login response
        //     if (response.data.status == 'Success') {
        //         alert(response.data.message);

        //     }
        //     else if (response.data.status == 'Failed') {
        //         alert(response.data.message);
        //     }

        // }).catch((error) => {
        //     //console.log(error.response.data.error)
        //     alert(error.response.data.error);
        // })
        // );


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
            image: "",
            unit: "SLA 1",
            User_Name: "Bharath",
            Full_Name: "Bharath M L",
            Created_Date: "",
            Role: "Super Admin",
            Department_Id: "",
            Designation_Id: "",
            User_Status : "Active",
            Action : ""
        },
        {
            id: 2,
            image: "",
            unit: "NGA 1",
            User_Name: "Mohan",
            Full_Name: "Mohan Kumar",
            Created_Date: "",
            Role: "Admin",
            Department_Id: "",
            Designation_Id: "",
            User_Status : "Active",
            Action : ""
        }
    ];
    const columns = [{
        dataField: 'id',
        text: 'No',
        sort: true
    }, {
        dataField: 'image',
        text: 'User Image'
    }, {
        dataField: 'unit',
        text: 'Unit',
        sort: true
    },
    {
        dataField: 'User_Name',
        text: 'User Name',
        sort: true
    },
    {
        dataField: 'Full_Name',
        text: 'Full Name',
        sort: true
    },
    {
        dataField: 'Created_Date',
        text: 'Created Date',
        sort: true
    },
    {
        dataField: 'Role',
        text: 'User Role',
        sort: true
    },
    {
        dataField: 'Department_Id',
        text: 'Department',
        sort: true
    },
    {
        dataField: 'Designation_Id',
        text: 'Designation',
        sort: true
    },
    {
        dataField: 'User_Status',
        text: 'Stauts',
        sort: true
    },
    {
        dataField: "Action",
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
                                    Create New Users
                                </Button>
                                <Modal 
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="modal-90w"
                                backdrop="static"
                                keyboard={false}>

                                <Modal.Header closeButton>
                                        <Modal.Title> Create New Users </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-3'>
                                                <label> Choose Photo </label>
                                                
                                                <MDBInput wrapperClass='mb-2' type="file" onChange={(e) => { setunitName(e.target.value)}} value={unitName} name='logo' />

                                                <Form.Select className='mb-2'>
                                                    <option> Select Unit</option>
                                                </Form.Select>


                                            </div>
                                            <div className='col-3'>
                                                
                                                <MDBInput wrapperClass='mb-2' label='User Name' />

                                                <MDBInput wrapperClass='mb-2' label='Emp Id No'  />

                                                <Form.Select className='mb-2'>
                                                    <option> Select Department </option>
                                                </Form.Select>

                                                <Form.Select className='mb-2'>
                                                    <option> Select Designation </option>
                                                </Form.Select>

                                                <MDBInput wrapperClass='mb-2' label='Personal Mobile No'  />

                                                <MDBInput wrapperClass='mb-2' label='Official Mob No'  />

                                                <MDBInput wrapperClass='mb-2' label='Personal Mail Id'  />

                                                <MDBInput wrapperClass='mb-2' label='Official Mail Id'  />

                                            </div>

                                            <div className='col-3'>
                                            <Form.Select className='mb-2'>
                                                    <option> User Level </option>
                                                </Form.Select>

                                                <Form.Select className='mb-2'>
                                                    <option> Status </option>
                                                </Form.Select>
                                                
                                                <MDBInput wrapperClass='mb-2' label='User_Id'  />

                                                <MDBInput wrapperClass='mb-2' label='Password'  />

                                                <MDBInput wrapperClass='mb-2' label='Confirm Password'  />
                                               
                                            </div>

                                            <div className='col-3'>
                                            

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