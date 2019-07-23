import React from 'react';
import { connect } from 'react-redux';
function BuildDetails(props) {
  const renderBuilds = builds => {
    return (
      <React.Fragment key={builds.buildid}>
        <div className='col-sm-3'>
          <a
            target='_blank'
            rel='noreferrer noopener'
            href={`https://build.reactos.org/#builders/${
              builds.builderid
            }/builds/${builds.number}`}
          >
            {props.builders[builds.builderid - 1].name}
          </a>
        </div>
        <div className='col-sm-3'>
          {builds.state_string}
          {builds.state_string === 'build successful' ? (
            <i className='fa fa-check' />
          ) : (
            <i />
          )}
        </div>
        <div className='col-sm-3'>started_at:{builds.started_at}</div>
        <div className='col-sm-3'>complete_at:{builds.complete_at}</div>
      </React.Fragment>
    );
  };

  return props.builds ? (
    <React.Fragment>
      {props.builds.length > 0 ? (
        <div className='row'>{props.builds.map(renderBuilds)}</div>
      ) : (
        <p>
          <strong>No data Exists</strong>
        </p>
      )}
    </React.Fragment>
  ) : (
    <h6>No data Exists</h6>
  );
}

const mapStateToProps = ({ builders }) => ({
  builders
});
export default connect(mapStateToProps)(BuildDetails);
