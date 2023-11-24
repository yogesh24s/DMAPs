/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import '../UserSetUp.scss';

import userService from '../../../../services/userService';
import { trackPromise } from 'react-promise-tracker';
import BuyerGroupTable from './BuyerGroupTable';
import adminService from '../../../../services/adminService';

import {
	MDBInput
} from 'mdb-react-ui-kit';

export default function BuyerGroup() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const [selectedBuyerGroup, setSelectedBuyerGroup] = useState('');
	const [buyerName, setBuyerName] = useState("");
	const [contactNumber, setcontactNumber] = useState("");
	const [mailId, setMailId] = useState("");
	
	const [buyerGroupData, setBuyerGroupData] = useState([]);
	const [data, setData] = useState([]);

	const getBasicDetails = () => {
		trackPromise(
			adminService.getBasicDetails().then((response) => {
				setBuyerGroupData(response.data[0].data[0].data.buyerGroups)
			})
		);
	}

	useEffect(() => {
		getBasicDetails()
	}, [])

	const handleBuyerGroupSetup = (e) => {
		e.preventDefault();
		let payload = {
			
		}
		trackPromise(userService.saveCompanyUsers({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status == 200) {
				// alert(response.data.result);
				getCompanyUserData()
				handleClose()
			}
			else {
				alert(response.data.result);
			}

		}).catch((error) => {
			//console.log(error.response.data.error)
			alert(error.response.data.error);
		})
		);
	}

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

	function editFormDetails(data) {
		setSelectedBuyerGroup(data.Unit_Short_Name)
		setcontactNumber(data.Mobile_Num)
		setMailId(data.Mail_Id)
		setBuyerName(data.User_Login_ID)
	}
	function settingValuesToEmpty() {
		setSelectedBuyerGroup("")
		setcontactNumber("")
		setMailId("")
		setBuyerName("")
	}
	const openEditForm = (data) => {

		editFormDetails(data)
		// setIsEditFormOpen(true);

	};

	function handleForm() {
		settingValuesToEmpty()
		setShow(true)
	}


	const deleteBuyerGroupRecord = (data) => {

		if (window.confirm("Are you sure to delete the Company Users ?")) {
			let payload = {
				"User_Employee_Id": data.User_Employee_Id
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
		<div className='row'>
			<div className='col-8'>
				<h1 className='h1'> Buyer Group </h1>
			</div>
			<div className='col-4 text-right '>
				<Button className='primary-btn' onClick={handleForm}>
					Add Buyer <i className='fa fa-plus'> </i>
				</Button>
				<Modal
					show={show}
					onHide={() => setShow(false)}
					dialogClassName="modal-50w"
					backdrop="static"
					keyboard={false}>

					<Modal.Header closeButton style={{ color: 'white' }}>
						<Modal.Title> Add New Buyer </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={handleBuyerGroupSetup}>
							<div className='row' >
								<div className='col-6'>
								<Form.Select className='mb-3' tabindex="5" onChange={(e) => { setSelectedBuyerGroup(e.target.value) }} value={selectedBuyerGroup} name="selectedBuyerGroup" >
										<option > Select Buyer Group</option>
										{buyerGroupData.map((item) => (
											<option key={item.Buyer_Group_Id} value={item.Buyer_Group_Name}>
												{item.Buyer_Group_Name}
											</option>
										))}
									</Form.Select>

									<MDBInput wrapperClass='mb-3' type='email' label='E-Mail ID' tabindex="3" onChange={(e) => { setMailId(e.target.value) }} value={mailId} name='mailId' />
								</div>

								<div className='col-6'>

									<MDBInput wrapperClass='mb-3' type='text' label='Buyer' tabindex="2" onChange={(e) => { setBuyerName(e.target.value) }} value={buyerName} name='Buyer' />

									<MDBInput wrapperClass='mb-3' type='number' tabindex="10" label='Contact No.' onChange={(e) => { setcontactNumber(e.target.value) }} value={contactNumber} name=' contactNumber' />

								</div>
							</div>
						</form>

					</Modal.Body>
					<Modal.Footer>
						{/* <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleBuyerGroupSetup} style={{ width: '15%' }}>
							Save
						</Button> */}
					</Modal.Footer>
				</Modal>
			</div>
			<div className='col-12'>
				
				<BuyerGroupTable data={data} openEditForm={openEditForm} deleteBuyerGroupRecord={deleteBuyerGroupRecord} />

				
			</div>
		</div>
	</>
}