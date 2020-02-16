import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import BuildDetails from './BuildDetails';
import TestDetails from './TestDetails';
import { JOB_STATUS } from '../redux/constants'
import { statusElement } from './utils'

function firstLineTrimmed(str) {
  const newStr = str.split('\n', 1)[0]
  if (newStr.length > 70) {
    return newStr.substring(0, 70) + '...'
  }
  else {
    return newStr
  }
}

function getTotalStatus(jobs) {
  if (!jobs.length) return null

  let ret = JOB_STATUS.SUCCESS

  for (let job of jobs) {
    if (job.status === JOB_STATUS.ONGOING)
      return JOB_STATUS.ONGOING
    else if (job.status === JOB_STATUS.FAILURE)
      ret = JOB_STATUS.FAILURE
  }

  return ret
}

function CommitsCard({sha, ...props}) {
  let tog = 'toggler' + sha;
  let committerDate = new Date(props.commit.committer.date);
  let authorDate = new Date(props.commit.author.date);
  let author = encodeURIComponent(props.commit.author.name);
  let committer = encodeURIComponent(props.commit.committer.name);
  return (
    <Card className="mb-1">
      <CardHeader className='new' type='button' id={tog}>
        <div className='row'>
          <div className='col-sm-9'>
            <a className="text-monospace" href={`https://github.com/reactos/reactos/commit/${sha}`}>{sha.substring(0, 7)}</a>
            {" "}{firstLineTrimmed(props.commit.message)}
          </div>
          <div className='col-sm-2'>{props.author.login}</div>
          <div className="col-sm-1">
            {props.builds &&
              props.builds.length > 0
                ? statusElement(getTotalStatus(props.builds), "Build status")
                : <span title="Loading results"><i className="fa fa-refresh fa-spin" /></span> }
            {" "}
            {props.tests &&
              props.tests.length > 0
                ? statusElement(getTotalStatus(props.tests), "Test status")
                : <span title="Loading results"><i className="fa fa-refresh fa-spin" /></span> }
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
                {sha}
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
              {` <${props.commit.author.email}>`}
            </div>
            <div className='col-sm'>
              <strong>Author Date: </strong>
              {authorDate.toLocaleString()}
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
              {` <${props.commit.committer.email}>`}
            </div>
            <div className='col-sm'>
              <strong>Committer Date: </strong>
              {committerDate.toLocaleString()}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-5">
              <h5>Build Details:</h5>
              {props.builds ? (
                <BuildDetails builds={props.builds} />
              ) : (
                <div>
                  <strong>Loading Builds...</strong>
                </div>
              )}
            </div>
            <div className="col-md-7">
              <h5>Test Details:</h5>
              {props.tests ? (
                <TestDetails tests={props.tests} previousTests={props.previousTests} />
              ) : (
                <div>
                  <strong>No data Exists</strong>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </UncontrolledCollapse>
    </Card>
  );
}
export default CommitsCard;
