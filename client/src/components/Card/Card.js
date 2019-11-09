import * as React from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard } from 'react-bootstrap';
import './Card.css';

const Card = (props) => {
	const { header = '', footer = '', title = '', subtitle = '', children, ...rest } = props;
	return (
		<RBCard {...rest}>
			{header && <RBCard.Header>{header}</RBCard.Header>}
			<RBCard.Body>
				{title && <RBCard.Title>{title}</RBCard.Title>}
				{subtitle && (
					<RBCard.Subtitle className="mb-2 text-muted">
						{subtitle}
					</RBCard.Subtitle>
				)}
				{children}
			</RBCard.Body>
			{footer && <RBCard.Footer className="text-muted">{footer}</RBCard.Footer>}
		</RBCard>
	);
};

const CardBody = (props) => {
	const { children, ...rest } = props;
	return <RBCard.Text {...rest}>{children}</RBCard.Text>;
};

const Divider = () => {
	return <hr style={{ color: 'grey' }} />;
};

Card.propTypes = {
	header: PropTypes.string,
	footer: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export { Card, CardBody, Divider };
