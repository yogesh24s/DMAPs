/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
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
import CompanyUnitTable from './CompanyUnitTable';


export default function UnitSetUp() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const [verticalActive, setVerticalActive] = useState('tabV1');
	const [unitNameLogo, setUnitNameLogo] = useState("")
	const [unitName, setunitName] = useState('')
	const [unitNameError, setUnitNameError] = useState("")
	const [shortName, setShortName] = useState('')
	const [shortNameError, setShortNameError] = useState('');
	const [group, setGroup] = useState('')
	const [groupError, setGroupError] = useState('');
	const [division, setdivision] = useState('')
	const [divisionError, setDivisionError] = useState('');
	const [tinNo, setTinNo] = useState('')
	const [tinNoError, setTinNoError] = useState('');
	const [regNo, setRegNo] = useState('')
	const [regNoError, setRegNoError] = useState('');
	const [addressLine1, setAddressLine1] = useState('')
	const [addressLine1Error, setAddressLine1Error] = useState('');
	const [city, setCity] = useState('')
	const [cityError, setCityError] = useState('');
	const [pinNo, setPinNO] = useState('')
	const [pinNoError, setPinNoError] = useState('');
	const [contactNo, setContactNo] = useState('');
	const [contactNoError, setContactNoError] = useState('');
	const [mailId, setMailId] = useState('')
	const [mailIdError, setMailIdError] = useState('');
	const [state, setState] = useState('')
	const [stateError, setStateError] = useState('');
	const [data, setData] = useState([])
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [unitId, setUnitId] = useState("")
	const handleVerticalClick = (value) => {
		if (value === verticalActive) {
			return;
		}
		setVerticalActive(value);
	};

	const handleTinValidation = (value) => {
		// Define a regular expression pattern for a 9-digit TIN
		const tinPattern = /^\d{9}$/;
		// Return whether the value matches the pattern
		return tinPattern.test(value);
	};

	const handleUnitSetup = (e) => {
		e.preventDefault();
		debugger
		let isValid = true;

		if (!unitName) {
			setUnitNameError('Unit Name is required');
			isValid = false;
		} else {
			setUnitNameError('');
		}

		if (!shortName) {
			setShortNameError('Short Name is required');
			isValid = false;
		} else {
			setShortNameError('');
		}

		if (!group) {
			setGroupError('Group is required');
			isValid = false;
		} else {
			setGroupError('');
		}

		if (!division) {
			setDivisionError('Division is required');
			isValid = false;
		} else {
			setDivisionError('');
		}

		if (!tinNo) {
			setTinNoError('TIN No is required');
			isValid = false;
		} else if (!handleTinValidation(tinNo)) {
			setTinNoError('Invalid TIN format');
			isValid = false;
		} else {
			setTinNoError('');
		}

		if (!regNo) {
			setRegNoError('Registration No is required');
			isValid = false;
		} else {
			setRegNoError('');
		}
		if (!addressLine1) {
			setAddressLine1Error('Address Line 1 is required');
			isValid = false;
		} else {
			setAddressLine1Error('');
		}

		if (!city) {
			setCityError('City is required');
			isValid = false;
		} else {
			setCityError('');
		}

		if (!state) {
			setStateError('State  is required');
			isValid = false;
		} else {
			setStateError('');
		}

		if (!pinNo) {
			setPinNoError('Pin Number is required');
			isValid = false;
		} else {
			setPinNoError('');
		}

		if (!contactNo) {
			setContactNoError('Contact Number is required');
			isValid = false;
		} else {
			setContactNoError('');
		}

		if (!mailId) {
			setMailIdError('Mail id is required');
			isValid = false;
		} else {
			setMailIdError('');
		}

		if (!isValid) {
			return;
		}

		let payload = {
			"Unit_Full_Name": unitName,
			"Unit_Short_Name": shortName,
			"Group_Id": group,
			"Division_Id": division,
			"Tin_Num": tinNo,
			"Reg_Num": regNo,
			"Address_Line_1": addressLine1,
			"City": city,
			"State": state,
			"Pin_Code": pinNo,
			"Contact_No": contactNo,
			"Email_Id": mailId
		}

		trackPromise(unitService.saveCompanyUnits({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				stateValues()
				getCompanyUnitData()
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
	const getCompanyUnitData = () => {
		trackPromise(
			unitService.getCompanyUnits().then((response) => {
				setData(response.data.Company_Units)
			})
		);
	}
	useEffect(() => {
		getCompanyUnitData()
	}, [])

	function stateValues() {
		setunitName('')
		setShortName('')
		setGroup('')
		setdivision('')
		setTinNo('')
		setRegNo('')
		setAddressLine1('')
		setCity('')
		setState('')
		setPinNO('')
		setContactNo('')
		setMailId('')
	}
	useEffect((

	) => { }, [])


	const iconActionHandler = (cell, row, rowIndex) => {
		return (
			<>
				<i className="fas fa-edit action-icon" title="Edit" > </i>
			</>
		);
	};
	const openEditForm = (data) => {
        console.log({"dataaaaunit":data})
        editFormDetails(data)
        setIsEditFormOpen(true);
    };
	function editFormDetails(data) {
		setunitName(data.Unit_Full_Name)
		setShortName(data.Unit_Short_Name)
		setGroup(data.Group_Id)
		setdivision(data.Division_Id)
		setTinNo(data.Tin_Num)
		setRegNo(data.Reg_Num)
		setAddressLine1(data.Address_Line_1)
		setCity(data.City)
		setState(data.State)
		setPinNO(data.Pin_Code)
		setContactNo(data.Contact_No)
		setMailId(data.Email_Id)
		setUnitId(data.Unit_Id)
	}
    const closeEditForm = () => {
        setIsEditFormOpen(false);
    };
    // function handleForm() {
    //     settingValuesToEmpty()
    //     setShow(true)
    // }
	const handleEditUnit = (e) => {
		e.preventDefault();
		

		let payload = {
			"Unit_Full_Name": unitName,
			"Unit_Short_Name": shortName,
			"Group_Id": group,
			"Division_Id": division,
			"Tin_Num": tinNo,
			"Reg_Num": regNo,
			"Address_Line_1": addressLine1,
			"City": city,
			"State": state,
			"Pin_Code": pinNo,
			"Contact_No": contactNo,
			"Email_Id": mailId,
			"Unit_Id": unitId
		}

		trackPromise(unitService.editCompanyUnits({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				alert("Records updated Successfull")
				getCompanyUnitData()
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
									Add New 
								</Button>
								<Modal
									show={show}
									onHide={() => setShow(false)}
									dialogClassName="modal-50w"
									backdrop="static"
									keyboard={false}>

									<Modal.Header closeButton>
										<Modal.Title> Add New Unit </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleUnitSetup} style={{"margin-right":'-250px'}}>
											<div className='row'>
												
												<div className='col-4'>
													<MDBInput wrapperClass='mb-2' label='Name of Unit' onChange={(e) => { setunitName(e.target.value) }} value={unitName} name='unitName' />

													{unitNameError && <p style={{ color: 'red' }}>{unitNameError}</p>}

													
													<MDBInput label='Address' wrapperClass='mb-2' onChange={(e) => { setAddressLine1(e.target.value) }} value={addressLine1} name='addressLine1' />
													{addressLine1Error && <p style={{ color: 'red' }}>{addressLine1Error}</p>}


													<MDBInput wrapperClass='mb-2' label='State' onChange={(e) => { setState(e.target.value) }} value={state} name='state' />
													{stateError && <p style={{ color: 'red' }}>{stateError}</p>}


													<MDBInput wrapperClass='mb-2' type='text' label='Division' onChange={(e) => { setdivision(e.target.value); }} value={division} name='division' />
													{divisionError && <p style={{ color: 'red' }}>{divisionError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='TIN No.' onChange={(e) => { setTinNo(e.target.value) }} value={tinNo} name='tinNo' />
													{tinNoError && <p style={{ color: 'red' }}>{tinNoError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='Registration No.' onChange={(e) => { setRegNo(e.target.value) }} value={regNo} name='regNo' />
													{regNoError && <p style={{ color: 'red' }}>{regNoError}</p>}

												</div>

												<div className='col-4'>

													<MDBInput wrapperClass='mb-2' label='Short Name' onChange={(e) => { setShortName(e.target.value) }} value={shortName} name='shortName' />

													{shortNameError && <p style={{ color: 'red' }}>{shortNameError}</p>}

													
													<MDBInput wrapperClass='mb-2' label='City' onChange={(e) => { setCity(e.target.value) }} value={city} name='city' />
													{cityError && <p style={{ color: 'red' }}>{cityError}</p>}

													<MDBInput wrapperClass='mb-2' label='Pincode' onChange={(e) => { setPinNO(e.target.value) }} value={pinNo} name='pinNo' />
													{pinNoError && <p style={{ color: 'red' }}>{pinNoError}</p>}

													<MDBInput wrapperClass='mb-2' label='Group' onChange={(e) => { setGroup(e.target.value) }} value={group} name='group' />
													{groupError && <p style={{ color: 'red' }}>{groupError}</p>}

													<MDBInput wrapperClass='mb-2' label='Admin E-Mail ID' onChange={(e) => { setMailId(e.target.value) }} value={mailId} name='mailId' />
													{mailIdError && <p style={{ color: 'red' }}>{mailIdError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='Admin Contact No.' onChange={(e) => { setContactNo(e.target.value) }} value={contactNo} name='contactNo' />
													{contactNoError && <p style={{ color: 'red' }}>{contactNoError}</p>}

												</div>
											</div>
										</form>

									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose} style={{width:'20%'}}>
											Cancel
										</Button>
										<Button variant="primary" type='submit' onClick={handleUnitSetup} style={{width:'20%'}}>
											Save
										</Button>
									</Modal.Footer>
								</Modal>
							</div>
							<div className='col-12'>
								<CompanyUnitTable data={data} openEditForm={openEditForm} />
								<Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-75w"
									backdrop="static">
									<Modal.Header closeButton>
										<Modal.Title>Edit Unit Form</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleEditUnit}>
											<div className='row'>
												<div className='col-4'>
													<label> Unit Logo </label>
													<MDBInput wrapperClass='mb-4' type="file" onChange={(e) => { setUnitNameLogo(e.target.value) }} value={unitNameLogo} name='logo' />
												</div>
												<div className='col-4'>
													<MDBInput wrapperClass='mb-2' label='Name Of Unit' onChange={(e) => { setunitName(e.target.value) }} value={unitName} name='unitName' />

													{unitNameError && <p style={{ color: 'red' }}>{unitNameError}</p>}

													<MDBInput wrapperClass='mb-2' label='Unit Short Name' onChange={(e) => { setShortName(e.target.value) }} value={shortName} name='shortName' />

													{shortNameError && <p style={{ color: 'red' }}>{shortNameError}</p>}

													<MDBInput wrapperClass='mb-2' label='Group' onChange={(e) => { setGroup(e.target.value) }} value={group} name='group' />
													{groupError && <p style={{ color: 'red' }}>{groupError}</p>}

													<MDBInput wrapperClass='mb-2' type='text' label='Division' onChange={(e) => { setdivision(e.target.value); }} value={division} name='division' />
													{divisionError && <p style={{ color: 'red' }}>{divisionError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='TIN No.' onChange={(e) => { setTinNo(e.target.value) }} value={tinNo} name='tinNo' />
													{tinNoError && <p style={{ color: 'red' }}>{tinNoError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='Register No.' onChange={(e) => { setRegNo(e.target.value) }} value={regNo} name='regNo' />
													{regNoError && <p style={{ color: 'red' }}>{regNoError}</p>}

												</div>

												<div className='col-4'>
													<MDBInput label='Address Line 1' wrapperClass='mb-2' onChange={(e) => { setAddressLine1(e.target.value) }} value={addressLine1} name='addressLine1' />
													{addressLine1Error && <p style={{ color: 'red' }}>{addressLine1Error}</p>}

													<MDBInput wrapperClass='mb-2' label='City' onChange={(e) => { setCity(e.target.value) }} value={city} name='city' />
													{cityError && <p style={{ color: 'red' }}>{cityError}</p>}

													<MDBInput wrapperClass='mb-2' label='State' onChange={(e) => { setState(e.target.value) }} value={state} name='state' />
													{stateError && <p style={{ color: 'red' }}>{stateError}</p>}

													<MDBInput wrapperClass='mb-2' label='Pin Code' onChange={(e) => { setPinNO(e.target.value) }} value={pinNo} name='pinNo' />
													{pinNoError && <p style={{ color: 'red' }}>{pinNoError}</p>}

													<MDBInput wrapperClass='mb-2' label='Admin Mail ID' onChange={(e) => { setMailId(e.target.value) }} value={mailId} name='mailId' />
													{mailIdError && <p style={{ color: 'red' }}>{mailIdError}</p>}

													<MDBInput wrapperClass='mb-2' type='tel' label='Contact No.' onChange={(e) => { setContactNo(e.target.value) }} value={contactNo} name='contactNo' />
													{contactNoError && <p style={{ color: 'red' }}>{contactNoError}</p>}

												</div>
											</div>
										</form>

									</Modal.Body>
									<Modal.Footer>
                                        <Button variant="secondary" onClick={closeEditForm}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleEditUnit}>
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