import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';

class ModalOrder extends Component {
    // constructor(props) {
	// 	super(props);
	// 	// this.state = {
	// 		// order_id: ''
	// 	// }
	// }

    onClick (id) {
        this.props.action(id)
    }

    render() {
        var { order_id }  = this.props;
        return (
            <div>
                <h2>Service {order_id}</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                    <div className="form-group">
                        <label>note</label>
                        {/* <input 
                            type="text" 
                            className="form-control" 
                            value="123123"
                            onChange={this.onChangeForm} 
                            name="note" 
                            placeholder="note"/> */}
                    </div>
                <p>
                    <Button 
                        className="btn btn-primary" 
                        variant="contained" 
                        color="secondary" 
                        onClick={ () => { this.onClick(order_id) } }
                        >Add Service</Button>
                </p>
            </div>
        );
    }
}

export default ModalOrder;