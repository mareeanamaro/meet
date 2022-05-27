import {Component} from 'react';
import './App.css';
import './nprogress.css';

import { Container, Row, Col } from 'react-bootstrap';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert.js';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Sector, Cell, } from 'recharts';


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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    })
    return data;
  };



  render() {

    console.log(this.state);

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
      <Row className="align-content-center align-items-space-around charts">
        <Col md={5}>
         <center>
           <h3 className='m-3'>Events by Topic</h3>
         </center>
        <EventGenre events={this.state.events} />
        </Col>
        <Col md={7}>
        <center>
          <h3 className='m-3'># of Events by City</h3>
        </center>
        <ResponsiveContainer height={400} >
        <ScatterChart
          height={400}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city"/>
          <YAxis type="number" dataKey="number"  name="number of events" allowDecimals={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#008AA1" />
        </ScatterChart>
        </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <center>
       <h2 className='eventsListTitle m-5'>Full List of Events</h2>
      </center>
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