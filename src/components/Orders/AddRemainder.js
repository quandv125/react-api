import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';

class AddRemainder extends Component {
    constructor(props){
		super(props);
		this.state = {
            date_remain: '',
			startDate: null,
        };
    }

    handleChange = (date) => {
		const valueOfInput = date.format('YYYY-MM-DD H:mm:ss');
		this.setState({
			date_remain: valueOfInput,
		  	startDate: date
		});
    }

    handleAddRemain = (event) => {
        event.preventDefault();
        this.props.handleAddRemain(this.state);
	}
	
	handleSendSmsRemain = (event) => {
		event.preventDefault();
		this.props.handleSendSmsRemain();
	}

	handleDeleteRemain = (event) => {
		event.preventDefault();
		this.props.handleDeleteRemain();
	}
    
    remainder = (date_remain) => {
		var date = null;
		if(typeof date_remain !== 'undefined' && date_remain.length > 1){
			var from = date_remain.slice(0,10).split("-");
			date = from[2]+'/'+from[1]+'/'+from[0];
		}
		return date;
	}

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Add Date for remain</h4>
									</div>
									<div className="grid-body no-border">
										<div className="col-lg-6 col-md-6">
										<div className="form-group">
											<DatePicker
                                                className="form-control"
												dateFormat="DD/MM/YYYY"
												placeholderText="Ex: 25/10/2018"
                                                name="date_remain" 
                                                minDate={moment()}
												// monthsShown={2}
												// showTimeSelect
												// timeFormat="HH:mm"
												// timeIntervals={15}
												// timeCaption="time"
                                                withPortal
                                                locale="en-gb"
												selected={this.state.startDate}
												onChange={this.handleChange} 
											/>

											</div>
										</div>
										<div className="col-lg-6 col-md-6">
											<Button className="btn btn-primary btn-cons" variant="contained" color="primary" onClick={this.handleAddRemain}>
												Add Remain &nbsp; <i className="material-icons">date_range</i>
											</Button>
										</div>
									
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Remain of the day</h4>
									</div>
									<div className="grid-body no-border">
										{this.props.date_remain.length >= 10 && this.props.date_remain !== '0000-00-00 00:00:00' &&
											<div>
													<span className="margin-right20">
														Remainder time is: {this.remainder(this.props.date_remain)}
													</span>
													<span className="margin-right20">
														<Button className="btn btn-primary btn-cons" variant="contained" color="primary" onClick={this.handleSendSmsRemain}>
															Send Now &nbsp; <i className="material-icons">send</i>
														</Button>
													</span>
													<Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={this.handleDeleteRemain}>
														Delete &nbsp; <i className="material-icons">delete</i>
													</Button>
											</div>	
										}		
									</div>
								</div>
							</div>
						</div>
					</div>		
            </React.Fragment>
        );
    }
}

export default AddRemainder;