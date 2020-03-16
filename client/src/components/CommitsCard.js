import React from 'react';
import { connect } from 'react-redux'
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
import BuildDetails from './BuildDetails';
import TestDetails from './TestDetails';
import { JOB_STATUS, LOAD_STATE } from '../redux/constants'
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
  if (!jobs || !jobs.length) return JOB_STATUS.NO_DATA

  let ret = JOB_STATUS.SUCCESS

  for (let job of jobs) {
    if (job.status === JOB_STATUS.ONGOING)
      return JOB_STATUS.ONGOING
    else if (job.status === JOB_STATUS.FAILURE)
      ret = JOB_STATUS.FAILURE
  }

  return ret
}

function CommitsCard({sha, author, commit, loadStatus, ...props}) {
  let tog = 'toggler' + sha;
  let committerDate = new Date(commit.committer.date);
  let authorDate = new Date(commit.author.date);
  const author_login = author ? author.login : commit.author.name
  const builds = props.builds ? props.builds : []
  const tests = props.tests ? props.tests : []

  return (
    <Card className="mb-1">
      <CardHeader className='new' type='button' id={tog}>
        <div className='row'>
          <div className='col-sm-9'>
            <a className="text-monospace" href={`https://github.com/reactos/reactos/commit/${sha}`}>{sha.substring(0, 7)}</a>
            {" "}{firstLineTrimmed(commit.message)}
          </div>
          <div className='col-sm-2'>{author_login}</div>
          <div className="col-sm-1">
            {loadStatus.buildBot === LOAD_STATE.LOADING
              ? <span title="Loading results"><i className="fa fa-refresh fa-spin" /></span>
              : statusElement(getTotalStatus(props.builds), "Build status") }
            {" "}
            {loadStatus.buildBot === LOAD_STATE.LOADING
              ? <span title="Loading results"><i className="fa fa-refresh fa-spin" /></span>
              : statusElement(getTotalStatus(props.tests), "Test status") }
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
                href={commit.html_url}
              >
                {sha}
              </a>
            </p>
            <p>
              <strong>Commit Msg:</strong> {commit.message}
            </p>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <strong>Author: </strong>
              <a
                target='_blank'
                rel='noreferrer noopener'
                href={`https://git.reactos.org/?p=reactos.git;a=search;s=${encodeURIComponent(commit.author.name)};st=author`}
              >
                {commit.author.name}
              </a>
              {` <${commit.author.email}>`}
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
                href={`https://git.reactos.org/?p=reactos.git;a=search;s=${encodeURIComponent(commit.committer.name)};st=committer`}
              >
                {commit.committer.name}
              </a>
              {` <${commit.committer.email}>`}
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
              {loadStatus.buildBot === LOAD_STATE.LOADING
                ? <strong>Loading builds data...</strong>
                : <BuildDetails builds={builds} /> }
            </div>
            <div className="col-md-7">
              <h5>Test Details:</h5>
              {loadStatus.buildBot === LOAD_STATE.LOADING
                ? <strong>Loading tests data...</strong>
                : <TestDetails tests={tests} previousTests={props.previousTests} /> }
            </div>
          </div>
        </CardBody>
      </UncontrolledCollapse>
    </Card>
  );
}

function mapStateToProps(state, ownProps) {
  return {...ownProps, loadStatus: state.isLoading.byCommit[ownProps.sha]}
}

export default connect(mapStateToProps)(CommitsCard);
