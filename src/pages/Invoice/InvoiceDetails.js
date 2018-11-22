import React, { Component } from 'react';
import * as config from '../../constants/config';

class InvoiceDetails extends Component {
    format_money = (amount, decimalCount = 0, decimal = ".", thousands = ",") => {
        try {
          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      
          const negativeSign = amount < 0 ? "-" : "";
      
          let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
          let j = (i.length > 3) ? i.length % 3 : 0;
      
          return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
          console.log(e)
        }
    };
    render() {
        var {order} = this.props;
       
        return (
            
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-sm-6">
                            <div>Mã đơn: <strong>{order.transaction_id}</strong></div>
                            <div>
                                Bác sỹ: <strong>{ order.user ? order.user.firstname + ' ' + order.user.lastname : ''} ({order.category.title})</strong>
                            </div>
                            <div>Email: {order.user ? order.user.email : ''}</div>
                            <div>Điện thoại: {order.user ? order.user.phone : ''}</div>
                        </div>
                        <div className="col-sm-6">
                            
                            <div>
                                Bệnh nhân: <strong>{order.customer.firstname + ' ' + order.customer.lastname} </strong>
                            </div>
                            <div>Email: {order.customer.email}</div>
                            <div>Điện thoại: {order.customer.phone}</div>
                            <div>Địa chỉ: {order.customer.address}</div>
                            <div>Giới tính: {order.customer.gender === config.GENDER_MALE ? 'Nữ' : 'Nam'}</div>
                        </div>
                    </div>
                    <h3 className="text-center margin-top20">  <strong> Hóa Đơn </strong> <br/></h3>
                    <div className="table-responsive-sm margin-top20">
                        <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="center">#</th>
                                <th>Dịch vụ</th>
                                <th className="right">Giá</th>
                                <th className="center">Số lượng</th>
                                <th className="right">Tổng tiền</th>
                               
                            </tr>
                        </thead>
                            <tbody>

                                {this.showData(order.order_detail)}
                            
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-5">
                        </div>
                        <div className="col-lg-4 col-sm-5 ml-auto float-right">
                        <table className="table table-clear">
                            <tbody>
                                {/* <tr>
                                    <td className="left">
                                    <strong>Tổng tiền (chưa VAT)</strong>
                                    </td>
                                    <td className="right">{this.format_money(order.total)}</td>
                                </tr>
                               
                                <tr>
                                    <td className="left">
                                    <strong>VAT (10%)</strong>
                                    </td>
                                    <td className="right">{this.format_money(order.total/10)}</td>
                                </tr> */}
                                <tr>
                                    <td className="left">
                                    <strong>Tổng tiền</strong>
                                    </td>
                                    <td className="right">
                                    <strong>{this.format_money(order.total )}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
         
        );
    }

    showData(order_detail){
        var result = null;
		if(order_detail && typeof order_detail !== 'undefined' && order_detail.length > 0){
			result = order_detail.map((item, index) => {
				return  (<tr key={index}>
                    <td className="center">{index+1}</td>
                    <td className="left strong">{item.product_title}</td>
                    <td className="right">{this.format_money(item.product_price)}</td>
                    <td className="left">{item.quantity}</td>
                    <td className="right">{this.format_money(item.totalPriceQuantity)}</td>
                </tr>);
			})
			
		}
		return result;
       
    }
}

export default InvoiceDetails;