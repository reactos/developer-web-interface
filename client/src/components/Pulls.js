import React from 'react';
import { connect } from 'react-redux';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import { loadPulls } from '../redux/actions';
import PullState from './PullState';
import './styles/Pulls.css';
import Loading from './Loading';

class Pulls extends React.Component {
 componentDidMount() {
  this.props.loadPulls();
 }

 renderPulls = pull => {
  let tog = 'toggler' + pull.id;
  let createdDate = new Date(pull.created_at);
  let closedDate = new Date(pull.closed_at);
  let mergedDate = new Date(pull.merged_at);

  return (
   <div className='panel-margin' key={pull.id}>
    <Card>
     <CardHeader className='new' type='button' id={tog}>
      <div className='row'>
       <div className='col-sm'>{pull.number}</div>
       <div className='col-sm'>{pull.state}</div>
       <div className='col-sm'>{pull.user.login}</div>
      </div>
     </CardHeader>
     <UncontrolledCollapse toggler={tog}>
      <CardBody className='indent'>
       <div>
        <p>
         <strong>Pull number: </strong>{' '}
         <a target='_blank' rel='noreferrer noopener' href={pull.html_url}>
          {pull.number}
         </a>
        </p>
        <p>
         <strong>Title:</strong> {pull.title}
        </p>
        <p>
         <strong>Body:</strong> {pull.body}
        </p>
       </div>
       <div className='row'>
        <div className='col-sm'>
         <strong>Created at: </strong>
         {createdDate.toLocaleString()}
        </div>
        <div className='col-sm'>
         <strong>Closed at: </strong>
         {pull.closed_at !== null ? closedDate.toLocaleString() : null}
        </div>
        <div className='col-sm'>
         <strong>Merged at: </strong>
         {pull.merged_at !== null ? mergedDate.toLocaleString() : null}
        </div>
       </div>
      </CardBody>
     </UncontrolledCollapse>
    </Card>
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
         disabled={this.props.page.prev === null || this.props.error !== null}
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
         disabled={this.props.page.next === null || this.props.error !== null}
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
