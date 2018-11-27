import React, { Component } from 'react';
import * as config from '../../constants/config';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Modal from 'react-responsive-modal';
import callApi from '../../utils/apiCaller';
import Swal from 'sweetalert2'
class InvoiceDetails extends Component {

    constructor (props) {
        super(props)
        this.state = {
            note: this.props.order.note ? this.props.order.note : ' ',
            discount: this.props.order.discount ? this.props.order.discount : 0,
            open: false,
            openDiscount: false
        }
    }
    onCloseModal = () => {
		this.setState({ open: false });
    };

    openModal = () => {
        this.setState({ open: true});
    }
    onCloseModalDiscount = () => {
		this.setState({ openDiscount: false });
    };

    openDiscount = () => {
        this.setState({ openDiscount: true});
    }
    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
    }
    
    onhandleNoteCustomer = (id) => {
        var {note} = this.state;
        var data = {note: note};
        callApi('PUT', config.ORDER_URL  + "/" + id, data).then( res => {
            if(res && res.data.status){
                this.setState({ open: false });
                Swal('Sửa diễn giải thành công','','success')
            }
        });
        
    }

    onhandleSetDiscount = (id) => {
        var {discount} = this.state
        var data = {discount: discount}
        callApi('PUT', config.ORDER_URL  + "/" + id, data).then( res => {
            if(res && res.data.status){
                this.setState({ openDiscount: false });
                Swal('Sửa giảm giá thành công','','success')
            }
        });
        // console.log(data);
    }

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

    todayNow = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        } 
        var now = dd + ' tháng ' + mm + ' năm ' + yyyy;
        return now;
    }
    
    render() {
        var {order} = this.props;
        return (
            
                <div className="card-body">
                    <div className="row mb-4">
                    <h3 className="text-center margin-top20">  <strong> Phiếu thu </strong> <br/></h3>
                    <div className="card-header text-center">
                        Ngày: {this.todayNow()}
                        <p><strong>Liên 2 giao cho khách hàng </strong> </p>
                    </div>
                    <br/>
                        <div className="col-sm-6">
                            
                            <div>
                                Tên khách hàng: <strong>{order.customer.firstname + ' ' + order.customer.lastname} </strong>
                            </div>
                            <div>Điện thoại: {order.customer.phone}</div>
                            <div>Địa chỉ: {order.customer.address}</div>
                            <div>Diễn giải: {this.state.note}    
                                <Button type="submit" className="btn btn-primary btn-cons-small" style={{marginLeft: 20}} variant="fab" color="secondary" size="small"  onClick={ () => this.openModal(order.id)}>
                                    <i className="material-icons">create</i>
                                </Button></div>
                            
                        </div>
                        <div className="col-sm-6">
                            <div>Mã đơn: <strong>{order.transaction_id}</strong></div>
                            <div>Thông tin:  {order.customer.gender === config.GENDER_MALE ? 'Nữ' : 'Nam'}  {order.customer.birthday ? "- " + moment(order.customer.birthday).format('DD/MM/YYYY ') : ''}</div>
                        </div>
                    </div>
                  
                    <div className="table-responsive-sm margin-top20">
                        <table className="table table-bordered">

                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Dịch vụ</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Đơn giá</th>
                                <th className="text-center">Thành tiền</th>
                               
                            </tr>
                        </thead>
                            <tbody>

                                {this.showData(order.order_detail)}
                                <tr>
                                    <td colSpan="4" className="text-left">
                                    Cộng
                                    </td>
                                    <td className="text-right"><div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.format_money(order.total )}</div></td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="text-left">
                                        <div className="col-md-4 col-sm-4 col-xs-4"> Tỉ lệ CK </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4"> 100% số tiền chiết khấu 
                                            <Button type="submit" className="btn btn-primary btn-cons-small" style={{marginLeft: 20}} variant="fab" color="secondary" size="small"  onClick={ () => this.openDiscount(order.id)}>
                                                <i className="material-icons">create</i>
                                            </Button>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4 text-right"> {this.format_money(order.total*(this.state.discount/100))} </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="text-left">
                                        <div className="col-md-4 col-sm-4 col-xs-4">  </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4"> Cộng tiền hàng (Đã trừ CK) </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4 text-right"> {this.format_money(order.total - (order.total*(this.state.discount/100)))} </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="text-left">
                                        <div className="col-md-4 col-sm-4 col-xs-4">  </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4"> Tổng tiền thanh toán </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4 text-right"> {this.format_money(order.total - (order.total*(this.state.discount/100)))} </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div><p>Số tiền viết bằng chữ: ..................................................................................................................................................................................................................</p></div>
                   <br/>
                    <div className="row">
                        
                        <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                            <b>NGƯỜI NỘP TIỀN</b>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                            <b>NGƯỜI KIỂM SOÁT</b>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4 text-center">
                            <i>Ngày ..... tháng ..... năm .....</i>
                            <br/>
                            <b>NGƯỜI THU TIỀN</b>
                        </div>
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="form-group">
                            <label>Diễn giải</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.note}
                                onChange={this.onChangeForm} 
                                name="note" 
                                placeholder="Diễn giải"/>
                        </div>
                        <p>
                            <Button 
                                className="btn btn-primary float-right" 
                                variant="contained" 
                                color="primary" 
                                onClick={ () => { this.onhandleNoteCustomer(order.id) } }
                                >Lưu</Button>
                        </p>
                    </Modal>

                    <Modal open={this.state.openDiscount} onClose={this.onCloseModalDiscount} center>
                        <div className="form-group">
                            <label>Giảm giá</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={this.state.discount}
                                onChange={this.onChangeForm} 
                                name="discount" 
                                placeholder="Giảm giá"/>
                        </div>
                        <p>
                            <Button 
                                className="btn btn-primary float-right" 
                                variant="contained" 
                                color="primary" 
                                onClick={ () => { this.onhandleSetDiscount(order.id) } }
                                >Lưu</Button>
                        </p>
                    </Modal>
                </div>
         
        );
    }

    showData(order_detail){
        var result = null;
		if(order_detail && typeof order_detail !== 'undefined' && order_detail.length > 0){
			result = order_detail.map((item, index) => {
				return  (<tr key={index}>
                    <td className="text-center">{index+1}</td>
                    <td className="text-left">{item.product_title}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{this.format_money(item.product_price)}</td>
                    <td className="text-right">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">{this.format_money(item.totalPriceQuantity)}</div>
                    </td>
                </tr>);
			})
			
		}
		return result;
       
    }
}

export default InvoiceDetails;