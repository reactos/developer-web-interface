import React from 'react';
import { UncontrolledCollapse, CardBody, Card, CardHeader } from 'reactstrap';
export default class CommitsCard extends React.Component {
 render() {
  let tog = 'toggler' + this.props.commit.sha;
  let committerDate = new Date(this.props.commit.commit.committer.date);
  let authorDate = new Date(this.props.commit.commit.author.date);
  let author = encodeURIComponent(this.props.commit.commit.author.name);
  let committer = encodeURIComponent(this.props.commit.commit.committer.name);
  return (
   <Card>
    <CardHeader className='new' type='button' id={tog}>
     <div className='row'>
      <div className='col-sm'>{this.props.commit.sha.substring(0, 7)}</div>
      <div className='col-sm'>{this.props.commit.commit.committer.name}</div>
      <div className='col-sm'>{committerDate.toLocaleString()}</div>
      <div className='col-sm'>
       {this.props.commit.commit.message.substring(0, 17)}...
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
         href={this.props.commit.html_url}
        >
         {this.props.commit.sha}
        </a>
       </p>
       <p>
        <strong>Commit Msg:</strong> {this.props.commit.commit.message}
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
         {this.props.commit.commit.author.name}
        </a>
       </div>
       <div className='col-sm'>
        <strong>Author Date: </strong>
        {authorDate.toLocaleString()}
       </div>
       <div className='col-sm'>
        <strong>Author Email: </strong>
        <a
         href={`mailto:${this.props.commit.commit.author.email}`}
         target='_top'
        >
         {this.props.commit.commit.author.email}
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
         {this.props.commit.commit.committer.name}
        </a>
       </div>
       <div className='col-sm'>
        <strong>Committer Date: </strong>
        {committerDate.toLocaleString()}
       </div>
       <div className='col-sm'>
        <strong>Committer Email: </strong>
        <a
         href={`mailto:${this.props.commit.commit.committer.email}`}
         target='_top'
        >
         {this.props.commit.commit.committer.email}
        </a>
       </div>
      </div>
     </CardBody>
    </UncontrolledCollapse>
   </Card>
  );
 }
}
