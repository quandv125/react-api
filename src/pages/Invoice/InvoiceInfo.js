import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
// import { Link } from 'react-router-dom';
import * as config from './../../constants/config';
import callApi from './../../utils/apiCaller';
// import Cleave from 'cleave.js/react';
import Button from '@material-ui/core/Button';
// import Validator from 'react-forms-validator';
// import Checkbox from '@material-ui/core/Checkbox';
// import { ToastContainer, toast } from 'react-toastify';
// Note: include <ToastContainer/>
// import 'react-toastify/dist/ReactToastify.css';
// import ModalCalling from './../../components/Customers/ModalCalling';
import InvoiceDetail from './InvoiceDetails';
class InvoiceInfo extends Component {

	constructor(props){
		super(props);
		this.state = {
            order: ''
		};

	}

	componentWillMount(){
        var {match} = this.props;
     
		if(match) {
            var id = match.params.id;
            if(id){
                callApi('GET', config.ORDER_URL+'/invoice/'+id, null).then(res => {
                    if(res.data && res.data.status){
                        this.setState({
                            order: res.data.order
                        });
                    }
                });
            }
		}
    }

    todayNow = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        var now = dd + '/' + mm + '/' + yyyy;
        return now;
    }
    
    showInvoiceDetail = (order) => {
        var result = null;
    
        if( order &&  order !== 'undefined' ){
         
            result = <InvoiceDetail order={order} />
        }
        return result;
    }

	render() {
        var { order } = this.state;

		return (
			<CSSTransitionGroup transitionName={config.PAGETRANSITION} transitionAppear={true} transitionAppearTimeout={config.TRANSITIONSPEED} transitionEnter={false} transitionLeave={false}>

				<div className="grid simple ">
					<div className="grid-body no-border">
					{/* <ModalCalling /><ToastContainer /> */}
						{/* <Link to="/orders" className="margin-right20">
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">arrow_back</i>
							</Button>	
						</Link> */}
                        <a target="_blank" rel="noopener noreferrer" href={config.DOMAIN + 'invoices/' + this.props.match.params.id}>
							<Button type="submit" className="btn btn-primary btn-cons" variant="contained" color="primary">
							<i className="material-icons">assignment</i> In hóa đơn
							</Button>	
                        </a>
						<div className="clearfix"><br/></div>
                            <div className="col-ls-12 col-md-12">
                                <div className="card">
          
                                    <div className="card-header">
                                       
                                        Ngày:  <strong> {this.todayNow()} </strong> 
                                        {/* <span className="float-right"> <strong>Trạng thái:</strong> </span> */}
                                    </div>
                                    
                                    <div className="clearfix margin-top20"></div>
                                    {this.showInvoiceDetail(order)}
                                </div>
           
                            </div>
					    </div>
				</div>
			</CSSTransitionGroup>
		);
	} // end render



}

export default InvoiceInfo;
