import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import productTypeService from '../../../../../../services/productTypeService';
import ProductTypeTable from './ProductTypeTable';

export default function ProductType() {
    const [show, setShow] = useState(false);
    const [productType, setProductType] = useState('');
    const [productTypeId, setProductTypeId] = useState(null); // Track ID for editing
    const [productTypeData, setProductTypeData] = useState([]);
    const isEditMode = productTypeId !== null; // Determine if we're in edit mode
	const [selectedProductTypeError, setSelectedProductTypeError] = useState('');


    const handleClose = () => {
        setShow(false);
        setProductType(''); // Clear form
        setProductTypeId(null); // Exit edit mode
    };

    const handleForm = () => {
        setShow(true);
    };




    const handleProductType = (e) => {
		e.preventDefault();
		
		let isValid = true;

		if (!productType) {
			setSelectedProductTypeError('Product Type is required');
			isValid = false;
		} else {
			setSelectedProductTypeError('');
		}


		if (!isValid) {
			return;
		}

		let payload = {
            "product_type_id": productTypeId,
			"product_type" : productType
		}

        console.log('payload', payload)

		trackPromise(productTypeService.editProductType({ "data": [payload] }).then((response) => {
			//check login response
			if (response.status === 200) {
				// alert(response.data.result)
				getProductType()
				handleClose()
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


    const getProductType = () => {
        trackPromise(
            productTypeService.getProductType().then((response) => {
                setProductTypeData(response.data.product_type);
            })
        );
    };

    useEffect(() => {
        getProductType();
    }, []);

    const openEditForm = (product) => {
        
        console.log('product', product)
        setProductType(product.Product_Type);
        setProductTypeId(product.id); // Set ID for edit mode
        setShow(true);
    };

    const deleteProduct = (data) => {
        if (window.confirm("Are you sure to delete the  Product Type?")) {
            const payload = { "id": data.id };
            trackPromise(
                productTypeService.deleteProductType({ "data": [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getProductType();
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(error => {
                        alert(error.response?.data?.error || error.message);
                    })
            );
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Product Type </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Product Type
                    </Button>
                    <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" backdrop="static" keyboard={false}>
                        <Modal.Header closeButton style={{ color: 'white' }}>
                            <Modal.Title> {isEditMode ? "Edit Product Type" : "Add New Product Type"} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => { e.preventDefault(); handleProductType(); }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        {/* <label>Product Type</label> */}
                                        <MDBInput
                                            wrapperClass='mb-3'
                                            type='text'
                                            required
                                            label='Product Type'
                                            onChange={(e) => { setProductType(e.target.value); }}
                                            value={productType}
                                            name='productType'
                                        />
                                    </div>
									{selectedProductTypeError && <p style={{ color: 'red' }}>{selectedProductTypeError}</p>}

                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>Cancel</Button>
                            <Button variant="primary" onClick={handleProductType} style={{ width: '15%' }}>
                            {productTypeId ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <ProductTypeTable data={productTypeData} openEditForm={openEditForm}   deleteProduct= {deleteProduct}/>
                </div>
            </div>
        </div>
    );
}
