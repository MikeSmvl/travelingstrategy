import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Row, Col } from 'react-bootstrap/';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Card, CardBody } from '../components/Card/Card';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import getCountryName from '../utils/ISOToCountry';
import { languages, flagSrc } from '../utils/parsingTools';
import '../App.css';

function Country({ origin, destination }) {
	const [advisoryInfo, setAdvisory] = useState('Not available yet.');
	const [visaInfo, setVisa] = useState('Not available yet.');
	const [languagesInfo, setLanguages] = useState('Not available yet.');
	const [isLoading, setIsLoading] = useState(false);
	const [socketType, setSocketType] = useState('Not available yet');
	const [voltage, setVoltage] = useState('Not available yet');
	const [frequency, setFrequency] = useState('Not available yet');

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						countryToCountry(origin:"${origin}" destination: "${destination}") {
							name
							visa_info
							advisory_text
						}
						country_languages(country_iso: "${destination}"){
							official_languages,
							regional_languages,
							minority_languages,
							national_languages,
							widely_spoken_languages
						}
						country_socket(country_iso: "${destination}") {
							plug_type,
							electric_potential,
							frequency
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					setAdvisory(res.data.countryToCountry[0].advisory_text);
					setVisa(res.data.countryToCountry[0].visa_info);
					setLanguages(res.data.country_languages[0]);
					setSocketType(res.data.country_socket[0].plug_type);
					setVoltage(res.data.country_socket[0].electric_potential);
					setFrequency(res.data.country_socket[0].frequency);
					setIsLoading(false);
					console.log('type ',res.data.country_socket[0].plug_type)
				});
		}
		fetchData();
	}, [origin, destination]);

	if (!origin || !destination) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			{!isLoading && (
				<ReactFullpage
					licenseKey="CF1896AE-3B194629-99B627C1-841383E5"
					scrollingSpeed={1000} /* Options here */
					sectionsColor={['rgb(232, 233, 241)', 'rgb(255, 222, 206)']}
					navigation
					navigationPosition="left"
					navigationTooltips={['Basics', 'Health & Safety', 'Money']}
					anchors={['basics', 'health', 'money']}
					scrollOverflow
					normalScrollElements=".scrolling-card"
					responsiveWidth={800}
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
											<CountryCard flagSrc={flagSrc(destination)} title="Country Flag">
												<CardBody>
													{languages(languagesInfo)}
													{languagesInfo === 'Not available yet.' && (
														<div style={{ paddingBottom: '5px' }}>
														Not Available yet.
														</div>
													)}
												</CardBody>
											</CountryCard>
										</Col>
										<Col xs="10" sm="4">
											<Card className="scrolling-card" header="Visa Info" style={{ height: '400px', overflow: 'scroll' }}>
												<CardBody className="scrolling-card" style={{ paddingTop: '0' }}>
													<div className="scrolling-card" dangerouslySetInnerHTML={{ __html: visaInfo }} />
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
			)}
		</div>
	);
}

export default Country;
