import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';

class UserAddPage extends Component {
    constructor(props){
		super(props);
		this.state = {
			id: '',
			txtUserName: '',
			txtFirstName: '',
			txtLastName: '',
			txtEmail: '',
			txtPassword: '',
			txtgender: "0",
			txtchbox: false
		};
		this.onSave = this.onSave.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			/*
			 * Get id from URL
			 */ 
			var id = match.params.id;
			callApi('GET', config.APP_URL+'/edit/'+id, null).then(res => {
				var data = res.data;
				// console.log(data);
				this.setState({
					id: data.id,
					txtUserName: data.username,
					txtFirstName: data.firstname,
					txtLastName: data.lastname,
					txtEmail: data.email,
					txtPassword: data.password,
					txtgender: data.gender,
					txtchbox: data.actived
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

	onSave (event) {
		event.preventDefault();
		var {history} = this.props;
        var {id, txtUserName, txtFirstName, txtLastName,txtEmail,txtPassword, txtchbox, txtgender} = this.state;
		var data = {username: txtUserName, firstname: txtFirstName, lastname: txtLastName, email: txtEmail, password: txtPassword, gender: txtgender, active: txtchbox};
		console.log(data);
		if(id) { //update
			callApi('PUT', config.APP_URL+'/update/'+ id, data).then( res => {
				console.log('update');
				history.push("/users");
			});
		} else { //create
			callApi('POST', config.APP_URL+'/store', data).then( res => {
				// console.log(res);
				history.push("/users");
			});
		}
	}

	render() {
		return (
			<div>
				<div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
					<form onSubmit={this.onSave}>
						<legend>Form title</legend>
					
						<div className="form-group">
							<label>UserName</label>
							<input 
								type="text" 
								className="form-control" 
								value={this.state.txtUserName} 
								onChange={this.onChangeFrom} 
								name="txtUserName" 
								placeholder="UserName"/>
						</div>
						<div className="form-group">
							<label>FirstName</label>
							<input 
								type="text" 
								className="form-control" 
								value={this.state.txtFirstName} 
								onChange={this.onChangeFrom} 
								name="txtFirstName" 
								placeholder="FirstName"/>
						</div>
						<div className="form-group">
							<label>LastName</label>
							<input 
								type="text" 
								className="form-control" 
								value={this.state.txtLastName} 
								onChange={this.onChangeFrom} 
								name="txtLastName" 
								placeholder="LastName"/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input 
								type="text" 
								className="form-control" 
								value={this.state.txtEmail} 
								onChange={this.onChangeFrom} 
								name="txtEmail" 
								placeholder="Email"/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input 
								type="password" 
								className="form-control" 
								value={this.state.txtPassword} 
								onChange={this.onChangeFrom} 
								name="txtPassword" 
								placeholder="Password"/>
						</div>
						<div className="form-group">
							<div className="checkbox">
								<label>
									<input 
										type="checkbox" 
										value={this.state.txtchbox} 
										onChange={this.onChangeFrom} 
										name="txtchbox"/>
									Active
								</label>
							</div>
						</div>
	<br/>
						<div className="form-group">
							<div className="Radio">
								<label>
									<input 
										type="radio" 
										value="0" 
										checked="checked"
										onChange={this.onChangeFrom} 
										name="txtgender"/> Male
									<input 
										type="radio" 
										value="1"  
										onChange={this.onChangeFrom} 
										name="txtgender"/> Female
									
								</label>
							</div>
						</div>
						<button type="submit" className="btn btn-primary margin-right-10">Save</button>
						<Link to="/users" className="btn btn-success">
								Back
						</Link>
					</form>
				</div>
			</div>
		);
	} // end render

}

export default UserAddPage;