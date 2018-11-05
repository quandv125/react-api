import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import callApi from './../../utils/apiCaller';
import * as config from './../../constants/config';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import {findIndex,isEmpty} from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP,
			width: 500,
		},
	},
};

class Permission extends Component {

    constructor (props) {
        super(props)
        this.state = {
			permissions: [],
			name: [],
			role_id: null
        }
	}

	componentDidMount(){
		var {match} = this.props;
		if(match) {
			var id = match.params.id;
			this.setState({
				role_id: id
			});
			callApi('GET', config.PERMISSION_URL, null).then( res => {
				if( res && res.data.status){
					this.setState({
						permissions: res.data.data
					});
				}
			});

			callApi('GET', config.ROLES_URL + 'role-permission/' + id, null).then( res => {
				if( res && res.data.status){
					this.setState({
						name: res.data.data
					});
				}
			});
		}
	}
	
	onhandleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	
	handleChange = event => {
		this.setState({ name: event.target.value });
	};

    handleFormSubmit = (event) => {
		event.preventDefault();
		var array = [];
		var { role_id, name } = this.state;
		for (var i = 0; i < name.length; i++) {
			var position = (findIndex(this.state.permissions, { 'name': name[i] }));
			if(position !== -1) {
				if(this.state.permissions[position] && this.state.permissions[position].id){
					array.push({role_id: role_id, permission_id: this.state.permissions[position].id});
				}
			}
		}
        if ( !isEmpty(array) ){
			var data = {
				role_id: role_id, 
				role_permissions: array
			};
			callApi('POST', config.PERMISSIONS_URL + "role_permissions", data).then( res => {
                if(res && res.data.status){
					Swal(' Good job!', '', 'success')
                }
            });
        } else {
            Swal('Oops...', 'Something went wrong! ', 'error')
        }
	}
	
	showCheckbox ( name ) {
		if( name.parent_id !== 0) {
			return (<Checkbox checked={this.state.name.indexOf(name.name) > -1} />);
		} else {
			return null;
		}
	}

	showList(permissions){
		var result = null;
		if(permissions && permissions.length > 0){
			result = permissions.map((name, index) => (
				<MenuItem key={name.id} index={index} value={name.name}>
					{ this.showCheckbox(name) }
					<ListItemText primary={name.display_name} />
				</MenuItem>
			))
			return result;
		}
		return result;
	}

    render() {
		var {permissions} = this.state;
		
        return (
            <React.Fragment>
                <CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
                    <div className="grid simple">
						<div className="grid-body no-border">
							<Link to="/role" className="margin-right20">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								<i className="material-icons">arrow_back</i>
								</Button>	
							</Link>
							<div className="clearfix"></div><br/>
							
								<div className="col-lg-12 col-md-12">
									<form noValidate onSubmit={this.handleFormSubmit}>
										<div className="form-group">
											<Select
												multiple
												value={this.state.name}
												onChange={this.handleChange}
												input={<Input id="select-multiple-checkbox" />}
												renderValue={selected => selected.join(', ')}
												className="margin-right20 width500px"
												MenuProps={MenuProps}
											>
												{this.showList(permissions)}
											</Select>
											
											<div className="clearfix"></div><br/>
											<Button type="submit" variant="contained" color="primary">Save</Button>
										</div>
									</form>
								</div>

						</div>
					</div>
                </CSSTransitionGroup>
            </React.Fragment>
        );
    }
}

export default Permission;