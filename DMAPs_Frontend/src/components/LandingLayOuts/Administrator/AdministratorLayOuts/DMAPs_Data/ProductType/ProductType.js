import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import productTypeService from '../../../../../../services/productTypeService';
import ProductTypeTable from './ProductTypeTable';

export default function ProductType() {
    const [show, setShow] = useState(false);
    const [productType, setProductType] = React.useState('');
    const handleClose = () => setShow(false);
    const [productTypeData, setProductTypeData] = useState([])


    const handleForm =() => {
        setShow(true)
    }

    const handleProductType = () => {
        debugger
        let payload = {
			"product_type": productType,
			
		}
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = productTypeService.saveProductType({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error(""));
            })
            .then(response => {
                if (response.status === 200) {
                    alert("Proudct added successfully")
                    handleClose();
                } else {
                    alert(response.data.result);
                }
            })
            .catch(error => {
                alert(error.response?.data?.error || error.message);
            })
        );
    }

    const getProductType = () => {
		trackPromise(
			productTypeService.getProductType().then((response) => {
                debugger
				setProductTypeData(response.data.product_type)
			})
		);
	}
	useEffect(() => {
		getProductType()
	}, [])
    console.log(productTypeData);
    
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
                <Modal show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-50w"
                    backdrop="static"
                    keyboard={false}>

                    <Modal.Header closeButton style={{ color: 'white' }}>
                        <Modal.Title> Add New Product Type </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleProductType}>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Product Type</label>
                                    <div className="mb-3">
                                    <MDBInput wrapperClass='mb-3' type='text' required label='Product Type' tabindex="3" onChange={(e) => { setProductType(e.target.value) }} value={productType} name='productType' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
						<Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleProductType} style={{ width: '15%' }}>
							Save
						</Button>
					</Modal.Footer>

                </Modal>
            </div>
            <div className='col-12'>
            <ProductTypeTable data={productTypeData}  />

            </div>
        </div>
    </div>
  )
}
