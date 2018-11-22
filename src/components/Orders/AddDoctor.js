import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';

class AddDoctor extends Component {

    constructor(props){
		super(props);
		this.state = {
            user_id: null,
            user: '',
            openNoteDoctor: false,
            note: ' '
        };
    }

    componentWillReceiveProps(nextProps){
       if(nextProps && nextProps.note_user){
        this.setState({ note: nextProps.note_user });
       }
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
        });
      
    }
    
	onCloseModalNoteDoctor = () => {
		this.setState({ openNoteDoctor: false });
    };
    
    onhandleNodeDoctor(){
        this.setState({ openNoteDoctor: true });
    }

    handleAddDoctor () {
        var {user_id} = this.state;
        this.props.handleAddDoctor(user_id);
    }
    
    handleSetNoteDoctor () {
        var {note} = this.state;
        this.props.handleSetNoteDoctor(note);
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
        var {doctor, username} = this.props;
        
        return (
            <div>
                <div className="col-lg-6 col-md-6">
                    <div className="row">
                        <div className="col-md-12 sortable ui-sortable">
                            <div className="grid simple vertical green">
                                <div className="grid-title no-border">
                                    <h4>Thêm bác sỹ thăm khám</h4>
                                </div>
                                <div className="grid-body no-border">
                                        
                                        <div className="form-group">
                                            <select 
                                                className="form-control" 
                                                name="user_id" 
                                                onChange={this.onChangeForm}
                                            >
                                                <option value="0">-- Chọn bác sỹ --</option>
                                                {this.showDoctor(username)}
                                            </select>
                                           
                                        </div>
                                        <p>
                                            <Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={ () => this.handleAddDoctor()}>
                                                Thêm bác sỹ &nbsp; <i className="material-icons">person_add</i>
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
										<h4>Thông tin bác sỹ thăm khám</h4>
									</div>
									<div className="grid-body no-border">
										<div className="scroll-wrapper scroller scrollbar" >
											
											<div className="scroll-element scroll-y scroll-scrollx_visible scroll-scrolly_visible">
												<div className="scroll-element_outer">

                                                    {doctor !== '' && doctor !== null &&
                                                        <h4>Bác sỹ: <strong style={{marginRight: 30}}>{doctor.firstname ? doctor.firstname : ''} {doctor.lastname ? doctor.lastname : ''}</strong>
                                                             <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onhandleNodeDoctor()}>
                                                                <i className="material-icons">create</i>
                                                            </Button>
                                                        </h4>
                                                    }
                                                   
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

                    <Modal open={this.state.openNoteDoctor} onClose={this.onCloseModalNoteDoctor} center>
						<div style={{width:400}}>
							
							<div className="form-group">
								<label>Ghi chú: <strong></strong></label>
								<input 
									className="form-control"
									name="note"
									onChange={this.onChangeForm}
									value={this.state.note}
								/>
							</div>
							<Button onClick={ () => this.handleSetNoteDoctor() } type="submit" className="btn btn-primary btn-cons" variant="contained" color="secondary" >
								Lưu
							</Button>	
						</div>
					</Modal>			
            </div>

        );
    }
}

export default AddDoctor;