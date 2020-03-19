import * as React from 'react';
import CountrySelector from '../components/CountrySelector/CountrySelector';
import Hero from '../components/Hero/Hero';
import { Row } from 'react-bootstrap'
import Toast from '../../src/components/Toast/Toast';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Row className="justify-content-center">
                <Toast type="alert" title="Covid-19" headerIcon="fa fa-notes-medical"><Link to="/covid19"><u>Click here</u> for information about the corona virus.</Link></Toast>
            </Row>
            <Hero />
            <CountrySelector originLabel="Origin" destinationLabel="Destination" />
        </div>
    );
}

export default Home;