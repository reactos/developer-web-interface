import React from 'react';
import { connect } from 'react-redux';
function Build({ build, builderName }) {
  let completedDate = new Date(build.complete_at * 1000);
  let startedDate = new Date(build.started_at * 1000);
  return (
    <React.Fragment>
      <div className='col-sm-2'>
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://build.reactos.org/#builders/${
            build.builderid
          }/builds/${build.number}`}
        >
          {builderName}
        </a>
      </div>
      <div className='col-sm-3'>
        {build.state_string}
        {build.state_string === 'build successful' ? (
          <i className='fa fa-check' />
        ) : (
          <i />
        )}
      </div>
      <div className='col-sm-3'>Started: {startedDate.toLocaleString()}</div>
      <div className='col-sm-4'>
        Completed: {build.complete_at ? completedDate.toLocaleString() : <p />}
      </div>
    </React.Fragment>
  );
}

function renderBuild(props) {
  return <Build key={props.build.buildid} {...props} />;
}

function BuildDetails({ builds }) {
  return (
    <React.Fragment>
      {builds.length > 0 ? (
        <div className='row'>{builds.map(renderBuild)}</div>
      ) : (
        <p>
          <strong>No data Exists</strong>
        </p>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = ({ builders }, ownProps) => {
  return {
    builds: ownProps.builds.map(build => ({
      build,
      builderName: builders[build.builderid].name
    }))
  };
};

export default connect(mapStateToProps)(BuildDetails);
