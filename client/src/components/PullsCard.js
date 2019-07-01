import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';

class PullsCard extends React.Component {
 render() {
  let tog = 'toggler' + this.props.pull.id;
  let createdDate = new Date(this.props.pull.created_at);
  let closedDate = new Date(this.props.pull.closed_at);
  let mergedDate = new Date(this.props.pull.merged_at);

  return (
   <Card>
    <CardHeader className='new' type='button' id={tog}>
     <div className='row'>
      <div className='col-sm'>{this.props.pull.number}</div>
      <div className='col-sm'>{this.props.pull.state}</div>
      <div className='col-sm'>{this.props.pull.user.login}</div>
     </div>
    </CardHeader>
    <UncontrolledCollapse toggler={tog}>
     <CardBody className='indent'>
      <p>
       <strong>Pull number: </strong>{' '}
       <a
        target='_blank'
        rel='noreferrer noopener'
        href={this.props.pull.html_url}
       >
        {this.props.pull.number}
       </a>
      </p>
      <p>
       <strong>Title:</strong> {this.props.pull.title}
      </p>
      <p>
       <strong>Body:</strong> {this.props.pull.body}
      </p>
      <div className='row'>
       <div className='col-sm'>
        <strong>Created at: </strong>
        {createdDate.toLocaleString()}
       </div>
       <div className='col-sm'>
        <strong>Closed at: </strong>
        {this.props.pull.closed_at !== null
         ? closedDate.toLocaleString()
         : null}
       </div>
       <div className='col-sm'>
        <strong>Merged at: </strong>
        {this.props.pull.merged_at !== null
         ? mergedDate.toLocaleString()
         : null}
       </div>
      </div>
     </CardBody>
    </UncontrolledCollapse>
   </Card>
  );
 }
}
export default PullsCard;
