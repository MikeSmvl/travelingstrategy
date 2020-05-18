import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap/';
import AOS from 'aos';
import { Card, CardBody, Divider } from '../components/Card/Card';
import Header from '../components/Header/Header';
import { CountryCard } from '../components/CountryCard/CountryCard';
import CountryNavbar from '../components/CountryNavbar/CountryNavbar';
import EmbassisesCard from '../components/EmbassiesCard/EmbassiesCard';
import VisaCard from '../components/VisaCard/VisaCard';
import DrugsCard from '../components/DrugsCard/DrugsCard';
import CurrencyCard from '../components/CurrencyCard/CurrencyCard';
import PricesCard from '../components/PricesCard/PricesCard';
import AdvisoryCard from '../components/AdvisoryCard/AdvisoryCard';
import EmergencyCard from '../components/EmergencyCard/EmergencyCard';
import HealthCard from '../components/HealthCard/HealthCard';
import VaccinesCard from '../components/VaccinesCard/VaccinesCard';
import CommonPhrases from '../components/CommonPhrases/CommonPhrases';
import getCountryName from '../utils/ISOToCountry';
import getTimeDifference from '../utils/timeDifference';
import {
	languages,
	flagSrc,
	getOtherTrafficSide,
	formatingVisa
} from '../utils/parsingTools';
import getCountryName2 from '../utils/ISOToCountry2';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Weather from '../components/Weather/Skycon/Weather';
import WeatherGraph from '../components/Weather/WeatherGraph/WeatherGraph';
import 'aos/dist/aos.css';

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
	const [advisoryInfo, setAdvisory] = useState('Not available yet');
	const [advisoryLink, setAdvisoryLink] = useState('');
	const [visaInfo, setVisa] = useState('Not available yet');
	const [languagesInfo, setLanguages] = useState({
		'Official Languages': 'TBD',
		'Regional Languages': 'TBD',
		'Widely Spoken Languages': 'TBD'
	});
	const [unsafeAreas, setUnsafeAreas] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [socketType, setSocketType] = useState('Not available yet');
	const [voltage, setVoltage] = useState('Not available yet');
	const [frequency, setFrequency] = useState('Not available yet');
	const [vaccines, setVaccines] = useState('Not available yet');
	const [timeOrigin, setTimeOrigin] = useState('Not available yet');
	const [timeDestination, setTimeDestination] = useState('Not available yet');
	const [currencyInfo, setCurrency] = useState({});
	const [originCurrencyInfo, setOriginCurrency] = useState({});
	const [financialInfo, setFinancial] = useState({});
	const [trafficSide, setTrafficSide] = useState('Not available yet');
	const [canabaisMedical, setcanabaisMedical] = useState({});
	const [canabaisRecreational, setcanabaisRecreational] = useState({});
	const [cocainePossession, setcocainePossession] = useState({});
	const [methaphetaminePossession, setmethaphetaminePossession] = useState({});
	const [rate, setRate] = useState('');
	const [destinationHealth, setDestinationHealth] = useState({});
	const [originHealth, setOriginHealth] = useState({});
	const [embassyInfo, setEmbassy] = useState('');
	const [emergencyInfo, setEmergency] = useState('');
	const destCountryName = getCountryName2(destinationCountry);
	const originCountryName = getCountryName2(originCountry);
	const [show, setShow] = useState(false);
	const [phrases, setPhrases] = useState([]);
	const [phraseIso, setPhraseIso] = useState('');
	const [phraseLanguage, setPhraseLanguage] = useState('');
	const [email, setEmail] = useState('');

	// for the moment being have daily forecast turned off
	const [showWeather] = useState(true);

	useEffect(() => {
		AOS.init({
			duration: 2000
		});
		async function getToken() {
			await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, {
				credentials: 'include'
			})
				.then((res) => res.json())
				.then((res) => {
					res.email && res.email !== null && setEmail(res.email);
				});
		}

		async function fetchRate(originCode, destinationCode) {
			fetch(
				`https://api.exchangeratesapi.io/latest?base=${originCode}&symbols=${destinationCode}`
			)
				.then((response) => {
					if (response.status !== 200) {
						setIsLoading(false);
						return;
					}

					// Set the currency rate from origin to destination
					response.json().then((data) => {
						setRate(data.rates[destinationCode].toFixed(2));
						setIsLoading(false);
					});
				})
				.catch((err) => {
					setIsLoading(false);
				});
		}

		async function fetchData() {
			setIsLoading(true);
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						countryToCountry(origin:"${originCountry}" destination: "${destinationCountry}") {
							name
							visa_info
							advisory_link
							advisory_text
						}
						country_languages(country_iso: "${destinationCountry}") {
							official_languages,
							regional_languages,
							minority_languages,
							national_languages,
							widely_spoken_languages
						}
						country_unsafe_areas(country_iso: "${destinationCountry}") {
							unsafe_areas
						}
						destinationCurrencies: currencies(country: "${destinationCountry}") {
							name
							symbol
							code
						}
						originCurrencies: currencies(country: "${originCountry}") {
							name
							symbol
							code
						}
						country_socket(country_iso: "${destinationCountry}") {
							plug_type,
							electric_potential,
							frequency
						}
						financials(country: "${destinationCountry}") {
							gasoline
							groceries
							rent
						}
						time_difference_origin(lat_origin:${originLat} lng_origin:${originLng} country_origin:"${originCountry}") {
							utc_offset
						}
						time_difference_destination(lat_destination:${destinationLat} lng_destination:${destinationLng} country_destination:"${destinationCountry}") {
							utc_offset
						}
						trafficSide(iso:"${destinationCountry}") {
							traffic_side
						}
						destinationHealth:unitedNations(country:"${destinationCountry}") {
							homicideRate
							infantMortality
							lifeExpectancy
							nbOfPhysicians
							sanitation
							water
						}
						originHealth:unitedNations(country:"${originCountry}") {
							homicideRate
							infantMortality
							lifeExpectancy
							nbOfPhysicians
							sanitation
							water
						}
						drugs(country_iso:"${destinationCountry}") {
							country_iso,
							name,
							methaphetamine_possession,
							methaphetamine_sale,
							methaphetamine_transport,
							methaphetamine_cultivation,
							cocaine_possession,
							cocaine_sale,
							cocaine_transport,
							cocaine_cultivation,
							canabais_recreational,
							canabais_medical
						}
						country_vaccines(country_iso:"${destinationCountry}") {
							vaccine_name
							vaccine_info
						}
						embassy(country: "${destCountryName}", operator: "${originCountryName}") {
							city
							type
							phone
							email
							website
						}
						emergency(country: "${destinationCountry}") {
							police
							ambulance
							fire
						}
						phrasesTranslationCountry(country_iso:"${destinationCountry}"){
							phrase
							language
							translated_phrase
							pronunciation
							language_iso
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.countryToCountry
						&& res.data.countryToCountry.length !== 0
						&& setAdvisory(res.data.countryToCountry[0].advisory_text);
					res.data.countryToCountry
						&& res.data.countryToCountry.length !== 0
						&& setAdvisoryLink(res.data.countryToCountry[0].advisory_link);
					res.data.countryToCountry
						&& res.data.countryToCountry.length !== 0
						&& setVisa(res.data.countryToCountry[0].visa_info);
					res.data.country_languages
						&& res.data.country_languages.length !== 0
						&& setLanguages(res.data.country_languages[0]);
					res.data.country_unsafe_areas
						&& res.data.country_unsafe_areas.length !== 0
						&& setUnsafeAreas(res.data.country_unsafe_areas[0].unsafe_areas);
					res.data.country_socket
						&& res.data.country_socket.length !== 0
						&& setSocketType(res.data.country_socket[0].plug_type);
					res.data.country_socket
						&& res.data.country_socket.length !== 0
						&& setVoltage(res.data.country_socket[0].electric_potential);
					res.data.country_socket
						&& res.data.country_socket.length !== 0
						&& setFrequency(res.data.country_socket[0].frequency);
					res.data.destinationCurrencies
						&& res.data.destinationCurrencies.length !== 0
						&& setCurrency(res.data.destinationCurrencies[0]);
					res.data.originCurrencies
						&& res.data.originCurrencies.length !== 0
						&& setOriginCurrency(res.data.originCurrencies[0]);
					res.data.financials
						&& res.data.financials.length !== 0
						&& setFinancial(res.data.financials[0]);
					res.data.time_difference_origin
						&& res.data.time_difference_origin.length !== 0
						&& setTimeOrigin(res.data.time_difference_origin[0].utc_offset);
					res.data.time_difference_destination
						&& res.data.time_difference_destination.length !== 0
						&& setTimeDestination(
							res.data.time_difference_destination[0].utc_offset
						);
					res.data.trafficSide
						&& res.data.trafficSide.length !== 0
						&& setTrafficSide(res.data.trafficSide[0].traffic_side);
					res.data.destinationHealth
						&& res.data.destinationHealth.length !== 0
						&& setDestinationHealth(res.data.destinationHealth[0]);
					res.data.originHealth
						&& res.data.originHealth.length !== 0
						&& setOriginHealth(res.data.originHealth[0]);
					res.data.drugs
						&& res.data.drugs.length !== 0
						&& setcanabaisMedical(res.data.drugs[0].canabais_medical);
					res.data.drugs
						&& res.data.drugs.length !== 0
						&& setcanabaisRecreational(res.data.drugs[0].canabais_recreational);
					res.data.drugs
						&& res.data.drugs.length !== 0
						&& setcocainePossession(res.data.drugs[0].cocaine_possession);
					res.data.drugs
						&& res.data.drugs.length !== 0
						&& setmethaphetaminePossession(
							res.data.drugs[0].methaphetamine_possession
						);
					res.data.country_vaccines
						&& res.data.country_vaccines.length !== 0
						&& setVaccines(res.data.country_vaccines);
					res.data.embassy
						&& res.data.embassy.length !== 0
						&& setEmbassy(res.data.embassy[0]);
					res.data.emergency
						&& res.data.emergency.length !== 0
						&& setEmergency(res.data.emergency[0]);
					res.data.phrasesTranslationCountry
						&& res.data.phrasesTranslationCountry.length !== 0
						&& setPhrases(res.data.phrasesTranslationCountry);
					res.data.phrasesTranslationCountry
						&& res.data.phrasesTranslationCountry.length !== 0
						&& setPhraseIso(res.data.phrasesTranslationCountry[0].language_iso);
					res.data.phrasesTranslationCountry
						&& res.data.phrasesTranslationCountry.length !== 0
						&& setPhraseLanguage(res.data.phrasesTranslationCountry[0].language);
					fetchRate(
						res.data.originCurrencies[0].code,
						res.data.destinationCurrencies[0].code
					);
				});
		}


		fetchData();
		getToken();
	}, [
		originCountry,
		destinationCountry,
		originLat,
		originLng,
		destinationLat,
		destinationLng,
		destCountryName,
		originCountryName
	]);

	const socketArray = socketType.replace(/\s/g, '').split(',');
	const formatedVisaInfo = formatingVisa(visaInfo);
	if (!originCountry || !destinationCountry) {
		return <Redirect to="/" />;
	}
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let pronunciation;
	if (phrases.length !== 0 && phrases[0].pronunciation !== '') {
		pronunciation =		(
			<Col span="2">
				<div style={{ textAlign: 'center' }}>
					<b style={{ color: '#FF9A8D' }}>Pronunciation</b>
				</div>
			</Col>
		);
	}
	return (
		<div>
			{!isLoading && (
				<div data-aos="fade-up" className="parallax">
					<div id="overlay" />
					<Row style={{ justifyContent: 'center', paddingTop: '150px' }}>
						<Col lg={8} style={{ border: '1px solid #343a40', borderRadius: '20px' }}>
							<Header
								country={getCountryName(destinationCountry)}
								city={destinationCity}
								time={getTimeDifference(timeOrigin, timeDestination, originCity)}
								show={show}
								handleShow={handleShow}
								handleClose={handleClose}
								lat={destinationLat}
								lng={destinationLng}
								countryIso={destinationCountry}
								email={email}
							/>
							<Row className="justify-content-center">
								<Col
									style={{
										backgroundColor: 'rgb(255, 255, 255)',
										borderRadius: '0 0 20px 20px',
										padding: '0'
									}}
								>
									<Row className="justify-content-center sticky">
										<CountryNavbar />
									</Row>
									<Row id="Important Basics" className="justify-content-center">
										<Col sm={5} style={{ padding: '40px 25px 25px 25px' }}>
											<CountryCard
												data-aos="fade-right"
												flagSrc={flagSrc(destinationCountry)}
												title="Country Flag"
												footer={<Row className="justify-content-center"><a href="https://en.wikipedia.org/wiki/List_of_official_languages_by_country_and_territory" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}
											>
												<CardBody>
													{languagesInfo !== 'Not available yet.'
												&& languages(languagesInfo)}
												</CardBody>
											</CountryCard>
											<br />
											<EmbassisesCard embassyInfo={embassyInfo} originCountryName={originCountryName} destCountryName={destCountryName} />
											<br />
											<WeatherGraph destinationCity={destinationCity} />
											<br />
										</Col>
										<Col sm={6} style={{ padding: '40px 25px 25px 25px' }}>
											<VisaCard visaInfo={visaInfo} originCountry={originCountry} formatedVisaInfo={formatedVisaInfo} />
											<br />
											<DrugsCard canabaisRecreational={canabaisRecreational} canabaisMedical={canabaisMedical} cocainePossession={cocainePossession} methaphetaminePossession={methaphetaminePossession} />
											<br />
											<br />
											{showWeather && (
												<Weather
													lat={destinationLat}
													lng={destinationLng}
												/>
											)}
										</Col>
									</Row>
									<br />
									<Card
										header="Weather Map"
										footer={(
											<Row className="justify-content-center"><a href="https://darksky.net/forecast/40.7127,-74.0059/us12/en" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference &nbsp;</a>
											</Row>
										)}
									>
										<CardBody>
											<iframe title="darksky" className="map-darksky" src={`https://maps.darksky.net/@temperature,${destinationLat},${destinationLng},11`} />
										</CardBody>
									</Card>
									<hr />
									<div id="Financials">
										<Row className="justify-content-center">
											<Col sm={6} style={{ padding: '25px' }}>
												<CurrencyCard currencyInfo={currencyInfo} rate={rate} originCurrencyInfo={originCurrencyInfo} />
											</Col>
										</Row>
										<Row className="justify-content-center">
											<Col xs="10" sm="6" style={{ padding: '0 0 25px 0' }}>
												<PricesCard financialInfo={financialInfo} currencyInfo={currencyInfo} />
											</Col>
										</Row>
									</div>
									<hr />
									<Row id="Safety" className="justify-content-center">
										<AdvisoryCard originCountry={originCountry} destinationCountry={destinationCountry} advisoryInfo={advisoryInfo} advisoryLink={advisoryLink} />
										<Col xs="10" sm="6" style={{ padding: '25px' }}>
											<Card data-aos="fade-left" header="Unsafe Areas" footer={<Row className="justify-content-center"><a href={`https://travel.gc.ca/destinations/${getCountryName(destinationCountry)}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
												<CardBody>
													<div
														className="scrolling-card"
														style={{ maxHeight: '285px', overflow: 'scroll' }}
														dangerouslySetInnerHTML={{ __html: unsafeAreas }}
													/>
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="6" style={{ padding: '25px' }}>
											<EmergencyCard emergencyInfo={emergencyInfo} />
										</Col>
									</Row>
									<hr />
									<Row id="Health" className="justify-content-center">
										<Col xs="10" sm="8" style={{ padding: '25px 0 25px 0' }}>
											<HealthCard destinationHealth={destinationHealth} originHealth={originHealth} destinationCountry={destinationCountry} />
										</Col>
										<Col xs="10" sm="8" style={{ padding: '0 0 25px 0' }}>
											{!(vaccines === null || vaccines === 'Not available yet') && (
												<VaccinesCard vaccines={vaccines} destinationCountry={destinationCountry} />
											)}
										</Col>
									</Row>
									<hr />
									<Row id="Culture" className="justify-content-center">
										<Col xs="10" sm="10" style={{ padding: '25px' }}>
											<CommonPhrases originCity={originCity} phrases={phrases} phraseLanguage={phraseLanguage} phraseIso={phraseIso} pronunciation={pronunciation} />
										</Col>
									</Row>
									<hr />
									<Row id="Miscellaneous" className="justify-content-center">
										<Col xs="10" sm="10" style={{ padding: '25px' }}>
											<Card data-aos="fade-down" header="Sockets & Plugs" footer={<Row className="justify-content-center"><a href="https://www.iec.ch/worldplugs/list_bylocation.htm" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
												<CardBody>
													<p>
														{getCountryName(destinationCountry)} uses{' '}
														<b style={{ color: '#FF9A8D' }}>{voltage}</b> and{' '}
														<b style={{ color: '#FF9A8D' }}>{frequency}</b> for
														electrical sockets. Plugs are of{' '}
														<b style={{ color: '#FF9A8D' }}>{socketType}</b>:
													</p>
													<Divider />
													<Row className="justify-content-center">
														{socketType !== 'Not available yet'
														&& socketArray.map((item) => (
															/* eslint-disable */
															// eslint is giving tab indent errors such as "Expected indentation of 27 tabs but found 14", which makes no sense
															<Col key={item}>
																<img
																	key={item}
																	src={require(`../assets/images/socketImages/${item}.png`)}
																	style={{width: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
																	alt=''
																/>
															</Col>
															/* eslint-enable */
														))}
													</Row>
												</CardBody>
											</Card>
										</Col>
										<Col xs="10" sm="10" style={{ padding: '0px 0px 50px 0px' }}>
											<Row className="justify-content-center">
												<Card data-aos="fade-up" header="Traffic Flow" footer={<Row className="justify-content-center"><a href="https://www.worldstandards.eu/cars/list-of-left-driving-countries/" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
													<CardBody>
														{trafficSide !== 'Not available yet' && (
															<p>
																In {getCountryName(destinationCountry)} the traffic
																flow is on the{' '}
																<b style={{ color: '#FF9A8D' }}>{trafficSide} hand</b>{' '}
																side
															</p>
														)}
														<Divider />
														{trafficSide !== 'Not available yet' && (
															<img
																key={trafficSide}
																src={require(`../assets/images/trafficImages/${trafficSide}.png`)}
																style={{
																	width: '200px',
																	marginLeft: 'auto',
																	marginRight: 'auto',
																	display: 'block'
																}}
																alt=""
															/>
														)}
														{trafficSide !== 'Not available yet' && (
															<p style={{ textAlign: 'center' }}>
																<br />
																<b style={{ color: '#FF1C00' }}>Warning</b>
																<br />
																Be sure to look {getOtherTrafficSide(
																	trafficSide
																)}{' '}
																when crossing streets
															</p>
														)}
													</CardBody>
												</Card>
											</Row>
										</Col>
									</Row>
								</Col>
							</Row>
						</Col>
					</Row>
					<footer id="footer">
						<Footer
							show={show}
							handleShow={handleShow}
							handleClose={handleClose}
							city={destinationCity}
							lat={destinationLat}
							lng={destinationLng}
							email={email}
						/>
					</footer>
				</div>
			)}
		</div>
	);
}

export default Country;
