import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			loggedOut: false
		}
		// this.onFormSubmit = this.onFormSubmit.bind(this)
		// this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
    }

	// onFormSubmit(e) {
	// 	e.preventDefault()

	// 	// const formData = {file: this.state.image, name: 'quan'}

	// 	// axios.post('http://127.0.0.1:8000/api/v2/user/upload', formData
	// 	// ).then(function (response) {
	// 	// 	console.log(response);
	// 	// })
	// 	// .catch(function (error) {
	// 	// 	console.log(error);
	// 	// });

	// }
	// onChange(e) {
	// 	// let files = e.target.files || e.dataTransfer.files;
	// 	// if (!files.length)
	// 	// 	return;
	// 	// this.createImage(files[0]);
	// }
	// createImage(file) {
	// 	let reader = new FileReader();
	// 	reader.onload = (e) => {
	// 		this.setState({
	// 			image: e.target.result
	// 		})
	// 	};
	// 	reader.readAsDataURL(file);
	// }
	

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		
		return (
			
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				About
				{/* <form onSubmit={this.onFormSubmit}>
					
					<input type="file" onChange={this.onChange} />
					<br/>
					<button type="submit">Upload</button>
				</form> */}
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}


export default connect(mapStateToProps, null)(About);