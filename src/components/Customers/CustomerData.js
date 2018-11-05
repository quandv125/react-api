import React, { Component } from 'react';

class CustomerData extends Component {
    render() {
        return (
           
            <div className="panel panel-default">
                <div className="panel-heading">Panel heading</div>
                    <div className="table-responsive">
                                            
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Transation</th>
                                    <th>Category</th>
                                    <th>User</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.children}
                                    
                            </tbody>
                        </table>
                        
                    </div>
                </div>
             
			
        );
    }
}

export default CustomerData;