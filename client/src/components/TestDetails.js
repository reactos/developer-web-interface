import React from 'react';
import { connect } from 'react-redux'
import { statusElement } from './utils'


function renderCountChange(test, previousTestCount) {
  if (!previousTestCount) {
    return;
  }
  let countDifference = test.count - previousTestCount;

  if (countDifference > 0) {
    return <sup className='text-success'>+{countDifference}</sup>;
  } else if (countDifference < 0) {
    return <sup className='text-danger'>{countDifference}</sup>;
  }
}

const trStyle = {fontSize: "0.85rem"}

function renderTest(test, previousTests) {
  return (
    <tr key={test.buildBotId} style={trStyle}>
      <td>
        {statusElement(test.status, test.statusText)}
      </td>
      <td>
        {test.testerName}
        {/* Hack: to be removed when we will properly populate build properties */}
        {test.parentBuild && test.parentBuild.builderid === 10 ? " (GCC8)" : " (GCC)"}
      </td>     
      <td>
        {test.testManData
          ? <span title="Tests count: failures/total">{`${test.testManData.failures}/${test.testManData.count}`}</span>
          : ""}
      </td>
      <td>
        <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://build.reactos.org/#builders/${test.builderId}/builds/${test.number}`}
        >
          {`bbot: ${test.number}`}
        </a>
        {" "}
        {test.testManData && <a
          target='_blank'
          rel='noreferrer noopener'
          href={`https://reactos.org/testman/compare.php?ids=${test.testManData.id}`}
        >
          {`tm: ${test.testManData.id}`}
        </a>}
      </td>
    </tr>
  );
}

/*
 Count: {test.count}
        { previousTests[test.source] returns undefined when PR State === closed  }
        {previousTests
          ? renderCountChange(test, previousTests[test.source])
          : null}
<div className='col-sm-3'>Failures: {test.failures}</div>
 */

function TestDetails(props) {
  return (
    <React.Fragment>
      {props.tests.length > 0 ? (
        <table className="table table-sm table-striped">
          <tbody>
            {props.tests.map(test => renderTest(test, props.previousTests))}
          </tbody>
        </table>
      ) : (
        <p>
          <strong>No data Exists</strong>
        </p>
      )}
    </React.Fragment>
  );
}

function mapStateToProps({ builders }, ownProps) {
  return {
    tests: ownProps.tests.map(t => ({
      ...t,
      testerName: builders[t.builderId] && builders[t.builderId].name
    }))
  }
}

export default connect(mapStateToProps)(TestDetails);
