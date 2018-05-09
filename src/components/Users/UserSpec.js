import React, { Component } from 'react';
import * as config from './../../constants/config';
import { Link } from 'react-router-dom';

class UserSpec extends Component {
	
	onDelete (id) {
		this.props.onDelete(id);
	}

	render() {
		var {user, index} = this.props;
		console.log(typeof user.actived);
		return (
			<tr className="text-center">
				<td>{index+1}</td>
				<td>{user.username}</td>
				<td>{user.firstname}</td>
				<td>{user.lastname}</td>
				<td>{user.email}</td>
				<td>
					<span className={(user.gender === 1 )? 'label label-danger':'label label-info'}>
						{(user.gender === 1 )? 'Female':'Male'}
					</span> 
				</td>
				<td>
					<span className="label label-success">
						{(user.actived === config.ACTIVED)? 'Actived':''}
					</span>
				</td>
				<td>{user.created_at}</td>
				<td>
					<Link to={`users/${user.id}/edit`} className="btn btn-success margin-right-10">
						Edit
					</Link>
					<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(user.id)}>Delete</button>
				</td>
			</tr>
		);
	}
}

export default UserSpec;
