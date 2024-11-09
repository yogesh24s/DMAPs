/**
 * owner : 
 * author :
 */

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './ProductionOrder.scss';
import { MDBInput } from 'mdb-react-ui-kit';
import styleStoreService from "../../../../../services/styleStoreService";
import { trackPromise } from 'react-promise-tracker';
import PODetailsTable from './ProductionOrderTable';
import adminService from "../../../../../services/adminService"
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import OrderModal from './OrderModal';
import EditOrderModal from './EditOrderModal';

export default function ProductionOrder() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const [embType, setEmbType] = useState('')
	const [embTypeError, setEmbTypeError] = useState('');
	const [washingType, setWashingType] = useState('')
	const [washingTypeError, setWashingTypeError] = useState('');
	const [note, setNote] = useState('')
	const [styleNo, setStyleNo] = useState('')
	const [styleNoError, setStyleNoError] = useState('')
	const [POId, setPOId] = useState("");
	const [fPONo, setFPONo] = useState('')
	const [PONo, setPONo] = useState('')
	const [PONoError, setPONoError] = useState('')
	const [OCNo, setOCNo] = useState('')
	const [fPONoError, setFPONoError] = useState('');
	const [printType, setPrintType] = useState('')
	const [printTypeError, setPrintTypeError] = useState('');
	const [others, setOthers] = useState('')
	const [shipmentMode, setShipmentMode] = useState('')
	const [shipmentModeError, setShipmentModeError] = useState('')
	const [deliveryDate, setDeliveryDate] = useState('')
	const [deliveryDateError, setDeliveryDateError] = useState('')
	const [pcd, setPCD] = useState('')
	const [pcdError, setPCDError] = useState('')
	const [data, setData] = useState([]);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [styleNoList, setStyleNoList] = useState([]);
	const [embTypeList, setEmbTypeList] = useState([]);
	const [printTypeList, setPrintTypeList] = useState([]);
	const [washingTypeList, setWashingTypeList] = useState([]);
	const [rows, setRows] = useState([]);
	const [sizeKeys, setSizeKeys] = useState([]);
	const [garmentColor, setGarmentColor] = useState('');
	const [destinationCountry, setDestinationCountry] = useState('');
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
	const [rowData, setRowData] = useState(null); // Initialize rowData
	// Calculate total of all sizes
	const calculateTotal = (sizes) => {
		return Object.values(sizes).reduce((sum, size) => sum + (parseInt(size) || 0), 0);
	};

	const addNewRow = () => {
		// Add a new row
		const newSizes = sizesArray.reduce((acc, sizeKey) => {
			acc[sizeKey] = ""; // Initialize each size with an empty string
			return acc;
		}, {});

		setRows([...rows, {
			garmentColor,
			destinationCountry,
			sizes: newSizes, // Use the new sizes object
			total: calculateTotal(newSizes),
			isEditable: true,
		}]);
		// Reset the form
		setGarmentColor('#000000');
		setDestinationCountry("");
		setSizes({}); // Reset sizes to an empty object
	};

	const handleEditRow = (rowIndex) => {
		const updatedRows = [...rows];
		updatedRows[rowIndex].isEditable = !updatedRows[rowIndex].isEditable; // Toggle edit mode
		setRows(updatedRows);
	};

	const handleDeleteRow = (rowIndex) => {
		const updatedRows = rows.filter((_, index) => index !== rowIndex);
		setRows(updatedRows);
	};

	const handleSizesChange = (data) => {
		const selectedSizes = data.split(',').map(size => size.trim());
		setSizesArray(selectedSizes);
		// Initialize a new sizes object
		const initialSizes = selectedSizes.reduce((acc, size) => {
			acc[size] = ''; // Default each size value as empty
			return acc;
		}, {});

		// Reset rows with new sizes
		const newRow = {
			garmentColor: '#000000',
			destinationCountry: '',
			sizes: initialSizes,
			total: 0, // Initial total is 0
			isEditable: false
		};

		setRows([newRow]); // Only one row initially
	};

	//  UseEffect to ensure rows are updated when sizesArray changes
	useEffect(() => {
		if (sizesArray.length > 0) {
			const initialSizes = sizesArray.reduce((acc, size) => {
				acc[size] = ''; // Initialize size values as empty strings
				return acc;
			}, {});

			const newRow = {
				garmentColor: '#000000',
				destinationCountry: '',
				sizes: initialSizes,
				total: 0,
				isEditable: false
			};

			// Set the new row in rows
			setRows([newRow]);
		}
	}, [sizesArray]);

	const handleSizeGrid = (value) => {
		let StyleNoList = JSON.parse(sessionStorage.getItem('StyleNoList')) || [];
		let SizeGridList = JSON.parse(sessionStorage.getItem('StyleGridList')) || [];
		const sizeGridId = StyleNoList.find(grid => grid.Style_No == value);
		if (sizeGridId) {
			// Set other details
			setBuyerName(sizeGridId.Buyer_Name);
			setStyleDescription(sizeGridId.Style_Description);
			setSizeGridName(sizeGridId.Size_Grid_Name);
			setProductType(sizeGridId.Product_Type);
			setMerchantName(sizeGridId.Marchent_Name);
			setMerchantContact(sizeGridId.Marchent_Contact);
			setGenderView(sizeGridId.Gender);
			const sizeGridIdValue = SizeGridList.find(grid => grid.Size_Grid_Id == sizeGridId.Size_Grid);
			let SizeGridValue = sizeGridIdValue ? sizeGridIdValue.Size_Grid_Value : null;
			// Ensure SizeGridValue is not null or undefined
			if (SizeGridValue) {
				// Make sure to clean any previous sizes before setting new ones
				setSizesArray([]);
				handleSizesChange(SizeGridValue);
			} else {
				console.error("Size grid value is not available.");
			}
		} else {
			// Reset the fields if no matching style number is found
			setBuyerName('');
			setStyleDescription('');
			setSizeGridName('');
			setProductType('');
			setMerchantName('');
			setMerchantContact('');
			setGenderView('');
			setRows([]); // Clear existing rows
			setSizesArray([]); // Clear sizes array
		}
	};

	const handlePODetails = (e) => {
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

		if (!isValid) {
			return;
		}

		// const modifiedData = rows.map(item => {
		// 	return {
		// 		garmentColor: item.garmentColor,
		// 		destinationCountry: item.destinationCountry,
		// 		total: item.total,
		// 		...item.sizes // Spread sizes into the new object
		// 	};
		// });

		// // Now modifiedData contains the desired structure
		// console.log(modifiedData);
		const updatedRows = rows.map((row) => ({
			...row,
			isEditable: false, // Set isEditable to false before saving
		}));

		let payload = {
			"Style_No": styleNo,
			"F_PO_No": fPONo,
			"PO_No": PONo,
			"OC_No": OCNo,
			"Emb_Type": embType,
			"Print_Type": printType,
			"Washing_Type": washingType,
			"Others": others,
			"Shipment_Mode": shipmentMode,
			"Delivery_Date": deliveryDate,
			"PCD": pcd,
			"Note": note,
			"Garment_Data": JSON.stringify(updatedRows)
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
		setPrintType('')
		setPrintTypeError('')
		setOthers('')
		setShipmentMode('')
		setShipmentModeError('')
		setDeliveryDate('')
		setDeliveryDateError('')
		setPCD('')
		setPCDError('')
		setGarmentColor('#000000');
		setDestinationCountry('');
		setSizes({});
	}

	const openEditForm = (data) => {
		// Reset existing size data before editing
		setSizesArray([]);
		editFormDetails(data);
		setIsEditFormOpen(true);
	};

	const setExistingGarmentData = (data) => {
		setSizeKeys(data.length > 0 ? Object.keys(data[0].sizes) : []);
		setRows(data);
	};

	function editFormDetails(data) {
		setStyleNoError('');
		// Set all the relevant fields
		setPOId(data.PO_Id);
		setEmbType(data.Emb_Type);
		setWashingType(data.Washing_Type);
		setNote(data.Note);
		setStyleNo(data.Style_No);
		setFPONo(data.F_PO_No);
		setPONo(data.PO_No);
		setOCNo(data.OC_No);
		setPrintType(data.Print_Type);
		setOthers(data.Others);
		setShipmentMode(data.Shipment_Mode);
		setDeliveryDate(data.Delivery_Date);
		setPCD(data.PCD);
		setBuyerName(data.Buyer_Name);
		setStyleDescription(data.Style_Description);
		setSizeGridName(data.Size_Grid_Name);
		setProductType(data.Product_Type);
		setMerchantName(data.Marchent_Name);
		setMerchantContact(data.Marchent_Contact);
		setGenderView(data.Gender);

		// Parse and set garment data
		const garmentData = JSON.parse(data.Garment_Data);
		if (garmentData.length !== 0) {
			setExistingGarmentData(garmentData);
		} else {
			handleSizeGrid(data.Style_No);
		}
	}

	const closeEditForm = () => {
		setIsEditFormOpen(false);
	};

	// Delete Unit Records

	const deletePODetails = (data) => {
		if (window.confirm("Are you sure to delete the Style Entry ?")) {
			let payload = {
				"PO_Id": data.PO_Id
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

	const handleEditStyleEntry = (e, data, index) => {

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

		if (!isValid) {
			return;
		}

		const updatedRows = rows.map((row) => ({
			...row,
			isEditable: false, // Set isEditable to false before saving
		}));

		let payload = {
			"PO_Id": POId,
			"Style_No": styleNo,
			"FPO_No": fPONo,
			"PO_No": PONo,
			"OC_No": OCNo,
			"Emb_Type": embType,
			"Print_Type": printType,
			"Washing_Type": washingType,
			"Others": others,
			"Shipment_Mode": shipmentMode,
			"Delivery_Date": deliveryDate,
			"PCD": pcd,
			"Note": note,
			"Garment_Data": JSON.stringify(updatedRows)
		}

		trackPromise(styleStoreService.editPODetails({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200 && response.data.data.status == "success") {
				// alert(response.data.result)
				getPOData()
				if (data == 'save') {

					closeEditForm()
				}
				else {
					const updatedRows = [...rows];
					updatedRows[index].isEditable = !updatedRows[index].isEditable; // Toggle edit mode
					setRows(updatedRows);
				}
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
				<Button className='primary-btn mt-10' onClick={() => { setShow(true); stateValues(); setSizes({}); setRows([]); }}>
					<i className='fa fa-plus fa-white'> </i> New Order
				</Button>

				<OrderModal
					show={show}
					handleClose={handleClose}
					handlePODetails={handlePODetails}
					styleNoList={styleNoList}
					embTypeList={embTypeList}
					printTypeList={printTypeList}
					washingTypeList={washingTypeList}
					rows={rows}
					sizesArray={sizesArray}
					handleDeleteRow={handleDeleteRow}
					handleSizeGrid={handleSizeGrid}
					addNewRow={addNewRow}
					calculateTotal={calculateTotal}
					BuyerName={BuyerName}
					StyleDescription={StyleDescription}
					SizeGridName={SizeGridName}
					GenderView={GenderView}
					ProductType={ProductType}
					MerchantName={MerchantName}
					MerchantContact={MerchantContact}
					styleNo={styleNo}
					setStyleNo={setStyleNo}
					styleNoError={styleNoError}
					fPONo={fPONo}
					setFPONo={setFPONo}
					fPONoError={fPONoError}
					PONo={PONo}
					setPONo={setPONo}
					PONoError={PONoError}
					OCNo={OCNo}
					setOCNo={setOCNo}
					embType={embType}
					setEmbType={setEmbType}
					embTypeError={embTypeError}
					printType={printType}
					setPrintType={setPrintType}
					printTypeError={printTypeError}
					washingType={washingType}
					setWashingType={setWashingType}
					washingTypeError={washingTypeError}
					deliveryDate={deliveryDate}
					setDeliveryDate={setDeliveryDate}
					deliveryDateError={deliveryDateError}
					pcd={pcd}
					setPCD={setPCD}
					pcdError={pcdError}
					shipmentMode={shipmentMode}
					setShipmentMode={setShipmentMode}
					shipmentModeError={shipmentModeError}
					others={others}
					setOthers={setOthers}
					note={note}
					setNote={setNote}
					add="add"
				/>

			</div>
			<div className='col-12'>

				<PODetailsTable defaultPageSize={10} data={data} openEditForm={openEditForm} deletePODetails={deletePODetails} />

				<EditOrderModal
					isEditFormOpen={isEditFormOpen}
					closeEditForm={closeEditForm}
					styleNo={styleNo}
					styleNoList={styleNoList}
					styleNoError={styleNoError}
					handleSizeGrid={handleSizeGrid}
					setStyleNo={setStyleNo}
					BuyerName={BuyerName}
					StyleDescription={StyleDescription}
					SizeGridName={SizeGridName}
					GenderView={GenderView}
					ProductType={ProductType}
					MerchantName={MerchantName}
					MerchantContact={MerchantContact}
					fPONo={fPONo}
					setFPONo={setFPONo}
					fPONoError={fPONoError}
					PONo={PONo}
					setPONo={setPONo}
					PONoError={PONoError}
					OCNo={OCNo}
					setOCNo={setOCNo}
					embType={embType}
					setEmbType={setEmbType}
					embTypeList={embTypeList}
					embTypeError={embTypeError}
					printType={printType}
					setPrintType={setPrintType}
					printTypeList={printTypeList}
					printTypeError={printTypeError}
					washingType={washingType}
					setWashingType={setWashingType}
					washingTypeList={washingTypeList}
					washingTypeError={washingTypeError}
					deliveryDate={deliveryDate}
					setDeliveryDate={setDeliveryDate}
					deliveryDateError={deliveryDateError}
					pcd={pcd}
					setPCD={setPCD}
					pcdError={pcdError}
					shipmentMode={shipmentMode}
					setShipmentMode={setShipmentMode}
					shipmentModeError={shipmentModeError}
					others={others}
					setOthers={setOthers}
					note={note}
					setNote={setNote}
					rows={rows}
					setRows={setRows}
					addNewRow={addNewRow}
					handleEditRow={handleEditRow}
					handleDeleteRow={handleDeleteRow}
					handleEditStyleEntry={handleEditStyleEntry}
					calculateTotal={calculateTotal}
					sizeKeys={sizeKeys}
				/>

			</div>
		</div>
	</>
}