import React from 'react';
import { connect } from 'react-redux';
import { loadPulls } from '../redux/actions';
import PullState from './PullState';
import './styles/Pulls.css';
import Loading from './Loading';
import PullsCard from './PullsCard';

class Pulls extends React.Component {
  componentDidMount() {
    this.props.loadPulls();
  }
  renderPulls = pull => {
    return (
      <div className='panel-margin' key={pull.id}>
        <PullsCard
          {...pull}
          builds={this.props.build[pull.number]}
          tests={this.props.testData[pull.merge_commit_sha]}
        />
      </div>
    );
  };
  render() {
    return (
      <div className='container margin'>
        <h2>Latest Pulls</h2>
        <PullState />
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
                    this.props.loadPulls(this.props.page.prev);
                  }}
                  className='btn btn-primary '
                  disabled={
                    this.props.page.prev === null || this.props.error !== null
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
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  pulls,
  builders,
  page,
  isLoading,
  error,
  build,
  testData
}) => ({
  pulls,
  builders,
  page,
  isLoading,
  error,
  build,
  testData
});

const mapDispatchToProps = dispatch => ({
  loadPulls: next => dispatch(loadPulls(next))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pulls);
