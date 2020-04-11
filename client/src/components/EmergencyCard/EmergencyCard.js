import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';


const CurrencyCard = (props) => {
	const { emergencyInfo = '' } = props;

	return (
		<>
			<Card data-aos="zoom-in-up" header="Emergency Contacts" footer={<Row className="justify-content-center"><a href="http://chartsbin.com/view/1983" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
				<CardBody>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/1022/1022382.svg"
							alt="Policeman"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Police: </strong>
						{emergencyInfo.police}
					</pre>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/684/684262.svg"
							alt="Heart"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Ambulance: </strong>
						{emergencyInfo.ambulance}
					</pre>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/827/827742.svg"
							alt="Fire Extinguisher"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Fire: </strong>
						{emergencyInfo.fire}
					</pre>
				</CardBody>
			</Card>
		</>
	);
};

export default CurrencyCard;
