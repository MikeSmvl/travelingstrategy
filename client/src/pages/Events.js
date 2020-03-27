import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap/';
import { Redirect } from 'react-router-dom';
import Client from 'predicthq';
import '../App.css';
import Unsplash, { toJson } from 'unsplash-js';
import { addMyEvents, addApiEvents, getButtonContent, emailEvents } from '../utils/eventsTools';
import {AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Toast from 'react-bootstrap/Toast'

const unsplash = new Unsplash({ accessKey: 'sgB9gtzmmpHYIb9_L152xcAfUphuwKry84UML9bMv9M' });
const client = new Client({ access_token: '3ezKmlrAYq3QMDt3d-wZh2q-oBVt57U0c_CfJiax' });
const phqEvents = client.events;


function Events({
	requestId,
	latitude,
	longitude
}) {
	const [category, setCategory] = useState('likes');
	const [savedEvents, setSavedEvents] = useState([]);
	const [eventsForCategories, setEventsForCategories] = useState([]);
	const [conferences, setConferences] = useState([]);
	const [expos, setExpos] = useState([]);
	const [concerts, seConcerts] = useState([]);
	const [festivals, setFestivals] = useState([]);
	const [performingArts, setPerformingArts] = useState([]);
	const [sports, setSports] = useState([]);
	const [community, setCommunity] = useState([]);
	const [conferencesCalled, setConferencesCalled] = useState(false);
	const [exposCalled, setExposCalled] = useState(false);
	const [concertsCalled, setConcertsCalled] = useState(false);
	const [festivalsCalled, setFestivalsCalled] = useState(false);
	const [performingArtsCalled, setPerformingArtsCalled] = useState(false);
	const [sportsCalled, setSportsCalled] = useState(false);
	const [communityCalled, setCommunityCalled] = useState(false);
	const [toggled, setToggled] = useState(true);
	const [navbarClass, setNavbarClass] = useState('sidebar sidebar--expanded');
	const [mainContentClass, setMainContentClass] = useState('main-content main-content--expanded');
	const [images, setImages] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [show, setShow] = useState(false);


	useEffect(() => {
		async function getToken() {
			await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, { credentials: 'include' })
				.then((res) => res.json())
				.then((res) => {
					res.email
                && res.email !== null
                && setEmail(res.email);
				})
				.catch((error) => {
					// if status code 401...
					setRedirect(true);
				});
		}
		// Api for getting different images for different categories
		async function getImages() {
			let array = [];
			if (category !== 'likes') {
				array = await unsplash.search.photos(category, 1, 100, { orientation: 'landscape' })
					.then(toJson);
				return array.results;
			}
			return array;
		}

		// Basic event search using category as parameter. By default, it will return the first ten events.
		async function searchByCategory() {
			const withinParam = `${latitude},${longitude}`;
			const searchResults = await phqEvents.search({
				'location_around.origin': withinParam,
				category
			});

			return searchResults.result.results;
		}
		/**
         * This function checks if the events for a category were already requested
         * in order to provide faster service and limit api calls
         * */
		async function eventsByCategoryToDispaly() {
			let arrayOfEvents = [];
			switch (category) {
				case 'conferences':
					if (!conferencesCalled) {
						arrayOfEvents = await searchByCategory();
						setConferences(arrayOfEvents);
					} else {
						arrayOfEvents = conferences;
					}
					setConferencesCalled(true);
					break;
				case 'expos':
					if (!exposCalled) {
						arrayOfEvents = await searchByCategory();
						setExpos(arrayOfEvents);
					} else {
						arrayOfEvents = expos;
					}
					setExposCalled(true);
					break;
				case 'concerts':
					if (!concertsCalled) {
						arrayOfEvents = await searchByCategory();
						seConcerts(arrayOfEvents);
					} else {
						arrayOfEvents = concerts;
					}
					setConcertsCalled(true);
					break;
				case 'festivals':
					if (!festivalsCalled) {
						arrayOfEvents = await searchByCategory();
						setFestivals(arrayOfEvents);
					} else {
						arrayOfEvents = festivals;
					}
					setFestivalsCalled(true);
					break;
				case 'performing-arts':
					if (!performingArtsCalled) {
						arrayOfEvents = await searchByCategory();
						setPerformingArts(arrayOfEvents);
					} else {
						arrayOfEvents = performingArts;
					}
					setPerformingArtsCalled(true);
					break;
				case 'sports':
					if (!sportsCalled) {
						arrayOfEvents = await searchByCategory();
						setSports(arrayOfEvents);
					} else {
						arrayOfEvents = sports;
					}
					setSportsCalled(true);
					break;
				case 'community':
					if (!communityCalled) {
						arrayOfEvents = await searchByCategory();
						setCommunity(arrayOfEvents);
					} else {
						arrayOfEvents = community;
					}
					setCommunityCalled(true);
					break;
				default:
			}
			return arrayOfEvents;
		}

		async function fetchEvents() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
                        eventsForRequest(request_id:"${requestId}"){
                            request_id,
                            event_category,
							description,
							duration,
							start_date,
							end_date,
							title,
							labels,
							address,
							place_type,
							name_of_place,
							image
                            }
                    }
                    `
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.eventsForRequest
					&& res.data.eventsForRequest.length !== 0
					&& setSavedEvents(res.data.eventsForRequest);
				});
		}

		async function setEventsToDisplay() {
			const eventsByCategory = await eventsByCategoryToDispaly();
			setEventsForCategories(eventsByCategory);
		}

		async function setImagesForCategory() {
			const imagesArray = await getImages();
			setImages(imagesArray);
		}

		fetchEvents();
		setEventsToDisplay();
		setImagesForCategory();
		getToken();
	},
	[
		category,
		conferences,
		expos,
		concerts,
		festivals,
		performingArts,
		sports,
		community,
		conferencesCalled,
		exposCalled,
		concertsCalled,
		festivalsCalled,
		performingArtsCalled,
		sportsCalled,
		communityCalled,
		latitude,
		longitude,
		email,
		requestId

	]);

	const expandNavBar = (event) => {
		if (toggled) {
			setNavbarClass('sidebar');
			setMainContentClass('main-content');
			setToggled(false);
		} else {
			setNavbarClass('sidebar sidebar--expanded');
			setMainContentClass('main-content main-content--expanded');
			setToggled(true);
		}
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div id="events-section">
			<Row>
				<div className={navbarClass}>
					<span className="shape" />
					<span className="shape" />
					<div className="categories-btn">
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="likes" onClick={expandNavBar}>
								{getButtonContent('Hamburger')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="likes" onClick={() => setCategory('likes')}>
								{getButtonContent('Favourites')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="conferences" onClick={() => setCategory('conferences')}>
								{getButtonContent('Conferences')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="expos" onClick={() => setCategory('expos')}>
								{getButtonContent('Expos')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="concerts" onClick={() => setCategory('concerts')}>
								{getButtonContent('Concerts')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="festivals" onClick={() => setCategory('festivals')}>
								{getButtonContent('Festivals')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="performing-arts" onClick={() => setCategory('performing-arts')}>
								{getButtonContent('Performing-arts')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="sports" onClick={() => setCategory('sports')}>
								{getButtonContent('Sports')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="community" onClick={() => setCategory('community')}>
								{getButtonContent('Community')}
							</Button>
						</div>
					</div>
				</div>
				<Toast className="events-toast" onClose={() => setShow(false)} show={show} delay={3000} autohide>
					<Toast.Header>
						<strong className="mr-auto" style={{color:'green'}}>Success!</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>An email with your favourited events has been emailed to you!</Toast.Body>
				</Toast>
				<section className={mainContentClass} style={{ marginTop: '4%' }}>
					<div>
					{ category === 'likes'
						&& (
							<OverlayTrigger
								overlay={
									<Popover
										id="popover-positioned-bottom">
											Receive an email of your favourite events
									</Popover>
									}
							>
								<div className="email-btn"
										style={{ float: 'right' }}>
									<AwesomeButton
										type="secondary"
										size="small"
										value="likes"
										onPress={() => {emailEvents(savedEvents); setShow(true)}}
									>
										<img alt="Icon" src={require(`../eventsImages/Email Favourites.png`)} style={{height:'2em'}}></img>
									</AwesomeButton>
								</div>
							</OverlayTrigger>
						)}
					</div>
				</section>
				<section className={mainContentClass}>
					<div className="app-card-list" id="app-card-list">
						{category === 'likes'
							? addMyEvents(savedEvents, requestId)
							: addApiEvents(eventsForCategories, requestId, images)}
					</div>
				</section>
			</Row>
		</div>
	);
}

export default Events;
