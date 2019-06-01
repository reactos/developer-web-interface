import './styles/Commit.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommits } from '../redux/actions';

class CommitsGrid extends Component {
	componentDidMount() {
		this.props.loadCommits();
	}
	renderCommits = commit => {
		var d = new Date(commit.commit.committer.date);
		return (
			<tr key={commit.sha}>
				<td>{commit.sha}</td>
				<td>{commit.commit.committer.name}</td>
				<td>{d.toUTCString()}</td>
			</tr>
		);
	};

	render() {
		return (
			<div>
				<div className="container">
					<h2>Latest Commits</h2>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Commit SHA</th>
								<th>Commiter</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>{this.props.commits.map(this.renderCommits)}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ isLoading, commits, error }) => ({
	isLoading,
	commits,
	error
});

const mapDispatchToProps = dispatch => ({
	loadCommits: () => dispatch(loadCommits())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommitsGrid);
