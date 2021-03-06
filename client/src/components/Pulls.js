import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { loadPulls } from 'redux/actions'
import { LOAD_STATE } from 'redux/constants'
import Loading from './Loading'
import Pagination from './Pagination'
import PullsCard from './PullsCard'


class Pulls extends React.PureComponent {
  componentDidMount() {
    if (this.props.firstLoad) {
      this.props.loadPulls(this.props.pullState, 1)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pullState !== prevProps.pullState) {
      this.props.loadPulls(this.props.pullState, 1)
    }
  }

  renderPulls = pull => {
    const tests = this.props.tests[pull.merge_commit_sha]

    return (
      <PullsCard
        key={pull.id}
        {...pull}
        builds={this.props.builds[pull.number]}
        tests={tests ? Object.values(tests) : []}
      />
    );
  };
  render() {
    const { pullState, currentPage } = this.props;

    return (
      <div className='container mt-2'>
        <div className="row">
          <div className="col-sm-8"><h2>Latest Pulls Requests</h2></div>
          <div className="col-sm-4">
            <ul className="nav nav-pills justify-content-end">
              <li className="nav-item">
                <NavLink className="nav-link" to="/pulls/open">Open</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/pulls/closed">Closed</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/pulls/all">All</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {this.props.isLoading ? (
          <Loading>Fetching latest PRs for you...</Loading>
        ) : (
          <div>
            <div>{this.props.pulls.map(this.renderPulls)}</div>
            {this.props.error ? (
              <div className='error'>
                Unexpected Error occured. Kindly Reload the page
                <br />
                Err:{this.props.error}
              </div>
            ) : (
              <Pagination
                currentPage={currentPage}
                nextPage={() => this.props.loadPulls(pullState, currentPage + 1)}
                prevPage={() => this.props.loadPulls(pullState, currentPage - 1)} />
            )}
          </div>
        )}
      </div>
    );
  }
}

function PullsWrapper(props) {
  let {pull_state} = useParams()
  return <Pulls pullState={pull_state} {...props}/>
}

const mapStateToProps = ({
  pulls,
  builders,
  isLoading,
  error,
  builds,
  tests
}) => ({
  isLoading: isLoading.pullsLoadInfo.lastState !== LOAD_STATE.LOADED,
  firstLoad: !isLoading.pullsLoadInfo.loadedPages.includes(1), //if we need to load first page
  currentPage: isLoading.pullsLoadInfo.currentPage,
  pulls,
  builders,
  error,
  builds,
  tests
});

const mapDispatchToProps = dispatch => ({
  loadPulls: (state, next) => dispatch(loadPulls(state, next))
});
export default connect(mapStateToProps, mapDispatchToProps)(PullsWrapper);
