import {Component} from 'react';
import './App.css';
import './nprogress.css';

import { Container, Row, Col } from 'react-bootstrap';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert.js';

class App extends Component {
  state = {
    locations: [],
    numberOfEvents: 32,
    events: [],
    location: 'all',
    offlineText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken).error ? false : true);
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({showWelcomeScreen: !code || isTokenValid});
    
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events) });
      }
    });
  }
  
    if (!navigator.onLine) {
      this.setState({
        offlineText:
        'You are offline. The displayed events may not be up to date.'
      });
    } else {
      this.setState({
        offlineText: ''
      });
    }
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

    // if (this.state.showWelcomeScreen === undefined) return <Container
    // className="App" />
 
  return (
<>
    <Container className='App main-view justify-content-md-center'>
      <Row>
        <Col>
          <h1>Meet App</h1>
          <p>Search for web development events in your city!</p>
        </Col>
    </Row>
       <Row>
          <Col md={4}><OfflineAlert text={this.state.offlineText}/></Col>
          <Col md={4} className='mt-3'>
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
          </Col>
          <Col md={4} className=''>
            <NumberOfEvents eventCount={this.state.numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents}/>
          </Col>
         </Row>
    </Container>
    <Container>
      <Row>
        <Col></Col>
      </Row>
    </Container>
    <Container fluid>
        <Row className='justify-content-md-center'>
        <Col xs={12} md={8}>
        <EventList events={this.state.events}/>
        </Col>
        </Row>
        {/* <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
                       getAccessToken={() => { getAccessToken() }} /> */}
        </Container>
    </>
    );
  }
}

export default App;