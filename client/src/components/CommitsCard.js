import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import BuildDetails from './BuildDetails';

function CommitsCard(props) {
  let tog = 'toggler' + props.sha;
  let committerDate = new Date(props.commit.committer.date);
  let authorDate = new Date(props.commit.author.date);
  let author = encodeURIComponent(props.commit.author.name);
  let committer = encodeURIComponent(props.commit.committer.name);
  return (
    <Card>
      <CardHeader className='new' type='button' id={tog}>
        <div className='row'>
          <div className='col-sm'>{props.sha.substring(0, 7)}</div>
          <div className='col-sm'>{props.commit.committer.name}</div>
          <div className='col-sm'>{committerDate.toLocaleString()}</div>
          <div className='col-sm'>
            {props.commit.message.substring(0, 17)}...
          </div>
        </div>
      </CardHeader>
      <UncontrolledCollapse toggler={tog}>
        <CardBody className='indent'>
          <div>
            <p>
              <strong>commit: </strong>{' '}
              <a
                target='_blank'
                rel='noreferrer noopener'
                href={props.commit.html_url}
              >
                {props.sha}
              </a>
            </p>
            <p>
              <strong>Commit Msg:</strong> {props.commit.message}
            </p>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <strong>Author: </strong>
              <a
                target='_blank'
                rel='noreferrer noopener'
                href={`https://git.reactos.org/?p=reactos.git;a=search;s=${author};st=author`}
              >
                {props.commit.author.name}
              </a>
            </div>
            <div className='col-sm'>
              <strong>Author Date: </strong>
              {authorDate.toLocaleString()}
            </div>
            <div className='col-sm'>
              <strong>Author Email: </strong>
              <a href={`mailto:${props.commit.author.email}`} target='_top'>
                {props.commit.author.email}
              </a>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <strong>Committer: </strong>
              <a
                target='_blank'
                rel='noreferrer noopener'
                href={`https://git.reactos.org/?p=reactos.git;a=search;s=${committer};st=committer`}
              >
                {props.commit.committer.name}
              </a>
            </div>
            <div className='col-sm'>
              <strong>Committer Date: </strong>
              {committerDate.toLocaleString()}
            </div>
            <div className='col-sm'>
              <strong>Committer Email: </strong>
              <a href={`mailto:${props.commit.committer.email}`} target='_top'>
                {props.commit.committer.email}
              </a>
            </div>
          </div>
          <hr />
          <h5>Build Details:</h5>
          {props.builds ? <BuildDetails builds={props.builds} /> : <div />}
        </CardBody>
      </UncontrolledCollapse>
    </Card>
  );
}
export default CommitsCard;
