import React from 'react';
import { connect } from 'react-redux';
import { loadCommits, loadBuildSets } from '../redux/actions';
import Branches from './Branches';
import './styles/Commit.css';
import CommitsCard from './CommitsCard';
import Loading from './Loading';

class Commits extends React.Component {
 constructor() {
  super();
  this.arr = this.arr.bind(this);
 }
 componentDidMount() {
  this.props.loadBuildSets();
  this.props.loadCommits();
 }

 //  array1.forEach(function(element) {
 //     console.log(element);
 //   });

 arr = () => {
  let cs = this.props.commits.map(commit => {
   return commit.sha;
  });
  let bs = this.props.buildData.map(builds => {
   return builds;
  });
  var filterBs = [];
  cs.forEach(val => {
   filterBs.push(
    bs
     .map(obj => {
      return obj;
     })
     .filter(item => item.sourcestamps[0].revision === val)
   );
  });

  var merged = [].concat.apply([], filterBs);

  let str = merged.map(bsid => 'buildsetid__contains=' + bsid.bsid).join('&');
  console.log(str);
 };

 renderBsid = id => {
  return <p key={id.bsid}>{id.bsid}</p>;
 };

 renderCommits = commit => {
  let filteredBs = this.props.buildData
   .map(obj => {
    return obj;
   })
   .filter(item => item.sourcestamps[0].revision === commit.sha);
  return (
   <div className='panel-margin' key={commit.sha}>
    <CommitsCard commit={commit} />
    {filteredBs.map(bsid => 'buildsetid__contain=' + bsid.bsid).join('&')}
   </div>
  );
 };

 render() {
  return (
   <div className='container margin'>
    <Branches />
    <h6>Current Branch:{this.props.branch}</h6>
    <h3>Latest Commits</h3>
    {this.props.isLoading.load ? (
     <Loading
      text={`Fetching latest Commits of ${this.props.branch} for you...`}
     />
    ) : (
     <div>
      {this.arr()}
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
          this.props.loadCommits(this.props.page.prev);
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
          this.props.loadCommits(this.props.page.next);
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

// prettier-ignore
const mapStateToProps = ({ isLoading, commits, error, branch,page,buildData}) => ({
	isLoading,
	commits,
	error,
	branch,
    page,
    buildData
});

const mapDispatchToProps = dispatch => ({
 loadBuildSets: () => dispatch(loadBuildSets()),
 loadCommits: next => dispatch(loadCommits(next))
});

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Commits);
