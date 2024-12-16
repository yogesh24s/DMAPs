import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const OrderModal = ({
	show,
	setShow,
	handleClose,
	styleNoList,
	styleNo,
	setStyleNo,
	handleSizeGrid,
	styleNoError,
	BuyerName,
	StyleDescription,
	SizeGridName,
	GenderView,
	ProductType,
	MerchantName,
	MerchantContact,
	fPONo,
	setFPONo,
	fPONoError,
	PONo,
	setPONo,
	PONoError,
	OCNo,
	setOCNo,
	embType,
	setEmbType,
	embTypeList,
	embTypeError,
	printType,
	setPrintType,
	printTypeList,
	printTypeError,
	washingType,
	setWashingType,
	washingTypeList,
	washingTypeError,
	deliveryDate,
	setDeliveryDate,
	deliveryDateError,
	pcd,
	setPCD,
	pcdError,
	shipmentMode,
	setShipmentMode,
	shipmentModeError,
	others,
	setOthers,
	note,
	setNote,
	sizesArray,
	rows,
	setRows,
	addNewRow,
	handleDeleteRow,
	calculateTotal,
	handlePODetails
}) => (
	<Modal
		show={show}
		onHide={handleClose}
		dialogClassName="modal-90w"
		backdrop="static"
		keyboard={false}>
		<Modal.Header closeButton>
			<Modal.Title> Add New Order  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<form onSubmit={handlePODetails}>
				<div className='row'>
					<div className='col-3' >
						<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
							<div style={{ width: '70%', paddingRight: '5px', marginTop: '-13px' }}>
								Dmaps No
							</div>
							<Form.Select className='mb-3' tabindex="1" label='DMAPS No.' onChange={(e) => {
								setStyleNo(e.target.value);
								handleSizeGrid(e.target.value)
							}} value={styleNo} name='styleNo' style={{ width: '100%' }}>
								<option> Select DMAPS No. </option>
								{styleNoList.map((item) => (
									<option key={item.Style_No} value={item.Style_No}>
										{item.Style_No}
									</option>
								))}
							</Form.Select>
							{styleNoError && <p style={{ color: 'red' }}>{styleNoError}</p>}
						</InputGroup>


					</div>
				</div>
				{styleNo ? (
					<>
						<div className='row'>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '40%', paddingRight: '5px', marginTop: '-5px' }}>
										Buyer
									</div>
									<span className='span-read'> {BuyerName} </span>
								</InputGroup>

							</div>
							<div className='col-4'>

								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '70%', marginRight: '20px', marginTop: '-5px' }}>
										Buyer Style No.
									</div>
									<span className='span-read'> {StyleDescription} </span>
								</InputGroup>
							</div>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '90%', marginRight: '20px', marginTop: '-5px' }}>
										Size Grid Name
									</div>

									<span className='span-read'> {SizeGridName} </span>
								</InputGroup>
							</div>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '40%', marginTop: '-5px' }}>
										Gender
									</div>
									<span className='span-read'> {GenderView} </span>
								</InputGroup>
							</div>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '80%', marginTop: '-5px' }}>
										Product Type
									</div>

									<span className='span-read'> {ProductType} </span>
								</InputGroup>
							</div>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '100%', marginTop: '-5px' }}>
										Merchant Name
									</div>

									<span className='span-read'> {MerchantName} </span>
								</InputGroup>
							</div>
							<div className='col-4'>
								<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
									<div style={{ width: '100%', marginTop: '-5px' }}>
										Merchant Contact No.
									</div>
									<span className='span-read'> {MerchantContact} </span>
								</InputGroup>
							</div>
						</div>
					</>
				) : null}
				<h6 className='h6'> Order Details </h6>
				<div className="row g-3">
  {/* F PO No. */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      F PO No.
    </label>
    <MDBInput
      type="text"
      placeholder="Enter F PO No."
      value={fPONo}
      onChange={(e) => setFPONo(e.target.value)}
      name="fPONo"
      className="form-control"
    />
  </div>

  {/* Order No. */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Order No.
    </label>
    <MDBInput
      type="text"
      placeholder="Enter Order No."
      value={PONo}
      onChange={(e) => setPONo(e.target.value)}
      name="PONo"
      className="form-control"
    />
  </div>

  {/* OC No. */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      OC No.
    </label>
    <MDBInput
      type="text"
      placeholder="Enter OC No."
      value={OCNo}
      onChange={(e) => setOCNo(e.target.value)}
      name="OCNo"
      className="form-control"
    />
  </div>

  {/* Emb. Type */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Emb. Type
    </label>
    <Form.Select
      value={embType}
      onChange={(e) => setEmbType(e.target.value)}
      name="embType"
      className="form-select"
    >
      <option>Select Emb Type</option>
      {embTypeList.map((item) => (
        <option key={item.id} value={item.Emb_Type}>
          {item.Emb_Type}
        </option>
      ))}
    </Form.Select>
  </div>

  {/* Print Type */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Print Type
    </label>
    <Form.Select
      value={printType}
      onChange={(e) => setPrintType(e.target.value)}
      name="printType"
      className="form-select"
    >
      <option>Select Print Type</option>
      {printTypeList.map((item) => (
        <option key={item.id} value={item.Print_Type}>
          {item.Print_Type}
        </option>
      ))}
    </Form.Select>
  </div>

  {/* Washing Type */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Washing Type
    </label>
    <Form.Select
      value={washingType}
      onChange={(e) => setWashingType(e.target.value)}
      name="washingType"
      className="form-select"
    >
      <option>Select Washing Type</option>
      {washingTypeList.map((item) => (
        <option key={item.id} value={item.Washing_Type}>
          {item.Washing_Type}
        </option>
      ))}
    </Form.Select>
  </div>

  {/* Delivery Date */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Delivery Date
    </label>
    <DatePicker
      selected={deliveryDate}
      onChange={(date) => setDeliveryDate(date)}
      className="form-control"
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
    />
  </div>

  {/* PCD */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      PCD
    </label>
    <DatePicker
      selected={pcd}
      onChange={(date) => setPCD(date)}
      className="form-control"
      dateFormat="dd/MM/yyyy"
      placeholderText="dd/mm/yyyy"
    />
  </div>

  {/* Shipment Mode */}
  <div className="col-md-4 d-flex align-items-center">
    <label className="form-label me-2" style={{ whiteSpace: "nowrap" }}>
      Shipment Mode
    </label>
    <MDBInput
      type="text"
      placeholder="Enter Shipment Mode"
      value={shipmentMode}
      onChange={(e) => setShipmentMode(e.target.value)}
      name="shipmentMode"
      className="form-control"
    />
  </div>
</div>



			</form>
		</Modal.Body>
		<Modal.Footer>

			<Button variant="primary" type='submit' onClick={handlePODetails} style={{ width: '15%' }}>
				Save
			</Button>
		</Modal.Footer>
	</Modal>
);

export default OrderModal;
