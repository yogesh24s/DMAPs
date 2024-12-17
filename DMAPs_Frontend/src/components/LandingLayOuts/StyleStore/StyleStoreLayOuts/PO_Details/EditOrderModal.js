import React from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { MDBInput } from 'mdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const EditOrderModal = ({
  isEditFormOpen,
  closeEditForm,
  styleNo,
  styleNoList,
  styleNoError,
  handleSizeGrid,
  setStyleNo,
  BuyerName,
  StyleDescription,
  SizeGridName,
  GenderView,
  ProductType,
  MerchantName,
  MerchantContact,
  Season,
  base64Images,
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
  rows,
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
								<div className='col-3'>
									<Form.Select className='mb-3' tabindex="1" label='DMAPS No.' onChange={(e) => { setStyleNo(e.target.value); handleSizeGrid(e.target.value) }} value={styleNo} name='styleNo' disabled>
										<option> Select DMAPS No. </option>
										{styleNoList.map((item) => (
											<option key={item.Style_No} value={item.Style_No}>
												{item.Style_No}
											</option>
										))}
									</Form.Select>
									{styleNoError && <p style={{ color: 'red' }}>{styleNoError}</p>}
								</div>
							</div>
							<div className='row'>

								<div className='col-12'>
									{styleNo || styleNo != '' ? (
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
															Size Grid Name
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
															Gender
														</div>
														<span className='span-read'> {GenderView} </span>
													</InputGroup>
												</div>
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Merchant Contact
														</div>
														<span className='span-read'> {MerchantContact} </span>
													</InputGroup>
												</div>
												<div className='col-6'>
													<InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
														<div style={{ width: '70%', marginTop: '-5px' }}>
															Season
														</div>
														<span className='span-read'> {Season} </span>
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
									) : null}

									<h6 className='h6'> Order Details </h6>
								</div>
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'36%' }}> Buyer PO No. </label>

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

								{/* Order No. */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'36%' }}>
											OC No.
										</label>
										<MDBInput
											type="text"
											placeholder="Enter OC No."
											value={PONo}
											onChange={(e) => setPONo(e.target.value)}
											name="PONo"
											className="form-control"
										/>
									</div>
									{PONoError && <div className="text-danger text-center">{PONoError}</div>}
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
											<option>Select Embrodiery</option>
											{embTypeList.map((item) => (
												<option key={item.id} value={item.Emb_Type}>
													{item.Emb_Type}
												</option>
											))}
										</Form.Select>
									</div>
									{embTypeError && <div className="text-danger text-center">{embTypeError}</div>}
								</div>

								{/* Print Type */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-20">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'61%' }}>
											Print
										</label>
										<Form.Select
											value={printType}
											onChange={(e) => setPrintType(e.target.value)}
											name="printType"
											className="form-select"
										>
											<option>Select Print</option>
											{printTypeList.map((item) => (
												<option key={item.id} value={item.Print_Type}>
													{item.Print_Type}
												</option>
											))}
										</Form.Select>
									</div>
									{printTypeError && <div className="text-danger text-center">{printTypeError}</div>}
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
											<option>Select Washing</option>
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
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'58%' }}>
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

								{/* PCD */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'58%' }}>
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

								{/* Shipment Mode */}
								<div className="col-4">
									<div className="d-flex align-items-center mb-1">
										<label className="form-label me-2" style={{ whiteSpace: "nowrap", width:'37%' }}>
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
									{shipmentModeError && <div className="text-danger text-center  ms-5 ps-5">{shipmentModeError}</div>}
								</div>
								
								{/* Notes */}
								<div className="col-12">
									<label className="form-label">Notes</label>
									<MDBInput
										type="textarea"
										placeholder="Enter Notes"
										value={note}
										onChange={(e) => setNote(e.target.value)}
										name="note"
										rows="3"
									
									/>
								</div>

								<div className="col-12 mt-20 parentDivStyle">
									<table border="1" cellPadding="10" className='table tableStyle'>
										<thead>
											<tr>
												<th style={{ width: '100px' }}>Garment Color</th>
												<th style={{ width: '100px' }}>Destination Country</th>
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
															<input
																type="color"
																value={row.garmentColor}
																onChange={(e) => {
																	const updatedRows = [...rows];
																	updatedRows[rowIndex].garmentColor = e.target.value;
																	setRows(updatedRows);
																}}
															/>
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
															<input
																type="text"
																value={row.destinationCountry}
																onChange={(e) => {
																	const updatedRows = [...rows];
																	updatedRows[rowIndex].destinationCountry = e.target.value;
																	setRows(updatedRows);
																}}
															/>
														) : (
															row.destinationCountry

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
