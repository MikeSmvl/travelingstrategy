import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './SubscriptionModal.css';
import DatePicker from 'react-date-picker';


const SubscriptionModal = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const today = startDate;
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		...rest
	} = props;
	return (
		<>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Subscribe for a reminder Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="form-modal">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Departure date</Form.Label>
                        <DatePicker minDate={today} value={startDate} onChange={startDate => setStartDate(startDate)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
                Maybe Later
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
                Join Us
            </Button>
            </Modal.Footer>
        </Modal>
        </>
	);
};

SubscriptionModal.propTypes = {
    show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func
};


export default SubscriptionModal;
