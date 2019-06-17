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
				<h2>Latest Pulls</h2>
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>pull id</th>
						</tr>
					</thead>
					<tbody>{this.props.pulls.map(this.renderPulls)}</tbody>
				</table>
				<div>
					<button
						type='button'
						onClick={() => {
							this.props.loadPulls(this.props.page.prev);
						}}
						className='btn btn-primary '
						disabled={
							this.props.page.prev === null || this.props.error !== null
								? true
								: false
						}
					>
						<i className='fa fa-caret-left' aria-hidden='true' />
						Previous Page{' '}
					</button>{' '}
					<button
						type='button'
						onClick={() => {
							this.props.loadPulls(this.props.page.next);
						}}
						className='btn btn-primary'
						disabled={
							this.props.page.next === null || this.props.error !== null
								? true
								: false
						}
					>
						Next Page{'	'}
						<i className='fa fa-caret-right' aria-hidden='true' />
					</button>
					<footer className='blockquote-footer'>
						Page {this.props.page.next - 1}
					</footer>
					<div className='footer-blockquote' />
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ pulls, page, isLoading, error }) => ({
	pulls,
	page,
	isLoading,
	error
});

const mapDispatchToProps = dispatch => ({
	loadPulls: next => dispatch(loadPulls(next))
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pulls);
