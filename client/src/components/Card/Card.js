import * as React from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard, Button} from 'react-bootstrap';
import './Card.css';

const Card = (props) => {
	const { header = '', footer = '', children, ...rest } = props;
	return (
		<RBCard {...rest} className="TSCard">
			{header && <RBCard.Header className="cardHeader">{header}
				<button class="iImage"></button>
			</RBCard.Header>}
			{children}
			{footer && <RBCard.Footer className="text-muted">{footer}</RBCard.Footer>}
		</RBCard>
	);
};

const CardBody = (props) => {
	const { children, title = '', subtitle = '', classExtra = '', ...rest } = props;
	return (
		<RBCard.Body
			{...rest}
			className={`TScardBody ${classExtra}`}
		>
			{title && <RBCard.Title>{title}</RBCard.Title>}
			{subtitle && (
				<RBCard.Subtitle className="mb-2 text-muted">
					{subtitle}
				</RBCard.Subtitle>
			)}
			<span className="card-text">{children}</span>
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
	subtitle: PropTypes.string,
	classExtra: PropTypes.string
};

export { Card, CardBody, Divider };
