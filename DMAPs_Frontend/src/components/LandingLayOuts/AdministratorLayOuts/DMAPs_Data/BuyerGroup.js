/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './dataSet.scss';

import buyerService from '../../../../services/buyerService';
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
	const [buyerId, setBuyerId] = useState('');
	const [buyerName, setBuyerName] = useState("");
	const [contactNumber, setcontactNumber] = useState("");
	const [mailId, setMailId] = useState("");

	const [buyerGroupData, setBuyerGroupData] = useState([]);
	const [data, setData] = useState([]);

	const [isEditFormOpen, setIsEditFormOpen] = useState(false);

	const closeEditForm = () => {
        setIsEditFormOpen(false);
    };

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
			"Buyer_Group_Name": selectedBuyerGroup,
			"Buyer_Name": buyerName,
			"Buyer_Contact_No": contactNumber,
			"Buyer_Email_Id": mailId
		}
		trackPromise(buyerService.saveCompanyBuyers({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status == 200) {
				// alert(response.data.result);
				getCompanyBuyersData()
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

	const handleEditBuyer = (e) => {
		e.preventDefault();
		let payload = {
			"Buyer_Id" : buyerId,
			"Buyer_Group_Name": selectedBuyerGroup,
			"Buyer_Name": buyerName,
			"Buyer_Contact_No": contactNumber,
			"Buyer_Email_Id": mailId
		}

		trackPromise(buyerService.editCompanyBuyers({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				// alert(response.data.result)
				getCompanyBuyersData()
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

	const getCompanyBuyersData = () => {
		trackPromise(
			buyerService.getCompanyBuyers().then((response) => {
				setData(response.data.Company_Buyers)
			})
		);
	}
	useEffect(() => {
		getCompanyBuyersData()
	}, [])

	function editFormDetails(data) {
		setSelectedBuyerGroup(data.Buyer_Group_Name);
		setcontactNumber(data.Buyer_Contact_No);
		setMailId(data.Buyer_Email_Id);
		setBuyerName(data.Buyer_Name);
		setBuyerId(data.Buyer_Id);
	}
	function settingValuesToEmpty() {
		setBuyerId("");
		setSelectedBuyerGroup("");
		setcontactNumber("");
		setMailId("");
		setBuyerName("");
	}
	const openEditForm = (data) => {

		editFormDetails(data)
		setIsEditFormOpen(true);

	};

	function handleForm() {
		settingValuesToEmpty()
		setShow(true)
	}


	const deleteBuyerGroupRecord = (data) => {

		if (window.confirm("Are you sure to delete the Company Buyers ?")) {
			let payload = {
				"Buyer_Id": data.Buyer_Id
			}
			trackPromise(buyerService.deleteCompanyBuyers({ "data": [payload] }).then((response) => {
				//check login response
				if (response.status === 200) {
					getCompanyBuyersData()
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
						<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleBuyerGroupSetup} style={{ width: '15%' }}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className='col-12'>

				<BuyerGroupTable data={data} openEditForm={openEditForm} deleteBuyerGroupRecord={deleteBuyerGroupRecord} />

				<Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-50w"
					backdrop="static">
					<Modal.Header closeButton>
						<Modal.Title>Edit Company Buyer</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={handleEditBuyer}>
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
						<Button variant="secondary" onClick={closeEditForm} style={{ width: '15%' }}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleEditBuyer} style={{ width: '15%' }}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	</>
}