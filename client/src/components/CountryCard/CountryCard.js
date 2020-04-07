import * as React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './CountryCard.css';

const CountryCard = (props) => {
	const {
		flagSrc = '',
		title = '',
		footer,
		children,
		...rest
	} = props;
	return (
		<Card {...rest}>
			<Card.Header className="countryCardHeader">
				<img alt="" src={flagSrc} />
				<div className="countryCardTitle">{title}</div>
			</Card.Header>
			<Card.Body className="countryCardBody">
				{children}
			</Card.Body>
			<Card.Footer className="countryCardFooter">
				<div>{footer}</div>
			</Card.Footer>
		</Card>
	);
};

const CountryBody = (props) => {
	const { children, ...rest } = props;
	return <Card.Text {...rest}>{children}</Card.Text>;
};

CountryCard.propTypes = {
	title: PropTypes.string,
	flagSrc: PropTypes.string
};

export { CountryCard, CountryBody };
