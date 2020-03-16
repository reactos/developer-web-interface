import React from 'react';
import Loader from 'react-loader-spinner';


export default function Loading({children}) {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Loader type='Bars' color='#5A6268' height='50' width='100' />
      <p>{children}</p>
    </div>
  )
}
