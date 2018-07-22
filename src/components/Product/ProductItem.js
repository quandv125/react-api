import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
	
	onDelete (id) {
		this.props.onDelete(id);
	}

	render() {
		var {product, index} = this.props;
		var price = JSON.parse(product.prices);
		return (
			<tr>
				<td>{index+1}</td>
				<td>{product.title}</td>
				<td>{price[0].price}</td>
				<td>{price[0].sale_price}</td>
				<td>{product.productcategory.title}</td>
				<td>{product.productbranch.title}</td>
				<td>
					<Link to={`products/${product.id}/edit`} className="btn btn-success margin-right-10">
						Edit
					</Link>
					
					<button type="button" className="btn btn-danger" onClick={ () => this.onDelete(product.id)}>Delete</button>

				</td>
			</tr>
		);
	}
}

export default ProductItem;
