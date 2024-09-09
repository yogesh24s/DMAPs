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

  const handleAddRow = () => {
    // Check if any of the mandatory fields are empty
    if (!garmentColor || !destinationCountry) {
        // Display a notification indicating mandatory fields
        alert("Please fill in all mandatory fields: Garment Color, Destination Country and Total");
        return; // Exit the function without adding the row
    }

    // Safely parse sizes and sum them up
    const totalSizes = Object.entries(sizes)
        .filter(([key]) => key !== 'total') // Exclude 'total' key
        .reduce((acc, [_, value]) => {
            const parsedValue = parseInt(value);
            return acc + (isNaN(parsedValue) ? 0 : parsedValue);
        }, 0);

    const newRow = {
        garmentColor,
        destinationCountry,
        poNumber,
        ...sizes,
        total: totalSizes,
    };

    // If editing an existing row
    if (editingIndex !== null) {
        const updatedRows = [...rows];
        updatedRows[editingIndex] = newRow;
        setRows(updatedRows);
        setEditingIndex(null); // Reset editing index after saving changes
    } else {
        // If adding a new row
        setRows([...rows, newRow]);
    }

    // Clear form fields after adding/editing row
    setGarmentColor('');
    setDestinationCountry('');
    setPONumber('');
    setSizes(sizesArray.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {})); // Reset sizes state
};



  const handleEditRow = (index) => {
    const rowToEdit = rows[index];
    setGarmentColor(rowToEdit.garmentColor);
    setDestinationCountry(rowToEdit.destinationCountry);
    setPONumber(rowToEdit.poNumber);
    setSizes(rowToEdit);
    setEditingIndex(index);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    // If deleting the row being edited, reset editing index
    if (index === editingIndex) {
      setEditingIndex(null);
    }
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
		handleAddRow();
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
			setStyleNoError('Style No. is required');
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
			setPONoError('PO No. is required');
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
			"Garment_Data" : JSON.stringify(rows)
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
			setStyleNoError('Style No. is required');
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
			setPONoError('PO No. is required');
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
			return; // Exit the function without adding the row
		}
		

		if (!isValid) {
			return;
		}

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
								<h1 className='h1'> Production Order Details </h1>
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
										<Modal.Title> Add New Production Order  </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										
										

										<form onSubmit={handlePODetails}>
											<div className='row'>

												<div className='col-3'>
													<Form.Select className='mb-3' tabindex="1" label='Style No' onChange={(e) => { setStyleNo(e.target.value); 		
														handleSizeGrid(e.target.value)}} value={styleNo} name='styleNo'>
															<option> Select Style No. </option>
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
														<label className='label-read' htmlFor="name">Buyer:</label>
														<span className='span-read'> {BuyerName} </span>
													</div>
													</div>
													<div className='col-3'>
													<div className="data-row">
														<label className='label-read' htmlFor="name">Buyer Style No:</label>
														<span className='span-read'> {StyleDescription} </span>
													</div>
													</div>
													<div className='col-3'>
													<div className="data-row">
														<label className='label-read' htmlFor="name">Size Grid Name:</label>
														<span className='span-read'> {SizeGridName} </span>
													</div>
													</div>
													<div className='col-12'>
													<div className='row'>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Gender:</label>
															<span className='span-read'> {GenderView} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Product Type:</label>
															<span className='span-read'> {ProductType} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Name:</label>
															<span className='span-read'> {MerchantName} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Contact:</label>
															<span className='span-read'> {MerchantContact} </span>
														</div>
														</div>
													</div>
													</div>
												</div>
												) : null}
											</div>
											<div className='row'>
												<div className='col-3'>
													<MDBInput label='F PO No.' type='text' tabindex="2" wrapperClass='mb-3' onChange={(e) => { setFPONo(e.target.value) }} value={fPONo} name='fPONo' />
													{fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

													<MDBInput label='PO No.' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setPONo(e.target.value) }} value={PONo} name='PONo' />
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
															<td>{row.garmentColor}</td>
															<td>{row.destinationCountry}</td>
															{sizesArray.map((size, index) => (
															<td key={index}>{row[size]}</td> // Generate table cells dynamically based on sizesArray
															))}
															<td>{row.total}</td>
															<td>
															 <i className='fa fa-edit pointer' onClick={() => handleEditRow(index)} title='Edit'> </i> 
															<i className='fa fa-trash ml-15 pointer'  onClick={() => handleDeleteRow(index)} title='Delete' > </i>
															</td>
														</tr>
														))}
													</tbody>
													</table>

													{/* Form for adding new row */}
													{sizesArray.length > 1 && (
														<div className="add-row-form">
															<input type="text" required value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} placeholder="Garment Color" />
															<input type="text" required value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} placeholder="Destination Country" />
															{/* Input fields for each size */}
															{sizesArray.map((size, index) => (
															<input key={index} required type="number" value={sizes[size]} onChange={(e) => setSizes({ ...sizes, [size]: e.target.value })} placeholder={size} />
															))}
														</div>
													)}
												</div>
											</div>
										</form>
										<Button variant="success" type="click" onClick={handleAddRow} style={{ width: '15%', marginTop: "20PX"}} >{editingIndex !== null ? 'Save Changes' : 'Add Row'} </Button>
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
										<Modal.Title>Edit Style Entry </Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<form onSubmit={handleEditStyleEntry}>
										<div className='row'>
												<div className='col-3'>
												
												<Form.Select className='mb-3' tabindex="1" label='Style No' onChange={(e) => { setStyleNo(e.target.value); handleSizeGrid(e.target.value)}} value={styleNo} name='styleNo'>
                                                        <option> Select Style No. </option>
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
														<label className='label-read' htmlFor="name">Buyer:</label>
														<span className='span-read'> {BuyerName} </span>
													</div>
													</div>
													<div className='col-3'>
													<div className="data-row">
														<label className='label-read' htmlFor="name">Buyer Style No:</label>
														<span className='span-read'> {StyleDescription} </span>
													</div>
													</div>
													<div className='col-3'>
													<div className="data-row">
														<label className='label-read' htmlFor="name">Size Grid Name:</label>
														<span className='span-read'> {SizeGridName} </span>
													</div>
													</div>
													<div className='col-12'>
													<div className='row'>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Gender:</label>
															<span className='span-read'> {GenderView} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Product Type:</label>
															<span className='span-read'> {ProductType} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Name:</label>
															<span className='span-read'> {MerchantName} </span>
														</div>
														</div>
														<div className='col-3'>
														<div className="data-row">
															<label className='label-read' htmlFor="name">Merchant Contact:</label>
															<span className='span-read'> {MerchantContact} </span>
														</div>
														</div>
													</div>
													</div>
												</div>
												) : null}
												</div>
												<div className='col-3'>
													<MDBInput label='F PO No.' type='text' tabindex="2" wrapperClass='mb-3' onChange={(e) => { setFPONo(e.target.value) }} value={fPONo} name='fPONo' />
													{fPONoError && <p style={{ color: 'red' }}>{fPONoError}</p>}

													<MDBInput label='PO No.' type='text' tabindex="3" wrapperClass='mb-3' onChange={(e) => { setPONo(e.target.value) }} value={PONo} name='PONo' />
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
															<td>{row.garmentColor}</td>
															<td>{row.destinationCountry}</td>
															{sizesArray.map((size, index) => (
															<td key={index}>{row[size]}</td> // Generate table cells dynamically based on sizesArray
															))}
															<td>{row.total}</td>
															<td>
															 <i className='fa fa-edit pointer' onClick={() => handleEditRow(index)} title='Edit'> </i> 
															<i className='fa fa-trash ml-15 pointer'  onClick={() => handleDeleteRow(index)} title='Delete' > </i>
															</td>
														</tr>
														))}
													</tbody>
													</table>

													{/* Form for adding new row */}
													{sizesArray.length > 1 && (
														<div className="add-row-form">
															<input type="text" value={garmentColor} onChange={(e) => setGarmentColor(e.target.value)} placeholder="Garment Color" />
															<input type="text" value={destinationCountry} onChange={(e) => setDestinationCountry(e.target.value)} placeholder="Destination Country" />
															{/* Input fields for each size */}
															{sizesArray.map((size, index) => (
															<input key={index} type="number" value={sizes[size]} onChange={(e) => setSizes({ ...sizes, [size]: e.target.value })} placeholder={size} />
															))}
														</div>
													)}
												</div>
											</div>
										</form>
										<Button variant="success" type="click" onClick={handleAddRow} style={{ width: '15%', marginTop: "20PX"}} >{editingIndex !== null ? 'Save Changes' : 'Add Row'} <i class={editingIndex !== null ? 'fa fa-save' : 'fa fa-plus'}aria-hidden="true"></i>
 </Button>
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