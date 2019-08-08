import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import BuildDetails from './BuildDetails';
import TestDetails from './TestDetails';

function PullsCard(props) {
  let tog = 'toggler' + props.id;
  let createdDate = new Date(props.created_at);
  let closedDate = new Date(props.closed_at);
  let mergedDate = new Date(props.merged_at);
  return (
    <Card>
      <CardHeader className='new' type='button' id={tog}>
        <div className='row'>
          <div className='col-sm'>{props.number}</div>
          <div className='col-sm'>{props.merge_commit_sha.substring(0, 7)}</div>
          <div className='col-sm'>{props.state}</div>
          <div className='col-sm'>{props.user.login}</div>
        </div>
      </CardHeader>
      <UncontrolledCollapse toggler={tog}>
        <CardBody className='indent'>
          <p>
            <strong>Pull number: </strong>{' '}
            <a target='_blank' rel='noreferrer noopener' href={props.html_url}>
              {props.number}
            </a>
          </p>
          <p>
            <strong>Title:</strong> {props.title}
          </p>
          <p>
            <strong>Body:</strong> {props.body}
          </p>
          <div className='row'>
            <div className='col-sm'>
              <strong>Created at: </strong>
              {createdDate.toLocaleString()}
            </div>
            <div className='col-sm'>
              <strong>Closed at: </strong>
              {props.closed_at !== null ? closedDate.toLocaleString() : null}
            </div>
            <div className='col-sm'>
              <strong>Merged at: </strong>
              {props.merged_at !== null ? mergedDate.toLocaleString() : null}
            </div>
          </div>
          <hr />
          <h5>Build Details:</h5>
          {props.builds ? <BuildDetails builds={props.builds} /> : <div />}
          <hr />
          <h5>Test Details:</h5>
          {props.tests ? (
            <TestDetails tests={props.tests} />
          ) : (
            <p>
              <strong>No data Exists..</strong>
            </p>
          )}
        </CardBody>
      </UncontrolledCollapse>
    </Card>
  );
}
export default PullsCard;
