import React from 'react';
import { connect } from 'react-redux';

function Build({builderid, number, builderName, started_at, complete_at, state_string}) {
  return (<React.Fragment>
    <div className='col-sm-3'>
      <a
        target='_blank'
        rel='noreferrer noopener'
        href={`https://build.reactos.org/#builders/${
          builderid
        }/builds/${number}`}
      >
        {builderName}
      </a>
    </div>
    <div className='col-sm-3'>
      {state_string}
      {state_string === 'build successful' ? (
        <i className='fa fa-check' />
      ) : (
        <i />
      )}
    </div>
    <div className='col-sm-3'>started_at:{started_at}</div>
    <div className='col-sm-3'>complete_at:{complete_at}</div>
  </React.Fragment>);
}

function renderBuild(props) {
  return <Build key={props.buildid} {...props} />;
}

function BuildDetails({builds}) {
  return (<React.Fragment>
    {builds.length > 0 ? (
      <div className='row'>{builds.map(renderBuild)}</div>
    ) : (
      <p>
        <strong>No data Exists</strong>
      </p>
    )}
  </React.Fragment>);
}

const mapStateToProps = ({ builders }, ownProps) => {
  return {
    builds: ownProps.builds.map(
      build => {...build, builderName: builders[build.builderid].name}
    )
  };
};

export default connect(mapStateToProps)(BuildDetails);
