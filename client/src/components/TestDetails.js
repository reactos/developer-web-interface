import React from 'react';

function renderCountChange(test, previousTestCount) {
  if (!previousTestCount) {
    return;
  }

  let countDifference = test.count - previousTestCount;

  if (countDifference > 0) {
    return (
      <sup className='text-success'>
        +{countDifference}
      </sup>
    );
  } else if (countDifference < 0) {
    return (
      <sup className='text-danger'>
        {countDifference}
      </sup>
    );
  }
}

function renderTest(test, previousTests) {
  return (
    <React.Fragment key={test.id}>
      <div className='col-sm-2'>Test id: {test.id}</div>
      <div className='col-sm-4'>
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://reactos.org/testman/compare.php?ids=${test.id}`}
        >
          {test.source}
        </a>
      </div>
      <div className='col-sm-3'>Count: {test.count}{renderCountChange(test, previousTests[test.source])}</div>
      <div className='col-sm-3'>Failures: {test.failures}</div>
    </React.Fragment>
  );
}

function TestDetails(props) {
  return (
    <React.Fragment>
      {props.tests.length > 0 ? (
        <div className='row'>{props.tests.map(test => renderTest(test, props.previousTests))}</div>
      ) : (
        <p>
          <strong>No data Exists</strong>
        </p>
      )}
    </React.Fragment>
  );
}

export default TestDetails;
