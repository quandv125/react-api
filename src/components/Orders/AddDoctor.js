import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class AddDoctor extends Component {

    constructor(props){
		super(props);
		this.state = {
            user_id: null,
            user: ''
        };
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
	}

    handleAddDoctor (id) {
        var {user_id} = this.state;
        this.props.handleAddDoctor(user_id);
    }
    
    showDoctor = (username) => {
		const options = [];
		if (username !== '' && typeof username === 'object'){
			username.map(data => options.push(
				<option key={data.id} value={data.id}>{data.firstname} {data.lastname} ({data.email})</option>
			));
        }
		return options;
	}

    render() {
        var {doctor, order_id, username} = this.props;
        return (
            <div>
                <div className="col-lg-6 col-md-6">
                    <div className="row">
                        <div className="col-md-12 sortable ui-sortable">
                            <div className="grid simple vertical green">
                                <div className="grid-title no-border">
                                    <h4>Add doctor for customer</h4>
                                </div>
                                <div className="grid-body no-border">
                                        
                                        <div className="form-group">
                                            <select 
                                                className="form-control" 
                                                name="user_id" 
                                                onChange={this.onChangeForm}
                                            >
                                                <option value="0">-- Choose One --</option>
                                                {this.showDoctor(username)}
                                            </select>
                                           
                                        </div>
                                        <p>
                                            <Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={ () => this.handleAddDoctor(order_id)}>
                                                Add Doctor &nbsp; <i className="material-icons">person_add</i>
                                            </Button>
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Doctor</h4>
									</div>
									<div className="grid-body no-border">
										<div className="scroll-wrapper scroller scrollbar" >
											
											<div className="scroll-element scroll-y scroll-scrollx_visible scroll-scrolly_visible">
												<div className="scroll-element_outer">

                                                    {doctor !== '' && doctor !== null &&
                                                        <h4>Doctor is: <strong>{doctor.firstname} {doctor.lastname} ({doctor.username})</strong></h4>
                                                    }

												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
            </div>

        );
    }
}

export default AddDoctor;