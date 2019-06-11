import React from 'react';
import { connect } from 'react-redux';
import { loadPulls } from '../redux/actions';

class Pulls extends React.Component {
	componentDidMount() {
		this.props.loadPulls();
	}

	renderPulls = pull => {
		return (
			<tr key={pull.number}>
				<td>{pull.number}</td>
			</tr>
		);
	};
	render() {
		return (
			<div>
				<h2>hi from pulls</h2>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>pull id</th>
						</tr>
					</thead>
					<tbody>{this.props.pulls.map(this.renderPulls)}</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ pulls }) => ({
	pulls
});

const mapDispatchToProps = dispatch => ({
	loadPulls: () => dispatch(loadPulls())
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pulls);
