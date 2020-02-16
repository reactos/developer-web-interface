import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadCommits, loadBuilds } from '../redux/actions';
import Branches from './Branches';
import './styles/Commit.css';
import CommitsCard from './CommitsCard';
import Loading from './Loading';

class Commits extends React.PureComponent {
  componentDidMount() {
    this.props.loadCommits(this.props.branch);
    this.props.loadBuilds();
  }

  componentDidUpdate(prevProps) {
    if (this.props.branch !== prevProps.branch) {
      this.props.loadCommits(this.props.branch)
      this.props.loadBuilds()
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
    const {branch, page} = this.props;

    return (
      <div className='container mt-2'>
        <div className="row">
          <div className="col-sm-8"><h2>Latest Commits</h2></div>
          <div className="col-sm-4">
            <div className="d-flex justify-content-end"><Branches currentBranch={branch} /></div>
          </div>
        </div>
        
        {this.props.isLoading.load ? (
          <Loading
            text={`Fetching latest Commits of ${branch} for you...`}
          />
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
              <div>
                <button
                  type='button'
                  onClick={() => {
                    this.props.loadCommits(branch, page.prev);
                  }}
                  className='btn btn-primary '
                  disabled={
                    page.prev === null || this.props.error !== null
                  }
                >
                  <i className='fa fa-caret-left' aria-hidden='true' />
                  Previous Page{' '}
                </button>{' '}
                <button
                  type='button'
                  onClick={() => {
                    this.props.loadCommits(branch, page.next);
                  }}
                  className='btn btn-primary'
                  disabled={
                    page.next === null || this.props.error !== null
                  }
                >
                  Next Page{'	'}
                  <i className='fa fa-caret-right' aria-hidden='true' />
                </button>
                <footer className='blockquote-footer'>
                  Page {page.next - 1}
                </footer>
                <div className='footer-blockquote' />
              </div>
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
  page,
  builds,
  tests
}) => ({
  isLoading,
  commits,
  builders,
  error,
  page,
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
