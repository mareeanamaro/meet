import React, { Component } from 'react';
import { ErrorAlert } from './Alert.js';

class NumberOfEvents extends Component {

    state = {
        errorText: '',
        warningText: ''
      };

    handleChange = (event) => {
        let value = event.target.value;
        if (value === '') {value = undefined};
        if (value <=0) {
            this.setState({
                errorText: 'Please enter a number higher than 0'
            })
        } 
        else if(value > 99) {
            this.props.updateNumberOfEvents(value);
            this.setState({
                warningText: 'Lower the number of visible event for faster app performance'
            })
        } 
        else {
            this.props.updateNumberOfEvents(value);
            this.setState({
                errorText:'',
                warningText: ''
            });  
        }
    }

    render() {
        return (
            <div className='numberOfEvents'>
               
                <input type='number'
                className='number-of-events'
                value={this.props.eventCount} 
                onChange={(event) => this.handleChange(event)}>
                </input>
                <ErrorAlert id='errorAlert' text={this.state.errorText} />
                {/* <WarningAlert id='warningAlert' text={this.state.warningText} /> */}
                
            </div>
        )
      }
}

export default NumberOfEvents;