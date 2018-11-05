import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

class OrderDataTr extends Component {
    onDelete (id) {
        Swal({
            title: 'Are you sure?',
            text: "Are you sure you wish to delete this item?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
            if (result.value) {
                this.props.onDelete(id);
            }
        })
	}

    render() {
        var { order_detail } = this.props;
        return (
           
            <tr>
                <td>{order_detail.id}</td>
                <td>{order_detail.order_id}</td>	
                <td>{order_detail.product_title}</td>
                <td>{order_detail.quantity}</td>
                <td>
                   
                    <Button type="submit" className="btn btn-primary btn-cons-small" variant="fab" color="secondary" size="small"  onClick={ () => this.onDelete(order_detail.id)}>
                        <i className="material-icons">delete</i>
                    </Button>

                 </td>
            </tr>
           
            
        );
    }
}

export default OrderDataTr;