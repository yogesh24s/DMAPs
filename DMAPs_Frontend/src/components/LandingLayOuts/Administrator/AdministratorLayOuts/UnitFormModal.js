import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Form, Button, Modal } from 'react-bootstrap';

const UnitForm = ({
	show,
	handleClose,
	handleSubmit,
	unitName, setUnitName, unitNameError,
	addressLine1, setAddressLine1, addressLine1Error,
	state, setState, stateList,
	division, setDivision, divisionError,
	tinNo, setTinNo, tinNoError,
	regNo, setRegNo, regNoError,
	shortName, setShortName, shortNameError,
	city, setCity, cityError,
	pinNo, setPinNO, pinNoError,
	group, setGroup, groupError,
	mailId, setMailId, mailIdError,
	contactNo, setContactNo, contactNoError
}) => {
	return (
		<Modal
			show={show}
			onHide={handleClose}
			dialogClassName="modal-50w"
			backdrop="static"
			keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Add New Unit</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<div className='row'>
						<div className='col-6'>
							<MDBInput wrapperClass='mb-3' type='text' tabindex="1" label='Name of Unit' onChange={(e) => setUnitName(e.target.value)} value={unitName} name='unitName' />
							{unitNameError && <p style={{ color: 'red' }}>{unitNameError}</p>}

							<MDBInput label='Address' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => setAddressLine1(e.target.value)} value={addressLine1} name='addressLine1' />
							{addressLine1Error && <p style={{ color: 'red' }}>{addressLine1Error}</p>}

							<Form.Select className='mb-3' tabindex="5" label='State' onChange={(e) => setState(e.target.value)} value={state} name='state'>
								<option>Select State</option>
								{stateList.map((item) => (
									<option key={item.State_Name} value={item.State_Name}>{item.State_Name}</option>
								))}
							</Form.Select>

							<MDBInput wrapperClass='mb-3' tabindex="7" type='text' label='Division' onChange={(e) => setDivision(e.target.value)} value={division} name='division' />
							{divisionError && <p style={{ color: 'red' }}>{divisionError}</p>}

							<MDBInput wrapperClass='mb-3' type='number' tabindex="9" label='TIN No.' onChange={(e) => setTinNo(e.target.value)} value={tinNo} name='tinNo' />
							{tinNoError && <p style={{ color: 'red' }}>{tinNoError}</p>}

							<MDBInput wrapperClass='mb-3' type='text' tabindex="11" label='Registration No.' onChange={(e) => setRegNo(e.target.value)} value={regNo} name='regNo' />
							{regNoError && <p style={{ color: 'red' }}>{regNoError}</p>}
						</div>

						<div className='col-6'>
							<MDBInput wrapperClass='mb-3' type='text' tabindex="2" label='Short Name' onChange={(e) => setShortName(e.target.value)} value={shortName} name='shortName' />
							{shortNameError && <p style={{ color: 'red' }}>{shortNameError}</p>}

							<MDBInput wrapperClass='mb-3' tabindex="4" type='text' label='City' onChange={(e) => setCity(e.target.value)} value={city} name='city' />
							{cityError && <p style={{ color: 'red' }}>{cityError}</p>}

							<MDBInput wrapperClass='mb-3' tabindex="6" type='number' label='Pincode' onChange={(e) => setPinNO(e.target.value)} value={pinNo} name='pinNo' />
							{pinNoError && <p style={{ color: 'red' }}>{pinNoError}</p>}

							<MDBInput wrapperClass='mb-3' tabindex="8" type='text' label='Group' onChange={(e) => setGroup(e.target.value)} value={group} name='group' />
							{groupError && <p style={{ color: 'red' }}>{groupError}</p>}

							<MDBInput wrapperClass='mb-3' type='email' tabindex="10" label='Admin E-Mail ID' onChange={(e) => setMailId(e.target.value)} value={mailId} name='mailId' />
							{mailIdError && <p style={{ color: 'red' }}>{mailIdError}</p>}

							<MDBInput wrapperClass='mb-3' type='number' tabindex="12" label='Admin Contact No.' onChange={(e) => setContactNo(e.target.value)} value={contactNo} name='contactNo' />
							{contactNoError && <p style={{ color: 'red' }}>{contactNoError}</p>}
						</div>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>Cancel</Button>
				<Button variant="primary" type='submit' onClick={handleSubmit} style={{ width: '15%' }}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default UnitForm;
