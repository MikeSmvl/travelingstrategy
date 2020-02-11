import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './SubscriptionModal.css';
import DatePicker from 'react-date-picker';
import SweetAlert from 'react-bootstrap-sweetalert';


const SubscriptionModal = (props) => {
	const [date, setDate] = useState(new Date());
	const [email, setEmail] = useState('');
	const [isEmailValid, setEmailValid] = useState(false);
	const today = date;
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		city = '',
		...rest
	} = props;

	const emailChange = (event) => {
		setEmail(event.target.value);
	};

	async function addUser() {
		await fetch('http://localhost:4000/graphql', {
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

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		addUser();
		setEmailValid(true);
	};

	return (
		<>
			<Modal show={show} onHide={handleClose} centered className="modal-subscription">
				<Modal.Header closeButton>
					<Modal.Title>Subscribe for a reminder Email</Modal.Title>
				</Modal.Header>

				<Form className="form-modal" onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" value={email} onChange={emailChange} />
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label>Departure date</Form.Label>
							<DatePicker minDate={today} value={date} onChange={(newDate) => setDate(newDate)} />
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
				{isEmailValid && (
					<SweetAlert
						success
						title="Enjoy your trip!"
						onConfirm={handleClose}
						customButtons={(
							<Button variant="outline-primary" onClick={handleClose}>
                            Sweet!
							</Button>
						)}
					>
                    You&aposll receive an email!
					</SweetAlert>
				)}
			</Modal>
		</>
	);
};

SubscriptionModal.propTypes = {
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	city: PropTypes.string
};


export default SubscriptionModal;
