import * as React from 'react';
import PropTypes from 'prop-types';
import {Card as RBCard} from 'react-bootstrap';
import './Card.css';

const Card = props => {
	<RBCard>
		<Card.Header>Featured</Card.Header>
		<RBCard.Body>
			This is some text within a card body.
			<Card.Title>Card Title</Card.Title>
			<Card.Subtitle className='mb-2 text-muted'>Card Subtitle</Card.Subtitle>
			<Card.Text>
				Some quick example text to build on the card title and make up the bulk
				of the card's content.
			</Card.Text>
			<Card.Link href='#'>Card Link</Card.Link>
			<Card.Link href='#'>Another Link</Card.Link>
		</RBCard.Body>
		<Card.Footer className='text-muted'>2 days ago</Card.Footer>
	</RBCard>;
};

Card.propTypes = {
	hrefBrand: PropTypes.string,
	title: PropTypes.string,
	hrefRight: PropTypes.string,
	textRight: PropTypes.string
};

export default Card;
