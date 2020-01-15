import * as React from 'react';
import { useState} from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard } from 'react-bootstrap';
import './Card.css';

const Card = (props) => {
	const { header = '', footer = '', children, ...rest } = props;
	return (
		<RBCard {...rest} className="TSCard">
			{header && <RBCard.Header className="cardHeader">{header}</RBCard.Header>}
			{children}
			{footer && <RBCard.Footer className="text-muted">{footer}</RBCard.Footer>}
		</RBCard>
	);
};

const CardBody = (props) => {
	const { children, title = '', subtitle = '',...rest} = props;
	return (
		<RBCard.Body {...rest} className="TScardBody"
		>
			{title && <RBCard.Title>{title}</RBCard.Title>}
			{subtitle && (
				<RBCard.Subtitle className="mb-2 text-muted">
					{subtitle}
				</RBCard.Subtitle>
			)}
			<RBCard.Text>{children}</RBCard.Text>
		</RBCard.Body>
	);
};

const VaccineCardBody = (props) => {
	const { children, title = '', subtitle = '', info,...rest} = props;
	const [showVaccineInfo, setShowVaccineInfo] = useState(false);
	const [titleColor, setTitleColor] = useState("#FF9A8D");
	return (
		<RBCard.Body {...rest} className="TScardBody" >
			{title && <b >
			<p class ="card-text" style={{color: titleColor}}
				onClick = {() => {setShowVaccineInfo(!showVaccineInfo);}}
			  onMouseEnter = {() => {
				//setShowVaccineInfo(!showVaccineInfo);
				setTitleColor("#FF1C00")}}
				onMouseLeave = {() => {
					setShowVaccineInfo(false);
					setTitleColor("#FF9A8D")}}>{title}</p></b>}
			{subtitle && (
				<RBCard.Subtitle className="mb-2 text-muted">
					{subtitle}
				</RBCard.Subtitle>
			)}
			<RBCard.Text>{children}
				{showVaccineInfo && <p dangerouslySetInnerHTML={{ __html: info }}/>}
			</RBCard.Text>
		</RBCard.Body>
	);
};

const Divider = () => {
	return <hr className="cardDivider" />;
};

Card.propTypes = {
	header: PropTypes.string,
	footer: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export { Card, CardBody,VaccineCardBody, Divider };
