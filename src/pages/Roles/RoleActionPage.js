import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Validator from 'react-forms-validator';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
import Button from '@material-ui/core/Button';

class RoleActionPage extends Component {

	constructor(props){
		super(props);
		this.state = {
			id: '',
			name: '',
			display_name: '',
			description: '',
			submitted: false,
			isFormValidationErrors : true
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.isValidationError = this.isValidationError.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			console.log(config.ROLE_URL + "/" +id);
			callApi('GET', config.ROLE_URL + "/" +id, null).then(res => {
				var data = res.data.data;
				console.log(data);
				this.setState({
					id: data.id,
					name: data.name ? data.name : '',
					display_name: data.display_name ? data.display_name : '',
					description: data.description ? data.description : ''
				});
			});
		}
	}

	onChangeFrom (event) {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

	isValidationError(flag){
		this.setState({isFormValidationErrors:flag});
	}

	handleFormSubmit (event) {
		event.preventDefault();
		this.setState( { submitted:true } );
		let { isFormValidationErrors } = this.state;
		if ( !isFormValidationErrors ){
			var {history} = this.props;
			var {id, name, description, display_name} = this.state;
			var data = { name: name, description: description, display_name };
			if( id ) { //update
				callApi('PUT', config.ROLE_URL  + "/" + id, data).then( res => {
					history.push("/role");
				});
			} else { //create
				callApi('POST', config.ROLE_URL, data ).then( res => {
					history.goBack();
				});
			}
		}
	}

	render() {
		return (

			<CSSTransitionGroup transitionName="worksTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>

				<div className="grid simple ">
					<div className="grid-body no-border">
						<Link to="/role" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link>
						<div className="clearfix"></div>
						
						<div className="col-lg-3 col-sm-3 col-xs-3 col-md-3"></div>
						<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
							<form noValidate onSubmit={this.handleFormSubmit}>
							
								<div className="form-group">
									<label>Chức danh</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.name} 
										onChange={this.onChangeFrom} 
										name="name" 
										placeholder="Chức danh"/>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{name : this.state.name}}
										validationRules={{required:true, maxLength:50}} 
										validationMessages={{ required: "This field is required", maxLength: "Not a valid Max length: 10 "}}/>
							
								</div>
								<div className="form-group">
									<label>Tên hiển thị</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.display_name} 
										onChange={this.onChangeFrom} 
										name="display_name" 
										placeholder="Tên hiện thị"/>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{display_name : this.state.display_name}}
										validationRules={{required:true }} 
										validationMessages={{ required: "This field is required"}}/>
							
								</div>
								<div className="form-group">
									<label>Mô tả</label>
									<input 
										type="text" 
										className="form-control" 
										value={this.state.description} 
										onChange={this.onChangeFrom} 
										name="description" 
										placeholder="Mô tả"/>
									<Validator 
										isValidationError={this.isValidationError}
										isFormSubmitted={this.state.submitted} 
										reference={{description : this.state.description}}
										validationRules={{required:true }} 
										validationMessages={{ required: "This field is required"}}/>
							
								</div>
							
								<Button type="submit" variant="contained" color="primary">Save</Button>

							</form>
						</div>
						
					</div>
				</div>
			</CSSTransitionGroup>
		);
	} // end render

	
}

export default RoleActionPage;
