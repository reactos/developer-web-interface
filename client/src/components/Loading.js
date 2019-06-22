import React from 'react';
import Loader from 'react-loader-spinner';
class Loading extends React.Component {
 //other logic
 render() {
  return <Loader type='Bars' color='#5A6268' height='50' width='100' />;
 }
}

export default Loading;
