import React, { Component } from 'react';


class ProductList extends Component {
	render() {
		var { children } = this.props;
		
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">Panel title</h3>
				</div>
				<div className="panel-body">
					<table className="table table-hover table-bordered">
						<thead>
							<tr>
								<th className="text-center">STT</th>
								<th className="text-center">Tiêu đề</th>
								<th className="text-center">Giá niêm yết</th>
								<th className="text-center">Giá khuyến maị</th>
								<th className="text-center">Danh mục</th>
								<th className="text-center">Hãng</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							
							{ children }
							
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default ProductList;
