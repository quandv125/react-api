import React, { Component } from 'react';
import axios from 'axios';

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: ''
		}
		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	onFormSubmit(e) {
		e.preventDefault()

		const formData = {file: this.state.image, name: 'quan'}

		axios.post('http://127.0.0.1:8000/api/v2/user/upload', formData
		).then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	}
	onChange(e) {
		let files = e.target.files || e.dataTransfer.files;
		if (!files.length)
			return;
		this.createImage(files[0]);
	}
	createImage(file) {
		let reader = new FileReader();
		reader.onload = (e) => {
			this.setState({
				image: e.target.result
			})
		};
		reader.readAsDataURL(file);
	}
	

	render() {
		return (
			
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				
				<form onSubmit={this.onFormSubmit}>
					
					<input type="file" onChange={this.onChange} />
					<br/>
					<button type="submit">Upload</button>
				</form>
			</div>
		)
	}
}

export default About;
