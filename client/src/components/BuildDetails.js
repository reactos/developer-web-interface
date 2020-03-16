import React from 'react';
import { connect } from 'react-redux';

import { JOB_STATUS } from 'redux/constants'
import { statusElement } from './utils'


function bootcdUrl(suffix) {
  return `https://iso.reactos.org/bootcd/reactos-bootcd-${suffix}.7z`
}

function livecdUrl(suffix) {
  return `https://iso.reactos.org/livecd/reactos-livecd-${suffix}.7z`
}

function Build({buildId, builderId, number, builderName, status, statusText, isoSuffix}) {
  return (
    <div className="row" key={buildId}>
      <div className='col-sm-1'>
        {statusElement(status, statusText)}
      </div>
      <div className='col-sm-5'>
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://build.reactos.org/#builders/${builderId}/builds/${number}`}
        >
          {builderName}
        </a>
      </div>
      <div className='col-sm-6'>
        {status === JOB_STATUS.SUCCESS &&
          <React.Fragment>
            <a href={bootcdUrl(isoSuffix)}><i className="fa fa-download" />{" bootcd"}</a>
            {" "}
            <a href={livecdUrl(isoSuffix)}><i className="fa fa-download" />{" livecd"}</a>
          </React.Fragment>
        }        
      </div>
    </div>
  );
}

function BuildDetails({ builds }) {
  return (
    <React.Fragment>
      {builds.length > 0 ? (
        builds.map(Build)
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
      ...build,
      builderName: builders[build.builderId] && builders[build.builderId].name
    }))
  };
};

export default connect(mapStateToProps)(BuildDetails);
