import React, { Component } from 'react';

class CustomerData extends Component {
    render() {
        return (
           
            <div className="panel panel-default">
                <div className="panel-heading">Lịch sử thăm khám</div>
                    <div className="table-responsive">
                                            
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày khám lại</th>
                                    <th>Mã giao dịch</th>
                                    <th>Danh mục</th>
                                    <th>Bác sy</th>
                                    <th>Chú thích</th>
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