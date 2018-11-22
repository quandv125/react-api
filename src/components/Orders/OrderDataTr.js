import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import * as config from './../../constants/config'

class OrderDataTr extends Component {

    constructor(props) {
		super(props);
		this.state = {
            role_id: config.ROLE,
            
		}
	}

    onDelete (id) {
        Swal({
            title: 'Bạn chắc chắn có muốn xóa?',
           
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy',    
            confirmButtonText: 'Đồng ý!'
          }).then((result) => {
            if (result.value) {
                this.props.onDelete(id);
            }
        })
    }

    changePrice(id, title, price){
       this.props.changePrice(id, title, price);
    }

    onhandleNode (id, note, title) {
        this.props.onhandleNode(id, note, title);
    }

    
    

    render() {
        var { order_detail } = this.props;
       
        return (
           
            <tr>
                
                <td>{order_detail.product_title}</td>
                {/* <td onClick={ () => this.changePrice(order_detail.id, order_detail.product_title, order_detail.product_price)}>
                    
                    <span className="label label-primary">{this.format_money(order_detail.product_price)}</span>

                </td> */}
                <td>{order_detail.quantity}</td>
                <td>
                    <span style={{marginRight: 20}}>{order_detail.note}</span>
                    <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onhandleNode(order_detail.id, order_detail.note, order_detail.product_title)}>
                        <i className="material-icons">create</i>
                    </Button>
                </td>
                <td>
                    { this.showButton(order_detail.id)} 
                   
                </td>
            </tr>
           
            
        );
    }
    showButton = (id) =>  {
        if(this.state.role_id === config.ADMINISTRATOR || this.state.role_id === config.MANAGER){
            return (
                <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(id)}>
                    <i className="material-icons">delete</i>
                </Button>
            );
        }
        return null;
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
}

export default OrderDataTr;