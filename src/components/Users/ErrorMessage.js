import React, { Component } from 'react';
class ErrorMessage extends Component {
    render() {
        var element = null;
        if(this.props.messages && this.props.messages.users) {
            var info = this.props.messages.users[0];
            var messages = Object.keys(info).map(function (key) { return info[key]; });
            element = messages.map((message, index) => {
                return message.map( (msg, i) => {
                    return   <div key={i}> {msg}  </div>;
                });
            });
        }
        return (
            <div className="alert alert-danger">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                {element}
            </div>
        );
    }
}

export default ErrorMessage;