import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadCommits, loadBuilds } from '../redux/actions';
import Branches from './Branches';
import './styles/Commit.css';
import CommitsCard from './CommitsCard';
import Loading from './Loading';
import Pagination from './Pagination'
import { LOAD_STATE } from '../redux/constants'


class Commits extends React.PureComponent {
  componentDidMount() {
    if (this.props.firstLoad) {
      this.props.loadCommits(this.props.branch, 1); // TODO: remove the hack
      this.props.loadBuilds();
    }
  }

  renderCommits = commit => {
    const tests = this.props.tests[commit.sha]

    return (
      <CommitsCard
        key={commit.sha}
        {...commit}
        builds={this.props.builds[commit.sha]}
        tests={tests ? Object.values(tests) : []}
        previousTests={extractCommitsParentTestsCount(this.props.tests, commit)}
      />
    );
  };

  render() {
    const { branch, currentPage } = this.props

    return (
      <div className='container mt-2'>
        <div className="row">
          <div className="col-sm-8"><h2>Latest Commits</h2></div>
          <div className="col-sm-4">
            <div className="d-flex justify-content-end"><Branches currentBranch={branch} /></div>
          </div>
        </div>
        
        {this.props.isLoading ? (
          <Loading>{`Fetching latest Commits of ${branch} for you...`}</Loading>
        ) : (
          <div>
            <div>{this.props.commits.map(this.renderCommits)}</div>
            {this.props.error ? (
              <div className='error'>
                Unexpected Error occured. Kindly Reload the page
                <br />
                Err:{this.props.error}
              </div>
            ) : (
              <Pagination
                currentPage={currentPage}
                nextPage={() => this.props.loadCommits(branch, currentPage + 1)}
                prevPage={() => this.props.loadCommits(branch, currentPage - 1)} />
            )}
          </div>
        )}
      </div>
    );
  }
}

function CommitsWrapper(props) {
  let {branch} = useParams()
  return <Commits branch={branch} {...props}/>
}

const mapStateToProps = ({
  isLoading,
  commits,
  builders,
  error,
  builds,
  tests
}) => ({
  isLoading: isLoading.commitsLoadInfo.lastState !== LOAD_STATE.LOADED,
  firstLoad: !isLoading.commitsLoadInfo.loadedPages.includes(1), //if we need to load first page
  currentPage: isLoading.commitsLoadInfo.currentPage,
  commits,
  builders,
  error,
  builds,
  tests
});

/**
 * Build a object contains parent test type and test's count for commit
 *
 * @param testData
 * @param commit
 * @returns {{}}
 */
function extractCommitsParentTestsCount(testData, commit) {
  let tests = testData[commit.parents[0].sha];

  if (!tests) {
    return {};
  }

  let result = {};

  for (let test of Object.values(tests)) {
    result[test.source] = test.count
  }

  return result
}

const mapDispatchToProps = dispatch => ({
  loadBuilds: () => dispatch(loadBuilds()),
  loadCommits: (branch, next) => dispatch(loadCommits(branch, next))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitsWrapper);
