import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
function PullsCard(props) {
 let tog = 'toggler' + props.pull.id;
 let createdDate = new Date(props.pull.created_at);
 let closedDate = new Date(props.pull.closed_at);
 let mergedDate = new Date(props.pull.merged_at);
 return (
  <Card>
   <CardHeader className='new' type='button' id={tog}>
    <div className='row'>
     <div className='col-sm'>{props.pull.number}</div>
     <div className='col-sm'>{props.pull.state}</div>
     <div className='col-sm'>{props.pull.user.login}</div>
    </div>
   </CardHeader>
   <UncontrolledCollapse toggler={tog}>
    <CardBody className='indent'>
     <p>
      <strong>Pull number: </strong>{' '}
      <a target='_blank' rel='noreferrer noopener' href={props.pull.html_url}>
       {props.pull.number}
      </a>
     </p>
     <p>
      <strong>Title:</strong> {props.pull.title}
     </p>
     <p>
      <strong>Body:</strong> {props.pull.body}
     </p>
     <div className='row'>
      <div className='col-sm'>
       <strong>Created at: </strong>
       {createdDate.toLocaleString()}
      </div>
      <div className='col-sm'>
       <strong>Closed at: </strong>
       {props.pull.closed_at !== null ? closedDate.toLocaleString() : null}
      </div>
      <div className='col-sm'>
       <strong>Merged at: </strong>
       {props.pull.merged_at !== null ? mergedDate.toLocaleString() : null}
      </div>
     </div>
    </CardBody>
   </UncontrolledCollapse>
  </Card>
 );
}
export default PullsCard;
