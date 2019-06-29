import React from 'react';
import Loader from 'react-loader-spinner';
class Loading extends React.Component {
 render() {
  return (
   <React.Fragment>
    <p>
     <strong>{this.props.text}</strong>
    </p>
    <Loader type='Bars' color='#5A6268' height='50' width='100' />
   </React.Fragment>
  );
 }
}

export default Loading;
