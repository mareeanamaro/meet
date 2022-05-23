import React, { Component } from 'react';
import { InfoAlert } from './Alert.js';

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
                infoText: "We can't find this city."
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
        return <div className='CitySearch'>
                <input
                type='text'
                className='city'
                placeholder='Choose your city'
                value={this.state.query}
                onChange={this.handleInputChange}
                onFocus={() => {this.setState ({ showSuggestions: true})}}
            />
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
            <InfoAlert id='infoAlert' text={this.state.infoText} />
        </div>
    }
}

export default CitySearch;