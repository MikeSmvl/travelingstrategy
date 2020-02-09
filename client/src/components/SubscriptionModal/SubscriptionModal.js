import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './SubscriptionModal.css';
import DatePicker from 'react-date-picker';



const SubscriptionModal = (props) => {
    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const today = date;
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		...rest
    } = props;

    const emailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        addUser()
    };

    async function addUser() {
        await fetch('http://localhost:4000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/graphql' },
            body: `mutation{
                    addSubscriber(email:"${email}", date:"${date}") {
                          email,
                          departure_date
                      }
                }`
        });
    }

	return (
		<>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Subscribe for a reminder Email</Modal.Title>
            </Modal.Header>

            <Form className="form-modal" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={emailChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Departure date</Form.Label>
                    <DatePicker minDate={today} value={date} onChange={date => setDate(date)} />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Maybe Later
                </Button>
                <Button variant="outline-primary" type="submit">
                    Join Us
                </Button>
                </Modal.Footer>
            </Form>
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
