import React from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';
import { MDBInput } from 'mdb-react-ui-kit';

function StyleModal({
    show,
    handleClose,
    handleStyleEntry,
    handleEditStyleEntry,
    onHide,
    styleNo,
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
                        <div className="col-4">
                            {/* DMAPs Style NO
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '40%',paddingRight: '5px' }}>  DMPS Style No.</div>
                                <div style={{ width: '60%' }}>
                                <MDBInput
                                        tabIndex="1"
                                        type="text"
                                        label=""
                                        value={styleNo}
                                        name="Style_No"
                                        style={{ width: '60%' }}
                                    />
                                </div>
                                
                            </InputGroup> */}
                            {/* Buyer Field */}
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>
                                    Buyer
                                </div>
                                <Form.Select
                                    tabIndex="1"
                                    onChange={(e) => setBuyer(e.target.value)}
                                    value={buyer}
                                    name="Buyer"
                                    style={{ width: '60%' }}
                                >
                                    <option></option>
                                    {buyerList.map((item) => (
                                        <option key={item.Buyer_Id} value={item.Buyer_Id}>
                                            {item.Buyer_Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>

                             {/* Buyer Style No. Field */}
                             <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%',paddingRight: '5px' }}>Buyer Style No.</div>
                                <div style={{ width: '60%' }}>
                                    <MDBInput
                                        tabIndex="4"
                                        type="text"
                                        label=""
                                        onChange={(e) => setStyleDescription(e.target.value)}
                                        value={styleDescription}
                                        name="styleDescription"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </InputGroup>
                            {styleDescriptionError && <p style={{ color: 'red' }}>{styleDescriptionError}</p>}

                            {/* Style Description Field */}
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%',paddingRight: '5px' }}>
                                    Style Description
                                </div>
                                <Form.Select
                                    tabIndex="1"
                                    onChange={(e) => setProductType(e.target.value)}
                                    value={productType}
                                    name="productType"
                                    style={{ width: '60%' }}
                                >
                                    <option></option>
                                    {productTypeList.map((item) => (
                                        <option key={item.id} value={item.Product_Type}>
                                            {item.Product_Type}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                            {productTypeError && <p style={{ color: 'red' }}>{productTypeError}</p>}

                            {/* Gender Field */}
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>
                                    Style Gender
                                </div>
                                <Form.Select
                                    tabIndex="1"
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    name="gender"
                                    style={{ width: '60%' }}
                                >
                                    <option></option>
                                    {genderList.map((item) => (
                                        <option key={item.id} value={item.Gender}>
                                            {item.Gender}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                            {genderError && <p style={{ color: 'red' }}>{genderError}</p>}
                        </div>

                        <div className="col-4">
                           {/* Season Field */}
                           <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>Season</div>
                                <Form.Select
                                    tabIndex="1"
                                    onChange={(e) => setSeason(e.target.value)}
                                    value={season}
                                    name="season"
                                    style={{ width: '60%' }}
                                >
                                    <option></option>
                                    {seasonList.map((item) => (
                                        <option key={item.id} value={item.Season_Name}>
                                            {item.Season_Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                            {seasonError && <p style={{ color: 'red' }}>{seasonError}</p>}

                            {/* Size Grid Field */}
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%',paddingRight: '5px' }}>Size Grid</div>
                                <Form.Select
                                    tabIndex="1"
                                    onChange={(e) => setSizeGrid(e.target.value)}
                                    value={sizeGrid}
                                    name="sizeGrid"
                                    style={{ width: '60%' }}
                                >
                                    <option></option>
                                    {sizeGridList.map((item) => (
                                        <option key={item.Size_Grid_Id} value={item.Size_Grid_Id}>
                                            {item.Size_Grid_Name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                            {sizeGridError && <p style={{ color: 'red' }}>{sizeGridError}</p>}

                            {/* Buyer Order Ref. No. Field */}
                            <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>
                                    Buyer Ref. No.
                                </div>
                                <div style={{ width: '60%' }}>
                                    <MDBInput
                                        wrapperClass="flex-grow-1"
                                        tabIndex="2"
                                        type="text"
                                        onChange={(e) => setBuyerOrderRefNo(e.target.value)}
                                        value={buyerOrderRefNo}
                                        name="buyerOrderRefNo"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                
                            </InputGroup>
                            { buyerOrderRefNoError && <p style={{ color: 'red' }}>{buyerOrderRefNoError}</p> }

                             {/* Merchant Name Field */}
                             <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>
                                    Merchant Name
                                </div>
                                <div style={{ width: '60%' }}>
                                    <MDBInput
                                        wrapperClass="flex-grow-1"
                                        tabIndex="9"
                                        type="text"
                                        onChange={(e) => setMarchantName(e.target.value)}
                                        value={marchantName}
                                        name="marchantName"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </InputGroup>
                            {marchantNameError && <p style={{ color: 'red' }}>{marchantNameError}</p>}

                            {/* Merchant Contact No. Field */}
                            {/* <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '40%', paddingRight: '5px' }}>Merchant Contact No.</div>
                                <div style={{ width: '60%' }}>
                                    <MDBInput
                                        wrapperClass="mb-3"
                                        type="number"
                                        tabIndex="10"
                                        label=""
                                        onChange={(e) => setMarchantContact(e.target.value)}
                                        value={marchantContact}
                                        name="marchantContact"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </InputGroup>
                            {marchantContactError && <p style={{ color: 'red' }}>{marchantContactError}</p>} */}

                        </div>

                        {/* <div className="col-4">
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
                        </div> */}

                        {/* <div className="col-4">
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="imageUpload" className="attach-image-button">
                                        <i className="fa fa-paperclip" aria-hidden="true"></i> Images (Front, Back, Optional)
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="form-control"
                                        style={{ display: 'none' }}
                                    />
                                    {imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    {["Front", "Back", "Optional"].map((label, index) => (
                                        <div key={index} style={{ position: 'relative', margin: '0 10px' }}>
                                            {base64Images[index] ? (
                                                <div>
                                                    <img
                                                        src={base64Images[index]}
                                                        alt={`${label} Thumbnail`}
                                                        style={{ width: '80px', height: '80px', borderRadius: '5px', cursor: 'pointer' }}
                                                        onClick={() => setCurrentIndex(index)}
                                                        className={index === currentIndex ? 'active' : ''}
                                                    />
                                                    <button
                                                        onClick={(event) => handleDeleteImage(index, event)}
                                                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                                    >
                                                        <i className="fa fa-trash" style={{ color: 'red' }}></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="upload-button"> {label} Image </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}

                        <div className="col-4">
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    {["Front", "Back", "Optional"].map((label, index) => (
                                        <div key={index} className='image-section'>
                                            {base64Images[index] ? (
                                                <div>
                                                    <img
                                                        src={base64Images[index]}
                                                        alt={`${label} Thumbnail`}
                                                        style={{ width: '80px', height: '80px', borderRadius: '5px', cursor: 'pointer' }}
                                                        onClick={() => setCurrentIndex(index)}
                                                        className={index === currentIndex ? 'active' : ''}
                                                    />
                                                    <button
                                                        onClick={(event) => handleDeleteImage(index, event)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            background: 'transparent',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <i className="fa fa-trash" style={{ color: 'red' }}></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <label htmlFor={`imageUpload-${index}`} className="upload-button" style={{ cursor: 'pointer' }}>
                                                    {label} Image
                                                </label>
                                            )}
                                            <input
                                                type="file"
                                                id={`imageUpload-${index}`}
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, index)}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {imageUploadError && <p style={{ color: 'red', textAlign: 'center' }}>{imageUploadError}</p>}
                            </div>
                        </div>


                        <div className='col-8'>
                             {/* Notes Field */}
                             <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '19%', paddingRight: '5px' }}>Note/Remarks</div>
                                <div style={{ width: '81%' }}>
                                    <MDBInput
                                        type="textarea"
                                        tabIndex="12"
                                        label=""
                                        onChange={(e) => setNote(e.target.value)}
                                        value={note}
                                        name="note"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </InputGroup>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={add == 'add' ? handleStyleEntry : handleEditStyleEntry} style={{ width: '15%' }}>
                    {add == 'add' ? 'save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default StyleModal;
