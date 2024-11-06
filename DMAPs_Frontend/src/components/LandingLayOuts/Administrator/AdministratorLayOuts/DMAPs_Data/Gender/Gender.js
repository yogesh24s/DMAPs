import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import genderService from '../../../../../../services/genderService';
import { trackPromise } from 'react-promise-tracker';
import GenderTable from './GenderTable';

export default function Gender() {
    const [show, setShow] = useState(false);
    const [gender, setGender] = React.useState('');
    const [genderData, setGenderData] = useState([])

    const handleClose = () => setShow(false);

    function handleForm() {
        // settingValuesToEmpty()
        setShow(true)
    }


    // function handleForm () {

    // }
    function handleGender() {
        debugger
        let payload = {
            "gender": gender,

        }
        debugger
        trackPromise(
            new Promise((resolve, reject) => {
                const result = genderService.saveGender({ "data": [payload] });
                if (result) resolve(result);
                else reject(new Error("genderService.saveGender returned undefined"));
            })
                .then(response => {
                    if (response.status === 200) {
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

    const getGender = () => {
        trackPromise(
            genderService.getGender().then((response) => {
                debugger
                setGenderData(response.data.gender)
            })
        );
    }
    useEffect(() => {
        getGender()
    }, [])

    return (
        <div className='row'>
            <div className='col-8'>
                <h1 className='h1'> Gender </h1>
            </div>
            <div className='col-4 text-right'>
                <Button className='primary-btn mt-10' onClick={handleForm}>
                    <i className='fa fa-plus fa-white'> </i> Gender
                </Button>
                <Modal show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-50w"
                    backdrop="static"
                    keyboard={false}>

                    <Modal.Header closeButton style={{ color: 'white' }}>
                        <Modal.Title> Add New Gender </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleGender}>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Gender</label>
                                    <div className="mb-3">
                                        <MDBRadio
                                            name='gender'
                                            id='male'
                                            label='Male'
                                            value='male'
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                        <MDBRadio
                                            name='gender'
                                            id='female'
                                            label='Female'
                                            value='female'
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose} style={{ width: '15%' }}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleGender} style={{ width: '15%' }}>
                            Save
                        </Button>
                    </Modal.Footer>

                </Modal>
            </div>
            <div className='col-12'>
                <GenderTable data={genderData} />

            </div>
        </div>
    )
}
