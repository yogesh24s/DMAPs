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
    const [userName, setUserName] = useState("")
    const [userNameError, setUserNameError] = useState("")

    const [empId, setEmpId] = useState("")
    const [empIdError, setEmpIdError] = useState("")

    const [department, setDepartment] = useState("")
    const [departmentError, setDepartmentError] = useState("")
    
    const [designation, setDesignation] = useState("")
    const [designationError, setDesignationError] = useState("")

    const [mobileNumber, setMobileNumber] = useState("")
    const [mobileNumberError, setMobileNumberError] = useState("")

    const [personalMaildId, setPersonalMaildId] = useState("")
    const [personalMaildIdError, setPersonalMaildIdError] = useState("")

    const [userLevel, setUserLevel] = useState("")
    const [userLevelError, setUserLevelError] = useState("")

    const [status, setStatus] = useState("")
    const [statusError, setStatusError] = useState("")

    const [loginId, setLoginId] = useState("")
    const [loginIdError, setLoginIdError] = useState("")

    const [basicData, setBasicData] = useState([])
    const [basicDesgination, setbasicDesgination] = useState([])
    const [basicDepartment, setBasicDepartment] = useState([])

    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedUnitError, setSelectedUnitError] = useState('');

    const [data, setData] = useState([])
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

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
        let isValid = true;
		if (!selectedUnit) {
			setSelectedUnitError('Unit is required');
			isValid = false;
		} else {
			setSelectedUnitError('');
		}

		if (!userName) {
			setUserNameError('User Name is required');
			isValid = false;
		} else {
			setUserNameError('');
		}

		if (!empId) {
			setEmpIdError('Employee ID is required');
			isValid = false;
		} else {
			setEmpIdError('');
		}

		if (!loginId) {
			setLoginIdError('Login Id is required');
			isValid = false;
		} else {
			setLoginIdError('');
		}

        if (!department) {
			setDepartmentError('Department is required');
			isValid = false;
		} else {
			setDepartmentError('');
		}

		if (!designation) {
			setDesignationError('Designation is required');
			isValid = false;
		} else {
			setDesignationError('');
		}

		if (!mobileNumber) {
			setMobileNumberError('Mobile Number is required');
			isValid = false;
		} else {
			setMobileNumberError('');
		}

		if (!personalMaildId) {
			setPersonalMaildIdError('Mail ID is required');
			isValid = false;
		} else {
			setPersonalMaildIdError('');
		}

        if (!status) {
			setStatusError('Status is required');
			isValid = false;
		} else {
			setStatusError('');
		}

		if (!userLevel) {
			setUserLevelError('User Level is required');
			isValid = false;
		} else {
			setUserLevelError('');
		}

		if (!isValid) {
			return;
		}

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
            //check login response
            if (response.status == 200 && response.data.data.status == "success") {
                // alert(response.data.result);
                getCompanyUserData()
                handleClose()
            }
            else {
                alert(response.data.data.result);
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
            //check login response
            if (response.status == 200 && response.data.data.status == "success") {
                // alert(response.data.result);
                getCompanyUserData()
                closeEditForm()
            }
            else {
                alert(response.data.data.result);
            }

        }).catch((error) => {
            //console.log(error.response.data.error)
            alert(error.response.data.error);
        })
        );
    }

    const deleteUserRecord = (data) => {
      
        if (window.confirm("Are you sure to delete the Company User ?"))
        { 
            let payload = {
                "User_Employee_Id":data.User_Employee_Id
                }
                trackPromise(userService.deleteCompanyUsers({ "data": [payload] }).then((response) => {
                //check login response
                if (response.status === 200) {
                    getCompanyUserData()
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
    };
    
    return <>
        <MDBRow>
            <MDBCol size='1' className='no-pad-right'>
                <MDBTabs className='flex-column text-center vertical-tab'>
                    <MDBTabsItem className="vertical-link">
                        <MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
                            Baseline
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
            </MDBCol>
            <MDBCol size='11' className='no-pad-left'>
                <MDBTabsContent className='unit-tab-content'>
                    <MDBTabsPane show={verticalActive === 'tabV1'}>
                        <div className='row'>
                        <div className='col-8'>
								<h1 className='h1'> Company Users </h1>
							</div>
                            <div className='col-4 text-right '>
                                <Button className='primary-btn mt-10' onClick={handleForm}>
                                <i className='fa fa-plus'> </i> User 
                                </Button>
                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    dialogClassName="modal-50w"
                                    backdrop="static"
                                    keyboard={false}>

                                    <Modal.Header closeButton style={{color:'white'}}>
                                        <Modal.Title> Add New User </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleUnitSetup}>
                                            <div className='row' >
                                        
                                                <div className='col-6'>

                                                <MDBInput wrapperClass='mb-3' type='text' label='Name' tabindex="1" onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />
                                                {userNameError && <p style={{ color: 'red' }}>{userNameError}</p>}

                                                <MDBInput wrapperClass='mb-3' type='email' label='E-Mail ID' tabindex="3" onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />
                                                { personalMaildIdError && <p style={{ color: 'red' }}>{personalMaildIdError}</p>}

                                                <Form.Select className='mb-3' tabindex="5" onChange={(e) => { setSelectedUnit(e.target.value) }} value={selectedUnit} name="selectedUnit" >
                                                        <option value=''>Select Unit</option>
                                                        {basicData.map((item) => (
                                                            <option key={item.Unit_Id} value={item.Unit_Short_Name}>
                                                                {item.Unit_Full_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    { selectedUnitError && <p style={{ color: 'red' }}>{selectedUnitError}</p>}
                                                    
                                                <Form.Select className='mb-3' tabindex="7" onChange={(e) => { setDepartment(e.target.value) }} value={department} name=' department' >
                                                        <option> Select Department </option>
                                                        {basicDepartment.map((item) => (
                                                            <option key={item.Department_Id} value={item.Department_Name}>
                                                                {item.Department_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    { departmentError && <p style={{ color: 'red' }}>{departmentError}</p>}

                                                    <Form.Select className='mb-3' tabindex="9" onChange={handleStatus} value={status}>
                                                        <option> Select Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>
                                                    { statusError && <p style={{ color: 'red' }}>{statusError}</p>}

                                                </div> 

                                                <div className='col-6'>

                                                <MDBInput wrapperClass='mb-3' type='text' label='Login ID' tabindex="2" onChange={(e) => { setLoginId(e.target.value) }} value={loginId} name='LoginId' />
                                                { loginIdError && <p style={{ color: 'red' }}>{loginIdError}</p>}
                                                  
                                                <MDBInput wrapperClass='mb-3' type='text' tabindex="4" label='Employee ID' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />
                                                { empIdError && <p style={{ color: 'red' }}>{empIdError}</p>}

                                                    <Form.Select className='mb-3' tabindex="6" onChange={(e) => { setDesignation(e.target.value) }} value={designation} name=' designation' >
                                                        <option> Select Designation </option>
                                                        {basicDesgination.map((item) => (
                                                            <option key={item.Devision_Id} value={item.Devision_Name}>
                                                                {item.Devision_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    { designationError && <p style={{ color: 'red' }}>{designationError}</p>}

                                                    <Form.Select className='mb-3' tabindex="8" onChange={handleUserLevel} value={userLevel}>
                                                        <option> Select Role </option>
                                                        <option value="general">General</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>
                                                    { userLevelError && <p style={{ color: 'red' }}>{userLevelError}</p>}
                                                
                                                    <MDBInput wrapperClass='mb-3' type='number' tabindex="10" label='Contact No.' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />
                                                    { mobileNumberError && <p style={{ color: 'red' }}>{mobileNumberError}</p>}
                                                </div>
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                                             Cancel 
                                        </Button>
                                    <Button variant="primary" type='submit' block onClick={handleUnitSetup} style={{ width: '15%' }}>
                                            Save
                                        </Button>

                                        
                                        
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className='col-12'>
                                <CompanyUserTable data={data} openEditForm={openEditForm} deleteUserRecord = {deleteUserRecord}/>
                                <Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-50w"
                                    backdrop="static">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Company Users </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={handleEditUserDetails}>
                                            <div className='row'>
                                                <div className='col-6'>
                                                
                                                <MDBInput wrapperClass='mb-3' label='Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />

                                                <MDBInput wrapperClass='mb-3' label='E-Mail ID' onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />

                                                <Form.Select className='mb-3' label='Unit' name="Unit" onChange={(e) => { setSelectedUnit(e.target.value) }} value={selectedUnit}>
                                                    <option value=''>Select Unit</option>
                                                    {basicData.map((item) => (
                                                        <option key={item.Unit_Id} value={item.Unit_Short_Name}>
                                                            {item.Unit_Full_Name}
                                                        </option>
                                                    ))}
                                                </Form.Select>

                                                    <Form.Select className='mb-3' onChange={(e) => { setDepartment(e.target.value) }} value={department} name='department' >
                                                        <option> Select Department </option>
                                                        {basicDepartment.map((item) => (
                                                            <option key={item.Department_Id} value={item.Department_Name}>
                                                                {item.Department_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <Form.Select className='mb-3' onChange={(e) => { setStatus(e.target.value) }} value={status}>
                                                        <option> Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>

                                            

                                                </div>
                                                <div className='col-6'>
                                                
                                                <MDBInput wrapperClass='mb-3' label='Login ID' onChange={(e) => { setLoginId(e.target.value) }} value={loginId} name='LoginId' />

                                                
                                                <MDBInput wrapperClass='mb-3' label='Employee ID' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />

                                                
                                                <Form.Select className='mb-3' onChange={(e) => { setDesignation(e.target.value) }} value={designation} name='designation' >
                                                        <option> Select Designation </option>
                                                        {basicDesgination.map((item) => (
                                                            <option key={item.Devision_Id} value={item.Devision_Name}>
                                                                {item.Devision_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                    <Form.Select className='mb-3' onChange={handleUserLevel} value={userLevel}>
                                                        <option> Role </option>
                                                        <option value="general">General</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-3' label='Contact No.' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />

                                                </div>
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={closeEditForm}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleEditUserDetails}>
                                            Save
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