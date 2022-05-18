import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        number:32,
      };

    handleChange(event) {
        this.setState({
            number: event.target.value
        });
        this.props.updateNumberOfEvents(event.target.value);
    }

    render() {
        return (
            <div>
                <input type='number'
                className='number-of-events'
                value={this.state.number} 
                onChange={(event) => this.handleChange(event)}>
                </input>
            </div>
        )
      }
}

export default NumberOfEvents;


// import React, { useState } from 'react';

// const NumberOfEvents = ({ updateNumberOfEvents }) => {
//     const [num, setNum] = useState(32)
//     const handleChange = (event) => {
//         const eventNumber = event.target.value
//         setNum(eventNumber);
//         return updateNumberOfEvents(eventNumber);
//     }

//     return (
//         <div>
//             <input type='number'
//                 className='number-of-events'
//                 defaultValue={num}
//                 onChange={handleChange}>
//             </input>
//         </div>
//     )
// }


// export default NumberOfEvents;