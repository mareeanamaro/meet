import React, {Component} from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);

        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            fontSize: '16px'
        }
    }

    render() {
        return (
            <div className='alert'>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    }

}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'lightBlue'
    }
}

class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'yellow'
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'white'
    }
}

export { InfoAlert, ErrorAlert, OfflineAlert };