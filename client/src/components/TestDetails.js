import React from 'react';

function renderTest(test) {
  return (
    <React.Fragment key={test.id._text}>
      <div className='col-sm-2'>Test id: {test.id._text}</div>
      <div className='col-sm-4'>
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://reactos.org/testman/compare.php?ids=${test.id._text}`}
        >
          {test.source._text}
        </a>
      </div>
      <div className='col-sm-3'>Count: {test.count._text}</div>
      <div className='col-sm-3'>Failures: {test.failures._text}</div>
    </React.Fragment>
  );
}

function TestDetails(props) {
  return (
    <React.Fragment>
      {props.tests.length > 0 ? (
        <div className='row'>{props.tests.map(renderTest)}</div>
      ) : (
        <p>
          <strong>No data Exists</strong>
        </p>
      )}
    </React.Fragment>
  );
}

export default TestDetails;
