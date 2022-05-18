import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

class Event extends Component {

    constructor() {
        super();

        this.state = {
           collapsed: true
        }
    }

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {

        const { event } = this.props;
        const { collapsed } = this.state;

        return (
            <Card className='event '>
            <Card.Title className='title'>{event.summary}</Card.Title>
            <Card.Body className='startDateTime'>{event.start.dateTime}</Card.Body>
            <Card.Body className='location'>{event.location}</Card.Body>
            <Button className={`${collapsed ? 'show' : 'hide'}-details`}
                    onClick={this.handleClick}
                >{collapsed? 'Show Details' : 'Hide Details'}
                </Button>

            {!collapsed && (
            <div className="extra-details">
            <Card.Body>About the event:</Card.Body>
            <a href={event.htmlLink} rel="noreferrer" target="_blank">
              See details on Google Calendar
            </a>
            <Card.Body className="event-description">{event.description}</Card.Body>
          </div>
        )}
        </Card>
        )
    }
}

export default Event;