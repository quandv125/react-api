import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';

class ModalOrder extends Component {
    constructor(props){
		super(props);
		this.state = {
            note: '',
            time: '',
			startDate: null,
        };
    }

    handleChange = (date) => {
		const valueOfInput = date.format('YYYY-MM-DD H:mm:ss');
		this.setState({
			time: valueOfInput,
		  	startDate: date
		});
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

    onClick (id) {
        var data = { time: this.state.time, note: this.state.note}
        this.props.action(id, data)
    }

    render() {
        var { order_id }  = this.props;
        return (
            <div>
                <h2>Service</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                    <div className="form-group">
                        <label>note</label>
                        <DatePicker
                            className="form-control"
                            dateFormat="DD/MM/YYYY"
                            placeholderText="Ex: 25/10/2018"
                            name="time" 
                            minDate={moment()}
                          
                            withPortal
                            locale="en-gb"
                            selected={this.state.startDate}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>note</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.note}
                            onChange={this.onChangeForm} 
                            name="note" 
                            placeholder="note"/>
                    </div>
                <p>
                    <Button 
                        className="btn btn-primary" 
                        variant="contained" 
                        color="secondary" 
                        onClick={ () => { this.onClick(order_id) } }
                        >Set Time</Button>
                </p>
            </div>
        );
    }
}

export default ModalOrder;