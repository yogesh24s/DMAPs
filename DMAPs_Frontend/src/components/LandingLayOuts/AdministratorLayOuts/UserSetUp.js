/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
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


 import userService from "../../../services/userService";
import { trackPromise } from 'react-promise-tracker';
import CompanyUserTable from './CompanyUserTable';
import adminService from "../../../services/adminService"

export default function UserSetUp() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [verticalActive, setVerticalActive] = useState('tabV1');
    const [unitName, setunitName] = useState("")
    const [userName, setUserName] = useState("")
    const [empId, setEmpId] = useState("")
    const [department, setDepartment] = useState("")
    const [designation, setDesignation] = useState("")
    const [officialMobilbeNumber, setOfficialMobileNumber] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [personalMaildId, setPersonalMaildId] = useState("")
    const [officialMaildId, setOfficialMaildId] = useState("")
    const [userLevel, setUserLevel] = useState("")
    const [status, setStatus] = useState("")
    const [userId, setUserId] = useState("")
    const [basicData, setBasicData] = useState([])
    const [basicDesgination, setbasicDesgination] = useState([])
    const [basicDepartment, setBasicDepartment] = useState([])
    const [selectedUnit, setSelectedUnit] = useState('');

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };

    const getBasicDetails = () => {
        trackPromise(
            adminService.getBasicDetails().then((response) => {
                console.log("basc", response.data[0].data[0].data.units)
                setBasicData(response.data[0].data[0].data.units)
                setbasicDesgination(response.data[0].data[0].data.designation)
                setBasicDepartment(response.data[0].data[0].data.department)
            })
        );
    }

    useEffect(() => {
        getBasicDetails()
    }, [])

    const handleSubmit = (e) => {
       


    }
    const handleUnitSetup = (e) => {
        e.preventDefault();
        let payload = {
            "Unit_Short_Name": selectedUnit,
            "User_Name": userName,
            "Employee_Id": empId,
            "Department_Id": department,
            "Designation_Id": designation,
            "Mobile_Num": mobileNumber,
            "Official_Mobile_Num" : officialMobilbeNumber,
            "Mail_Id": personalMaildId,
            "Official_Mail_Id": officialMaildId,
            "status": status,
            "User_Role" : userLevel,
            "User_Id" : userId
        }
        trackPromise(userService.saveCompanyUsers(payload).then((response) => {
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
            User_Status: "Active",
            Action: ""
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
            User_Status: "Active",
            Action: ""
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

    const handleChange = (e) => {
        setSelectedUnit(e.target.value);
      };
    
      const handleUserLevel = (e) => {
        setUserLevel(e.target.value);
      };
    
      const handleStatus = (e) => {
        setStatus(e.target.value);
      };
    

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
                                    Add New User
                                </Button>
                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    dialogClassName="modal-90w"
                                    backdrop="static"
                                    keyboard={false}>

                                    <Modal.Header closeButton>
                                        <Modal.Title> Add New User </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleSubmit}>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <label> Choose Photo </label>

                                                    <MDBInput wrapperClass='mb-2' type="file" onChange={(e) => { setunitName(e.target.value) }} value={unitName} name='logo' />
                                                    
                                                    <Form.Select className='mb-2' onChange={handleChange} value={selectedUnit}>
                                                        <option value=''>Select Unit</option>

                                                        {basicData.map((item) => (
                                                            <option key={item.Unit_Id} value={item.Unit_Id}>
                                                                {item.Unit_Full_Name}
                                                            </option>
                                                        ))}

                                                    </Form.Select>
                                                </div>
                                                <div className='col-6'>

                                                    <MDBInput wrapperClass='mb-2' label='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />

                                                    <MDBInput wrapperClass='mb-2' label='Employee ID' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />

                                                    <Form.Select className='mb-2' onChange={(e) => { setDepartment(e.target.value) }} value={department} name=' department' >
                                                        <option> Select Department </option>
                                                        {basicDepartment.map((item) => (
                                                            <option key={item.Department_Id} value={item.Department_Name}>
                                                                {item.Department_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <Form.Select className='mb-2' onChange={(e) => { setDesignation(e.target.value) }} value={designation} name=' designation' >
                                                        <option> Select Designation </option>
                                                        {basicDesgination.map((item) => (
                                                            <option key={item.Devision_Id} value={item.Devision_Name}>
                                                                {item.Devision_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-2' label='Contact No.' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />

                                                    {/* <MDBInput wrapperClass='mb-2' label='Official Mob No' onChange={(e) => { setOfficialMobileNumber(e.target.value) }} value={officialMobilbeNumber} name=' officialMobilbeNumber' /> */}

                                                    <MDBInput wrapperClass='mb-2' label='E-Mail ID' onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />

                                                    {/* <MDBInput wrapperClass='mb-2' label='Official Mail Id' onChange={(e) => { setOfficialMaildId(e.target.value) }} value={officialMaildId} name='officialMaildId' /> */}

                                                </div>

                                                <div className='col-3'>
                                                    <Form.Select className='mb-2' onChange={handleUserLevel} value={userLevel}>
                                                        <option> Role </option>
                                                        <option value="general">General</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>

                                                    <Form.Select className='mb-2' onChange={handleStatus} value={status}>
                                                        <option> Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-2' label='Login ID' onChange={(e) => { setUserId(e.target.value) }} value={userId} name='UserId' />

                                                </div>
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type='submit' block onClick={handleUnitSetup}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className='col-12'>
                                <br />
                                <CompanyUserTable />
                            </div>
                        </div>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>
        </MDBRow>
    </>
}