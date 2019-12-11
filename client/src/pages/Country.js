import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import { Row, Col } from 'react-bootstrap/';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Card, CardBody, Divider } from '../components/Card/Card';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import Subtitle from '../components/Subtitle/Subtitle';
import getCountryName from '../utils/ISOToCountry';
import findTimeZoneDifference from '../utils/timeZone';
import { languages, flagSrc } from '../utils/parsingTools';
import '../App.css';

function Country({
	originCountry,
	destinationCountry,
	originCity,
	destinationCity,
	originLat,
	originLng,
	destinationLat,
	destinationLng
}) {
	const [advisoryInfo, setAdvisory] = useState('Not available yet.');
	const [visaInfo, setVisa] = useState('Not available yet.');
	const [languagesInfo, setLanguages] = useState('Not available yet.');
	const [isLoading, setIsLoading] = useState(false);
	const [socketType, setSocketType] = useState('Not available yet');
	const [voltage, setVoltage] = useState('Not available yet');
	const [frequency, setFrequency] = useState('Not available yet');
	const [timeOrigin, setTimeOrigin] = useState('Not available yet');
	const [timeDestination, setTimeDestination] = useState('Not available yet');

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			await fetch('http://localhost:4000/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						countryToCountry(origin:"${originCountry}" destination: "${destinationCountry}") {
							name
							visa_info
							advisory_text
						}
						country_languages(country_iso: "${destinationCountry}"){
							official_languages,
							regional_languages,
							minority_languages,
							national_languages,
							widely_spoken_languages
						}
						country_socket(country_iso: "${destinationCountry}") {
							plug_type,
							electric_potential,
							frequency
						}
						time_difference_origin(lat_origin:${originLat} lng_origin:${originLng}) {
							utc_offset
						}
						time_difference_destination(lat_destination:${destinationLat} lng_destination:${destinationLng}) {
							utc_offset
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res)
					setAdvisory(res.data.countryToCountry[0].advisory_text);
					setVisa(res.data.countryToCountry[0].visa_info);
					setLanguages(res.data.country_languages[0]);
					setSocketType(res.data.country_socket[0].plug_type);
					setVoltage(res.data.country_socket[0].electric_potential);
					setFrequency(res.data.country_socket[0].frequency);
					setIsLoading(false);
					setTimeOrigin(res.data.time_difference_origin[0].utc_offset)
					setTimeDestination(res.data.time_difference_destination[0].utc_offset)
					console.log('type ', res.data.country_socket[0].plug_type);
				});
		}
		fetchData();
	}, [originCountry, destinationCountry]);

	const socketArray = socketType.replace(/\s/g, '').split(',');

	if (!originCountry || !destinationCountry) {
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
									<Header
										title={getCountryName(destinationCountry)}
										title2={destinationCity}
									/>
									<Subtitle text="Important Basics" />
									<Row
										className="justify-content-center"
										style={{ padding: '5px 25px' }}
									>
										<Col xs="10" sm="4">
											<CountryCard
												flagSrc={flagSrc(destinationCountry)}
												title="Country Flag"
											>
												<CardBody>
													{languagesInfo !== 'Not available yet.'
                            && languages(languagesInfo)}
												</CardBody>
											</CountryCard>
										</Col>
										<Col xs="10" sm="4">
											<Card
												className="scrolling-card"
												header="Visa Info"
												style={{ maxHeight: '400px', overflow: 'scroll' }}
											>
												<CardBody
													className="scrolling-card"
													style={{ paddingTop: '0' }}
												>
													<div
														className="scrolling-card"
														dangerouslySetInnerHTML={{ __html: visaInfo }}
													/>
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="4">
											<Card header="Advisory">
												<CardBody>
													<ErrorOutlineOutlinedIcon
														style={{ color: '#dc3545' }}
													/>{' '}
													{JSON.stringify(advisoryInfo).replace(
														/(^")|("$)/g,
														''
													)}
												</CardBody>
											</Card>
										</Col>
									</Row>
								</div>

								<div className="section">
									<Subtitle text="Electricity & Financials" />
									<Col xs="10" sm="4">
										<Card header="Sockets & Plugs">
											<CardBody>
												<p>
													{getCountryName(destinationCountry)} uses{' '}
													<b style={{ color: '#FF9A8D' }}>{voltage}</b> and{' '}
													<b style={{ color: '#FF9A8D' }}>{frequency}</b> for
                          electrical sockets. Plugs are of{' '}
													<b style={{ color: '#FF9A8D' }}>{socketType}</b>:
												</p>
												<Divider />
												{socketType !== 'Not available yet'
                          && socketArray.map((item) => (
                          	/* eslint-disable */
                            // eslint is giving tab indent errors such as "Expected indentation of 27 tabs but found 14", which makes no sense
                            <img
                              key={item}
                              src={require(`../socketImages/${item}.png`)}
                              style={{ width: '200px' }}
                              alt=''
                            />
                            /* eslint-enable */
                          ))}
											</CardBody>
										</Card>
									</Col>
								</div>

								<div className="section">
									<Subtitle text="Health & Safety" />
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
