import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import {Card, CardBody, Divider} from '../components/Card/Card';
import Header from '../components/Header/Header';
import {CountryCard, CountryBody} from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import {Row, Col} from 'react-bootstrap/';
import getCountryCode from '../utils/countryToISO';
import '../App.css';

function Country({origin, destination}) {
	const [data, setData] = useState({});

	useEffect(() => {
		async function fetchData() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					query: `{ canadaAll(name: "${destination}") { name visa_info advisory_text } }`
				})
			})
				.then(res => res.json())
				.then(res => setData(res.data));
		}
		fetchData();
	});

	if (!origin || !destination) {
		return <Redirect to='/' />;
	}

	const countryCode = getCountryCode(destination);
	const src = `https://www.countryflags.io/${countryCode}/flat/64.png`;
	return (
		<div>
			<ReactFullpage
				licenseKey='CF1896AE-3B194629-99B627C1-841383E5'
				scrollingSpeed={1000} /* Options here */
				sectionsColor={['rgb(232, 233, 241)', 'rgb(255, 222, 206)']}
				navigation
				navigationPosition='left'
				navigationTooltips={['Basics', 'Health & Safety', 'Money']}
				anchors={['basics', 'health', 'money']}
				render={({state, fullpageApi}) => {
					return (
						<ReactFullpage.Wrapper>
							<div className='section App'>
								<Header title={destination} />
								<Subtitle text="Important Basics"></Subtitle>
								<Row
									className='justify-content-center'
									style={{padding: '5px 25px'}}>
									<Col xs='10' sm='4'>
										<CountryCard
											flagSrc={src}
											title="Country Flag"></CountryCard>
									</Col>
									<Col xs='10' sm='4'>
										<Card header='Visa Info'>
											<CardBody>{JSON.stringify(data)}</CardBody>
										</Card>
									</Col>
									<Col xs='10' sm='4'>
									<Card header='Advisory'>
											<CardBody></CardBody>
										</Card>
									</Col>
								</Row>
							</div>

							<div className='section'>
							<Subtitle text="Health & Safety"></Subtitle>
							</div>

							<div className='section'>
							<Subtitle text="Money"></Subtitle>
							</div>
						</ReactFullpage.Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default Country;
