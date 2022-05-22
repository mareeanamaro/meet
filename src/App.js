import {Component} from 'react';
import './App.css';
import './nprogress.css';

import { Container, Row, Col } from 'react-bootstrap';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { getEvents, extractLocations } from './api';

class App extends Component {
  state = {
    locations: [],
    numberOfEvents: 32,
    events: [],
    location: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events) });
      }
    });
  }
  
  componentWillUnmount(){
    this.mounted = false;
  }

  updateNumberOfEvents = (eventNumber) => {
    this.setState(
      {
        numberOfEvents: eventNumber,
      });
      this.updateEvents(this.state.location, eventNumber);
}

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      if (eventCount !== undefined && this.mounted) {
        this.setState({
          numberOfEvents: eventCount,
        })
      }
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location)
      let shortEventsList = locationEvents.slice(0, this.state.numberOfEvents)
       if(this.mounted) {this.setState({
          events: shortEventsList
        })};
        });
  }

  render() {
  return (
<>
    <Container className='App main-view justify-content-md-center'>
      <Row>
        <Col>
          <h1>Upcoming Career Foundry Events</h1>
          <p>Search for web development events in your city!</p>
        </Col>
    </Row>
       <Row>
          <Col className='center-content'>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
          </Col>
        </Row> 

        <Row>
          <Col className='center-content'>
            <NumberOfEvents eventCount={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          </Col>
         </Row>
    </Container>
    <Container fluid>
        <Row className='justify-content-md-center'>
        <Col xs={12} md={8}>
        <EventList events={this.state.events}/>
        </Col>
        </Row>
        </Container>
    </>
    );
  }
}

export default App;