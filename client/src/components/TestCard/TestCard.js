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
        duration ='',
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
                        <p className="date"><b>{getDateText()}</b></p>
                        {address!=='' && <p>
                                            <b>Address:</b>{address}
                                        </p>
                        }
                        {nameOfPlace!=='' && <p>
                                            <b>Venue Name:</b>{nameOfPlace}
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
                    <p className="date">{getDateText()}</p>
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

