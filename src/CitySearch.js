import React, { Component } from 'react';
import { InfoAlert } from './Alert.js';
import { Container, Row } from 'react-bootstrap';

class CitySearch extends Component {

    constructor() {
        super();

        this.state = {
            query: '',
            suggestions: [],
            showSuggestions: undefined,
            infoText:''
        }
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({showSuggestions:true});
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
        if (suggestions.length === 0) {
            this.setState({
                showSuggestions: false,
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city.'
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText:''
            })
        }
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: ''
        });

        this.props.updateEvents(suggestion, undefined);
    }

    render() {
        return <Container className='CitySearch'>
            <Row> <input
                type='text'
                className='city'
                placeholder='Choose your city'
                value={this.state.query}
                onChange={this.handleInputChange}
                onFocus={() => {this.setState ({ showSuggestions: true})}}
            /></Row>
            <ul className='suggestions'
                style={this.state.showSuggestions 
                ? {}
                : {display: 'none'}}>
                {this.state.suggestions.map((suggestion) => (
                    <li key={suggestion}
                        onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                ))}
                <li key='all'
                    onClick={() => this.handleItemClicked('all')}>
                    <b>See all cities</b>
                </li>
            </ul>
            <Row><InfoAlert id='infoAlert' text={this.state.infoText} /></Row>
        </Container>
    }
}

export default CitySearch;