import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import OrderData from './../../components/Orders/OrderData';
import OrderDataTr from './../../components/Orders/OrderDataTr';

class AddServices extends Component {
    
    constructor(props){
		super(props);
		this.state = {
            product_service_id: '',
            product_quantity: '1'
        };
    }

    showOrderDetailData = (order_details) => {
		var result = null;
		if(order_details && typeof order_details !== 'undefined' && order_details.length > 0){
			result = order_details.map((order_detail, index) => {
				return <OrderDataTr key={index} order_detail={order_detail} onDelete={this.onDelete}/>;
			})
		}
		return result;
    }
    
    showCategory = () => {
		const options = [];
		const {categories} = this.props;
		if (categories !== '' && typeof categories === 'object'){
			categories.map(data => options.push(
				<option key={data.id} value={data.id}>{data.title}</option>
			));
		}
		return options;
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
   
    handleAddService = (event) => {
        event.preventDefault();
        this.props.handleAddService(this.state);
    }
    
    handleAddService = (event) => {
        event.preventDefault();
        this.props.handleAddService(this.state);
	}

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Thêm dịch vụ cho bệnh nhân</h4>
									</div>
									<div className="grid-body no-border">
                                        
                                        {/* <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                        </p> */}
                                        <div className="form-group">
                                            <div className="Product_Service">
                                                <label>Sản phẩm/ Dịch vụ</label>
                                                <select 
                                                    className="form-control" 
                                                    name="product_service_id" 
                                                    value={this.state.product_service_id} 
                                                    onChange={this.onChangeForm}
                                                >
                                                    <option value="">-- Chọn sản phẩm/ dịch vụ --</option>
                                                    {this.showCategory()}
                                                </select>
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
							</div>
						</div>
					</div>

					<div className="col-lg-6  col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
                                        <h4>Sản phẩm/Dịch vụ </h4>
									</div>
									<div className="grid-body no-border">
										
										<OrderData>
											{this.showOrderDetailData(this.props.order_detail)} 
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