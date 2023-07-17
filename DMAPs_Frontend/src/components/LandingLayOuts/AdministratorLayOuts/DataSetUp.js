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

import './DataSetUp.scss';

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


export default function DataSetUp() {
    const [verticalActive, setVerticalActive] = useState('tabV3');
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleUnitSetup = (e) => {
        e.preventDefault();

        console.log('hello');
    }
    
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
            Buyer_Group: "Mexx",
            Buyer: "Mexx Kids ware",
            Address: "63-D, Basant Lok Community Centre, Vasant Vihar, New Delhi 110057",
            Action: ""
        },
        {
            id: 2,
            Buyer_Group: "Mexx",
            Buyer: "Mexx Sports ware",
            Address: "63-D, Basant Lok Community Centre, Vasant Vihar, New Delhi 110057",
            Action: ""
        },
        {
            id: 3,
            Buyer_Group: "Levis",
            Buyer: "Levi's - Men's Wear",
            Address: "001A & 002A, The Grand Sigma Mall, Ground Floor, Near-Wockhardt Hospital, Cunningham Road, Bengaluru, Karnataka 560052",
            Action: ""
        }
    ];
    const columns = [{
        dataField: 'id',
        text: 'No',
        sort: true
    }, {
        dataField: 'Buyer_Group',
        text: 'Buyer Group'
    }, {
        dataField: 'Buyer',
        text: 'Buyer',
        sort: true
    },
    {
        dataField: 'Address',
        text: 'Address',
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
                            Human Resources
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV2')} active={verticalActive === 'tabV2'}>
                            Administrat
                        </MDBTabsLink>
                    </MDBTabsItem>
                    {/* <MDBTabsItem className="vertical-link">
                        <MDBTabsLink >
                            Style Store
                        </MDBTabsLink>
                    </MDBTabsItem> */}
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV3')} active={verticalActive === 'tabV3'}>
                            Buyer Group
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV4')} active={verticalActive === 'tabV4'}>
                            Product Type
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV5')} active={verticalActive === 'tabV5'}>
                            Gender
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV6')} active={verticalActive === 'tabV6'}>
                            Season
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV7')} active={verticalActive === 'tabV7'}>
                            Size Grid
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV8')} active={verticalActive === 'tabV8'}>
                            Emb Type
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV9')} active={verticalActive === 'tabV9'}>
                            Print Type
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV10')} active={verticalActive === 'tabV10'}>
                            Washing Type
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV11')} active={verticalActive === 'tabV11'}>
                            Shipment Mode
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV12')} active={verticalActive === 'tabV12'}>
                            Country
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV13')} active={verticalActive === 'tabV13'}>
                            Garment Colour
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBCol>
            <MDBCol size='10' className='no-pad-left'>
                <MDBTabsContent className='unit-tab-content'>
                    <MDBTabsPane show={verticalActive === 'tabV1'}>

                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV2'}>

                    </MDBTabsPane>
                    <MDBTabsPane show={verticalActive === 'tabV3'}>
                        <div className='row'>
                            <div className='col-12 text-right '>
                                <Button className='primary-btn' onClick={() => setShow(true)}>
                                    Add Buyer Group
                                </Button>

                                <Modal 
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="modal-90w"
                                backdrop="static"
                                keyboard={false}>

                                <Modal.Header closeButton>
                                        <Modal.Title> Create Buyers </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>
                                            <div className='col-3'>
                                                <label> Choose Photo </label>
                                                
                                                <MDBInput wrapperClass='mb-2' type="file" onChange={(e) => { setunitName(e.target.value)}} value={unitName} name='logo' />

                                                <Form.Select className='mb-2'>
                                                    <option> Select Buyer Group</option>
                                                </Form.Select>

                                                <Form.Select className='mb-2'>
                                                    <option> Select Devision </option>
                                                </Form.Select>


                                            </div>
                                            <div className='col-3'>
                                                
                                                <MDBInput wrapperClass='mb-2' label='Address Line 1' />

                                                <MDBInput wrapperClass='mb-2' label='Address Line 2'  />

                                                <MDBInput wrapperClass='mb-2' label='Street / Area'  />

                                                <MDBInput wrapperClass='mb-2' label='City'  />

                                                <MDBInput wrapperClass='mb-2' label='State'  />

                                                <MDBInput wrapperClass='mb-2' label='Pin No'  />

                                                <MDBInput wrapperClass='mb-2' label='Country'  />

                                            </div>

                                            <div className='col-3'>

                                                 <MDBInput wrapperClass='mb-2' label='Contact No. Office'  />

                                                <MDBInput wrapperClass='mb-2' label='Contact No. Rec'  />

                                                <MDBInput wrapperClass='mb-2' label='Fax No'  />

                                                <MDBInput wrapperClass='mb-2' label='Mail Id'  />

                                                <MDBInput wrapperClass='mb-2' label='Web Site'  />
                                               
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