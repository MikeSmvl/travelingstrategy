import React from 'react';
import ReactDOM from 'react-dom';
import EventCard from '../components/EventsCard/EventsCard';
import InfoModal from '../components/EventsCard/EventsCard';
import LikeModal from '../components/EventsCard/EventsCard';

describe('Testing multiple component of the page', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<EventCard/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<InfoModal/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LikeModal/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
