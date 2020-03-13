import React, { useState, useEffect } from 'react';
import { Button, Row} from 'react-bootstrap/';
import Client from 'predicthq';
import '../App.css';
import { addMyEvents, addApiEvents } from '../utils/eventsTools';
import TestCard from '../components/TestCard/TestCard';


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
	const [toggled,setToggled] = useState(true);
	const [navbarClass, setNavbarClass ] = useState('sidebar sidebar--expanded');
	const [mainContentClass, setMainContentClass ] = useState('main-content main-content--expanded');


	const categoryChosen = (event) => {
		setCategory(event.target.value);
	};

	useEffect(() => {
		// Basic event search using category as parameter. By default, it will return the first ten events.
		async function searchByCategory() {
			console.log('hello')
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
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`,  {
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
                              name_of_place
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

		fetchEvents();
		setEventsToDisplay();
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

	

	const expandNavBar= (event) => {
		if(toggled){
			setNavbarClass("sidebar")
			setMainContentClass("main-content")
			setToggled(false)
		}
		else{
			setNavbarClass("sidebar sidebar--expanded")
			setMainContentClass("main-content main-content--expanded")
			setToggled(true)
		}
	}

	//Temporarily store data here
const PostsData = [
	{
	  "category": "News",
	  "title": "CNN Acquire BEME",
	  "text": "CNN purchased Casey Neistat's Beme app for $25million.",
	  "image": "https://source.unsplash.com/user/erondu/600x400"
	},
	{
	  "category": "Travel",
	  "title": "Nomad Lifestyle",
	  "text": "Learn our tips and tricks on living a nomadic lifestyle",
	  "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
	},
	{
	  "category": "Development",
	  "title": "React and the WP-API",
	  "text": "The first ever decoupled starter theme for React & the WP-API",
	  "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
	},
	{
	  "category": "News",
	  "title": "CNN Acquire BEME",
	  "text": "CNN purchased Casey Neistat's Beme app for $25million.",
	  "image": "https://source.unsplash.com/user/erondu/600x400"
	},
	{
	  "category": "Travel",
	  "title": "Nomad Lifestyle",
	  "text": "Learn our tips and tricks on living a nomadic lifestyle",
	  "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
	},
	{
	  "category": "Travel",
	  "title": "Nomad Lifestyle",
	  "text": "Learn our tips and tricks on living a nomadic lifestyle",
	  "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
	},
	{
	  "category": "Development",
	  "title": "React and the WP-API",
	  "text": "The first ever decoupled starter theme for React & the WP-API",
	  "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
	}
  ]

	return (
		<div  id="events-section">
			<Row>
			<div className={navbarClass}  onClick={expandNavBar}>
				<span className="shape"></span>
				<span className="shape"></span>
				<div className='categories-btn'>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="likes" onClick={categoryChosen}>Likes</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="conferences" onClick={categoryChosen}>Conferences</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="expos" onClick={categoryChosen}>Expos</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="concerts" onClick={categoryChosen}>Concerts</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="festivals" onClick={categoryChosen}>Festivals</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="performing-arts" onClick={categoryChosen}>Performing-arts</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="sports" onClick={categoryChosen}>Sports</Button>
					</div>
					<div className='choice-btn'>
						<Button variant="outline-primary" style={{width:'100%'}} value="community" onClick={categoryChosen}>Community</Button>
					</div>
				</div>
			</div>
			<section className={mainContentClass} style={{marginTop:'5%'}}>
			<div className="app-card-list" id="app-card-list">
				<TestCard></TestCard>
				<TestCard></TestCard>
				<TestCard></TestCard>
				<TestCard></TestCard>
				<TestCard></TestCard>
				<TestCard></TestCard>
				
			</div>

			</section>
			{/* <section className={mainContentClass}>
				<header>
				</header>
				<div className="container">
					<div className="module-wrapper">
						<div className="module--half">
							<ul>
								{category ==="likes"
        						? addMyEvents(savedEvents)
        						: addApiEvents(eventsForCategories, requestId)
								}
							</ul>
						</div>
					</div>
				</div>
			</section> */}
			</Row>
		</div>
	);
}

export default Events;
