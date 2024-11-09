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
  <Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-90w" backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>Edit Order Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <div className='row'>
          <div className='col-3'>
            <Form.Select
              className='mb-3'
              tabIndex="1"
              onChange={(e) => { setStyleNo(e.target.value); handleSizeGrid(e.target.value); }}
              value={styleNo}
              name='styleNo'
              disabled
            >
              <option>Select DMAPS No.</option>
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
            {styleNo && (
              <div className='row'>
                <div className='col-3'>
                  <div className="data-row">
                    <label className='label-read'>Buyer</label>
                    <span className='span-read'> {BuyerName} </span>
                  </div>
                </div>
                <div className='col-3'>
                  <div className="data-row">
                    <label className='label-read'>Buyer Style No.</label>
                    <span className='span-read'> {StyleDescription} </span>
                  </div>
                </div>
                <div className='col-3'>
                  <div className="data-row">
                    <label className='label-read'>Size Grid Name</label>
                    <span className='span-read'> {SizeGridName} </span>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='row'>
                    <div className='col-3'>
                      <div className="data-row">
                        <label className='label-read'>Gender</label>
                        <span className='span-read'> {GenderView} </span>
                      </div>
                    </div>
                    <div className='col-3'>
                      <div className="data-row">
                        <label className='label-read'>Product Type</label>
                        <span className='span-read'> {ProductType} </span>
                      </div>
                    </div>
                    <div className='col-3'>
                      <div className="data-row">
                        <label className='label-read'>Merchant Name</label>
                        <span className='span-read'> {MerchantName} </span>
                      </div>
                    </div>
                    <div className='col-3'>
                      <div className="data-row">
                        <label className='label-read'>Merchant Contact No.</label>
                        <span className='span-read'> {MerchantContact} </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h6 className='h6'> Order Details </h6>
          </div>
          
          <div className='col-3'>
            <MDBInput label='F PO No.' type='text' tabIndex="2" onChange={(e) => setFPONo(e.target.value)} value={fPONo} name='fPONo' />
            {fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

            <MDBInput label='Order No.' type='text' tabIndex="3" onChange={(e) => setPONo(e.target.value)} value={PONo} name='PONo' />
            {PONoError && <p style={{ color: 'red' }}>{PONoError}</p>}

            <MDBInput label='OC No.' type='text' tabIndex="4" onChange={(e) => setOCNo(e.target.value)} value={OCNo} name='OCNo' />
          </div>

          <div className='col-3'>
            <Form.Select
              className='mb-3'
              tabIndex="5"
              onChange={(e) => setEmbType(e.target.value)}
              value={embType}
              name='embType'
            >
              <option>Select Emb Type</option>
              {embTypeList.map((item) => (
                <option key={item.id} value={item.Emb_Type}>
                  {item.Emb_Type}
                </option>
              ))}
            </Form.Select>
            {embTypeError && <p style={{ color: 'red' }}>{embTypeError}</p>}
            {/* Other select inputs for print type, washing type, etc. */}
          </div>

          {/* Other inputs and DatePickers */}
          <div className='col-3'>
            <DatePicker
              selected={deliveryDate}
              className="form-control-date"
              onChange={(date) => setDeliveryDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              customInput={
                <MDBInput
                  type="text"
                  label='Delivery Date'
                  tabIndex="10"
                  name="deliveryDate"
                  value={deliveryDate ? moment(deliveryDate).format("DD/MM/YYYY") : ''}
                />
              }
            />
            {deliveryDateError && <p style={{ color: 'red' }}>{deliveryDateError}</p>}

            {/* Repeat for PCD DatePicker */}
          </div>

          <div className="col-12 mt-20 parentDivStyle">
            <table border="1" cellPadding="10" className='table tableStyle'>
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Garment Color</th>
                  {/* Other headers */}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
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
                          }}
                        ></div>
                      )}
                    </td>
                    {/* Other dynamic inputs */}
                  </tr>
                ))}
              </tbody>
            </table>
            <Button variant="success" onClick={addNewRow} style={{ float: 'right', width: '5%', marginTop: "-20PX" }}>
              <i className='fa fa-plus fa-1x white'></i>
            </Button>
          </div>
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeEditForm} style={{ width: '15%' }}>Cancel</Button>
      <Button variant="primary" onClick={(e) => handleEditStyleEntry(e, 'save', '99999')} style={{ width: '15%' }}>Update</Button>
    </Modal.Footer>
  </Modal>
);

export default EditOrderModal;
