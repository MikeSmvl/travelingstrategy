import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './TestCard.css'
import PropTypes from 'prop-types';


const TestCard = (props) =>{
    const {
        eventCategory='',
        description='',
        startDate='',
        endDate='',
        title='',
        address='',
        nameOfPlace=''
    } = props;

    const getDateText = () => {
        const dateObject = new Date(startDate)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September",
                    "October", "November", "December"];
        const dateText = days[dateObject.getDay()]+" "+months[dateObject.getMonth()]
                    + " " + dateObject.getDate() + " " +dateObject.getFullYear();

        console.log(dateText)
        return dateText;
    }

    return(
        <Card className="card" >
            <Card.Img variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
            <div className="card-body">
                <p className="date">{getDateText()}</p>
                <h2 className="card-title">{title}</h2>
                {/* <p className="body-content">{description}</p> */}
                <Button variant="outline-primary">
                    <i className="fa fa-chevron-right"></i> Find out more
                </Button>
            </div>
        </Card>
    );
}

TestCard.propTypes = {
    eventCategory: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    nameOfPlace: PropTypes.string
};

export default TestCard;

