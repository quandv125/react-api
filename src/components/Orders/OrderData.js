import React, { Component } from 'react';

class OrderData extends Component {
    render() {
        var { children } = this.props;

        return (
           
                    <div className="table-responsive">
                                            
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>OrderID</th>
                                    <th>Product/Service</th>
                                    <th>Qty</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {children}
                                
                            </tbody>
                        </table>
                        
                    </div>
            
			
        );
    }
}

export default OrderData;