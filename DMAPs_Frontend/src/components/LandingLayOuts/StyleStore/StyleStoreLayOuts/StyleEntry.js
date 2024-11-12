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
import StyleModal from './StyleModal';

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
	const [seasonList, setSeasonList] = useState([]);
	const [nextStyleNumber, setNextStyleNumber] = useState([]);
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
		const totalFiles = files.length + base64Images.length; // Calculate total number of files after upload

		if (totalFiles > 6) {
			setImageUploadError("You can only upload a maximum of 6 images.");
			return;
		}

		// Reset error if it was previously set
		setImageUploadError(null);

		// Array to store base64 encoded images
		const base64ImagesArray = [...base64Images]; // Copy existing images

		// Iterate through each selected file
		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			const file = files[i];

			// Closure to capture the file information
			reader.onload = (e) => {
				const base64Image = e.target.result;
				base64ImagesArray.push(base64Image);

				// Check if all images are processed
				if (base64ImagesArray.length === totalFiles) {
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

	const handleDeleteImage = (indexToDelete, event) => {
		event.preventDefault(); // Prevent default form submission

		// Clear file input value
		const fileInput = document.getElementById('imageUpload');
		fileInput.value = '';

		// Filter out the image at the specified index
		const updatedImages = base64Images.filter((_, index) => index !== indexToDelete);
		setBase64Images(updatedImages);
	};


	const handleStyleEntry = (e) => {
		e.preventDefault();
		let isValid = true;

		if (!buyerOrderRefNo) {
			setBuyerOrderRefNoError('Buyer Order Ref. No. is required');
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
			setMarchantNameError('Merchant Name is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9 ]+$/.test(marchantName)) {
			setMarchantNameError('Merchant Name must contain only alphanumeric characters and spaces');
			isValid = false;
		} else {
			setMarchantNameError('');
		}


		if (!styleDescription) {
			setStyleDescriptionError('Buyer Style No is required');
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


		// if (!marchantContact) {
		// 	setMarchantContactError('Mail id is required');
		// 	isValid = false;
		// } else if (!/^[6789]\d{9}$/.test(marchantContact)) {
		// 	setMarchantContactError('Please enter a valid 10-digit Indian mobile number');
		// 	isValid = false;
		// } else {
		// 	setMarchantContactError('');
		// }

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
			"Style_Description": styleDescription,
			"Size_Grid": sizeGrid,
			"Marchent_Contact": marchantContact,
			"Note": note,
			"Style_Images": JSON.stringify(base64Images)
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
				setBuyerList(response.data[0].data[0].data.buyer);
				setGenderList(response.data[0].data[0].data.gender)
				setSizeGridList(response.data[0].data[0].data.sizeGrid)
				setProductTypeList(response.data[0].data[0].data.productType)
				setSeasonList(response.data[0].data[0].data.season)
				setNextStyleNumber(response.data[0].data[0].data.nextStyleNumber[0].Next_Style_No)

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
		setBase64Images(JSON.parse(data.Style_Images))
	}
	const closeEditForm = () => {
		setIsEditFormOpen(false);
	};

	// Delete Unit Records

	const deleteStyleEntry = (data) => {
		if (window.confirm("Are you sure to delete the Style Entry ?")) {
			let payload = {
				"Style_No": data.Style_No
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

	const handleEditStyleEntry = (e) => {

		e.preventDefault();
		let isValid = true;

		if (!buyerOrderRefNo) {
			setBuyerOrderRefNoError('Buyer Order Ref. No. is required');
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
			setMarchantNameError('Merchant Name is required');
			isValid = false;
		} else if (!/^[a-zA-Z0-9 ]+$/.test(marchantName)) {
			setMarchantNameError('Merchant Name must contain only alphanumeric characters and spaces');
			isValid = false;
		} else {
			setMarchantNameError('');
		}


		if (!styleDescription) {
			setStyleDescriptionError('Buyer Style No is required');
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


		// if (!marchantContact) {
		// 	setMarchantContactError('Mail id is required');
		// 	isValid = false;
		// } else if (!/^[6789]\d{9}$/.test(marchantContact)) {
		// 	setMarchantContactError('Please enter a valid 10-digit Indian mobile number');
		// 	isValid = false;
		// } else {
		// 	setMarchantContactError('');
		// }


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
			"Note": note,
			"Style_Images": JSON.stringify(base64Images)
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
		<MDBCol size='1' style={{ width: "13%" }} className='no-pad-right'>
			<MDBTabs className='flex-column text-center vertical-tab'>
				<MDBTabsItem className="vertical-link">
					<MDBTabsLink onClick={() => handleVerticalClick('tabV1')} active={verticalActive === 'tabV1'}>
						Style Details
					</MDBTabsLink>
				</MDBTabsItem>

				<MDBTabsItem className="vertical-link">
					<MDBTabsLink onClick={() => handleVerticalClick('tabV2')} active={verticalActive === 'tabV2'}>
						Order Details
					</MDBTabsLink>
				</MDBTabsItem>

			</MDBTabs>
		</MDBCol>
		<MDBCol size='11' style={{ width: "87%" }} className='no-pad-left'>
			<MDBTabsContent className='unit-tab-content'>
				<MDBTabsPane show={verticalActive === 'tabV1'}>
					<div className='row'>
						<div className='col-8'>
							<h1 className='h1'> Style Details </h1>
						</div>
						<div className='col-4 text-right'>
							<Button className='primary-btn mt-10' onClick={() => { setShow(true); stateValues() }}>
								<i className='fa fa-plus fa-white'> </i> New Style
							</Button>

							<StyleModal
								show={show}
								handleClose={handleClose}
								handleStyleEntry={handleStyleEntry}
								setBuyer={setBuyer}
								buyer={buyer}
								buyerList={buyerList}
								setProductType={setProductType}
								productType={productType}
								productTypeList={productTypeList}
								productTypeError={productTypeError}
								setGender={setGender}
								gender={gender}
								genderList={genderList}
								genderError={genderError}
								setMarchantName={setMarchantName}
								marchantName={marchantName}
								marchantNameError={marchantNameError}
								setBuyerOrderRefNo={setBuyerOrderRefNo}
								buyerOrderRefNo={buyerOrderRefNo}
								buyerOrderRefNoError={buyerOrderRefNoError}
								setStyleDescription={setStyleDescription}
								styleDescription={styleDescription}
								styleDescriptionError={styleDescriptionError}
								setSizeGrid={setSizeGrid}
								sizeGrid={sizeGrid}
								sizeGridList={sizeGridList}
								sizeGridError={sizeGridError}
								setSeason={setSeason}
								season={season}
								seasonList={seasonList}
								seasonError={seasonError}
								setMarchantContact={setMarchantContact}
								marchantContact={marchantContact}
								marchantContactError={marchantContactError}
								setNote={setNote}
								note={note}
								handleImageUpload={handleImageUpload}
								imageUploadError={imageUploadError}
								base64Images={base64Images}
								handleDeleteImage={handleDeleteImage}
								setCurrentIndex={setCurrentIndex}
								currentIndex={currentIndex}
								add = "add"
							/>
						</div>
						<div className='col-12'>

							<StyleEntryTable defaultPageSize={10} data={data} openEditForm={openEditForm} deleteStyleEntry={deleteStyleEntry} />

							<StyleModal
								show={isEditFormOpen}
								onHide={closeEditForm}
								handleEditStyleEntry={handleEditStyleEntry}
								setBuyer={setBuyer}
								buyer={buyer}
								buyerList={buyerList}
								setProductType={setProductType}
								productType={productType}
								productTypeList={productTypeList}
								productTypeError={productTypeError}
								setGender={setGender}
								gender={gender}
								genderList={genderList}
								genderError={genderError}
								setMarchantName={setMarchantName}
								marchantName={marchantName}
								marchantNameError={marchantNameError}
								setBuyerOrderRefNo={setBuyerOrderRefNo}
								buyerOrderRefNo={buyerOrderRefNo}
								buyerOrderRefNoError={buyerOrderRefNoError}
								setStyleDescription={setStyleDescription}
								styleDescription={styleDescription}
								styleDescriptionError={styleDescriptionError}
								setSizeGrid={setSizeGrid}
								sizeGrid={sizeGrid}
								sizeGridList={sizeGridList}
								sizeGridError={sizeGridError}
								setSeason={setSeason}
								season={season}
								seasonList={seasonList}
								seasonError={seasonError}
								setMarchantContact={setMarchantContact}
								marchantContact={marchantContact}
								marchantContactError={marchantContactError}
								setNote={setNote}
								note={note}
								handleImageUpload={handleImageUpload}
								imageUploadError={imageUploadError}
								base64Images={base64Images}
								handleDeleteImage={handleDeleteImage}
								setCurrentIndex={setCurrentIndex}
								currentIndex={currentIndex}
								add = "edit"
							/>
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