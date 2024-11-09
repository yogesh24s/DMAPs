/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './UnitSetUp.scss';

import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBCol,
	MDBInput
} from 'mdb-react-ui-kit';

import unitService from "../../../../services/unitService";
import { trackPromise } from 'react-promise-tracker';
import CompanyUnitTable from './CompanyUnitTable';
import adminService from "../../../../services/adminService"
import UnitForm from './UnitFormModal';


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
	const [state, setState] = useState('');
	const [stateList, setStateList] = useState([]);
	const [stateError, setStateError] = useState('');
	const [data, setData] = useState([]);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [unitId, setUnitId] = useState("");
	const handleVerticalClick = (value) => {
		if (value === verticalActive) {
			return;
		}
		setVerticalActive(value);
	};

	const handleTinValidation = (value) => {
		// Define a regular expression pattern for a 11-digit TIN
		const tinPattern = /^$|^\d{11}$/;

		// Return whether the value matches the pattern
		return tinPattern.test(value);
	};


	const handleUnitSetup = (e) => {
		e.preventDefault();
		
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
		} else if (/[^a-zA-Z0-9]/.test(shortName)) {
			setShortNameError('Short Name cannot contain spaces or special characters');
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
			setTinNoError('TIN NO. should be 11 digits');
			isValid = false;
		} else if (!handleTinValidation(tinNo) && tinNo.length != '11') {
			setTinNoError('TIN NO. should be 11 digits');
			isValid = false;
		} else {
			setTinNoError('');
		}

		if (!regNo) {
			setRegNoError('Registration No is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9]+$/.test(regNo)) {
			setRegNoError('Registration No must contain only alphanumeric characters');
			isValid = false;
		} else {
			setRegNoError('');
		}

		if (!addressLine1) {
			setAddressLine1Error('Address is required');
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
			setStateError('State is required');
			isValid = false;
		} else {
			setStateError('');
		}

		if (!pinNo) {
			setPinNoError('Pin Number is required');
			isValid = false;
		} else if (!/^\d{6}$/.test(pinNo)) {
			setPinNoError('Pin Number must be a 6-digit number');
			isValid = false;
		} else {
			setPinNoError('');
		}

		if (!contactNo) {
			
			setContactNoError('Contact Number is required');
			isValid = false;
		} else if (!/^[6789]\d{9}$/.test(contactNo)) {
			setContactNoError('Please enter a valid 10-digit Indian mobile number');
			isValid = false;
		} else {
			setContactNoError('');
		}



		if (!mailId) {
			setMailIdError('Mail id is required');
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(mailId)) { // Check if email format is invalid
			setMailIdError('Invalid email format');
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
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result);
				stateValues()
				getCompanyUnitData()
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
	const getCompanyUnitData = () => {
		trackPromise(
			unitService.getCompanyUnits().then((response) => {
				setData(response.data.Company_Units)
			})
		);
	}

	const getBasicDetails = () => {
		trackPromise(
			adminService.getBasicDetails().then((response) => {
				setStateList(response.data[0].data[0].data.states)
			})
		);
	}

	useEffect(() => {
		getBasicDetails();
		getCompanyUnitData()
	}, [])


	function stateValues() {

		setUnitNameError('');
		setShortNameError('');
		setGroupError('');
		setDivisionError('');
		setTinNoError('');
		setRegNoError('');
		setAddressLine1Error('');
		setCityError('');
		setStateError('');
		setPinNoError('');
		setContactNoError('');
		setMailIdError('');

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
		editFormDetails(data)
		setIsEditFormOpen(true);
	};
	function editFormDetails(data) {

		setUnitNameError('');
		setShortNameError('');
		setGroupError('');
		setDivisionError('');
		setTinNoError('');
		setRegNoError('');
		setAddressLine1Error('');
		setCityError('');
		setStateError('');
		setPinNoError('');
		setContactNoError('');
		setMailIdError('');



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

	// Delete Unit Records

	const deleteUnitRecord = (data) => {
		if (window.confirm("Are you sure to delete the Company Unit ?")) {
			let payload = {
				"Unit_Short_Name": data.Unit_Short_Name,
				"Unit_Id": data.Unit_Id
			}
			trackPromise(unitService.deleteCompanyUnits({ "data": [payload] }).then((response) => {
				//check login response
				if (response.status === 200) {
					getCompanyUnitData()
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

	const handleEditUnit = (e) => {

		e.preventDefault();
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
		} else if (/[^a-zA-Z0-9]/.test(shortName)) {
			setShortNameError('Short Name cannot contain spaces or special characters');
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
			setTinNoError('TIN NO. should be 11 digits');
			isValid = false;
		} else if (!handleTinValidation(tinNo) && tinNo.length != '11') {
			setTinNoError('TIN NO. should be 11 digits');
			isValid = false;
		} else {
			setTinNoError('');
		}

		if (!regNo) {
			setRegNoError('Registration No is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9]+$/.test(regNo)) {
			setRegNoError('Registration No must contain only alphanumeric characters');
			isValid = false;
		} else {
			setRegNoError('');
		}

		if (!addressLine1) {
			setAddressLine1Error('Address is required');
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
			setStateError('State is required');
			isValid = false;
		} else {
			setStateError('');
		}

		if (!pinNo) {
			setPinNoError('Pin Number is required');
			isValid = false;
		} else if (!/^\d{6}$/.test(pinNo)) {
			setPinNoError('Pin Number must be a 6-digit number');
			isValid = false;
		} else {
			setPinNoError('');
		}

		if (!contactNo) {
			setContactNoError('Contact Number is required');
			isValid = false;
		} else if (!/^[6789]\d{9}$/.test(contactNo)) {
			setContactNoError('Please enter a valid 10-digit Indian mobile number');
			isValid = false;
		} else {
			setContactNoError('');
		}



		if (!mailId) {
			setMailIdError('Mail id is required');
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(mailId)) { // Check if email format is invalid
			setMailIdError('Invalid email format');
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
			"Email_Id": mailId,
			"Unit_Id": unitId
		}

		trackPromise(unitService.editCompanyUnits({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result)
				getCompanyUnitData()
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

	return <>
		<MDBCol size='1' style={{ width: "13%" }} className='no-pad-right'>
			<MDBTabs className='flex-column text-center vertical-tab'>
				<MDBTabsItem className="vertical-link">
					<MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
						Baseline
					</MDBTabsLink>
				</MDBTabsItem>
			</MDBTabs>
		</MDBCol>
		<MDBCol size='11' style={{ width: "87%" }} className='no-pad-left'>
			<MDBTabsContent className='unit-tab-content'>
				<MDBTabsPane show={verticalActive === 'tabV1'}>
					<div className='row'>
						<div className='col-8'>
							<h1 className='h1'> Company Units </h1>
						</div>
						<div className='col-4 text-right'>
							<Button className='primary-btn mt-10' onClick={() => { setShow(true); stateValues() }}>
								<i className='fa fa-plus fa-white'> </i> Unit
							</Button>
							<UnitForm
								show={show}
								handleClose={handleClose}
								handleSubmit={handleUnitSetup}
								unitName={unitName} setUnitName={setunitName} unitNameError={unitNameError}
								addressLine1={addressLine1} setAddressLine1={setAddressLine1} addressLine1Error={addressLine1Error}
								state={state} setState={setState} stateList={stateList}
								division={division} setDivision={setdivision} divisionError={divisionError}
								tinNo={tinNo} setTinNo={setTinNo} tinNoError={tinNoError}
								regNo={regNo} setRegNo={setRegNo} regNoError={regNoError}
								shortName={shortName} setShortName={setShortName} shortNameError={shortNameError}
								city={city} setCity={setCity} cityError={cityError}
								pinNo={pinNo} setPinNO={setPinNO} pinNoError={pinNoError}
								group={group} setGroup={setGroup} groupError={groupError}
								mailId={mailId} setMailId={setMailId} mailIdError={mailIdError}
								contactNo={contactNo} setContactNo={setContactNo} contactNoError={contactNoError}
							/>
						</div>
						<div className='col-12'>

							<CompanyUnitTable defaultPageSize={10} data={data} openEditForm={openEditForm} deleteUnitRecord={deleteUnitRecord} />
							<UnitForm
								show={isEditFormOpen}
								handleClose={closeEditForm}
								handleSubmit={handleEditUnit}
								unitName={unitName} setUnitName={setunitName} unitNameError={unitNameError}
								addressLine1={addressLine1} setAddressLine1={setAddressLine1} addressLine1Error={addressLine1Error}
								state={state} setState={setState} stateList={stateList}
								division={division} setDivision={setdivision} divisionError={divisionError}
								tinNo={tinNo} setTinNo={setTinNo} tinNoError={tinNoError}
								regNo={regNo} setRegNo={setRegNo} regNoError={regNoError}
								shortName={shortName} setShortName={setShortName} shortNameError={shortNameError}
								city={city} setCity={setCity} cityError={cityError}
								pinNo={pinNo} setPinNO={setPinNO} pinNoError={pinNoError}
								group={group} setGroup={setGroup} groupError={groupError}
								mailId={mailId} setMailId={setMailId} mailIdError={mailIdError}
								contactNo={contactNo} setContactNo={setContactNo} contactNoError={contactNoError}
							/>
							
						</div>
					</div>
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBCol>

	</>
}