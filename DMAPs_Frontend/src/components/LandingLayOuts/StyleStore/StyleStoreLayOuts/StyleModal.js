import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';

function StyleModal({
    show,
    handleClose,
    handleStyleEntry,
    handleEditStyleEntry,
    onHide,
    setBuyer,
    buyer,
    buyerList,
    setProductType,
    productType,
    productTypeList,
    productTypeError,
    setGender,
    gender,
    genderList,
    genderError,
    setMarchantName,
    marchantName,
    marchantNameError,
    setBuyerOrderRefNo,
    buyerOrderRefNo,
    buyerOrderRefNoError,
    setStyleDescription,
    styleDescription,
    styleDescriptionError,
    setSizeGrid,
    sizeGrid,
    sizeGridList,
    sizeGridError,
    setSeason,
    season,
    seasonList,
    seasonError,
    setMarchantContact,
    marchantContact,
    marchantContactError,
    setNote,
    note,
    handleImageUpload,
    imageUploadError,
    base64Images,
    handleDeleteImage,
    setCurrentIndex,
    currentIndex,
    add
}) {
    return (
        <Modal show={show} onHide={add == 'add' ? handleClose : onHide } dialogClassName="modal-90w" backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title> {add == 'add' ? 'Add New Style': "Edit Style"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={add == 'add' ? handleStyleEntry : handleEditStyleEntry}>
                    <div className="row">
                        <div className="col-3">
                            <Form.Select className="mb-3" tabIndex="1" onChange={(e) => setBuyer(e.target.value)} value={buyer} name="Buyer">
                                <option> Select Buyer </option>
                                {buyerList.map((item) => (
                                    <option key={item.Buyer_Id} value={item.Buyer_Id}>
                                        {item.Buyer_Name}
                                    </option>
                                ))}
                            </Form.Select>

                            <Form.Select className="mb-3" tabIndex="1" onChange={(e) => setProductType(e.target.value)} value={productType} name="productType">
                                <option> Select Product Type </option>
                                {productTypeList.map((item) => (
                                    <option key={item.id} value={item.Product_Type}>
                                        {item.Product_Type}
                                    </option>
                                ))}
                            </Form.Select>
                            {productTypeError && <p style={{ color: 'red' }}>{productTypeError}</p>}

                            <Form.Select className="mb-3" tabIndex="1" onChange={(e) => setGender(e.target.value)} value={gender} name="gender">
                                <option> Select Gender </option>
                                {genderList.map((item) => (
                                    <option key={item.id} value={item.Gender}>
                                        {item.Gender}
                                    </option>
                                ))}
                            </Form.Select>
                            {genderError && <p style={{ color: 'red' }}>{genderError}</p>}

                            <MDBInput wrapperClass="mb-3" tabIndex="9" type="text" label="Merchant Name" onChange={(e) => setMarchantName(e.target.value)} value={marchantName} name="marchantName" />
                            {marchantNameError && <p style={{ color: 'red' }}>{marchantNameError}</p>}

                            <MDBInput wrapperClass="mb-3" tabIndex="2" type="text" label="Buyer Order Ref. No." onChange={(e) => setBuyerOrderRefNo(e.target.value)} value={buyerOrderRefNo} name="buyerOrderRefNo" />
                            {buyerOrderRefNoError && <p style={{ color: 'red' }}>{buyerOrderRefNoError}</p>}
                        </div>

                        <div className="col-3">
                            <MDBInput wrapperClass="mb-3" tabIndex="4" type="text" label="Buyer Style No." onChange={(e) => setStyleDescription(e.target.value)} value={styleDescription} name="styleDescription" />
                            {styleDescriptionError && <p style={{ color: 'red' }}>{styleDescriptionError}</p>}

                            <Form.Select className="mb-3" tabIndex="1" onChange={(e) => setSizeGrid(e.target.value)} value={sizeGrid} name="sizeGrid">
                                <option> Select Size Grid </option>
                                {sizeGridList.map((item) => (
                                    <option key={item.Size_Grid_Id} value={item.Size_Grid_Id}>
                                        {item.Size_Grid_Name}
                                    </option>
                                ))}
                            </Form.Select>
                            {sizeGridError && <p style={{ color: 'red' }}>{sizeGridError}</p>}

                            <Form.Select className="mb-3" tabIndex="1" onChange={(e) => setSeason(e.target.value)} value={season} name="season">
                                <option> Select Season </option>
                                {seasonList.map((item) => (
                                    <option key={item.id} value={item.Season_Name}>
                                        {item.Season_Name}
                                    </option>
                                ))}
                            </Form.Select>
                            {seasonError && <p style={{ color: 'red' }}>{seasonError}</p>}

                            <MDBInput wrapperClass="mb-3" type="number" tabIndex="10" label="Merchant Contact No." onChange={(e) => setMarchantContact(e.target.value)} value={marchantContact} name="marchantContact" />
                            {marchantContactError && <p style={{ color: 'red' }}>{marchantContactError}</p>}

                            <MDBInput wrapperClass="mb-3" label="Notes" type="textarea" tabIndex="12" onChange={(e) => setNote(e.target.value)} value={note} name="note" />
                        </div>

                        <div className="col-6">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="imageUpload" className="attach-image-button">
                                        <i className="fa fa-paperclip" aria-hidden="true"></i> Images (Max 6)
                                    </label>
                                    <input type="file" id="imageUpload" accept="image/*" multiple onChange={handleImageUpload} className="form-control" style={{ display: 'none' }} />
                                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    {base64Images.map((image, index) => (
                                        <div key={index} style={{ position: 'relative' }}>
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{ width: '80px', height: '80px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer' }}
                                                onClick={() => setCurrentIndex(index)}
                                                className={index === currentIndex ? 'active' : ''}
                                            />
                                            <button onClick={(event) => handleDeleteImage(index, event)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                <i className="fa fa-trash" style={{ color: 'red', position: 'absolute', top: '-10px', right: '-10px' }}></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={add == 'add' ? handleStyleEntry : handleEditStyleEntry} style={{ width: '15%' }}>
                    {add == 'add' ? 'save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StyleModal;
