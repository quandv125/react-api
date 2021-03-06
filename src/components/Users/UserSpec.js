import React, { Component } from 'react';
import * as config from './../../constants/config';
import { Link } from 'react-router-dom';

class UserSpec extends Component {
	//test
	onDelete (id) {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDelete(id);
		}
	}
	render() {
		var {user, index} = this.props;
		return (
			<tr className="text-center">
				<td>{index+1}</td>
				<td>
					{/* <img src={`http://127.0.0.1:8000/images/thumbnails/150_${ user.avatar ? user.avatar : "placeholder.jpg"}`} className="img-responsive width50px" alt={user.picture}/> */}
				</td>
				<td>{user.username}</td>
				<td>{user.firstname}</td>
				<td>{user.lastname}</td>
				<td>{user.email}</td>
				<td>{user.created_at}</td>
				<td>{user.phone}</td>
				<td>{user.address}</td>
				<td>
					<span className={( user.gender === config.GENDER_FEMALE  ) ? 'label label-danger':'label label-info'}>
						{( user.gender === config.GENDER_FEMALE ) ? 'Female':'Male'}
					</span> 
				</td>
				<td>
					<span className="label label-success">
						{(user.is_active === config.ACTIVED)? 'Actived':''}
					</span>
				</td>
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
