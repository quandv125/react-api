import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
class CustomerDataTr extends Component {
    render() {
        var { customer, order_id } = this.props;
        
        return (
           
            <tr>
                
                <td>
                    <Link to={"/orders/edit/"+ customer.id + "/" + order_id}>
                        {customer.transaction_id}
                    </Link>
                </td>
                <td>
                    <Link to={"/orders/edit/"+ customer.id + "/" + order_id}>
                        { customer.time ? moment( customer.time ).format('DD/MM/YYYY'): '' }
                    </Link>
                </td>	
               
                <td>{customer.category.title}</td>
                <td>{customer.user ? customer.user.firstname + " " + customer.user.lastname:''}</td>
                <td>{customer.note}</td>
                <td>{ customer.created_at ? moment( customer.created_at ).format('DD/MM/YYYY HH:mm:ss') : ''}</td>
            </tr>
            
        );
    }
}

export default CustomerDataTr;