import * as React from 'react';
import PropTypes from 'prop-types';
import {Card as RBCard} from 'react-bootstrap';
import './Card.css';

const Card = props => {
	const {header = '', footer = '', title = '', subtitle = ''} = props;
	return (
		<RBCard>
			{header && <RBCard.Header>{header}</RBCard.Header>}
			<RBCard.Body>
				{title && <RBCard.Title>{title}</RBCard.Title>}
				{subtitle && (
					<RBCard.Subtitle className='mb-2 text-muted'>
						{subtitle}
					</RBCard.Subtitle>
				)}
				{props.children}
			</RBCard.Body>
			{footer && <RBCard.Footer className='text-muted'>{footer}</RBCard.Footer>}
		</RBCard>
	);
};

const CardBody = props => {
	return <RBCard.Text>{props.children}</RBCard.Text>;
};

Card.propTypes = {
	hrefBrand: PropTypes.string,
	title: PropTypes.string,
	hrefRight: PropTypes.string,
	textRight: PropTypes.string
};

export {Card, CardBody};
