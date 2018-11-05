import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
// import axios from 'axios';
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';
import * as config from '../../constants/config';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Swal from 'sweetalert2'

class SmsActionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// image: '',
			name: '',
			// loggedOut: false,
			checkedA: true,
			checkedB: true,
			selectedValue: 'a',
			selectOption: '',
			
		}
		// this.onFormSubmit = this.onFormSubmit.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	onDelete (id) {
        Swal({
            title: 'Are you sure?',
            text: "Are you sure you wish to delete this item?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.value) {
                this.props.onDelete(id);
            }
        })
	}

	handleChange = name => event => {
		// Input, checkbox, Radio, Select
		var value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
		this.setState({
			[name]: value
		});
	};

	handleClick = () => {
		console.log(this.state);
	}
	
	// componentWillReceiveProps(nextprops) {
    //     this.setState({
    //         loggedOut: nextprops.authentication.loggedOut
    //     });
    // }

	render() {
		// if(this.state.loggedOut){
		// 	return <Redirect to={{ pathname: "/"}}/>;
		// }
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple ">
					<div className="grid-body no-border">
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
						<h2>SMS add</h2>
						<Button variant="contained" color="primary" onClick={this.handleClick}>
							Primary
						</Button>
						<Button variant="fab"  color="secondary" aria-label="Add">
						<i className="material-icons">add</i>
						</Button>
						<div className="clearfix"></div> <br/>
						<TextField
							label="Name"
							value={this.state.name}
							name="input1"
							onChange={this.handleChange('name')}
						/>
						<div className="clearfix"></div> <br/>
					{/* Checkbox */}
						<Checkbox
							checked={this.state.checkedA}
							onChange={this.handleChange('checkedA')}
							value="checkedA"
						/>
						<Checkbox
							checked={this.state.checkedB}
							onChange={this.handleChange('checkedB')}
							value="checkedB"
							color="primary"
						/>
						<div className="clearfix"></div> <br/>
					{/* Radio */}
						<Radio
							checked={this.state.selectedValue === 'a'}
							onChange={this.handleChange('selectedValue')}
							value="a"
							name="radio-button-demo"
							aria-label="A"
						/>

						<Radio
							checked={this.state.selectedValue === 'b'}
							onChange={this.handleChange('selectedValue')}
							value="b"
							name="radio-button-demo"
							aria-label="B"
						/>
							
						<Radio
							checked={this.state.selectedValue === 'd'}
							onChange={this.handleChange('selectedValue')}
							value="d"
							color="default"
							name="radio-button-demo"
							aria-label="D"
						/>
					<div className="clearfix"></div> <br/>
					{/* Select */}
						<Select
							value={this.state.selectOption}
							onChange={this.handleChange('selectOption')}
							
						>
							<MenuItem value=""><em>None</em></MenuItem>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</div>    
				</div></div>
			</CSSTransitionGroup>

		)
	}
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps, null)(SmsActionPage);




