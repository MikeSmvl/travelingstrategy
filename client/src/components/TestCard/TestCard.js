import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import './TestCard.css'
import PropTypes from 'prop-types';


const TestCard = (props) =>{
    const [modal, setModal] = useState(false);
    const {
        eventCategory='',
        description='',
        startDate='',
        endDate='',
        title='',
        address='',
        nameOfPlace='',
        duration ='0',
    } = props;
    

    const getDateText = (date) => {
        const dateObject = new Date(date)
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April",
                    "May", "June", "July", "August", "September",
                    "October", "November", "December"];
        const dateText = days[dateObject.getDay()]+" "+months[dateObject.getMonth()]
                    + " " + dateObject.getDate() + " " +dateObject.getFullYear();

        return dateText;
    }
    
    const sentenceToDisplay = (duration, monthOrDaysOrHours) =>{
        var truncatedDuration = Math.trunc(duration)
        if(truncatedDuration >1){
            return truncatedDuration +" "+monthOrDaysOrHours +"s";
        }
        return truncatedDuration +" "+monthOrDaysOrHours;
    }

    const getDuration = () => {
        console.log(duration)
        var durationToDisplay = duration/60;

        if(durationToDisplay > 60){
            durationToDisplay = durationToDisplay/60;
            if (durationToDisplay > 24){
                durationToDisplay = durationToDisplay/24;
                if(durationToDisplay > 30){
                    durationToDisplay = durationToDisplay/30;
                    return sentenceToDisplay(durationToDisplay,"month")
                }
                return sentenceToDisplay(durationToDisplay,"day")
            }
            return sentenceToDisplay(durationToDisplay,"hour")
        }
        return sentenceToDisplay(durationToDisplay,"minute")
    }


    const InfoModal = () => {
        return(
            <Modal
            show={modal}
            onHide={() => setModal(false)}
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    <h2 className="card-title">{title}</h2>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img variant="top" src="https://source.unsplash.com/user/erondu/600x400" className="more-info-img"/>
                    <div className="card-body">
                        <p className="date"><b>Start Date: </b>{getDateText(startDate)}</p>
                        <p className="date"><b>End Date:</b> {getDateText(endDate)}</p>
                        {address!=='' && <p>
                                            <b>Address: </b>{address}
                                        </p>
                        }
                        {nameOfPlace!=='' && <p>
                                            <b>Venue Name: </b>{nameOfPlace}
                                        </p>
                        }
                        {duration!=='0' && <p>
                                            <b>Duration: </b>{getDuration()}
                                        </p>
                        }
                        <p className="body-content-modal">{description}</p>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }

    const EventCard = () => {
        return(
            <Card className="card" >
                <Card.Img variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                <div className="card-body">
                    <p className="date">{getDateText(startDate)}</p>
                    <h2 className="card-title">{title}</h2>
                    {/* <p className="body-content">{description}</p> */}
                    <Button variant="outline-primary" onClick={() => setModal(true)}>
                        <i className="fa fa-chevron-right"></i> Find out more
                    </Button>
                </div>
            </Card>
        );

    }

    return(
        <>
        <EventCard></EventCard>
        <InfoModal></InfoModal>
      </>
    );

}


TestCard.propTypes = {
    eventCategory: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    nameOfPlace: PropTypes.string,
    duration: PropTypes.string
};

export default TestCard;

