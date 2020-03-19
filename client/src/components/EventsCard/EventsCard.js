import React, { useState } from 'react';
import { Card, Modal, ModalBody } from 'react-bootstrap';
import './EventsCard.css';
import PropTypes from 'prop-types';
import {
	AwesomeButton
  } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";


const EventsCard = (props) => {
	const [modal, setModal] = useState(false);
	const [likedModal, setLikedModal] = useState(false);
	const {
		eventCategory = '',
		description = '',
		startDate = '',
		endDate = '',
		title = '',
		address = '',
		nameOfPlace = '',
		duration = '0',
		eventImg = '',
		isLiked = true,
		eventInfo
	} = props;

	async function addEvent() {
		await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/graphql' },
			body: `mutation{
                    addEvents(request_id:"${eventInfo[0]}",
                    event_category:"${eventInfo[1]}", description:"${eventInfo[2]}",
                    duration:"${eventInfo[3]}", start_date:"${eventInfo[4]}",
                    end_date:"${eventInfo[5]}", title:"${eventInfo[6]}",
                    labels:"${eventInfo[7]}", address:"${eventInfo[8]}",
                    place_type:"${eventInfo[9]}", name_of_place:"${eventInfo[10]}",
                    image:"${eventInfo[11]}")
					{   request_id,
						event_category,
						description,
						duration,
						start_date,
						end_date,
						title,
						labels,
						address,
						place_type,
						name_of_place
					}
				}`
		});
	}

	const handleLike = () => {
		addEvent();
		setLikedModal(true);
	};

	/**
     * Dates are transformed to English format
     */
	const getDateText = (date) => {
		const dateObject = new Date(date);
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
			'Thursday', 'Friday', 'Saturday'];
		const months = ['January', 'February', 'March', 'April',
			'May', 'June', 'July', 'August', 'September',
			'October', 'November', 'December'];
		const dateText = `${days[dateObject.getDay()]} ${months[dateObject.getMonth()]
		} ${dateObject.getDate()} ${dateObject.getFullYear()}`;

		return dateText;
	};

	/**
     *
     * This method basically adds an 's' to the duration unit
     * in case the value is more than. This allows the sentence
     * to be grammatically correct
     */
	const sentenceToDisplay = (durationToDisplay, monthOrDaysOrHours) => {
		const truncatedDuration = Math.trunc(durationToDisplay);
		if (truncatedDuration > 1) {
			return `${truncatedDuration} ${monthOrDaysOrHours}s`;
		}
		return `${truncatedDuration} ${monthOrDaysOrHours}`;
	};

	/**
     * The duration is given in seconds.
     * This method converts to duration to an appropriate duration unit
     */
	const getDuration = () => {
		let durationToDisplay = duration / 60;

		if (durationToDisplay > 60) {
			durationToDisplay /= 60;
			if (durationToDisplay > 24) {
				durationToDisplay /= 24;
				if (durationToDisplay > 30) {
					durationToDisplay /= 30;
					return sentenceToDisplay(durationToDisplay, 'month');
				}
				return sentenceToDisplay(durationToDisplay, 'day');
			}
			return sentenceToDisplay(durationToDisplay, 'hour');
		}
		return sentenceToDisplay(durationToDisplay, 'minute');
	};


	const InfoModal = () => {
		return (
			<Modal
				show={modal}
				onHide={() => setModal(false)}
				centered
				id="modal-info"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						<h2>{title}</h2>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<img alt="Modal pic" variant="top" src={eventImg} className="more-info-img" />
					<div className="card-body">
						{ !isLiked && (
							<div className="modal-like-button">
								<AwesomeButton type="secondary" size="small" centered onPress={handleLike}
								>Like</AwesomeButton>
							</div>
						)}
						<p className="date"><b>Start Date: </b>{getDateText(startDate)}</p>
						<p className="date"><b>End Date:</b> {getDateText(endDate)}</p>
						{address !== '' && (
							<p>
								<b>Address: </b>{address}
							</p>
						)}
						{nameOfPlace !== '' && (
							<p>
								<b>Venue Name: </b>{nameOfPlace}
							</p>
						)}
						{(getDuration().charAt(0) !== '0') && (
							<p>
								<b>Duration: </b>{getDuration()}
							</p>
						)}
						{description !== '' && (
							<p className="body-content-modal">
								<b>Description: </b>{description}
							</p>
						)}
					</div>
				</Modal.Body>
			</Modal>
		);
	};

	const LikedModal = () => {
		return (
			<Modal
				show={likedModal}
				onHide={() => setLikedModal(false)}
				centered
				id="modal-favorites"

			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						<h2>Added To your Favorites !!</h2>
					</Modal.Title>
				</Modal.Header>
				<ModalBody>
					<img alt="Alert" src={require('../../eventsImages/addedToFavorites.gif')} />
				</ModalBody>
			</Modal>

		);
	};

	const EventCard = () => {
		return (
			<Card className="card" border="dark">
				<Card.Img variant="top" src={eventImg} style={{ height: '21em' }} />
				<div className="card-body">
					<p className="card-category"><b>{eventCategory.charAt(0).toUpperCase() + eventCategory.slice(1, -1)}</b></p>
					<p className="date">{getDateText(startDate)}</p>
					<h2 className="card-title">{title}</h2>
					<AwesomeButton type="secondary" size="medium" onPress={() => setModal(true)}
					>Find out more</AwesomeButton>
					{ !isLiked && (
						<AwesomeButton type="secondary" size="small" onPress={handleLike} style={{float: 'right'}}
						>Like</AwesomeButton>
					)}
				</div>
			</Card>
		);
	};

	return (
		<>
			<EventCard />
			<InfoModal />
			<LikedModal />
		</>
	);
};


EventsCard.propTypes = {
	eventCategory: PropTypes.string,
	description: PropTypes.string,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	title: PropTypes.string,
	address: PropTypes.string,
	nameOfPlace: PropTypes.string,
	duration: PropTypes.string,
	isLiked: PropTypes.bool,
	eventInfo: PropTypes.instanceOf(Array)
};

export default EventsCard;
