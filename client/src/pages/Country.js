import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Row, Col } from 'react-bootstrap/';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Card, CardBody } from '../components/Card/Card';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import getCountryCode from '../utils/countryToISO';
import getCountryName from '../utils/ISOToCountry';
import '../App.css';

function Languages(object) {
	const items = [];
	const keys = Object.keys(object);
	keys.forEach((key) => {
		const title = key.split('_').join(' ');
		if (object[key] !== '') {
			items.push(
				<div style={{ paddingBottom: '5px' }}>
					{title}:{' '}
					{JSON.stringify(object[key]).replace(
						/(^")|("$)/g,
						''
					)}
				</div>
			);
		}
	});

	return (
		<div>
			{items}
		</div>
	);
}

function Country({ origin, destination }) {
	const [advisoryInfo, setAdvisory] = useState({});
	const [visaInfo, setVisa] = useState({});
	const [languagesInfo, setLanguages] = useState({});

	useEffect(() => {
		async function fetchVisa() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{ countryToCountry(origin:"${origin}" destination: "${destination}") { name visa_info advisory_text } }`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					if (
						res.data.countryToCountry === null
						|| res.data.countryToCountry.length === 0
					) {
						setAdvisory('Not available yet.');
						setVisa('Not available yet.');
					} else {
						setAdvisory(res.data.countryToCountry[0].advisory_text);
						setVisa(res.data.countryToCountry[0].visa_info);
					}
				});
		}
		async function fetchLanguages() {
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{country_languages(country_iso: "${destination}"){
						official_languages,
						regional_languages,
						minority_languages,
						national_languages,
						widely_spoken_languages
					  }}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					if (
						res.data.country_languages === null
						|| res.data.country_languages.length === 0
					) {
						setLanguages('Not available yet.');
					} else {
						setLanguages(res.data.country_languages[0]);
					}
				});
		}
		fetchVisa();
		fetchLanguages();
	}, [origin, destination]);

	const countryCode = getCountryCode(destination);
	const src = `https://www.countryflags.io/${countryCode}/flat/64.png`;

	if (!origin || !destination) {
		return <Redirect to="/" />;
	}

	if (!visaInfo && !languagesInfo) {
		return <div />;
	}
	return (
		<div>
			<ReactFullpage
				licenseKey="CF1896AE-3B194629-99B627C1-841383E5"
				scrollingSpeed={1000} /* Options here */
				sectionsColor={['rgb(232, 233, 241)', 'rgb(255, 222, 206)']}
				navigation
				navigationPosition="left"
				navigationTooltips={['Basics', 'Health & Safety', 'Money']}
				anchors={['basics', 'health', 'money']}
				scrollOverflow
				render={({ state, fullpageApi }) => {
					return (
						<ReactFullpage.Wrapper>
							<div className="section App">
								<Header title={getCountryName(destination)} />
								<Subtitle text="Important Basics" />
								<Row
									className="justify-content-center"
									style={{ padding: '5px 25px' }}
								>
									<Col xs="10" sm="4">
										<CountryCard flagSrc={src} title="Country Flag">
											<CardBody>
												{Languages(languagesInfo)}
												{languagesInfo === 'Not available yet.' && (
													<div style={{ paddingBottom: '5px' }}>
														Not Available yet.
													</div>
												)}
											</CardBody>
										</CountryCard>
									</Col>
									<Col xs="10" sm="4">
										<Card header="Visa Info">
											<CardBody style={{ paddingTop: '0' }}>
												<div dangerouslySetInnerHTML={{ __html: visaInfo }} />
												{}
											</CardBody>
										</Card>
									</Col>
									<Col xs="10" sm="4">
										<Card header="Advisory">
											<CardBody>
												<ErrorOutlineOutlinedIcon style={{ color: '#dc3545' }} />
												{' '}
												{JSON.stringify(advisoryInfo).replace(/(^")|("$)/g, '')}
											</CardBody>
										</Card>
									</Col>
								</Row>
							</div>

							<div className="section">
								<Subtitle text="Health & Safety" />
							</div>

							<div className="section">
								<Subtitle text="Money" />
							</div>
						</ReactFullpage.Wrapper>
					);
				}}
			/>
		</div>
	);
}

export default Country;
