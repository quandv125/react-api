import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import OrderData from './../../components/Orders/OrderData';
import OrderDataTr from './../../components/Orders/OrderDataTr';
import Select from 'react-select';
import * as config from '../../constants/config';
import callApi from '../../utils/apiCaller';
import Swal from 'sweetalert2'

class AddServices extends Component {
    
    constructor(props){
		super(props);
		this.state = {
            service_id: '',
            product_service_id: '',
            product_title: '',
            product_quantity: '1',
            category_service : '',
            order_detail: '',
            products: '',
            categories: '',
            selectedServices: null,
            selectedProducts: null,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps ){
            // console.log(nextProps);
            this.setState({
                products: nextProps.products,
                categories: nextProps.categories,
                selectedServices: nextProps.categories[0],
                selectedProducts: nextProps.products[0],
            });
        }
    }

    componentWillUpdate (nextState) {
        if(nextState.products !== ''){
            this.showProducts(nextState.products);
        }
    }
    
    showOrderDetailData = (order_details) => {
		var result = null;
		if(order_details && typeof order_details !== 'undefined' && order_details.length > 0){
			result = order_details.map((order_detail, index) => {
				return <OrderDataTr key={index} order_detail={order_detail} changePrice={this.changePrice} onhandleNode={this.onhandleNode} onDelete={this.onDelete}/>;
			})
		}
		return result;
    }
    
    showCategory = (categories) => {
		if (categories !== '' && typeof categories === 'object'){
            return (<Select
                value={this.state.selectedServices}
                onChange={this.handleChangeServices}
                options={categories}
                defaultValue={[categories[0]]}
            />);
		}
    }
    
    showProducts = (products) => {
		if (products !== '' && typeof products === 'object'){
            return (<Select
                value={this.state.selectedProducts}
                onChange={this.handleChangeProducts}
                options={products}
                defaultValue={[products[0]]}
            />);
		}
	}

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
        });
       
    }
    
    onDelete = (id) => {
        this.props.handleDeleteService(id);
    }

    changePrice = (id, title, price) => {
        this.props.handleChangePrice(id, title, price);
    }
    
    onhandleNode = (id, note, title) => {
        this.props.onhandleNode(id, note, title);
    }
   
    handleAddService = (event) => {
        event.preventDefault();
        var data = {};
        if(!this.state.product_service_id){
            Swal('Vui lòng chọn dịch vụ!','','error')
        } else {
            data = {product_service_id: this.state.product_service_id, product_quantity: this.state.product_quantity}
        }

        this.props.handleAddService(data);
        this.setState({product_service_id: ''});
    }

    handleAddServiceBySelt = (event) => {
        event.preventDefault();
        var data = { product_title: this.state.product_title, product_quantity: this.state.product_quantity}
        this.props.handleAddServiceBySelt(data);
    }
    
    handleChangeServices = (selectedServices) => {
        this.setState({  selectedServices });
        callApi('GET', config.PRODUCT_URL+'/product-by-service/' + selectedServices.value, null).then(res => {
            if(res.data && res.data.status){
                // console.log(res.data.data.products);
                this.setState({
                    products: res.data.data.products,
                    selectedProducts: res.data.data.products[0]
                });
            }
        });
    }

    handleChangeProducts = (selectedProducts) => {
        this.setState({ 
            selectedProducts,
            product_service_id: selectedProducts.value
        });
    }
     
    render() {
        var {products, categories} = this.state
        var {order_detail} = this.props
       
        return (
            <React.Fragment>
                <div className="col-lg-6 col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Thêm dịch vụ cho bệnh nhân</h4>
									</div>
									<div className="grid-body no-border">
                                    
                                        <ul className="nav nav-tabs" role="tablist">
                                            <li className="active">
                                                <a href="#tab4hellowWorld" role="tab" data-toggle="tab" aria-expanded="true">Chọn dịch vụ</a>
                                            </li>
                                            <li className="">
                                                <a href="#tab4FollowUs" role="tab" data-toggle="tab" className="active" aria-expanded="false">Tự điền dịch vụ</a>
                                            </li>
                                           
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="tab4hellowWorld">
                                                <div className="row column-seperation">
                                                    <div className="form-group">
                                                            <div className="Product_Service">
                                                                <label>Danh mục dịch vụ</label>
                                                                {this.showCategory(categories)}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="Product_Service">
                                                                <label>Dịch vụ</label>
                                                                {this.showProducts(products)}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Số lượng</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                onChange={this.onChangeForm} 
                                                                value={this.state.product_quantity} 
                                                                name="product_quantity" 
                                                                placeholder="product_quantity"/>
                                                        </div>

                                                        <p>
                                                            <Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={this.handleAddService}>
                                                                Thêm dịch vụ &nbsp; <i className="material-icons">add</i>
                                                            </Button>
                                                        </p>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="tab4FollowUs">
                                                <div className="row column-seperation">

                                                        <div className="form-group">
                                                            <label>Dịch vụ</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                onChange={this.onChangeForm} 
                                                                value={this.state.product_title} 
                                                                name="product_title" 
                                                                placeholder="Dịch vụ"/>
                                                        </div>

                                                        <div className="form-group">
                                                            <label>Số lượng</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                onChange={this.onChangeForm} 
                                                                value={this.state.product_quantity} 
                                                                name="product_quantity" 
                                                                placeholder="Số lượng"/>
                                                        </div>
                                                        <p>
                                                            <Button className="btn btn-primary btn-cons" variant="contained" color="secondary" onClick={this.handleAddServiceBySelt}>
                                                                Thêm dịch vụ &nbsp; <i className="material-icons">add</i>
                                                            </Button>
                                                        </p>

                                                </div>
                                            </div>
                                           
                                        </div>
                                        
                                        {/* <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                        </p> */}
                                       

									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
                                        <h4>Dịch vụ </h4>
									</div>
									<div className="grid-body no-border">
										
										<OrderData>
											{this.showOrderDetailData(order_detail)} 
										</OrderData>
									
									</div>
								</div>
							</div>
						</div>
					</div>
            </React.Fragment>
        );
    }
}

export default AddServices;