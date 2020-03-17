import React, { useState, useEffect } from 'react';
import { Button, Row } from 'react-bootstrap/';
import Client from 'predicthq';
import '../App.css';
import Unsplash, { toJson } from 'unsplash-js';
import { addMyEvents, addApiEvents, getButtonContent } from '../utils/eventsTools';

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


	const categoryChosen = (event) => {
		setCategory(event.target.value);
	};

	useEffect(() => {
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
                        eventsForRequest(request_id:"5"){
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
		longitude

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
							<Button variant="outline-primary" style={{ width: '100%' }} value="likes" onClick={categoryChosen}>
								{getButtonContent('Likes')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="conferences" onClick={categoryChosen}>
								{getButtonContent('Conferences')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="expos" onClick={categoryChosen}>
								{getButtonContent('Expos')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="concerts" onClick={categoryChosen}>
								{getButtonContent('Concerts')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="festivals" onClick={categoryChosen}>
								{getButtonContent('Festivals')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="performing-arts" onClick={categoryChosen}>
								{getButtonContent('Performing-arts')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="sports" onClick={categoryChosen}>
								{getButtonContent('Sports')}
							</Button>
						</div>
						<div className="choice-btn">
							<Button variant="outline-primary" style={{ width: '100%' }} value="community" onClick={categoryChosen}>
								{getButtonContent('Community')}
							</Button>
						</div>
					</div>
				</div>
				<section className={mainContentClass} style={{ marginTop: '4%' }}>
					<div className="app-card-list" id="app-card-list">
						{category === 'likes'
							? addMyEvents(savedEvents)
							: addApiEvents(eventsForCategories, requestId, images)}
					</div>

				</section>
			</Row>
		</div>
	);
}

export default Events;
