/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import './StyleEntry.scss';

import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBCol,
	MDBInput
} from 'mdb-react-ui-kit';

import styleStoreService from "../../../../services/styleStoreService";
import { trackPromise } from 'react-promise-tracker';
import StyleEntryTable from './StyleEntryTable';
import adminService from "../../../../services/adminService"

import ProductionOrder from './PO_Details/ProductionOrder';

export default function StyleEntry() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const [verticalActive, setVerticalActive] = useState('tabV1');
	const [buyerOrderRefNo, setBuyerOrderRefNo] = useState('')
	const [buyerOrderRefNoError, setBuyerOrderRefNoError] = useState('');
	const [season, setSeason] = useState('')
	const [seasonError, setSeasonError] = useState('');
	const [note, setNote] = useState('')
	const [noteError, setNoteError] = useState('');
	const [productType, setProductType] = useState('')
	const [productTypeError, setProductTypeError] = useState('');
	const [gender, setGender] = useState('')
	const [genderError, setGenderError] = useState('');
	const [marchantName, setMarchantName] = useState('')
	const [marchantNameError, setMarchantNameError] = useState('');
	const [styleNo, setStyleNo] = useState('')
	const [StyleNoError, setStyleNoError] = useState('');
	const [styleDescription, setStyleDescription] = useState('')
	const [styleDescriptionError, setStyleDescriptionError] = useState('');
	const [sizeGrid, setSizeGrid] = useState('')
	const [sizeGridError, setSizeGridError] = useState('');
	const [marchantContact, setMarchantContact] = useState('')
	const [marchantContactError, setMarchantContactError] = useState('');
	const [buyer, setBuyer] = useState('');
	const [buyerList, setBuyerList] = useState([]);
	const [genderList, setGenderList] = useState([]);
	const [sizeGridList, setSizeGridList] = useState([]);
	const [productTypeList, setProductTypeList] = useState([]);
	const [data, setData] = useState([]);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [styleId, setStyleEntryId] = useState("");

	const [base64Images, setBase64Images] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageUploadError, setImageUploadError] = useState(null);


	const handleVerticalClick = (value) => {
		if (value === verticalActive) {
			return;
		}
		setVerticalActive(value);
	};

	const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length > 6) {
            setImageUploadError("You can only upload a maximum of 6 images.");
            return;
        }
        // Reset error if it was previously set
        setImageUploadError(null);

        // Array to store base64 encoded images
        const base64ImagesArray = [];

        // Iterate through each selected file
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const file = files[i];

            // Closure to capture the file information
            reader.onload = (e) => {
                const base64Image = e.target.result;
                base64ImagesArray.push(base64Image);

                // Check if all images are processed
                if (base64ImagesArray.length === files.length) {
                    // All images are converted to base64
                    // Now you can save base64ImagesArray to your state
                    setBase64Images(base64ImagesArray);
                }
            };

            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === base64Images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? base64Images.length - 1 : prevIndex - 1));
    };

	const handleStyleEntry = (e) => {
		e.preventDefault();
		let isValid = true;

		if (!buyerOrderRefNo) {
			setBuyerOrderRefNoError('Buyer order Ref No. is required');
			isValid = false;
		} else if (/[^a-zA-Z0-9]/.test(buyerOrderRefNo)) {
			setBuyerOrderRefNoError('Short Name cannot contain spaces or special characters');
			isValid = false;
		} else {
			setBuyerOrderRefNoError('');
		}

		if (!season) {
			setSeasonError('Season is required');
			isValid = false;
		} else {
			setSeasonError('');
		}

		if (!note) {
			setNoteError('Note is required');
			isValid = false;
		} else {
			setNoteError('');
		}

		if (!productType) {
			setProductTypeError('Product Type is required');
			isValid = false;
		} else {
			setProductTypeError('');
		}

		if (!gender) {
			setGenderError('Gender is required');
			isValid = false;
		}
		else {
			setGenderError('');
		}

		if (!marchantName) {
			setMarchantNameError('Marchant Name is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9]+$/.test(marchantName)) {
			setMarchantNameError('Marchant Name must contain only alphanumeric characters');
			isValid = false;
		} else {
			setMarchantNameError('');
		}

		if (!styleNo) {
			setStyleNoError('Style No. is required');
			isValid = false;
		} else {
			setStyleNoError('');
		}

		if (!styleDescription) {
			setStyleDescriptionError('Style Description is required');
			isValid = false;
		} else {
			setStyleDescriptionError('');
		}

		if (!sizeGrid) {
			setSizeGridError('Size Grid is required');
			isValid = false;
		} else {
			setSizeGridError('');
		}
		

		if (!marchantContact) {
			setMarchantContactError('Mail id is required');
			isValid = false;
		} else if (!/^[6789]\d{9}$/.test(marchantContact)) {
			setMarchantContactError('Please enter a valid 10-digit Indian mobile number');
			isValid = false;
		} else {
			setMarchantContactError('');
		}

		if (!isValid) {
			return;
		}

		let payload = {
			"Buyer_Group_Id": buyer,
			"Buyer_Order_Ref_No": buyerOrderRefNo,
			"Season": season,
			"Product_Type": productType,
			"Gender": gender,
			"Marchent_Name": marchantName,
			"Style_No": styleNo,
			"Style_Description": styleDescription,
			"Size_Grid": sizeGrid,
			"Marchent_Contact": marchantContact,
			"Note":note,
			"Style_Images" : JSON.stringify(base64Images)
		}

		trackPromise(styleStoreService.saveStyleEntry({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result);
				stateValues()
				getStyleEntryData()
				handleClose()
			}
			else {
				alert(response.data.data.result);
			}

		}).catch((error) => {
			//console.log(error.response.data.error)
			alert(error.response.data.error);
		})
		);

	}
	const getStyleEntryData = () => {
		trackPromise(
			styleStoreService.getStyleEntry().then((response) => {
				setData(response.data.Style_Entry)
			})
		);
	}

	const getBasicDetails = () => {
        trackPromise(
            adminService.getBasicDetails().then((response) => {
                setBuyerList(response.data[0].data[0].data.buyerGroups);
				setGenderList(response.data[0].data[0].data.gender)
				setSizeGridList(response.data[0].data[0].data.sizeGrid)
				setProductTypeList(response.data[0].data[0].data.productType)
            })
        );
    }

	useEffect(() => {
		getBasicDetails();
		getStyleEntryData()
	}, [])


	function stateValues() {

		setSeasonError('');
		setNoteError('');
		setProductTypeError('');
		setGenderError('');
		setMarchantNameError('');
		setStyleNoError('');
		setStyleDescriptionError('');
		setSizeGridError('');
		setMarchantContactError('');
		setBuyerOrderRefNo('')
		setSeason('')
		setNote('')
		setProductType('')
		setGender('')
		setMarchantName('')
		setStyleNo('')
		setStyleEntryId('')
		setStyleDescription('')
		setBuyer('')
		setSizeGrid('')
		setMarchantContact('')
		setBase64Images([])
	}

	useEffect((

	) => { }, [])


	const iconActionHandler = (cell, row, rowIndex) => {
		return (
			<>
				<i className="fas fa-edit action-icon" title="Edit" > </i>
			</>
		);
	};
	const openEditForm = (data) => {
        editFormDetails(data)
        setIsEditFormOpen(true);
    };
	function editFormDetails(data) {

		setSeasonError('');
		setNoteError('');
		setProductTypeError('');
		setGenderError('');
		setMarchantNameError('');
		setStyleNoError('');
		setStyleDescriptionError('');
		setSizeGridError('');
		setMarchantContactError('');
		setBuyerOrderRefNo(data.Buyer_Order_Ref_No)
		setSeason(data.Season)
		setNote(data.Note)
		setProductType(data.Product_Type)
		setGender(data.Gender)
		setMarchantName(data.Marchent_Name)
		setStyleNo(data.Style_No)
		setStyleDescription(data.Style_Description)
		setBuyer(data.Buyer_Group_Id)
		setSizeGrid(data.Size_Grid)
		setMarchantContact(data.Marchent_Contact)
		setStyleEntryId(data.Style_Entry_Id)
		setBase64Images(JSON.parse(data.Style_Images))
	}
    const closeEditForm = () => {
        setIsEditFormOpen(false);
    };

// Delete Unit Records

const deleteStyleEntry = (data) => {
	if (window.confirm("Are you sure to delete the Style Entry ?"))
    {
		let payload = {
			"Style_Entry_Id":data.Style_Entry_Id
		}
		trackPromise(styleStoreService.deleteStyleEntry({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				getStyleEntryData()
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

	const handleEditStyleEntry  = (e) => {

		e.preventDefault();
		let isValid = true;

		if (!buyerOrderRefNo) {
			setBuyerOrderRefNoError('Buyer order Ref No. is required');
			isValid = false;
		} else if (/[^a-zA-Z0-9]/.test(buyerOrderRefNo)) {
			setBuyerOrderRefNoError('Short Name cannot contain spaces or special characters');
			isValid = false;
		} else {
			setBuyerOrderRefNoError('');
		}

		if (!season) {
			setSeasonError('Season is required');
			isValid = false;
		} else {
			setSeasonError('');
		}

		if (!note) {
			setNoteError('Note is required');
			isValid = false;
		} else {
			setNoteError('');
		}

		if (!productType) {
			setProductTypeError('Product Type is required');
			isValid = false;
		} else {
			setProductTypeError('');
		}

		if (!gender) {
			setGenderError('Gender is required');
			isValid = false;
		}
		else {
			setGenderError('');
		}

		if (!marchantName) {
			setMarchantNameError('Marchant Name is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9]+$/.test(marchantName)) {
			setMarchantNameError('Marchant Name must contain only alphanumeric characters');
			isValid = false;
		} else {
			setMarchantNameError('');
		}

		if (!styleNo) {
			setStyleNoError('Style No. is required');
			isValid = false;
		} else {
			setStyleNoError('');
		}

		if (!styleDescription) {
			setStyleDescriptionError('Style Description is required');
			isValid = false;
		} else {
			setStyleDescriptionError('');
		}

		if (!sizeGrid) {
			setSizeGridError('Size Grid is required');
			isValid = false;
		} else {
			setSizeGridError('');
		}
		

		if (!marchantContact) {
			setMarchantContactError('Mail id is required');
			isValid = false;
		} else if (!/^[6789]\d{9}$/.test(marchantContact)) {
			setMarchantContactError('Please enter a valid 10-digit Indian mobile number');
			isValid = false;
		} else {
			setMarchantContactError('');
		}
		

		if (!isValid) {
			return;
		}

		let payload = {
			"Style_Entry_Id" : styleId,
			"Buyer_Group_Id": buyer,
			"Buyer_Order_Ref_No": buyerOrderRefNo,
			"Season": season,
			"Product_Type": productType,
			"Gender": gender,
			"Marchent_Name": marchantName,
			"Style_No": styleNo,
			"Style_Description": styleDescription,
			"Size_Grid": sizeGrid,
			"Marchent_Contact": marchantContact,
			"Note":note,
			"Style_Images" : JSON.stringify(base64Images)
		}

		trackPromise(styleStoreService.editStyleEntry({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result)
				getStyleEntryData()
				closeEditForm()
			}
			else {
				alert(response.data.data.result);
			}

		}).catch((error) => {
			//console.log(error.response.data.error)
			alert(error.response.data.error);
		})
		);

	}

	return <>
			<MDBCol size='1' style={{ width : "13%" }} className='no-pad-right'>
				<MDBTabs className='flex-column text-center vertical-tab'>
					<MDBTabsItem className="vertical-link">
						<MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
							Style Details
						</MDBTabsLink>
					</MDBTabsItem>

					<MDBTabsItem className="vertical-link">
						<MDBTabsLink onClick={() => handleVerticalClick('tabV2')} active={verticalActive === 'tabV2'}>
							PO Details
						</MDBTabsLink>
					</MDBTabsItem>

				</MDBTabs>
			</MDBCol>
			<MDBCol size='11' style={{ width : "87%" }} className='no-pad-left'>
				<MDBTabsContent className='unit-tab-content'>
					<MDBTabsPane show={verticalActive === 'tabV1'}>
						<div className='row'>
							<div className='col-8'>
								<h1 className='h1'> Style Details </h1>
							</div>
							<div className='col-4 text-right'>
								<Button className='primary-btn mt-10' onClick={() => {setShow(true);stateValues() }}>
								<i className='fa fa-plus fa-white'> </i> New Style 
								</Button>
								
								<Modal
									show={show}
									onHide={() => setShow(false)}
									dialogClassName="modal-90w"
									backdrop="static"
									keyboard={false}>

									<Modal.Header closeButton>
										<Modal.Title> Add New Style  </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleStyleEntry}>
											<div className='row'>
												<div className='col-3'>

												<Form.Select className='mb-3' tabindex="1" label='Buyer' onChange={(e) => { setBuyer(e.target.value) }} value={buyer} name='Buyer'>
                                                        <option> Select Buyer </option>
                                                        {buyerList.map((item) => (
                                                            <option key={item.Buyer_Group_Id} value={item.Buyer_Group_Id}>
                                                                {item.Buyer_Group_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													<MDBInput label='Style No' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setStyleNo(e.target.value) }} value={styleNo} name='styleNo' />
													{StyleNoError && <p style={{ color: 'red' }}>{StyleNoError}</p>}
											

													<Form.Select className='mb-3' tabindex="1" label='Product Type' onChange={(e) => { setProductType(e.target.value) }} value={productType} name='productType'>
                                                        <option> Select Product Type </option>
                                                        {productTypeList.map((item) => (
                                                            <option key={item.id} value={item.Product_Type}>
                                                                {item.Product_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													{productTypeError && <p style={{ color: 'red' }}>{productTypeError}</p>}

													<Form.Select className='mb-3' tabindex="1" label='Gender' onChange={(e) => { setGender(e.target.value) }} value={gender} name='gender'>
                                                        <option> Select Gender </option>
                                                        {genderList.map((item) => (
                                                            <option key={item.id} value={item.Gender}>
                                                                {item.Gender}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{genderError && <p style={{ color: 'red' }}>{genderError}</p>}

													<MDBInput wrapperClass='mb-3' tabindex="9" type='text' label='Marchant Name' onChange={(e) => { setMarchantName(e.target.value) }} value={marchantName} name='marchantName' />
													{marchantNameError && <p style={{ color: 'red' }}>{marchantNameError}</p>}

												</div>

												<div className='col-3'>

													<MDBInput wrapperClass='mb-3' type='text' tabindex="2" label='Buyer Order ref No.' onChange={(e) => { setBuyerOrderRefNo(e.target.value) }} value={buyerOrderRefNo} name='buyerOrderRefNo' />
													{buyerOrderRefNoError && <p style={{ color: 'red' }}>{buyerOrderRefNoError}</p>}

													
													<MDBInput wrapperClass='mb-3' tabindex="4" type='text' label='City' onChange={(e) => { setStyleDescription(e.target.value) }} value={styleDescription} name='styleDescription' />
													{styleDescriptionError && <p style={{ color: 'red' }}>{styleDescriptionError}</p>}

													<Form.Select className='mb-3' tabindex="1" label='Size Grid' onChange={(e) => { setSizeGrid(e.target.value) }} value={sizeGrid} name='sizeGrid'>
                                                        <option> Select Size Grid </option>
                                                        {sizeGridList.map((item) => (
                                                            <option key={item.id} value={item.Size_Grid}>
                                                                {item.Size_Grid}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													{sizeGridError && <p style={{ color: 'red' }}>{sizeGridError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="8" label='Season' onChange={(e) => { setSeason(e.target.value) }} value={season} name='season' />
													{seasonError && <p style={{ color: 'red' }}>{seasonError}</p>}

													<MDBInput wrapperClass='mb-3' type='number' tabindex="10" label='Marchant Contacct' onChange={(e) => { setMarchantContact(e.target.value) }} value={marchantContact} name='marchantContact' />
													{marchantContactError && <p style={{ color: 'red' }}>{marchantContactError}</p>}

												</div>
												<div className='col-6'>
													<div>
														<div className="mb-3">
															<label htmlFor="imageUpload">Upload Images (Max 6)</label>
															<input
																type="file"
																id="imageUpload"
																accept="image/*"
																multiple
																onChange={handleImageUpload}
																className="form-control"
															/>
															{imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
														</div>
														{/* Thumbnail List */}
														<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
															{base64Images.map((image, index) => (
																<img
																	key={index}
																	src={image}
																	alt={`Thumbnail ${index + 1}`}
																	style={{ width: '80px', height: '80px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer' }}
																	onClick={() => setCurrentIndex(index)}
																	className={index === currentIndex ? 'active' : ''}
																/>
															))}
														</div>
													</div>

													<div>
														<div className="mb-3">
															<label htmlFor="imageUpload"> Note </label>
															<MDBInput wrapperClass='mb-3' type='textarea' tabindex="12"  onChange={(e) => { setNote(e.target.value) }} value={note} name='note' />
															{noteError && <p style={{ color: 'red' }}>{noteError}</p>}
														</div>
													</div>
												</div>
											</div>
										</form>

									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }} >
											Cancel
										</Button>
										<Button variant="primary" type='submit' onClick={handleStyleEntry}  style={{ width: '15%' }}>
											Save
										</Button>
									</Modal.Footer>
								</Modal>
							</div>
							<div className='col-12'>

								<StyleEntryTable defaultPageSize={10} data={data} openEditForm={openEditForm} deleteStyleEntry = {deleteStyleEntry} />

								<Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-90w"
									backdrop="static">
									<Modal.Header closeButton>
										<Modal.Title>Edit Style Entry </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleEditStyleEntry}>
										<div className='row'>
												<div className='col-3'>

												<Form.Select className='mb-3' tabindex="1" label='Buyer' onChange={(e) => { setBuyer(e.target.value) }} value={buyer} name='Buyer'>
                                                        <option> Select Buyer </option>
                                                        {buyerList.map((item) => (
                                                            <option key={item.Buyer_Group_Id} value={item.Buyer_Group_Id}>
                                                                {item.Buyer_Group_Name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													<MDBInput label='Style No' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setStyleNo(e.target.value) }} value={styleNo} name='styleNo' />
													{StyleNoError && <p style={{ color: 'red' }}>{StyleNoError}</p>}
											

													<Form.Select className='mb-3' tabindex="1" label='Product Type' onChange={(e) => { setProductType(e.target.value) }} value={productType} name='productType'>
                                                        <option> Select Product Type </option>
                                                        {productTypeList.map((item) => (
                                                            <option key={item.id} value={item.Product_Type}>
                                                                {item.Product_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													{productTypeError && <p style={{ color: 'red' }}>{productTypeError}</p>}

													<Form.Select className='mb-3' tabindex="1" label='Gender' onChange={(e) => { setGender(e.target.value) }} value={gender} name='gender'>
                                                        <option> Select Gender </option>
                                                        {genderList.map((item) => (
                                                            <option key={item.id} value={item.Gender}>
                                                                {item.Gender}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{genderError && <p style={{ color: 'red' }}>{genderError}</p>}

													<MDBInput wrapperClass='mb-3' tabindex="9" type='text' label='Marchant Name' onChange={(e) => { setMarchantName(e.target.value) }} value={marchantName} name='marchantName' />
													{marchantNameError && <p style={{ color: 'red' }}>{marchantNameError}</p>}

												</div>

												<div className='col-3'>

													<MDBInput wrapperClass='mb-3' type='text' tabindex="2" label='Buyer Order ref No.' onChange={(e) => { setBuyerOrderRefNo(e.target.value) }} value={buyerOrderRefNo} name='buyerOrderRefNo' />
													{buyerOrderRefNoError && <p style={{ color: 'red' }}>{buyerOrderRefNoError}</p>}

													
													<MDBInput wrapperClass='mb-3' tabindex="4" type='text' label='City' onChange={(e) => { setStyleDescription(e.target.value) }} value={styleDescription} name='styleDescription' />
													{styleDescriptionError && <p style={{ color: 'red' }}>{styleDescriptionError}</p>}

													<Form.Select className='mb-3' tabindex="1" label='Size Grid' onChange={(e) => { setSizeGrid(e.target.value) }} value={sizeGrid} name='sizeGrid'>
                                                        <option> Select Size Grid </option>
                                                        {sizeGridList.map((item) => (
                                                            <option key={item.id} value={item.Size_Grid}>
                                                                {item.Size_Grid}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

													{sizeGridError && <p style={{ color: 'red' }}>{sizeGridError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="8" label='Season' onChange={(e) => { setSeason(e.target.value) }} value={season} name='season' />
													{seasonError && <p style={{ color: 'red' }}>{seasonError}</p>}

													<MDBInput wrapperClass='mb-3' type='number' tabindex="10" label='Marchant Contacct' onChange={(e) => { setMarchantContact(e.target.value) }} value={marchantContact} name='marchantContact' />
													{marchantContactError && <p style={{ color: 'red' }}>{marchantContactError}</p>}

												</div>
												<div className='col-6'>
													<div>
														<div className="mb-3">
															<label htmlFor="imageUpload">Upload Images (Max 6)</label>
															<input
																type="file"
																id="imageUpload"
																accept="image/*"
																multiple
																onChange={handleImageUpload}
																className="form-control"
															/>
															{imageUploadError && <p style={{ color: 'red' }}>{imageUploadError}</p>}
														</div>
														{/* Thumbnail List */}
														<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
															{base64Images.map((image, index) => (
																<img
																	key={index}
																	src={image}
																	alt={`Thumbnail ${index + 1}`}
																	style={{ width: '80px', height: '80px', borderRadius: '5px', margin: '0 5px', cursor: 'pointer' }}
																	onClick={() => setCurrentIndex(index)}
																	className={index === currentIndex ? 'active' : ''}
																/>
															))}
														</div>
													</div>

													<div>
														<div className="mb-3">
															<label htmlFor="imageUpload"> Note </label>
															<MDBInput wrapperClass='mb-3' type='textarea' tabindex="12"  onChange={(e) => { setNote(e.target.value) }} value={note} name='note' />
															{noteError && <p style={{ color: 'red' }}>{noteError}</p>}
														</div>
													</div>
												</div>
											</div>
										</form>
									</Modal.Body>
									<Modal.Footer>
                                        <Button variant="secondary" onClick={closeEditForm} style={{ width: '15%' }}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={handleEditStyleEntry} style={{ width: '15%' }}>
                                            Save
                                        </Button>
                                    </Modal.Footer>
								</Modal>
							</div>
						</div>
					</MDBTabsPane>

					<MDBTabsPane show={verticalActive === 'tabV2'}>
						<ProductionOrder />
					</MDBTabsPane>
				</MDBTabsContent>
			</MDBCol>

	</>
}