/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
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
                setBasicData(response.data[0].data[0].data.units)
                setbasicDesgination(response.data[0].data[0].data.designation)
                setBasicDepartment(response.data[0].data[0].data.department)
            })
        );
    }

    useEffect(() => {
        getBasicDetails()
    }, [])

    const handleUnitSetup = (e) => {
        e.preventDefault();
        let payload = {
            "Unit_Short_Name": selectedUnit,
            "User_Name": userName,
            "User_Id": empId,
            "Department_Id": department,
            "Designation_Id": designation,
            "Mobile_Num": mobileNumber,
            "Official_Mobile_Num" : officialMobilbeNumber,
            "Mail_Id": personalMaildId,
            "Official_Mail_Id": officialMaildId,
            "status": status,
            "User_Role" : userLevel,
        }
        trackPromise(userService.saveCompanyUsers({"data":[payload]}).then((response) => {
            //check login response
            if (response.status === 200) {
                alert(response.data.result);
                window.location.reload();
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
                                        <form>
                                            <div className='row'>
                                                <div className='col-3'>
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
                                                <div className='col-3'>

                                                    <MDBInput wrapperClass='mb-2' label='User Name' onChange={(e) => { setUserName(e.target.value) }} value={userName} name=' username' />

                                                    <MDBInput wrapperClass='mb-2' label='Emp Id No' onChange={(e) => { setEmpId(e.target.value) }} value={empId} name=' EmpId' />

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

                                                    <MDBInput wrapperClass='mb-2' label='Personal Mobile No' onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} name=' mobileNumber' />

                                                    <MDBInput wrapperClass='mb-2' label='Official Mob No' onChange={(e) => { setOfficialMobileNumber(e.target.value) }} value={officialMobilbeNumber} name=' officialMobilbeNumber' />

                                                    <MDBInput wrapperClass='mb-2' label='Personal Mail Id' onChange={(e) => { setPersonalMaildId(e.target.value) }} value={personalMaildId} name='PersonalMaildId' />

                                                    <MDBInput wrapperClass='mb-2' label='Official Mail Id' onChange={(e) => { setOfficialMaildId(e.target.value) }} value={officialMaildId} name='officialMaildId' />

                                                </div>

                                                <div className='col-3'>
                                                    <Form.Select className='mb-2' onChange={handleUserLevel} value={userLevel}>
                                                        <option> User Level </option>
                                                        <option value="normal">Normal</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="superAdmin">Super Admin</option>
                                                    </Form.Select>

                                                    <Form.Select className='mb-2' onChange={handleStatus} value={status}>
                                                        <option> Status </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">InActive</option>
                                                    </Form.Select>

                                                    <MDBInput wrapperClass='mb-2' label='User_Id' onChange={(e) => { setUserId(e.target.value) }} value={userId} name='UserId' />

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
                                        <Button variant="primary" type='button' onClick={handleUnitSetup}>
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