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
    const [mobileNumber, setMobileNumber] = useState("")
    const [personalMaildId, setPersonalMaildId] = useState("")
    const [userLevel, setUserLevel] = useState("")
    const [status, setStatus] = useState("")
    const [loginId, setLoginId] = useState("")
    const [basicData, setBasicData] = useState([])
    const [basicDesgination, setbasicDesgination] = useState([])
    const [basicDepartment, setBasicDepartment] = useState([])
    const [selectedUnit, setSelectedUnit] = useState('');
    const [data, setData] = useState([])
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [demo, setdemo] = useState("")

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };

    const getBasicDetails = () => {
        trackPromise(
            adminService.getBasicDetails().then((response) => {
                setBasicData(response.data[0].data[0].data.units)
                setbasicDesgination(response.data[0].data[0].data.designation)
                setBasicDepartment(response.data[0].data[0].data.department)
            })
        );
    }

    useEffect(() => {
        getBasicDetails()
    }, [])
    // function stateValues() {

    // }


    const handleUnitSetup = (e) => {
        e.preventDefault();
        let payload = {
            "Unit_Short_Name": selectedUnit,
            "User_Name": userName,
            "User_Employee_Id": empId,
            "User_Login_ID": loginId,
            "Department_Id": department,
            "Designation_Id": designation,
            "Mobile_Num": mobileNumber,
            "Mail_Id": personalMaildId,
            "status": status,
            "User_Role": userLevel
        }
        trackPromise(userService.saveCompanyUsers({ "data": [payload] }).then((response) => {
            debugger
            //check login response
            if (response.status == 200) {
                alert(response.data.data.result);
                getCompanyUserData()
                handleClose()
            }
            else {
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

    const getCompanyUserData = () => {
        trackPromise(
            userService.getCompanyUsers().then((response) => {
                setData(response.data.Company_Users)
            })
        );
    }
    useEffect(() => {
        getCompanyUserData()
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

   

    const handleUserLevel = (e) => {
        setUserLevel(e.target.value);
    };

    const handleStatus = (e) => {
        setStatus(e.target.value);
    };
    function editFormDetails (data) {
        setSelectedUnit(data.Unit_Short_Name)
        setUserName(data.User_Name)
        setEmpId(data.User_Employee_Id)
        setDepartment(data.Department_Id)
        setDesignation(data.Designation_Id)
        setMobileNumber(data.Mobile_Num)
        setPersonalMaildId(data.Mail_Id)
        setUserLevel(data.User_Role)
        setStatus(data.Status)
        setLoginId(data.User_Login_ID)
        
    }
    function settingValuesToEmpty () {
        setSelectedUnit("")
        setUserName("")
        setEmpId("")
        setDepartment("")
        setDesignation("")
        setMobileNumber("")
        setPersonalMaildId("")
        setUserLevel()
        setStatus("")
        setLoginId("")
    }
    const openEditForm = (data) => {
        console.log({"dataaaa":data.Status})
        editFormDetails(data)
        setIsEditFormOpen(true);
    };

    const closeEditForm = () => {
        setIsEditFormOpen(false);
    };
    function handleForm() {
        settingValuesToEmpty()
        setShow(true)
    }

    const handleEditUserDetails = (e) => {
        e.preventDefault();
        let payload = {
            "Unit_Short_Name": selectedUnit,
            "User_Name": userName,
            "User_Employee_Id": empId,
            "User_Login_ID": loginId,
            "Department_Id": department,
            "Designation_Id": designation,
            "Mobile_Num": mobileNumber,
            "Mail_Id": personalMaildId,
            "status": status,
            "User_Role": userLevel
        }
        trackPromise(userService.editCompanyUsers({ "data": [payload] }).then((response) => {
            debugger
            //check login response
            if (response.status == 200) {
                alert("Records updated successfully");
                getCompanyUserData()
                closeEditForm()
            }
            else {
                alert(response.data.message);
            }

        }).catch((error) => {
            //console.log(error.response.data.error)
            alert(error.response.data.error);
        })
        );
    }
    
    return <>
        <MDBRow>
            <MDBCol size='1' className='no-pad-right'>
                <MDBTabs className='flex-column text-center vertical-tab'>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
                            Base Line
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBCol>
            <MDBCol size='11' className='no-pad-left'>
                <MDBTabsContent className='unit-tab-content'>
                    <MDBTabsPane show={verticalActive === 'tabV1'}>
                        <div className='row'>
                        <div className='col-8'>
								<h1 className='h1'> Company Users Data Management </h1>
							</div>
                            <div className='col-4 text-right '>
                                <Button className='primary-btn' onClick={handleForm}>
                                    Add New 
                                </Button>
                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    dialogClassName="modal-75w"
                                    backdrop="static"
                                    keyboard={false}>

                                    <Modal.Header closeButton style={{color:'white'}}>
                                        <Modal.Title> Add New User </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleUnitSetup}>
                                            <div className='row' >
                                                <div className='col-6'>
                                                  
                                                    <Form.Select className='mb-3' onChange={(e) => { setSelectedUnit(e.target.value) }} value={selectedUnit} name="selectedUnit" >
                                                        <option value=''>Select Unit</option>
                                                        {basicData.map((item) => (
                                                            <option key={item.Unit_Id} value={item.Unit_Short_Name}>
                                                                {item.Unit_Full_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <Form.Select className='mb-3' onChange={(e) => { setDesignation(e.target.value) }} value={designation} name=' designation' >
                                                        <option> Select Designation </option>
                                                        {basicDesgination.map((item) => (
                                                            <option key={item.Devision_Id} value={item.Devision_Name}>
                                                                {item.Devision_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-3' label='User Employee ID' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />
                                                    
                                                    <Form.Select className='mb-3' onChange={handleStatus} value={status}>
                                                        <option> Select Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-3' label='Contact No.' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />

                                                </div>
                                                <div className='col-6'>
                                                    
                                                <Form.Select className='mb-3' onChange={(e) => { setDepartment(e.target.value) }} value={department} name=' department' >
                                                        <option> Select Department </option>
                                                        {basicDepartment.map((item) => (
                                                            <option key={item.Department_Id} value={item.Department_Name}>
                                                                {item.Department_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    
                                                    <Form.Select className='mb-3' onChange={handleUserLevel} value={userLevel}>
                                                        <option> Select Role </option>
                                                        <option value="general">General</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>
                                                    
                                                    <MDBInput wrapperClass='mb-3' label='Login ID' onChange={(e) => { setLoginId(e.target.value) }} value={loginId} name='LoginId' />

                                                <MDBInput wrapperClass='mb-3' label='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />

                                                <MDBInput wrapperClass='mb-3' label='E-Mail ID' onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />
                            
                                                </div> 
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{width:'20%'}} >
                                             Cancel 
                                        </Button>
                                    <Button variant="primary" type='submit' block onClick={handleUnitSetup} style={{width:'20%'}}>
                                            Save
                                        </Button>

                                        
                                        
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className='col-12'>
                                <CompanyUserTable data={data} openEditForm={openEditForm} />
                                <Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-75w"
                                    backdrop="static">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit User Form</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleEditUserDetails}>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <label> Choose Photo </label>

                                                    <MDBInput wrapperClass='mb-2' type="file" onChange={(e) => { setunitName(e.target.value) }} value={unitName} name='logo' />

                                                    <Form.Select className='mb-2' onChange={(e) => { setSelectedUnit(e.target.value) }} value={selectedUnit}>
                                                        <option value=''>Select Unit</option>
                                                        {basicData.map((item) => (
                                                            <option key={item.Unit_Id} value={item.Unit_Short_Name}>
                                                                {item.Unit_Full_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

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
                                                </div>
                                                <div className='col-4'>
                                                    <MDBInput wrapperClass='mb-2' label='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />

                                                    <MDBInput wrapperClass='mb-2' label='User Employee ID' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />

                                                    <MDBInput wrapperClass='mb-2' label='Login ID' onChange={(e) => { setLoginId(e.target.value) }} value={loginId} name='LoginId' />

                                                    <Form.Select className='mb-2' onChange={handleUserLevel} value={userLevel}>
                                                        <option> Role </option>
                                                        <option value="general">General</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>
                                                </div>

                                                <div className='col-4'>

                                                    <MDBInput wrapperClass='mb-2' label='Contact No.' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />

                                                    <MDBInput wrapperClass='mb-2' label='E-Mail ID' onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />
                                                    <Form.Select className='mb-2' onChange={(e) => { setStatus(e.target.value) }} value={status}>
                                                        <option> Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeEditForm}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleEditUserDetails}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBCol>
        </MDBRow>
    </>
}