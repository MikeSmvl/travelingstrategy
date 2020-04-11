import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from '../Card/Card';
import textToSpeech from '../../utils/text-to-speech';

const VaccinesCard = (props) => {
	const { originCity = '', phraseLanguage = '', pronunciation = '', phrases = [], phraseIso = '' } = props;

	return (
		<>
			<Card
				data-aos="fade-up"
				header="Common Phrases"
				style={{ maxHeight: '500px', overflow: 'scroll' }}
				footer={(
					<Row className="justify-content-center">
						<a
							href={`https://translate.google.com/?sl=en&tl=${phraseIso}&text=Hi%20I%20am%20from%20${originCity}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fa fa-globe" /> Reference
						</a>
					</Row>
				)}
			>
				<Row>
					<Col>
						<div style={{ textAlign: 'center' }}>
							<b style={{ color: '#FF9A8D' }}>English</b>
						</div>
					</Col>
					<Col>
						<div style={{ textAlign: 'center' }}>
							<b style={{ color: '#FF9A8D' }}>{phraseLanguage}</b>
						</div>
					</Col>
					{pronunciation}
					<hr />
					<hr />
					<Col sm="1">
						<div style={{ textAlign: 'center' }}>
							<b style={{ color: '#FF9A8D' }}>Play</b>
						</div>
					</Col>
				</Row>
				<span style={{ maxHeight: '400px', overflow: 'scroll' }}>
					{phrases.map((value, index) => (
						<Row key={value + index}>
							<Col style={{ textAlign: 'center' }}>
								{value.phrase.split('%20').join(' ')}
							</Col>
							<Col style={{ textAlign: 'center' }}>
								{value.translated_phrase}
							</Col>
							{(value.pronunciation !== '') && (
								<Col style={{ textAlign: 'center' }}>
									{value.pronunciation}
								</Col>
							)}

							<Col sm="1">
								<div style={{ textAlign: 'center' }}>
									<button
										type="button"
										className="buttonSpeaker"
										onClick={() => textToSpeech(value.translated_phrase, value.language_iso)}
									>
										<i
											className="fa fa-volume-up"
											style={{ width: '24px' }}
											alt="error loading"
										/>
									</button>
								</div>
							</Col>

						</Row>
					))}
					{ (phrases.length === 0) && (<span>TBD</span>)}
				</span>
			</Card>
		</>
	);
};

export default VaccinesCard;
