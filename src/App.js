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
          numberOfEvents: this.state.numberOfEvents,
        })
      }
      let locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location)
      let shortEventsList = locationEvents.slice(0, this.state.numberOfEvents)
       if(this.mounted) {this.setState({
          numberOfEvents: eventCount,
          events: shortEventsList
        })};
        });
  }

  render() {
  return (

    <Container className='App'>
      <Row>

     <Col> <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/></Col>
     <Col><NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents}/></Col>

      <Col><h1>Upcoming Career Foundry Events</h1></Col>
      
      <EventList events={this.state.events}/>
    </Row>
    </Container>
    );
  }
}

export default App;