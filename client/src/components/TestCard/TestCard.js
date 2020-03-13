import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './TestCard.css'

const TestCard = (props) =>{
    return(
        <Card className="card" >
            <Card.Img variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
            <div className="card-body">
                <p className="date">March 20 2015</p>
                
                <h2>CNN Acquire BEME}</h2>
                
                <p className="body-content">CNN purchased Casey Neistat's Beme app for $25million.</p>
                
                <button className="button-primary">
                    <i className="fa fa-chevron-right"></i> Find out more
                </button>
            </div>
        </Card>
    );
}

export default TestCard;

