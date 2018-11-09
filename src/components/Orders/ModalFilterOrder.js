import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

class ModalOrder extends Component {
    constructor(props){
		super(props);
		this.state = {
            note: '',
            start_date: '',
            end_date: '',
            startDate: null,
            endDate: null
        };
    }

    handleChange = (date) => {
		const valueOfInput = date.format('YYYY_MM_DD');
		this.setState({
			start_date: valueOfInput,
		  	startDate: date
		});
    }

    handleChangeEnd = (date) => {
        const valueOfInput = date.format('YYYY_MM_DD');
        this.setState({
            end_date: valueOfInput,
            endDate: date
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

    onClick () {
        var {startDate, start_date, endDate, end_date} = this.state;
        var a = new Date(startDate);
        var b = new Date(endDate);
		if( a > b ){
			Swal('Vui lòng chọn ngày khám lại	!','','error');
			return false;
        } else if(!start_date){
            Swal('Vui lòng chọn ngày khám lại	!','','error');
			return false;
        }
        else {
            var data = { start: start_date, end: end_date}
            this.props.action( data )
        }
         
    }

    render() {
        var { order_id }  = this.props;
        return (
            <div>
                <h2>Chọn thời gian</h2>
                <p>
                    Lọc bênh nhân, danh mục, thời gian thăm khám
                </p>
                    
                    <div className="col-md-6">
                        <DatePicker
                            className="form-control"
                            placeholderText="VD: 25/10/2018"
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="col-md-6">
                        <DatePicker
                            className="form-control"
                            placeholderText="VD: 25/10/2018"
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                        />
                        </div>
                        <div className="clearfix"></div><br/>
                    
                <p>
                    <Button 
                        className="btn btn-primary" 
                        variant="contained" 
                        color="secondary" 
                        onClick={ () => { this.onClick(order_id) } }
                        >OK</Button>
                </p>
            </div>
        );
    }
}

export default ModalOrder;