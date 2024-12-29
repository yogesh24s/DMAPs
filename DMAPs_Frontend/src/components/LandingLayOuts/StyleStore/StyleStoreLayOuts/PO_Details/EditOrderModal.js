import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const EditOrderModal = ({
	isEditFormOpen,
	closeEditForm,
	styleNoList,
	styleNo,
	setStyleNo,
	handleSizeGrid,
	styleNoError,
	BuyerName,
	BuyerRefNo,
	setBuyerRefNo,
	StyleDescription,
	SizeGridName,
	GenderView,
	ProductType,
	MerchantName,
	MerchantContact,
	AddOnField,
	setAddOnField,
	Season,
	base64Images,
	fPONo,
	DMAPsPONo,
	setDMAPsPONo,
	setFPONo,
	fPONoError,
	PONo,
	setPONo,
	PONoError,
	OCNo,
	setOCNo,
	OCNoError,
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
	shipmentModeList,
	garmentColorList,
	todList,
	destinationCountryList,
	washingTypeError,
	deliveryDate,
	setDeliveryDate,
	deliveryDateError,
	exDeliveryDate,
	setExDeliveryDate,
	exDeliveryDateError,
	POAddOnField1,
	setPOAddOnField1,
	POAddOnField2,
	setPOAddOnField2,
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
	rows,
	sizesArray,
	setRows,
	addNewRow,
	handleEditRow,
	handleDeleteRow,
	handleEditStyleEntry,
	calculateTotal,
	sizeKeys,
}) => (
  <Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-90w"
					backdrop="static">
					<Modal.Header closeButton>
						<Modal.Title>Edit Order Details </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<div className='row'>
							<h6 className='h6'> Style Information </h6>
								<div className="col-4">
									<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
										<div style={{ width: '40%', paddingRight: '5px' }}>
											DMAPS No.
										</div>
										<Form.Select
											tabIndex="1"
											onChange={(e) => {
												setStyleNo(e.target.value);
												handleSizeGrid(e.target.value);
											}}
											value={styleNo}
											name="styleNo"
											className="form-select"
											disabled
										>
											<option>DMAPS No.</option>
											{styleNoList.map((item) => (
												<option key={item.Style_No} value={item.Style_No}>
													{item.Style_No}
												</option>
											))}
										</Form.Select>
									</InputGroup>
									
									{/* Error Message */}
									{styleNoError && (
										<div className="text-danger text-center" style={{ marginLeft:'150px'}}>{styleNoError}</div>
									)}
								</div>
								{styleNo ? (
								<> <div className='col-4'>
										<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
											<div style={{ width: '70%', marginTop: '-5px' }}>
												Season
											</div>
											<span className='span-read'> {Season} </span>
										</InputGroup>
									</div>

									<div className='col-4'>
										<h6 className='h6-small'> Style Images </h6>
									</div>
								</>
								) : null }
							</div>
							{styleNo ? (
								<>
									<div className='row'>
										<div className='col-8'>
											<div className='row'>
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Buyer
														</div>
														<span className='span-read'> {BuyerName} </span>
													</InputGroup>
												</div>

												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Size Grid
														</div>

														<span className='span-read'> {SizeGridName} </span>
													</InputGroup>
												</div>

												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Buyer Style No.
														</div>
														<span className='span-read'> {StyleDescription} </span>
													</InputGroup>
												</div>
												
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Buyer Ref No.
														</div>
														<span className='span-read'> {BuyerRefNo} </span>
													</InputGroup>
												</div>
												
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Style Description
														</div>
														<span className='span-read'> {ProductType} </span>
													</InputGroup>
												</div>

												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Merchant Name
														</div>

														<span className='span-read'> {MerchantName} </span>
													</InputGroup>
												</div>

												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Style Gender
														</div>
														<span className='span-read'> {GenderView} </span>
													</InputGroup>
												</div>
												
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Style Add-on filed
														</div>
														<span className='span-read'> {AddOnField} </span>
													</InputGroup>
												</div>

												<div className='col-12'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '24%', marginTop: '-5px' }}>
															Note / Remarks
														</div>
														<span className='span-read'> {note} </span>
													</InputGroup>
												</div>
																		
											</div>
										</div>
										<div className='col-4'>
										<div className='row'>
											{["Front", "Back", "Optional"].map((label, index) => (

													<div key={index} className='col-4'>
														<label htmlFor={`imageUpload-${index}`} className="upload-button" style={{ cursor: 'pointer', textAlign : 'center', width:'100%' }}>
																{label}
															</label>
														<div style={{textAlign: 'center' }}>
															<img
																src={base64Images[index]}
																alt={`${label} Thumbnail`}
																style={{ width : "80%", height : "60%", textAlign: 'center', borderRadius: '5px', cursor: 'pointer' }}												/>
														</div>
													</div>
												))}
											</div>
										</div>
										
										
									</div>
								</>
							) : null}
							<h6 className='h6'> Add Order Details </h6>
							<div className="row g-3">
								{/* DMAPs PO No. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											DMAPs PO No.
										</label>
										<MDBInput
											type="text"
											placeholder="DMAPs PO No."
											value={DMAPsPONo}
											onChange={(e) => setDMAPsPONo(e.target.value)}
											name="fPONo"
											className="form-control"
											disabled
										/>
									</div>
								</div>

								{/* Print Type */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											Print
										</label>
										<Form.Select
											value={printType}
											onChange={(e) => setPrintType(e.target.value)}
											name="printType"
											className="form-select"
										>
											<option value=""> Select Print </option>
											{printTypeList.map((item) => (
												<option key={item.id} value={item.Print_Type}>
													{item.Print_Type}
												</option>
											))}
										</Form.Select>
									</div>
									{printTypeError && <div className="text-danger text-center">{printTypeError}</div>}
								</div>

								{/* PCD */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											PCD Date
										</label>
										<DatePicker
											selected={pcd}
											onChange={(date) => setPCD(date)}
											className="form-control"
											dateFormat="dd/MM/yyyy"
											placeholderText="dd/mm/yyyy"
										/>
									</div>
									{pcdError && <div className="text-danger text-center">{pcdError}</div>}
								</div>

								

								{/* F PO No. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											Buyer PO No.
										</label>
										<MDBInput
											type="text"
											placeholder="Enter Buyer PO No."
											value={fPONo}
											onChange={(e) => setFPONo(e.target.value)}
											name="fPONo"
											className="form-control"
										/>
									</div>
									{fPONoError && <div className="text-danger text-center">{fPONoError}</div>}
								</div>

								{/* Emb. Type */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											Embrodiery
										</label>
										<Form.Select
											value={embType}
											onChange={(e) => setEmbType(e.target.value)}
											name="embType"
											className="form-select"
										>
											<option value=""> Select Embrodiery </option>
											{embTypeList.map((item) => (
												<option key={item.id} value={item.Emb_Type}>
													{item.Emb_Type}
												</option>
											))}
										</Form.Select>
									</div>
									{embTypeError && <div className="text-danger text-center">{embTypeError}</div>}
								</div>

								{/* Delivery Date */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "pre-wrap", width:'60%' }}>
											Ex Delivery
											Date
										</label>
										<DatePicker
											selected={exDeliveryDate}
											onChange={(date) => setExDeliveryDate(date)}
											className="form-control"
											dateFormat="dd/MM/yyyy"
											placeholderText="dd/mm/yyyy"
										/>
									</div>
									{exDeliveryDateError && <div className="text-danger text-center ms-5 ps-5">{exDeliveryDateError}</div>}
								</div>
								
								{/* Order No. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
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
									{OCNoError && <div className="text-danger text-center">{OCNoError}</div>}
								</div>

								{/* Washing Type */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'63%' }}>
											Washing
										</label>
										<Form.Select
											value={washingType}
											onChange={(e) => setWashingType(e.target.value)}
											name="washingType"
											className="form-select"
										>
											<option value=""> Select Washing </option>
											{washingTypeList.map((item) => (
												<option key={item.id} value={item.Washing_Type}>
													{item.Washing_Type}
												</option>
											))}
										</Form.Select>
									</div>
									{washingTypeError && <div className="text-danger text-center ms-5 ps-5">{washingTypeError}</div>}
								</div>

								{/* Delivery Date */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
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
									{deliveryDateError && <div className="text-danger text-center ms-5 ps-5">{deliveryDateError}</div>}
								</div>
								{/* Shipment Mode */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											Shipment Mode
										</label>
										<Form.Select
											value={shipmentMode}
											onChange={(e) => setShipmentMode(e.target.value)}
											name="shipmentMode"
											className="form-select"
										>
											<option value=""> Select Shipment Mode </option>

											{shipmentModeList.map((item) => (
												<option key={item.id} value={item.Shipment_Mode}>
													{item.Shipment_Name}
												</option>
											))}
										</Form.Select>
									</div>
									{shipmentModeError && <div className="text-danger text-center  ms-5 ps-5">{shipmentModeError}</div>}
								</div>

								{/* PO Add On Filed 1. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											PO Add-on field 1
										</label>
										<MDBInput
											type="text"
											value={POAddOnField1}
											onChange={(e) => setPOAddOnField1(e.target.value)}
											name="POAddOnField1"
											className="form-control"
										/>
									</div>
								</div>

								{/* PO Add On Filed 2. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'60%' }}>
											PO Add-on field 2
										</label>
										<MDBInput
											type="text"
											value={POAddOnField2}
											onChange={(e) => setPOAddOnField2(e.target.value)}
											name="POAddOnField2"
											className="form-control"
										/>
									</div>
								</div>

								
								{/* Others */}
								{/* <div className="col-md-6">
									<label className="form-label">Others</label>
									<MDBInput
										type="text"
										placeholder="Enter Others"
										value={others}
										onChange={(e) => setOthers(e.target.value)}
										name="others"
									/>
								</div> */}

								{/* Notes */}
								
								<div className="col-12">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label" style={{ whiteSpace: "nowrap", width:'14%' }}> Note / Remarks </label>
										<MDBInput
											type="textarea"
											placeholder="Enter Notes"
											value={note}
											onChange={(e) => setNote(e.target.value)}
											name="note"
											rows="3"
										/>
									</div>
								</div>
							</div>
							
							<div className="col-12 mt-20 parentDivStyle">
								<table border="1" cellPadding="10" className='table tableStyle'>
									<thead>
										<tr>
											<th style={{ width: '100px' }}>Garment Color</th>
											<th style={{ width: '120px' }}>Destination Country</th>
											<th style={{ width: '100px' }}> TOD </th>
											{sizeKeys.map((sizeKey) => (
												<th key={sizeKey} className='thTdStyle'>{sizeKey}</th>
											))}
											<th style={{ width: '50px' }}>Total</th>
											<th style={{ width: '60px' }}>Actions</th>
										</tr>
									</thead>
									<tbody>
										{rows.map((row, rowIndex) => (
											<tr key={rowIndex}>
												<td className='thTdStyle'>
													{row.isEditable ? (
													 <Form.Select
														value={row.garmentColor}
														onChange={(e) => {
															const updatedRows = [...rows];
															updatedRows[rowIndex].garmentColor = e.target.value;
															setRows(updatedRows);
														}}
														name="garmentColor"
														className="form-select"
													>
													<option value=""> Select </option>
														{garmentColorList.map((item) => (
															<option key={item.id} value={item.Color_Code}>
																{item.Color_Name}
															</option>
														))}
													</Form.Select>
													) : (
														<div
															style={{
																backgroundColor: row.garmentColor,
																width: '25px',
																height: '25px',
																borderRadius: '4px',
																border: '1px solid #ccc',
															}}
														></div>
													)}
												</td>
												<td className='thTdStyle'>
													{row.isEditable ? (
														<Form.Select
																value={row.destinationCountry}
																onChange={(e) => {
																	const updatedRows = [...rows];
																	updatedRows[rowIndex].destinationCountry = e.target.value;
																	setRows(updatedRows);
																}}
																name="destinationCountry"
																className="form-select"
															>
																<option value=""> Select </option>
																{destinationCountryList.map((item) => (
																	<option key={item.id} value={item.Country_Name}>
																		{item.Country_Name}
																	</option>
																))}
															</Form.Select>
													) : (
														row.destinationCountry

													)}
												</td>
												<td className='thTdStyle'>
													{row.isEditable ? (<Form.Select
														value={row.TOD}
														onChange={(e) => {
															const updatedRows = [...rows];
															updatedRows[rowIndex].TOD = e.target.value;
															setRows(updatedRows);
														}}
														name="TOD"
														className="form-select"
													>
														<option value=""> Select </option>
														{todList.map((item) => (
															<option key={item.id} value={item.TOD_Name}>
																{item.TOD_Name}
															</option>
														))}
													</Form.Select> )
													: (
														row.TOD

													)}
												</td>
												{/* Dynamically generate size fields */}
												{sizeKeys.map((sizeKey) => (
													<td className='thTdStyle' key={sizeKey}>
														{row.isEditable ? (
															<input
																type="number"
																value={row.sizes[sizeKey] || ''}
																onChange={(e) => {
																	const updatedRows = [...rows];
																	updatedRows[rowIndex].sizes[sizeKey] = e.target.value;
																	updatedRows[rowIndex].total = calculateTotal(updatedRows[rowIndex].sizes);
																	setRows(updatedRows);
																}}
															/>
														) : (
															row.sizes[sizeKey] || ''

														)}
													</td>
												))}
												<td className='thTdStyle'>{row.total}</td>
												<td className="thTdStyle">
													{/* Toggle between Edit and Save buttons based on isEditable */}
													{row.isEditable ? (
														<i
															className="fa fa-save pointer"
															onClick={(e) => handleEditStyleEntry(e, 'edit', rowIndex)}
															title="Save"
														></i>
													) : (
														<i
															className="fa fa-edit pointer"
															onClick={() => handleEditRow(rowIndex)}
															title="Edit"
														></i>
													)}
													{/* Trash icon to delete the row */}
													<i
														className="fa fa-trash ml-15 pointer"
														onClick={() => handleDeleteRow(rowIndex)}
														title="Delete"
													></i>
												</td>

											</tr>
										))}
									</tbody>
								</table>
								<Button variant="success" onClick={addNewRow} style={{ float: 'right', width: '5%', marginTop: "-20PX" }}> <i className='fa fa-plus fa-1x white'> </i> </Button>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={(e) => handleEditStyleEntry(e, 'save', '99999')} style={{ width: '15%' }}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
);

export default EditOrderModal;
