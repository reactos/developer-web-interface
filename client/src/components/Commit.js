import './styles/Commit.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommits } from '../redux/actions';
import Branches from './Branches';

class CommitsGrid extends Component {
	componentDidMount() {
		this.props.loadCommits();
	}
	renderCommits = commit => {
		var d = new Date(commit.commit.committer.date);
		return (
			<tr key={commit.sha}>
				<td>{commit.sha.substring(0, 7)}</td>
				<td>{commit.commit.committer.name}</td>
				<td>{d.toLocaleString()}</td>
			</tr>
		);
	};

	render() {
		return (
			<div>
				<div className="container">
					<Branches />
					<h6>Current Branch:{this.props.branch}</h6>
					<h3>Latest Commits</h3>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Commit SHA</th>
								<th>Commiter</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{this.props.isLoading ? (
								<tr>
									<th>Loading...</th>
								</tr>
							) : (
								this.props.commits.map(this.renderCommits)
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ isLoading, commits, error, branch }) => ({
	isLoading,
	commits,
	error,
	branch
});

const mapDispatchToProps = dispatch => ({
	loadCommits: () => dispatch(loadCommits())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommitsGrid);
