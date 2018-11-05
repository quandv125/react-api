import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Remainder extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12 sortable ui-sortable">
                        <div className="grid simple vertical green">
                            <div className="grid-title no-border">
                                <h4>Config SMS Remainder</h4>
                            </div>
                            <div className="grid-body no-border">
                                    
                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            name="user_id" 
                                        >
                                            <option value="0">-- Choose One --</option>
                                        </select>
                                        
                                    </div>
                                    <p>
                                        <Button className="btn btn-primary btn-cons" variant="contained" color="secondary">
                                            Add Doctor &nbsp; <i className="material-icons">person_add</i>
                                        </Button>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Remainder;