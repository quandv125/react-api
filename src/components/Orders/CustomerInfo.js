import React, { Component } from 'react';
import * as config from './../../constants/config';
class CustomerInfo extends Component {
    render() {
        var {customer} = this.props;
        return (
            <div className="col-lg-6 col-md-6">
						<div className="row">
							<div className="col-md-12 sortable ui-sortable">
								<div className="grid simple vertical green">
									<div className="grid-title no-border">
										<h4>Thông tin bệnh nhân</h4>
									</div>
									<div className="grid-body no-border">
										
													{typeof customer === 'object' && customer !== null &&
													
														<div className="table-responsive">
															<table className="table table-hover">
																
																<tbody>
																	
																	<tr>
																		<td>Tên bệnh nhân</td>
																		<td> {customer.firstname + " " + customer.lastname }</td>
																	</tr>
																	<tr>
																		<td>Số điện thoại</td>
																		<td>{customer.phone}</td>
																	</tr>
																	<tr>
																		<td>Đỉa chỉ</td>
																		<td>{customer.address}</td>
																	</tr>
																	<tr>
																		<td>Email</td>
																		<td>{customer.email}</td>
																	</tr>
																	<tr>
																		<td>Giới tính</td>
																		<td>{customer.gender === config.GENDER_MALE ? "Nữ": "Nam"}</td>
																	</tr>
																	
																</tbody>
															</table>
														</div>

													}

												
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
        );
    }
}

export default CustomerInfo;