import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { trackPromise } from 'react-promise-tracker';
import seasonService from '../../../../../../services/seasonService';
import SeasonTable from './SeasonTable';

export default function Season() {
    const [season, setSeason] = useState("");
    const [show, setShow] = useState(false);
    const [seasonData, setSeasonData] = useState([]);
    const [seasonDataId, setSeasonDataId] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSeason(""); // Clear season input
        setSeasonDataId(null); // Reset ID for add mode
    };

    const handleForm = () => {
        setShow(true);
    };

    const handleSeason = () => {
        let payload = {
            "Season_Name": season,
            ...(seasonDataId && { "id": seasonDataId }) // Add ID if editing
        };

        const request = seasonDataId
            ? seasonService.updateSeason({ "data": [payload] }) // Edit request
            : seasonService.saveSeason({ "data": [payload] }); // Add request

        trackPromise(
            request
                .then(response => {
                    if (response.status === 200) {
                        alert(seasonDataId ? "Season updated successfully" : "Season added successfully");
                        handleClose();
                        getSeason();
                    } else {
                        alert(response.data.result);
                    }
                })
                .catch(error => {
                    alert(error.response?.data?.error || error.message);
                })
        );
    };

    const getSeason = () => {
        trackPromise(
            seasonService.getSeason().then(response => {
                setSeasonData(response.data.season);
            })
        );
    };

    useEffect(() => {
        getSeason();
    }, []);

    const deleteSeasonType = (data) => {
        if (window.confirm("Are you sure to delete the Season Type?")) {
            let payload = { "id": data.id };
            trackPromise(
                seasonService.deleteSeasonType({ "data": [payload] })
                    .then(response => {
                        if (response.status === 200) {
                            getSeason();
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(error => {
                        alert(error.response?.data?.error || error.message);
                    })
            );
        }
    };

    const openEditForm = (season) => {
        setSeason(season.Season_Name); // Set season name for editing
        setSeasonDataId(season.id); // Set ID for edit mode
        setShow(true);
    };

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='h1'> Season </h1>
                </div>
                <div className='col-4 text-right'>
                    <Button className='primary-btn mt-10' onClick={handleForm}>
                        <i className='fa fa-plus fa-white'> </i> Season
                    </Button>
                    <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>{seasonDataId ? "Edit Season Type" : "Add New Season Type"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <MDBInput
                                                wrapperClass='mb-3'
                                                type='text'
                                                required
                                                label='Season Name'
                                                tabIndex="3"
                                                onChange={(e) => setSeason(e.target.value)}
                                                value={season}
                                                name='season'
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
                            <Button variant="primary" onClick={handleSeason} style={{ width: '15%' }}>
                                {seasonDataId ? "Update" : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='col-12'>
                    <SeasonTable data={seasonData} openEditForm={openEditForm} deleteSeasonType = {deleteSeasonType} />
                </div>
            </div>
        </div>
    );
}
