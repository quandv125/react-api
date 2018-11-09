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
                                    <th>Mã sản phẩm</th>
                                    <th>Sản phẩm/Dịch vụ</th>
                                    <th>Số lượng</th>
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