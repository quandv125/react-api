import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSpec extends Component {
	
	onDelete (id) {
		this.props.onDelete(id);
	}

	render() {
		var {user, index} = this.props;
		return (
			<tr className="text-center">
				<td>{index+1}</td>
				<td>{user.username}</td>
				<td>{user.firstname}</td>
				<td>{user.lastname}</td>
				<td>{user.email}</td>
				<td><span class={(user.gender === 0)? 'label label-info':'label label-danger'}>{(user.gender === 0)? 'Male':'Female'}</span> </td>
				<td>
					<span class="label label-success">{(!user.actived === true)? 'Actived':''}</span>
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
