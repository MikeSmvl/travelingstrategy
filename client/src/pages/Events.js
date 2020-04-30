import React, {useState, useEffect} from 'react';
import {Button, Row, Popover, OverlayTrigger, Toast} from 'react-bootstrap/';
import {Redirect} from 'react-router-dom';
import Client from 'predicthq';
import Unsplash, {toJson} from 'unsplash-js';
import './Events.css';
import {AwesomeButton} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import {addMyEvents, addApiEvents, emailEvents} from '../utils/eventsTools';

const unsplash = new Unsplash({
	accessKey: 'sgB9gtzmmpHYIb9_L152xcAfUphuwKry84UML9bMv9M',
});
const client = new Client({
	access_token: '3ezKmlrAYq3QMDt3d-wZh2q-oBVt57U0c_CfJiax',
});
const phqEvents = client.events;

function Events({requestId, latitude, longitude}) {
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
	const [mainContentClass, setMainContentClass] = useState(
		'main-content main-content--expanded'
	);
	const [images, setImages] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [email, setEmail] = useState('');
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Favourites');
	const [faveContent, setFaveContent] = useState('None');
	document.body.classList.add('event-body');

	useEffect(() => {
		setFaveContent(addMyEvents(savedEvents, requestId));
	}, [savedEvents, requestId]);

	useEffect(() => {
		async function getToken() {
			await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, {
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((res) => {
					res.email && res.email !== null && setEmail(res.email);
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
				array = await unsplash.search
					.photos(category, 1, 100, {orientation: 'landscape'})
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
				category,
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
				case 'likes':
					setTitle('Favourites');
					break;
				case 'conferences':
					setTitle('Conferences');
					if (!conferencesCalled) {
						arrayOfEvents = await searchByCategory();
						setConferences(arrayOfEvents);
					} else {
						arrayOfEvents = conferences;
					}
					setConferencesCalled(true);
					break;
				case 'expos':
					setTitle('Expos');
					if (!exposCalled) {
						arrayOfEvents = await searchByCategory();
						setExpos(arrayOfEvents);
					} else {
						arrayOfEvents = expos;
					}
					setExposCalled(true);
					break;
				case 'concerts':
					setTitle('Concerts');
					if (!concertsCalled) {
						arrayOfEvents = await searchByCategory();
						seConcerts(arrayOfEvents);
					} else {
						arrayOfEvents = concerts;
					}
					setConcertsCalled(true);
					break;
				case 'festivals':
					setTitle('Festivals');
					if (!festivalsCalled) {
						arrayOfEvents = await searchByCategory();
						setFestivals(arrayOfEvents);
					} else {
						arrayOfEvents = festivals;
					}
					setFestivalsCalled(true);
					break;
				case 'performing-arts':
					setTitle('Performing Arts');
					if (!performingArtsCalled) {
						arrayOfEvents = await searchByCategory();
						setPerformingArts(arrayOfEvents);
					} else {
						arrayOfEvents = performingArts;
					}
					setPerformingArtsCalled(true);
					break;
				case 'sports':
					setTitle('Sports');
					if (!sportsCalled) {
						arrayOfEvents = await searchByCategory();
						setSports(arrayOfEvents);
					} else {
						arrayOfEvents = sports;
					}
					setSportsCalled(true);
					break;
				case 'community':
					setTitle('Community');
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
				headers: {'Content-Type': 'application/json'},
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
                    `,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.eventsForRequest &&
						res.data.eventsForRequest.length !== 0 &&
						setSavedEvents(res.data.eventsForRequest);
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
	}, [
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
		requestId,
		savedEvents,
	]);

	const expandNavBar = (event) => {
		console.log(toggled);
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
		return <Redirect to='/' />;
	}

	function getButtonContent(category) {
		if (toggled) return <>{category}</>;
		else
			switch (category) {
				case 'Favourites':
					return (<img width="35" height="35" src={require('../assets/images/eventsImages/heart.png')} class="loaded" />)
				case 'Conferences':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/1935/1935157.svg" class="loaded" />)
				case 'Expos':
					return (<img width="32" height="32" src="https://image.flaticon.com/icons/svg/2793/2793709.svg" class="loaded" />)
				case 'Concerts':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/1941/1941070.svg" class="loaded" />)
				case 'Festivals':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/2138/2138882.svg" class="loaded" />)
				case 'Performing Arts':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/1413/1413579.svg" class="loaded" />)
				case 'Sports':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/420/420105.svg" class="loaded" />)
				case 'Community':
					return (<img width="30" height="30" src="https://image.flaticon.com/icons/svg/829/829141.svg" class="loaded" />)
			}
	}

	return (
		<div id='events-section'>
			<Row>
				<div className={navbarClass}>
					<div className='categories-btn'>
						<Button
							className='expanding'
							variant='outline-primary'
							style={{width: '100%'}}
							value='likes'
							onClick={expandNavBar}>
							{toggled ? (
								<img
									width='35'
									height='35'
									src='https://image.flaticon.com/icons/svg/481/481146.svg'
									class='loaded'
								/>
							) : (
								<img
									width='35'
									height='35'
									src='https://image.flaticon.com/icons/svg/481/481143.svg'
									class='loaded'
								/>
							)}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='likes'
							onClick={() => setCategory('likes')}>
							{getButtonContent('Favourites')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='conferences'
							onClick={() => setCategory('conferences')}>
							{getButtonContent('Conferences')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='expos'
							onClick={() => setCategory('expos')}>
							{getButtonContent('Expos')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='concerts'
							onClick={() => setCategory('concerts')}>
							{getButtonContent('Concerts')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='festivals'
							onClick={() => setCategory('festivals')}>
							{getButtonContent('Festivals')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='performing-arts'
							onClick={() => setCategory('performing-arts')}>
							{getButtonContent('Performing Arts')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='sports'
							onClick={() => setCategory('sports')}>
							{getButtonContent('Sports')}
						</Button>
						<Button
							className='choice-btn'
							variant='outline-primary'
							style={{width: '100%'}}
							value='community'
							onClick={() => setCategory('community')}>
							{getButtonContent('Community')}
						</Button>
					</div>
				</div>
				<Toast
					className='events-toast'
					onClose={() => setShow(false)}
					show={show}
					delay={3000}
					autohide>
					<Toast.Header>
						<strong className='mr-auto' style={{color: 'green'}}>
							Success!
						</strong>
						<small>Just now</small>
					</Toast.Header>
					<Toast.Body>
						An email with your favourited events has been emailed to you!
					</Toast.Body>
				</Toast>
				<section className={mainContentClass}>
					<div className='page-title'>
						<h2>{title}</h2>
					</div>
					<div>
						<OverlayTrigger
							overlay={
								<Popover
									id='popover-positioned-bottom'
									className='popover-context'>
									Receive an email of your favourite events
								</Popover>
							}>
							<div className='email-btn'>
								<AwesomeButton
									type='secondary'
									size='small'
									value='likes'
									onPress={() => {
										emailEvents(savedEvents);
										setShow(true);
									}}>
									<img
										alt='Icon'
										src={require('../assets/images/eventsImages/Email Favourites.png')}
										style={{height: '2em'}}
									/>
								</AwesomeButton>
							</div>
						</OverlayTrigger>
					</div>
					<div>{category === 'likes'}</div>
					<div className='app-card-list' id='app-card-list'>
						{category === 'likes' ? (
							<>{faveContent}</>
						) : (
							addApiEvents(eventsForCategories, requestId, images)
						)}
					</div>
				</section>
			</Row>
		</div>
	);
}

export default Events;
