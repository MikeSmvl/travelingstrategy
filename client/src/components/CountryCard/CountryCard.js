import * as React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './CountryCard.css';

const CountryCard = (props) => {
	const {
		flagSrc = '',
		title = '',
		children,
		...rest
	} = props;
	return (
		<Card {...rest}>
			<Card.Header className="cardHeader">
				<img alt="" src={flagSrc} />
				<div className="cardTitle">{title}</div>
			</Card.Header>
			<Card.Body className="cardBody">
				{children}
			</Card.Body>
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
