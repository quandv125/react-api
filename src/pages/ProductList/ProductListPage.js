import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import ProductsList from './../../components/Product/ProductsList';
import ProductItem from './../../components/Product/ProductItem';
import * as config from './../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {findIndex} from 'lodash';
// import callApi from './../../utils/apiCaller';
import { actFetchProductsRequest } from './../../actions/index';
import { Redirect } from 'react-router-dom';

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products : [],
			loggedOut: false
		}
	
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
    }


	componentWillMount(){
		this.props.getProducts();		
		// callApi('GET', config.APP_URL, null).then( res => {
		// 	this.setState({
		// 		products: res.data
		// 	});
		// });
	}

	onDelete (id) {
		// var {history} = this.props;
		// var {products} = this.state;
		// // callApi('DELETE', config.APP_URL, id).then( res => {
		// 	// if (res.status === 200) {
		// 		// var index = this.findIndex(products, id);
		// 		// var index = findIndex(products, function(product) { return product.id === id; });
		// 		var index = findIndex(products, ['id', id]);
		// 		// if(index !== -1) {
		// 		// 	products.splice(index, 1);
		// 		// }
		// 		console.log(index);
			// }
			// history.push("/products-list");
		// });
		
	}

	// findIndex (products, id) {
	// 	var result = -1;
	// 	products.forEach((product, index) => {
	// 		if(product.id === id) {
	// 			result = index;
	// 		}
	// 	});
	// 	return result;
	// }

	render() {
		var {products} = this.props.products;
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

			<div className="ProductList col-lg-12 col-sm-12 col-xs-12 col-md-12">
			  	<Link to="/products/add" className="btn btn-primary">
			 		Add
			 	</Link>
			 	<br/><br/>
			 	<ProductsList>
			 		{this.showProduct(products)}
			 	</ProductsList> 
				
			</div>
			</CSSTransitionGroup>
		);
	} // end render

	showProduct (products) {
		var result = null;
		if (products) {
			// console.log(products)
			result = products.map((product, index) => {
				// console.log(product)
				return (<ProductItem key={index} product={product} index={index} onDelete={this.onDelete}/>);
			});
		}
		return result;
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		authentication: state.authentication
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getProducts : () => {
			dispatch(actFetchProductsRequest());
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
