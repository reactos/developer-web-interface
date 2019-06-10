import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCommits } from '../redux/actions';
import Branches from './Branches';
import './styles/Commit.css';
import Loading from './Loading';

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
				<td>{commit.commit.message.substring(0, 20)}...</td>
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
					{this.props.isLoading ? (
						<div>
							<div>
								Fetching latest Commits of <strong>{this.props.branch} </strong>
								for you...
								<Loading />
							</div>
						</div>
					) : (
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Commit SHA</th>
									<th>Commiter</th>
									<th>Message</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>{this.props.commits.map(this.renderCommits)}</tbody>
						</table>
					)}
					{this.props.error && (
						<div className="error">
							Unexpected Error occured. Kindly Reload the page
						</div>
					)}
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
