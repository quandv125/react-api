import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import ProductsList from '../../components/Product/ProductsList';
// import ProductItem from '../../components/Product/ProductItem';
import * as config from '../../constants/config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products : [],
			loggedOut: false,
			categories: []
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

		Swal({
            title: 'Are you sure?',
            text: "Are you sure you wish to delete this item?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add it!'
          }).then((result) => {
            if (result.value) {
                this.props.onDeleteProduct(id)
            }
        })
	}

	render() {
		if(this.state.loggedOut){
			return <Redirect to={{ pathname: "/"}}/>;
		}
		var {products} = this.props.products;
		
		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>
				<div className="grid simple">
					<div className="grid-body no-border">
							<Link to="/" className="margin-right20">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
								<i className="material-icons">arrow_back</i>
								</Button>	
							</Link>
								
							<Link to="/category" className="margin-bottom20">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
									Category
								</Button>
							</Link>
							<Link to="/products/add" className="float-right">
								<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
									Add
								</Button>
							</Link>
						<div className="clearfix"></div><br/>
								
						<ProductsList onDelete={this.onDelete} >
							{products}
						</ProductsList>

					</div>
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
