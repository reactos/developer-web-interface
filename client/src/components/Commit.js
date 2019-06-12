import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import { loadCommits } from '../redux/actions';
import Branches from './Branches';
import './styles/Commit.css';
import Loading from './Loading';

class CommitsGrid extends React.Component {
	componentDidMount() {
		this.props.loadCommits();
	}
	renderCommits = commit => {
		var tog = 'toggler' + commit.sha;
		var d = new Date(commit.commit.committer.date);
		return (
			<div key={commit.sha}>
				<Card>
					<CardHeader className="new" type="button" id={tog}>
						<div className="row">
							<div className="col-sm">{commit.sha.substring(0, 7)}</div>
							<div className="col-sm">{commit.commit.committer.name}</div>
							<div className="col-sm">{d.toLocaleString()}</div>
							<div className="col-sm">
								{commit.commit.message.substring(0, 20)}
							</div>
						</div>
					</CardHeader>
					<UncontrolledCollapse toggler={tog}>
						<CardBody>{commit.commit.message}</CardBody>
					</UncontrolledCollapse>
				</Card>
			</div>
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
						<div>
							<div>{this.props.commits.map(this.renderCommits)}</div>
						</div>
					)}
					{this.props.commitError && (
						<div className="error">
							Unexpected Error occured. Kindly Reload the page
							<br />
							Err:{this.props.commitError}
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ isLoading, commits, commitError, branch }) => ({
	isLoading,
	commits,
	commitError,
	branch
});

const mapDispatchToProps = dispatch => ({
	loadCommits: () => dispatch(loadCommits())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommitsGrid);
