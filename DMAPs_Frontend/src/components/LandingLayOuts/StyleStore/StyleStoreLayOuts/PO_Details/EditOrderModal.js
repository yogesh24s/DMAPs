import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
											<div className='col-3'>
												<div className="data-row">
													<label className='label-read' htmlFor="name">Buyer</label>
													<span className='span-read'> {BuyerName} </span>
												</div>
											</div>
											<div className='col-3'>
												<div className="data-row">
													<label className='label-read' htmlFor="name">Buyer Style No.</label>
													<span className='span-read'> {StyleDescription} </span>
												</div>
											</div>
											<div className='col-3'>
												<div className="data-row">
													<label className='label-read' htmlFor="name">Size Grid Name</label>
													<span className='span-read'> {SizeGridName} </span>
												</div>
											</div>
											<div className='col-12'>
												<div className='row'>
													<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Gender</label>
															<span className='span-read'> {GenderView} </span>
														</div>
													</div>
													<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Product Type</label>
															<span className='span-read'> {ProductType} </span>
														</div>
													</div>
													<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Name</label>
															<span className='span-read'> {MerchantName} </span>
														</div>
													</div>
													<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Contact No.</label>
															<span className='span-read'> {MerchantContact} </span>
														</div>
													</div>
												</div>
											</div>
										</div>
									) : null}

									<h6 className='h6'> Order Details </h6>
								</div>

								<div className='col-3'>
									<MDBInput label='F PO No.' type='text' tabindex="2" wrapperClass='mb-3' onChange={(e) => { setFPONo(e.target.value) }} value={fPONo} name='fPONo' />
									{fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

									<MDBInput label='Order No.' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setPONo(e.target.value) }} value={PONo} name='PONo' />
									{PONoError && <p style={{ color: 'red' }}>{PONoError}</p>}

									<MDBInput label='OC No.' type='text' tabindex="4" wrapperClass='mb-3' onChange={(e) => { setOCNo(e.target.value) }} value={OCNo} name='OCNo' />

								</div>

								<div className='col-3'>
									<div className="mb-3" style={{ position: 'relative' }}>
										{embType ? <label
											htmlFor="embType"
											style={{
												position: 'absolute',
												top: '-10px',
												left: '10px',
												backgroundColor: 'white',
												padding: '0 5px',
												fontSize: '12px',
											}}
										>
											Emb. Type
										</label> : ''}
										<Form.Select className='mb-3' tabindex="5" label='Emb Type' onChange={(e) => { setEmbType(e.target.value) }} value={embType} name='embType'>
											<option> Select Emb Type </option>
											{embTypeList.map((item) => (
												<option key={item.id} value={item.Emb_Type}>
													{item.Emb_Type}
												</option>
											))}
										</Form.Select>
										{embTypeError && <p style={{ color: 'red' }}>{embTypeError}</p>}
									</div>

									<div className="mb-3" style={{ position: 'relative' }}>
										{printType ? <label
											htmlFor="printType"
											style={{
												position: 'absolute',
												top: '-10px',
												left: '10px',
												backgroundColor: 'white',
												padding: '0 5px',
												fontSize: '12px',
											}}
										>
											Print Type
										</label> : ''}
										<Form.Select className='mb-3' tabindex="6" label='Print Type' onChange={(e) => { setPrintType(e.target.value) }} value={printType} name='printType'>
											<option> Select Print Type </option>
											{printTypeList.map((item) => (
												<option key={item.id} value={item.Print_Type}>
													{item.Print_Type}
												</option>
											))}
										</Form.Select>
										{printTypeError && <p style={{ color: 'red' }}>{printTypeError}</p>}
									</div>

									<div className="mb-3" style={{ position: 'relative' }}>
										{washingType ? <label
											htmlFor="washingType"
											style={{
												position: 'absolute',
												top: '-10px',
												left: '10px',
												backgroundColor: 'white',
												padding: '0 5px',
												fontSize: '12px',
											}}
										>
											Washing Type
										</label> : ''}
										<Form.Select className='mb-3' tabindex="7" label='Washing Type' onChange={(e) => { setWashingType(e.target.value) }} value={washingType} name='washingType'>
											<option> Select Washing Type </option>
											{washingTypeList.map((item) => (
												<option key={item.id} value={item.Washing_Type}>
													{item.Washing_Type}
												</option>
											))}
										</Form.Select>
										{washingTypeError && <p style={{ color: 'red' }}>{washingTypeError}</p>}
									</div>
								</div>
								<div className='col-3'>
									{/* <MDBInput wrapperClass='mb-3' type='date' tabindex="10" label='Delivery Date' onChange={(e) => { setDeliveryDate(e.target.value) }} value={deliveryDate} name='deliveryDate' /> */}

									<DatePicker
										selected={deliveryDate}
										className="form-control-date"
										onChange={(date) => setDeliveryDate(date)} // Correct way to handle date change
										dateFormat="dd/MM/yyyy"  // Format the display of the date
										placeholderText="dd/mm/yyyy"
										customInput={
											<MDBInput
												type="text"
												wrapperClass='mb-3'
												label='Delivery Date'
												id="deliveryDate"  // Linking the label with the input
												tabIndex="10"  // Correct case for tabindex
												name="deliveryDate"
												value={deliveryDate ? moment(deliveryDate).format("DD/MM/YYYY") : ''}
											/>
										}
									/>
									{deliveryDateError && <p style={{ color: 'red' }}>{deliveryDateError}</p>}

									{/* <MDBInput wrapperClass='mb-3' type='date' tabindex="11" label='PCD' onChange={(e) => { setPCD(e.target.value) }} value={pcd} name='pcd' /> */}

									<DatePicker
										selected={pcd}
										className="mb-3 form-control-date"
										onChange={(date) => setPCD(date)} // Correct way to handle date change
										dateFormat="dd/MM/yyyy"  // Format the display of the date
										placeholderText="dd/mm/yyyy"
										name="pcd"
										customInput={
											<MDBInput
												type="text"
												label='PCD'
												id="pcd"  // Linking the label with the input
												tabIndex="11"  // Correct case for tabindex
												name="pcd"
												value={pcd ? moment(pcd).format("DD/MM/YYYY") : ''}
											/>
										}
									/>

									{pcdError && <p style={{ color: 'red' }}>{pcdError}</p>}

									<MDBInput wrapperClass='mb-3' type='text' tabindex="9" label='Shipment Mode' onChange={(e) => { setShipmentMode(e.target.value) }} value={shipmentMode} name='shipmentMode' />
									{shipmentModeError && <p style={{ color: 'red' }}>{shipmentModeError}</p>}

								</div>

								<div className='col-3'>
									<MDBInput wrapperClass='mb-3' type='text' tabindex="8" label='Others' onChange={(e) => { setOthers(e.target.value) }} value={others} name='others' />

									<MDBInput style={{ height: '86px' }} wrapperClass='mb-3 ' label='Notes' type='textarea' tabindex="12" onChange={(e) => { setNote(e.target.value) }} value={note} name='note' />
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
