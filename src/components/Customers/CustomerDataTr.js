import React, { Component } from 'react';
import {Link} from 'react-router-dom'
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
                        {customer.time}
                    </Link>
                </td>	
               
                <td>{customer.category.title}</td>
                <td>{customer.user ? customer.user.firstname + " " + customer.user.lastname:''}</td>
                <td>{customer.note}</td>
            </tr>
            
        );
    }
}

export default CustomerDataTr;