import React, { Component } from 'react';
import './App.css';

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
            <div>
            <div>
            <div className='event'>
            <div className='title'>{event.summary}</div>
            <div className='startDateTime'>{event.start.dateTime}</div>
            <div className='location'>{event.location}</div>
            <button className={`${collapsed ? 'show' : 'hide'}-details`}
                    onClick={this.handleClick}
                >{collapsed? 'Show Details' : 'Hide Details'}
                </button>

            {!collapsed && (
            <div className="extra-details">
            <div>About the event:</div>
            <a className='linkColor' href={event.htmlLink} rel="noreferrer" target="_blank">
              See details on Google Calendar
            </a>
            <div className="event-description">{event.description}</div>
          </div>
        )}
        </div>
        </div>
        </div>
        )
    }
}

export default Event;