import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import ProductsList from '../../components/Product/ProductsList';
// import ProductItem from '../../components/Product/ProductItem';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index';

import { Redirect } from 'react-router-dom';

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products : [],
			loggedOut: false
		}
	}

	componentWillReceiveProps(nextprops) {
        this.setState({
            loggedOut: nextprops.authentication.loggedOut
        });
	}
	
	componentWillMount(){
		this.props.getProducts();				
	}

	onDelete = (id) => {
		if (window.confirm('Are you sure you wish to delete this item?')){
			this.props.onDeleteProduct(id)
		}
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		var {products} = this.props.products;
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

			<div className="ProductList col-lg-12 col-sm-12 col-xs-12 col-md-12">
			  	<Link to="/products/add" className="btn btn-primary margin-bottom20">
				  <i className="fa fa-plus"></i>
			 	</Link>
			 	
				<ProductsList onDelete={this.onDelete} >
					{products}
				</ProductsList>
			</div>
			</CSSTransitionGroup>
		);
	} // end render
	
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
		},
		onDeleteProduct : (id) => {
			dispatch(actDeleteProductRequest(id));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
