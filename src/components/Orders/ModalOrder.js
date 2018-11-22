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

    onhandleFinish (id) {
       
        this.props.onhandleFinish(id)
    }

    render() {
        var { order_id }  = this.props;
        return (
            <div>
                <h2>Chọn thời gian khám lại</h2>
                <p>
                    Đặt lịch/ thời gian khám lại cho bệnh nhân. Bệnh nhân sẽ nhận được tin nhắn thông báo lịch khám lại trước 1 ngày
                </p>
                    <div className="form-group">
                        <label>Ngày</label>
                        <DatePicker
                            className="form-control"
                            dateFormat="DD/MM/YYYY"
                            placeholderText="VD: 25/10/2018"
                            name="time" 
                            minDate={moment()}
                          
                            withPortal
                            locale="en-gb"
                            selected={this.state.startDate}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Ghi chú</label>
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
                        >Cài đặt thời gian</Button>
                      <Button 
                        className="btn btn-primary float-right" 
                        variant="contained" 
                        color="primary" 
                        onClick={ () => { this.onhandleFinish(order_id) } }
                        >Không khám lại</Button>
                </p>
              
            </div>
        );
    }
}

export default ModalOrder;