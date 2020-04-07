import React, { useState } from 'react';
import { Card, Modal, ModalBody } from 'react-bootstrap';
import './EventsCard.css';
import PropTypes from 'prop-types';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';


const EventsCard = (props) => {
	const [modal, setModal] = useState(false);
	const [likedModal, setLikedModal] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [removedModal, setRemovedModal] = useState(false);
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
		requestId = '',
		eventInfo
	} = props;

	/**
	 * This method uses arrays because some of the information are
	 * not passed as props. The array is the result from calling the
	 * event api
	 */
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

	async function removeEvent() {
		const body = {
			requestId,
			title
		};
		await fetch(`${process.env.REACT_APP_BACKEND}deleteEvent`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
	}

	const handleLike = () => {
		addEvent();
		setLikedModal(true);
	};

	const handleDelete = () => {
		removeEvent();
		setRemoved(true);
		setRemovedModal(true);
	};


	const handleFavoriteModals = () => {
		setLikedModal(false);
		setRemovedModal(false);
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


	/**
	 * This modal shows all the information regarding an event
	 */
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
					<img alt="Modal pic" id="image_with_shadow" variant="top" src={eventImg} className="more-info-img" />
					<div className="card-body">
						{ !isLiked
							? (
								<div className="modal-like-button">
									<AwesomeButton
										type="secondary"
										size="small"
										centered
										onPress={handleLike}
									>Likes
									</AwesomeButton>
								</div>
							)
							: (
								<div className="modal-like-button">
									<AwesomeButton
										type="secondary"
										size="small"
										centered
										onPress={handleDelete}
									>
										<img alt="like button" src={require('../../assets/images/eventsImages/broken-heart.png')} style={{ height: '3em' }} />
									</AwesomeButton>
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

	/**
	 * This modal is notification for when an event is liked or removed
	 */
	const LikedModal = () => {
		return (
			<Modal
				show={likedModal || removedModal}
				onHide={handleFavoriteModals}
				centered
				id="modal-notification"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-lg">
						{likedModal
							? <h2>Added To your Favorites !!</h2>
							: (
								<h2>Removed from your favorites
									<span role="img" aria-label="sad">😭</span>
								</h2>
							)}
					</Modal.Title>
				</Modal.Header>
				<ModalBody style={{ textAlign: 'center' }}>
					{likedModal
						? <img alt="Alert" src={require('../../assets/images/eventsImages/addedToFavorites.gif')} />
						: <img alt="Alert" src={require('../../assets/images/eventsImages/sad-monkey.gif')} />}
				</ModalBody>
			</Modal>

		);
	};

	/**
	 * This is the main component. It's the cards displayed on the main Event page
	 */
	const EventCard = () => {
		return (
			(!removed
			&& (
				<Card className="card" id="eventcard" border="dark">
					<Card.Img variant="top" id="image_with_shadow" src={eventImg} style={{ height: '21em' }} />
					<div className="card-body" id="cardbody">
						<p className="card-category"><b>{eventCategory.charAt(0).toUpperCase() + eventCategory.slice(1, -1)}</b></p>
						<p className="date">{getDateText(startDate)}</p>
						<h2 className="card-title">{title}</h2>
						<AwesomeButton
							type="secondary"
							size="medium"
							onPress={() => setModal(true)}
						>Find out more
						</AwesomeButton>
						{ !isLiked
							? (
								<AwesomeButton
									type="secondary"
									size="small"
									onPress={handleLike}
									style={{ float: 'right' }}
								>
									<img alt="like button" src={require('../../assets/images/eventsImages/heart.png')} style={{ height: '3em' }} />
								</AwesomeButton>
							)
							: (
								<AwesomeButton
									type="secondary"
									size="small"
									onPress={handleDelete}
									style={{ float: 'right' }}
								>
									<img alt="like button" src={require('../../assets/images/eventsImages/broken-heart.png')} style={{ height: '3em' }} />
								</AwesomeButton>
							)}
					</div>
				</Card>
			))
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
	requestId: PropTypes.string,
	eventInfo: PropTypes.instanceOf(Array)
};

export default EventsCard;
