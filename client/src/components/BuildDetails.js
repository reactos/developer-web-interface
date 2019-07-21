import React from 'react';
class BuildDetails extends React.Component {
  renderBuild = build => {
    return (
      <React.Fragment key={build.buildid}>
        <div className='col-sm-3'>
          <a
            target='_blank'
            rel='noreferrer noopener'
            href={`https://build.reactos.org/#builders/${
              build.builderid
            }/builds/${build.number}`}
          >
            {this.props.builders[build.builderid - 1].name}
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
        <div className='col-sm-3'>started_at:{build.started_at}</div>
        <div className='col-sm-3'>complete_at:{build.complete_at}</div>
      </React.Fragment>
    );
  };
  render() {
    return this.props.build ? (
      <React.Fragment>
        {this.props.build.length > 0 ? (
          <div className='row'>{this.props.build.map(this.renderBuild)}</div>
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
}

export default BuildDetails;
