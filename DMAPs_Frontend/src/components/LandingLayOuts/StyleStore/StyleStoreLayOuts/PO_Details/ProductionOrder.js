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


import './ProductionOrder.scss';

import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBCol,
	MDBInput
} from 'mdb-react-ui-kit';

import styleStoreService from "../../../../../services/styleStoreService";
import { trackPromise } from 'react-promise-tracker';
import PODetailsTable from './ProductionOrderTable';
import adminService from "../../../../../services/adminService"

export default function ProductionOrder() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);

	const [verticalActive, setVerticalActive] = useState('tabV1');
	const [embType, setEmbType] = useState('')
	const [embTypeError, setEmbTypeError] = useState('');
	const [washingType, setWashingType] = useState('')
	const [washingTypeError, setWashingTypeError] = useState('');
	const [note, setNote] = useState('')
	const [noteError, setNoteError] = useState('');

	const [styleNo, setStyleNo] = useState('')
	const [styleNoError, setStyleNoError] = useState('')

	const [POId, setPOId] = useState("");
	const [fPONo, setFPONo] = useState('')
	const [PONo, setPONo] = useState('')
	const [PONoError, setPONoError] = useState('')
	const [OCNo, setOCNo] = useState('')
	const [OCNoError, setOCNoError] = useState('')
	const [fPONoError, setFPONoError] = useState('');
	const [printType, setPrintType] = useState('')
	const [printTypeError, setPrintTypeError] = useState('');

	const [others, setOthers] = useState('')
	const [othersError, setOthersError] = useState('');

	const [shipmentMode, setShipmentMode] = useState('')
	const [shipmentModeError, setShipmentModeError] = useState('')

	const [deliveryDate, setDeliveryDate] = useState('')
	const [deliveryDateError, setDeliveryDateError] = useState('')

	const [pcd, setPCD] = useState('')
	const [pcdError, setPCDError] = useState('')

	const [data, setData] = useState([]);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [styleId, setStyleEntryId] = useState("");

	const [styleNoList, setStyleNoList] = useState([]);
	const [embTypeList, setEmbTypeList] = useState([]);
	const [printTypeList, setPrintTypeList] = useState([]);
	const [washingTypeList, setWashingTypeList] = useState([]);
	const [styleGridList, setStyleGridList] = useState([]);

	const [rows, setRows] = useState([]);
  const [garmentColor, setGarmentColor] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [poNumber, setPONumber] = useState('');
  const [sizesArray, setSizesArray] = useState([]); // Default sizes
  const [sizes, setSizes] = useState(sizesArray.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})); // Dynamically initialize sizes state based on sizesArray
  const [editingIndex, setEditingIndex] = useState(null);

  const [BuyerName, setBuyerName] = useState('');
  const [StyleDescription, setStyleDescription] = useState('');
  const [SizeGridName, setSizeGridName] = useState('');
  const [ProductType, setProductType] = useState('');
  const [MerchantName, setMerchantName] = useState('');
  const [MerchantContact, setMerchantContact] = useState('');
  const [GenderView, setGenderView] = useState('');


  const handleSizeChange = (e, size) => {
	const { value } = e.target;
	const updatedSizes = { ...sizes, [size]: value };
	setSizes(updatedSizes);

	// Update the row if editing
	if (editingIndex !== null) {
		const updatedRows = [...rows];
		updatedRows[editingIndex].sizes = updatedSizes;
		updatedRows[editingIndex].total = calculateTotal(updatedSizes); // Recalculate total if needed
		setRows(updatedRows); // Update table rows immediately
	}
};

// Calculate total of all sizes
const calculateTotal = (sizes) => {
	return Object.values(sizes).reduce((sum, size) => sum + (parseInt(size) || 0), 0);
};

// const handleAddRow = () => {
// 	if (editingIndex !== null) {
// 		// Save edited row
// 		const updatedRows = [...rows];
// 		updatedRows[editingIndex] = { garmentColor, destinationCountry, sizes, total: calculateTotal(sizes) };
// 		setRows(updatedRows);
// 		setEditingIndex(null);
// 	} else {
// 		// Add new row
// 		setRows([...rows, { garmentColor, destinationCountry, sizes, total: calculateTotal(sizes) }]);
// 	}
	
// 	// Reset form
// 	setGarmentColor('');
// 	setDestinationCountry('');

// };

const handleAddRow = () => {
    // Create a new row object with the current form values
	const totalSizes = Object.entries(sizes)
        .filter(([key]) => key !== 'total') // Exclude 'total' key
        .reduce((acc, [_, value]) => {
            const parsedValue = parseInt(value);
            return acc + (isNaN(parsedValue) ? 0 : parsedValue);
        }, 0);

	if (garmentColor && destinationCountry && totalSizes) {
		const newRow = {
			garmentColor,
			destinationCountry,
			sizes: { ...sizes }, // Ensure sizes are correctly nested under 'sizes'
			total: Object.values(sizes).reduce((acc, size) => acc + parseInt(size || 0, 10), 0), // Calculate total sizes
		};
	
		if (editingIndex !== null) {
			// If we're editing an existing row, update the specific row
			const updatedRows = [...rows];
			updatedRows[editingIndex] = newRow;
			setRows(updatedRows);
			setEditingIndex(null); // Reset editing index after saving
		} else {
			// If we're adding a new row, add it to the rows array
			setRows([...rows, newRow]);
		}
	
		// Reset the sizes values while keeping the keys
		const resetSizes = sizesArray.reduce((acc, size) => {
			acc[size] = ''; // Reset each size value to an empty string
			return acc;
		}, {});
	
		// Reset form values after adding a row
		setGarmentColor('');
		setDestinationCountry('');
		setSizes(resetSizes); // Apply the reset sizes
		
	}
	else {
		
		alert("Please fill all the Garment Details");
		return; // Exit the function without adding the row
	}
    
};




const handleEditRow = (index) => {
	const rowToEdit = rows[index];
	setGarmentColor(rowToEdit.garmentColor);
	setDestinationCountry(rowToEdit.destinationCountry);
	setSizes(rowToEdit);
	setEditingIndex(index);
};

  // Delete row function
  const handleDeleteRow = (index) => {
	const updatedRows = rows.filter((_, i) => i !== index);
	setRows(updatedRows);
};

  const handleSizesChange = (data) => {
    const selectedSizes = data.split(',').map(size => size.trim()); // Convert comma-separated string to array
    setSizesArray(selectedSizes);
    setSizes(selectedSizes.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {})); // Reset sizes state based on selected sizes
    setRows([]); // Clear rows when sizes are changed
  };

  const handleSizeGrid = (value) => {

	let StyleNoList = JSON.parse(sessionStorage.getItem('StyleNoList'));
	let SizeGridList = JSON.parse(sessionStorage.getItem('StyleGridList'));

	const sizeGridId = StyleNoList.find(grid => grid.Style_No == value);

	if(sizeGridId){
		setBuyerName(sizeGridId.Buyer_Name);
		setStyleDescription(sizeGridId.Style_Description);
		setSizeGridName(sizeGridId.Size_Grid_Name);
		setProductType(sizeGridId.Product_Type);
		setMerchantName(sizeGridId.Marchent_Name);
		setMerchantContact(sizeGridId.Marchent_Contact);
		setGenderView(sizeGridId.Gender);

		const sizeGridIdValue = SizeGridList.find(grid => grid.Size_Grid_Id == sizeGridId.Size_Grid);	
    
		// If a matching size grid is found, return its Size_Grid_Value
		let SizeGridValue = sizeGridIdValue ? sizeGridIdValue.Size_Grid_Value : null
		
		handleSizesChange(SizeGridValue);
	}
	else {
		setBuyerName('');
		setStyleDescription('');
		setSizeGridName('');
		setProductType('');
		setMerchantName('');
		setMerchantContact('');
		setGenderView('');

	}
	

	
};
  
	const handleVerticalClick = (value) => {
		if (value === verticalActive) {
			return;
		}
		setVerticalActive(value);
	};

	const handlePODetails = (e) => {
		e.preventDefault();
		// handleAddRow();
		let isValid = true;

		if (!embType) {
			setEmbTypeError('Emb Type is required');
			isValid = false;
		}
	    else {
			setEmbTypeError('');
		}

		if (!washingType) {
			setWashingTypeError('Washing Type is required');
			isValid = false;
		} else {
			setWashingTypeError('');
		}

		if (!styleNo) {
			setStyleNoError('DMAPS No. is required');
			isValid = false;
		} else {
			setStyleNoError('');
		}

		if (!fPONo) {
			setFPONoError('FPO No. is required');
			isValid = false;
		} else {
			setFPONoError('');
		}

		if (!PONo) {
			setPONoError('Order No. is required');
			isValid = false;
		} else {
			setPONoError('');
		}

		if (!printType) {
			setPrintTypeError('Print Type is required');
			isValid = false;
		} else {
			setPrintTypeError('');
		}

		if (!pcd) {
			setPCDError('PCD is required');
			isValid = false;
		} 
		else {
			setPCDError('');
		}

		if (!deliveryDate) {
			setDeliveryDateError('Delivery Date is required');
			isValid = false;
		} 
		else {
			setDeliveryDateError('');
		}

		if (!shipmentMode) {
			setShipmentModeError('Shipment Mode is required');
			isValid = false;
		} 
		else {
			setShipmentModeError('');
		}

		const totalSizes = Object.entries(sizes)
        .filter(([key]) => key !== 'total') // Exclude 'total' key
        .reduce((acc, [_, value]) => {
            const parsedValue = parseInt(value);
            return acc + (isNaN(parsedValue) ? 0 : parsedValue);
        }, 0);

		if (garmentColor || destinationCountry || totalSizes) {
			// Display a notification indicating mandatory fields
			alert("You have filled something on Garment Details but not added, Please click on Add Row before SAVE");
			// return; // Exit the function without adding the row
		}
	
		if (!isValid) {
			return;
		}

		const modifiedData = rows.map(item => {
			return {
				garmentColor: item.garmentColor,
				destinationCountry: item.destinationCountry,
				total: item.total,
				...item.sizes // Spread sizes into the new object
			};
		});
		
		// Now modifiedData contains the desired structure
		console.log(modifiedData);

		let payload = {
			"Style_No": styleNo,
			"F_PO_No":fPONo,
			"PO_No":PONo,
			"OC_No":OCNo,
			"Emb_Type": embType,
			"Print_Type": printType,
			"Washing_Type": washingType,
			"Others":others,
			"Shipment_Mode" : shipmentMode,
			"Delivery_Date" : deliveryDate,
			"PCD" : pcd,
			"Note": note,
			"Garment_Data" : JSON.stringify(modifiedData)
		}

		trackPromise(styleStoreService.savePODetails({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result);
				stateValues()
				getPOData()
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

	const getPOData = () => {
		trackPromise(
			styleStoreService.getPODetails().then((response) => {
				setData(response.data.PO_Details)
			})
		);
	}

	const getBasicDetails = () => {
        trackPromise(
            adminService.getBasicDetails().then((response) => {
                setStyleNoList(response.data[0].data[0].data.styleNo);
				setEmbTypeList(response.data[0].data[0].data.embType)
				setPrintTypeList(response.data[0].data[0].data.printType)
				setWashingTypeList(response.data[0].data[0].data.washingType)
				setStyleGridList(response.data[0].data[0].data.sizeGrid)

				sessionStorage.setItem('StyleNoList', JSON.stringify(response.data[0].data[0].data.styleNo));
				sessionStorage.setItem('StyleGridList', JSON.stringify(response.data[0].data[0].data.sizeGrid));
            })
        );
    }

	useEffect(() => {
		getBasicDetails();
		getPOData()
	}, [])


	function stateValues() {
		getBasicDetails();
		setNote('');
		setNoteError('');
		setStyleNo('')
		setStyleNoError('');
		setEmbType('')
		setEmbTypeError('')
		setWashingType('')
		setWashingTypeError('')
		setFPONo('')
		setFPONoError('')
		setPONo('')
		setPONoError('')
		setOCNo('')
		setOCNoError('')
		setPrintType('')
		setPrintTypeError('')
		setOthers('')
		setOthersError('')
		setShipmentMode('')
		setShipmentModeError('')
		setDeliveryDate('')
		setDeliveryDateError('')
		setPCD('')
		setPCDError('')
		setGarmentColor('');
		setDestinationCountry('');
		setPONumber('');
		setSizes({
			XS: '',
			S: '',
			M: '',
			L: '',
			XL: '',
		});
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
		setGarmentColor('');
		setDestinationCountry('');
		
        editFormDetails(data);
		setIsEditFormOpen(true); 
    };

	const setExistingGarmentData = (data) => {
		// Extracting sizes from the first garment data entry assuming all garments have the same sizes
		const sizesFromData = Object.keys(data[0]).filter(key => !['garmentColor', 'destinationCountry', 'poNumber', 'total'].includes(key));
			setSizesArray(sizesFromData);
			// Set each garment's data into rows state
			setRows(data);
		
	};

	function editFormDetails(data) {
		setNoteError('');
		setStyleNoError('');
		setPOId(data.PO_Id);
		setEmbType(data.Emb_Type)
		setWashingType(data.Washing_Type)
		setNote(data.Note)
		setStyleNo(data.Style_No)
		setFPONo(data.F_PO_No)
		setPONo(data.PO_No)
		setOCNo(data.OC_No)
		setPrintType(data.Print_Type)
		setOthers(data.Others)
		setShipmentMode(data.Shipment_Mode)
		setDeliveryDate(data.Delivery_Date)
		setPCD(data.PCD)

		setBuyerName(data.Buyer_Name);
		setStyleDescription(data.Style_Description);
		setSizeGridName(data.Size_Grid_Name);
		setProductType(data.Product_Type);
		setMerchantName(data.Marchent_Name);
		setMerchantContact(data.Marchent_Contact);
		setGenderView(data.Gender);


		if(JSON.parse(data.Garment_Data).length != 0) {
			setExistingGarmentData(JSON.parse(data.Garment_Data))
		}
		else {
			handleSizeGrid(data.Style_No)
		}
	}

    const closeEditForm = () => {
        setIsEditFormOpen(false);
    };

// Delete Unit Records

const deletePODetails = (data) => {
	if (window.confirm("Are you sure to delete the Style Entry ?"))
    {
		let payload = {
			"PO_Id":data.PO_Id
		}
		trackPromise(styleStoreService.deletePODetails({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				getPOData()
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

		if (!embType) {
			setEmbTypeError('Emb Type is required');
			isValid = false;
		}
	    else {
			setEmbTypeError('');
		}

		if (!washingType) {
			setWashingTypeError('Washing Type is required');
			isValid = false;
		} else {
			setWashingTypeError('');
		}

		if (!styleNo) {
			setStyleNoError('DMAPS No. is required');
			isValid = false;
		} else {
			setStyleNoError('');
		}

		if (!fPONo) {
			setFPONoError('FPO No. is required');
			isValid = false;
		} else {
			setFPONoError('');
		}

		if (!PONo) {
			setPONoError('Order No. is required');
			isValid = false;
		} else {
			setPONoError('');
		}

		if (!printType) {
			setPrintTypeError('Print Type is required');
			isValid = false;
		} else {
			setPrintTypeError('');
		}

		if (!pcd) {
			setPCDError('PCD is required');
			isValid = false;
		} 
		else {
			setPCDError('');
		}

		if (!deliveryDate) {
			setDeliveryDateError('Delivery Date is required');
			isValid = false;
		} 
		else {
			setDeliveryDateError('');
		}

		if (!shipmentMode) {
			setShipmentModeError('Shipment Mode is required');
			isValid = false;
		}
		else {
			setShipmentModeError('');
		}

		const totalSizes = Object.entries(sizes)
        .filter(([key]) => key !== 'total') // Exclude 'total' key
        .reduce((acc, [_, value]) => {
            const parsedValue = parseInt(value);
            return acc + (isNaN(parsedValue) ? 0 : parsedValue);
        }, 0);

		// if (garmentColor || destinationCountry || totalSizes) {
		// 	// Display a notification indicating mandatory fields
		// 	alert("You have filled something on Garment Details but not added, Please click on Add Row before SAVE");
		// 	// return; // Exit the function without adding the row
		// }

		if (!isValid) {
			return;
		}


		const modifiedData = rows.map(item => {
			return {
				garmentColor: item.garmentColor,
				destinationCountry: item.destinationCountry,
				total: item.total,
				...item.sizes // Spread sizes into the new object
			};
		});
		
		// Now modifiedData contains the desired structure
		console.log(modifiedData);

		let payload = {
			"PO_Id":POId,
			"Style_No": styleNo,
			"FPO_No":fPONo,
			"PO_No":PONo,
			"OC_No":OCNo,
			"Emb_Type": embType,
			"Print_Type": printType,
			"Washing_Type": washingType,
			"Others":others,
			"Shipment_Mode" : shipmentMode,
			"Delivery_Date" : deliveryDate,
			"PCD" : pcd,
			"Note": note,
			"Garment_Data" : JSON.stringify(rows)
		}

		trackPromise(styleStoreService.editPODetails({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result)
				getPOData()
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
			<div className='row'>
							<div className='col-8'>
								<h1 className='h1'> Order Details </h1>
							</div>
							<div className='col-4 text-right'>
								<Button className='primary-btn mt-10' onClick={() => {setShow(true);stateValues(); setSizes({});  setRows([]); }}>
								<i className='fa fa-plus fa-white'> </i> New PO 
								</Button>
								
								<Modal
									show={show}
									onHide={() => setShow(false)}
									dialogClassName="modal-90w"
									backdrop="static"
									keyboard={false}>

									<Modal.Header closeButton>
										<Modal.Title> Add New Order  </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handlePODetails}>
											<div className='row'>
												<div className='col-3'>
													<Form.Select className='mb-3' tabindex="1" label='DMAPS No.' onChange={(e) => { setStyleNo(e.target.value); 		
														handleSizeGrid(e.target.value)}} value={styleNo} name='styleNo'>
															<option> Select DMAPS No. </option>
															{styleNoList.map((item) => (
																<option key={item.Style_No} value={item.Style_No}>
																	{item.Style_No}
																</option>
															))}
													</Form.Select>
													{styleNoError && <p style={{ color: 'red' }}>{styleNoError}</p>}

												</div>
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
															<label className='label-read' htmlFor="name">Merchant Contact</label>
															<span className='span-read'> {MerchantContact} </span>
														</div>
														</div>
													</div>
													</div>
												</div>
												) : null}
											</div>
											<h6 className='h6'> Order Details </h6>
											<div className='row'>
												<div className='col-3'>
													<MDBInput label='F PO No.' type='text' tabindex="2" wrapperClass='mb-3' onChange={(e) => { setFPONo(e.target.value) }} value={fPONo} name='fPONo' />
													{fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

													<MDBInput label='Order No.' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setPONo(e.target.value) }} value={PONo} name='PONo' />
													{PONoError && <p style={{ color: 'red' }}>{PONoError}</p>}

													<MDBInput label='OC No.' type='text' tabindex="4" wrapperClass='mb-3' onChange={(e) => { setOCNo(e.target.value) }} value={OCNo} name='OCNo' />
												</div>

												<div className='col-3'>
													
												<Form.Select className='mb-3' tabindex="5" label='Emb Type' onChange={(e) => { setEmbType(e.target.value) }} value={embType} name='embType'>
                                                        <option> Select Emb Type </option>
                                                        {embTypeList.map((item) => (
                                                            <option key={item.id} value={item.Emb_Type}>
                                                                {item.Emb_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{embTypeError && <p style={{ color: 'red' }}>{embTypeError}</p>}

													<Form.Select className='mb-3' tabindex="6" label='Print Type' onChange={(e) => { setPrintType(e.target.value) }} value={printType} name='printType'>
                                                        <option> Select Print Type </option>
                                                        {printTypeList.map((item) => (
                                                            <option key={item.id} value={item.Print_Type}>
                                                                {item.Print_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{printTypeError && <p style={{ color: 'red' }}>{printTypeError}</p>}

													<Form.Select className='mb-3' tabindex="7" label='Washing Type' onChange={(e) => { setWashingType(e.target.value) }} value={washingType} name='washingType'>
                                                        <option> Select Washing Type </option>
                                                        {washingTypeList.map((item) => (
                                                            <option key={item.id} value={item.Washing_Type}>
                                                                {item.Washing_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{washingTypeError && <p style={{ color: 'red' }}>{washingTypeError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="9" label='Shipment Mode' onChange={(e) => { setShipmentMode(e.target.value) }} value={shipmentMode} name='shipmentMode' />
													{shipmentModeError && <p style={{ color: 'red' }}>{shipmentModeError}</p>}

													

												</div>
												<div className='col-6'>

													<MDBInput wrapperClass='mb-3' type='date' tabindex="10" label='Delivery Date' onChange={(e) => { setDeliveryDate(e.target.value) }} value={deliveryDate} name='deliveryDate' />
													{deliveryDateError && <p style={{ color: 'red' }}>{deliveryDateError}</p>}

													<MDBInput wrapperClass='mb-3' type='date' tabindex="11" label='PCD' onChange={(e) => { setPCD(e.target.value) }} value={pcd} name='pcd' />
													{pcdError && <p style={{ color: 'red' }}>{pcdError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="8" label='Others' onChange={(e) => { setOthers(e.target.value) }} value={others} name='others' />

													<MDBInput wrapperClass='mb-3 ' label='Notes'  type='textarea' tabindex="12"  onChange={(e) => { setNote(e.target.value) }} value={note} name='note' />

												</div>
												<div className="col-12 mt-20">
													{/* Reactive form */}
													<table>
													{/* Table headers */}
													<thead>
														<tr>
														<th>Garment Color</th>
														<th>Destination Country</th>
														{sizesArray.map((size, index) => (
															<th key={index}>{size}</th> // Generate table columns dynamically based on sizesArray
														))}
														<th>Total</th>
														<th>Actions</th>
														</tr>
													</thead>
													{/* Table body */}
													<tbody>
														{rows.map((row, index) => (
															<tr key={index}>
																<td>{row.garmentColor || 'N/A'}</td>
																<td>{row.destinationCountry || 'N/A'}</td>
																{sizesArray.map((size, i) => (
																	<td key={i}>
																		{row.sizes && row.sizes[size] !== undefined 
																			? row.sizes[size] 
																			: 0} {/* Default to 0 or another value if undefined */}
																	</td>
																))}
																<td>{row.total || 0}</td> {/* Ensure total is defined or default to 0 */}
																<td>
																	{/* <i className='fa fa-edit pointer' onClick={() => handleEditRow(index)} title='Edit'> </i>  */}
																	<i className='fa fa-trash ml-15 pointer' onClick={() => handleDeleteRow(index)} title='Delete' > </i>
																</td>
															</tr>
														))}
													</tbody>

													</table>

													{/* Form for adding new row */}
													{sizesArray.length > 1 && (
														<div className="add-row-form">
															
															<MDBInput label='Garment Color' required value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} />
															<MDBInput label='Destination Country' required value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} />
															{/* Input fields for each size */}
															{sizesArray.map((size, index) => (
																<MDBInput label={size}
																	key={index}
																	required
																	type="number"
																	value={sizes[size]}
																	onChange={(e) => handleSizeChange(e, size)}
																	
																/>
															))}
														</div>
													)}
												</div>
											</div>
										</form>
										<Button variant="success" type="click" onClick={handleAddRow} style={{ float: 'right', width: '5%', marginTop: "0PX" }}> <i className='fa fa-plus fa-1x white'> </i>   </Button>
										{/* <i className={editingIndex !== null ? 'fa fa-save fa-1x' : 'fa fa-plus fa-1x'}> </i>  */}


									</Modal.Body>
									<Modal.Footer>
									
										<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }} >
											Cancel
										</Button>
										<Button variant="primary" type='submit' onClick={handlePODetails}  style={{ width: '15%' }}>
											Save
										</Button>
									</Modal.Footer>
								</Modal>
							</div>
							<div className='col-12'>

								<PODetailsTable defaultPageSize={10} data={data} openEditForm={openEditForm} deletePODetails = {deletePODetails} />

								<Modal show={isEditFormOpen} onHide={closeEditForm} dialogClassName="modal-90w"
									backdrop="static">
									<Modal.Header closeButton>
										<Modal.Title>Edit Order Details </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleEditStyleEntry}>
										<div className='row'>
												<div className='col-3'>
												<Form.Select className='mb-3' tabindex="1" label='DMAPS No.' onChange={(e) => { setStyleNo(e.target.value); handleSizeGrid(e.target.value)}} value={styleNo} name='styleNo' disabled>
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
															<label className='label-read' htmlFor="name">Merchant Contact</label>
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
													
												<Form.Select className='mb-3' tabindex="5" label='Emb Type' onChange={(e) => { setEmbType(e.target.value) }} value={embType} name='embType'>
                                                        <option> Select Emb Type </option>
                                                        {embTypeList.map((item) => (
                                                            <option key={item.id} value={item.Emb_Type}>
                                                                {item.Emb_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{embTypeError && <p style={{ color: 'red' }}>{embTypeError}</p>}

													<Form.Select className='mb-3' tabindex="6" label='Print Type' onChange={(e) => { setPrintType(e.target.value) }} value={printType} name='printType'>
                                                        <option> Select Print Type </option>
                                                        {printTypeList.map((item) => (
                                                            <option key={item.id} value={item.Print_Type}>
                                                                {item.Print_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{printTypeError && <p style={{ color: 'red' }}>{printTypeError}</p>}

													<Form.Select className='mb-3' tabindex="7" label='Washing Type' onChange={(e) => { setWashingType(e.target.value) }} value={washingType} name='washingType'>
                                                        <option> Select Washing Type </option>
                                                        {washingTypeList.map((item) => (
                                                            <option key={item.id} value={item.Washing_Type}>
                                                                {item.Washing_Type}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
													{washingTypeError && <p style={{ color: 'red' }}>{washingTypeError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="9" label='Shipment Mode' onChange={(e) => { setShipmentMode(e.target.value) }} value={shipmentMode} name='shipmentMode' />
													{shipmentModeError && <p style={{ color: 'red' }}>{shipmentModeError}</p>}

													

												</div>
												<div className='col-6'>

													<MDBInput wrapperClass='mb-3' type='date' tabindex="10" label='Delivery Date' onChange={(e) => { setDeliveryDate(e.target.value) }} value={deliveryDate} name='deliveryDate' />
													{deliveryDateError && <p style={{ color: 'red' }}>{deliveryDateError}</p>}

													<MDBInput wrapperClass='mb-3' type='date' tabindex="11" label='PCD' onChange={(e) => { setPCD(e.target.value) }} value={pcd} name='pcd' />
													{pcdError && <p style={{ color: 'red' }}>{pcdError}</p>}

													<MDBInput wrapperClass='mb-3' type='text' tabindex="8" label='Others' onChange={(e) => { setOthers(e.target.value) }} value={others} name='others' />

													<MDBInput wrapperClass='mb-3 ' label='Notes'  type='textarea' tabindex="12"  onChange={(e) => { setNote(e.target.value) }} value={note} name='note' />

												</div>
												<div className="col-12 mt-20">
													{/* Reactive form */}
													<table>
													{/* Table headers */}
													<thead>
														<tr>
														<th>Garment Color</th>
														<th>Destination Country</th>
														{sizesArray.map((size, index) => (
															<th key={index}>{size}</th> // Generate table columns dynamically based on sizesArray
														))}
														<th>Total</th>
														<th>Actions</th>
														</tr>
													</thead>
													{/* Table body */}
													<tbody>
														{rows.map((row, index) => (
															<tr key={index}>
																<td>{row.garmentColor || 'N/A'}</td>
																<td>{row.destinationCountry || 'N/A'}</td>
																{sizesArray.map((size, i) => (
																	<td key={index}> {row.sizes && row.sizes[size] !== undefined 
																		? row.sizes[size] 
																		: row[size]}</td>
																))}
																<td>{row.total || 0}</td> {/* Ensure total is defined or default to 0 */}
																<td>
																	<i className='fa fa-edit pointer' onClick={() => handleEditRow(index)} title='Edit'> </i> 
																	<i className='fa fa-trash ml-15 pointer' onClick={() => handleDeleteRow(index)} title='Delete' > </i>
																</td>
															</tr>
														))}
													</tbody>

													</table>

													{/* Form for adding new row */}
													{sizesArray.length > 1 && (
														<div className="add-row-form">
															<MDBInput label='Garment Color' required value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} />
															<MDBInput label='Destination Country' required value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} />
															{/* Input fields for each size */}
															{sizesArray.map((size, index) => (
																<MDBInput label={size}
																	key={index}
																	required
																	type="number"
																	value={sizes[size]}
																	onChange={(e) => handleSizeChange(e, size)}
																/>
															))}
														</div>
													)}
												</div>
											</div>
										</form>
										<Button variant="success" type="click" onClick={handleAddRow} style={{ float: 'right', width: '5%', marginTop: "0PX" }}> <i className='fa fa-plus fa-1x white'> </i>   </Button>
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

	</>
}