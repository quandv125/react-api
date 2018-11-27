import React, { Component } from 'react';

class OrderData extends Component {
    render() {
        var { children } = this.props;

        return (
           
                    <div className="table-responsive">
                                            
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                   
                                    <th>Dịch vụ</th>
                                    <th>Giá</th>
                                    <th>S.lượng</th>
                                    <th>Ghi chú</th>
                                    <th>Xóa</th>
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