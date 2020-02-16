import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadPulls } from '../redux/actions';
import './styles/Pulls.css';
import Loading from './Loading';
import PullsCard from './PullsCard';

class Pulls extends React.PureComponent {
  componentDidMount() {
    this.props.loadPulls(this.props.pullState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pullState !== prevProps.pullState) {
      this.props.loadPulls(this.props.pullState)
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
    const {pullState, page} = this.props;

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

        {this.props.isLoading.load ? (
          <Loading text='Fetching latest PRs for you...' />
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
              <div>
                <button
                  type='button'
                  onClick={() => {
                    this.props.loadPulls(pullState, page.prev);
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
                    this.props.loadPulls(pullState, page.next);
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

function PullsWrapper(props) {
  let {pull_state} = useParams()
  return <Pulls pullState={pull_state} {...props}/>
}

const mapStateToProps = ({
  pulls,
  builders,
  page,
  isLoading,
  error,
  builds,
  tests
}) => ({
  pulls,
  builders,
  page,
  isLoading,
  error,
  builds,
  tests
});

const mapDispatchToProps = dispatch => ({
  loadPulls: (state, next) => dispatch(loadPulls(state, next))
});
export default connect(mapStateToProps, mapDispatchToProps)(PullsWrapper);
