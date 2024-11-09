import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const OrderModal = ({
  show,
  handleClose,
  handlePODetails,
  handleEditStyleEntry,
  styleNoList,
  embTypeList,
  printTypeList,
  washingTypeList,
  rows,
  sizesArray,
  handleDeleteRow,
  addNewRow,
  calculateTotal,
  BuyerName,
  StyleDescription,
  SizeGridName,
  GenderView,
  ProductType,
  MerchantName,
  MerchantContact,
  styleNo,
  setStyleNo,
  styleNoError,
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
  embTypeError,
  printType,
  setPrintType,
  printTypeError,
  washingType,
  setWashingType,
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
  handleSizeGrid,
  add
}) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{add == 'add' ?'Add New Order': 'Edit Order'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePODetails}>
          <div className="row">
            <div className="col-3">
              <Form.Select className="mb-3" tabindex="1" label="DMAPS No." onChange={(e) => { setStyleNo(e.target.value); handleSizeGrid(e.target.value) }} value={styleNo} name="styleNo">
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

          {styleNo && (
            <>
              <div className="row">
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Buyer</label>
                    <span className="span-read">{BuyerName}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Buyer Style No.</label>
                    <span className="span-read">{StyleDescription}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Size Grid Name</label>
                    <span className="span-read">{SizeGridName}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Gender</label>
                    <span className="span-read">{GenderView}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Product Type</label>
                    <span className="span-read">{ProductType}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Merchant Name</label>
                    <span className="span-read">{MerchantName}</span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="data-row">
                    <label className="label-read" htmlFor="name">Merchant Contact No.</label>
                    <span className="span-read">{MerchantContact}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <h6 className="h6">Order Details</h6>
          <div className="row">
            <div className="col-3">
              <MDBInput label="F PO No." type="text" tabindex="2" wrapperClass="mb-3" onChange={(e) => { setFPONo(e.target.value) }} value={fPONo} name="fPONo" />
              {fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

              <MDBInput label="Order No." type="text" tabindex="3" wrapperClass="mb-3" onChange={(e) => { setPONo(e.target.value) }} value={PONo} name="PONo" />
              {PONoError && <p style={{ color: 'red' }}>{PONoError}</p>}

              <MDBInput label="OC No." type="text" tabindex="4" wrapperClass="mb-3" onChange={(e) => { setOCNo(e.target.value) }} value={OCNo} name="OCNo" />
            </div>

            <div className="col-3">
              <div className="mb-3" style={{ position: 'relative' }}>
                {embType ? <label htmlFor="embType" style={{ position: 'absolute', top: '-10px', left: '10px', backgroundColor: 'white', padding: '0 5px', fontSize: '12px' }}>Emb. Type</label> : ''}
                <Form.Select className="mb-3" tabindex="5" label="Emb Type" onChange={(e) => { setEmbType(e.target.value) }} value={embType} name="embType">
                  <option>Select Emb Type</option>
                  {embTypeList.map((item) => (
                    <option key={item.id} value={item.Emb_Type}>
                      {item.Emb_Type}
                    </option>
                  ))}
                </Form.Select>
                {embTypeError && <p style={{ color: 'red' }}>{embTypeError}</p>}
              </div>
              <div className="mb-3" style={{ position: 'relative' }}>
                {printType ? <label htmlFor="printType" style={{ position: 'absolute', top: '-10px', left: '10px', backgroundColor: 'white', padding: '0 5px', fontSize: '12px' }}>Print Type</label> : ''}
                <Form.Select className="mb-3" tabindex="6" label="Print Type" onChange={(e) => { setPrintType(e.target.value) }} value={printType} name="printType">
                  <option>Select Print Type</option>
                  {printTypeList.map((item) => (
                    <option key={item.id} value={item.Print_Type}>
                      {item.Print_Type}
                    </option>
                  ))}
                </Form.Select>
                {printTypeError && <p style={{ color: 'red' }}>{printTypeError}</p>}
              </div>

              <div className="mb-3" style={{ position: 'relative' }}>
                {washingType ? <label htmlFor="washingType" style={{ position: 'absolute', top: '-10px', left: '10px', backgroundColor: 'white', padding: '0 5px', fontSize: '12px' }}>Washing Type</label> : ''}
                <Form.Select className="mb-3" tabindex="7" label="Washing Type" onChange={(e) => { setWashingType(e.target.value) }} value={washingType} name="washingType">
                  <option>Select Washing Type</option>
                  {washingTypeList.map((item) => (
                    <option key={item.id} value={item.Washing_Type}>
                      {item.Washing_Type}
                    </option>
                  ))}
                </Form.Select>
                {washingTypeError && <p style={{ color: 'red' }}>{washingTypeError}</p>}
              </div>
            </div>

            <div className="col-3">
              <DatePicker
                selected={deliveryDate}
                className="form-control-date"
                onChange={(date) => setDeliveryDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                customInput={
                  <MDBInput type="text" wrapperClass="mb-3" label="Delivery Date" id="deliveryDate" tabIndex="10" name="deliveryDate" value={deliveryDate ? moment(deliveryDate).format("DD/MM/YYYY") : ''} />
                }
              />
              {deliveryDateError && <p style={{ color: 'red' }}>{deliveryDateError}</p>}

              <DatePicker
                selected={pcd}
                className="form-control-date"
                onChange={(date) => setPCD(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                customInput={
                  <MDBInput type="text" wrapperClass="mb-3" label="PCD" id="pcd" tabIndex="11" name="pcd" value={pcd ? moment(pcd).format("DD/MM/YYYY") : ''} />
                }
              />
              {pcdError && <p style={{ color: 'red' }}>{pcdError}</p>}
            </div>

            <div className="col-3">
              <Form.Select className="mb-3" tabindex="8" label="Shipment Mode" onChange={(e) => { setShipmentMode(e.target.value) }} value={shipmentMode} name="shipmentMode">
                <option>Select Shipment Mode</option>
                <option value="Sea">Sea</option>
                <option value="Air">Air</option>
              </Form.Select>
              {shipmentModeError && <p style={{ color: 'red' }}>{shipmentModeError}</p>}

              <MDBInput label="Others" type="text" tabindex="9" wrapperClass="mb-3" onChange={(e) => { setOthers(e.target.value) }} value={others} name="others" />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <MDBInput label="Note" type="textarea" wrapperClass="mb-3" onChange={(e) => { setNote(e.target.value) }} value={note} name="note" />
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePODetails}>
          Save Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
