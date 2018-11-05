import React, { Component } from 'react';

class OrderInfo extends Component {
    render() {
        var {order, category_title} = this.props;
        return (
            <div className="col-lg-6  col-md-6">
                <div className="row">
                    <div className="col-md-12 sortable ui-sortable">
                        <div className="grid simple vertical green">
                            <div className="grid-title no-border">
                                <h4>Infomation Order</h4>
                            </div>
                            <div className="grid-body no-border">
                              
                                            
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            
                                            <tbody>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>{order.id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Transaction</td>
                                                    <td>{order.transaction_id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Customer</td>
                                                    <td>{order.customer_id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Category</td>
                                                    <td>{category_title}</td>
                                                </tr>
                                                <tr>
                                                    <td>Note</td>
                                                    <td>{order.note}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default OrderInfo;