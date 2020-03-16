import React from 'react'


export default function Pagination({currentPage, nextPage, prevPage}) {
  return (
    <div>
      <button
        type='button'
        onClick={prevPage}
        className='btn btn-primary '
        disabled={currentPage === 1}
      >
        <i className='fa fa-caret-left' aria-hidden='true' />
        Previous Page{' '}
      </button>{' '}
      <button
        type='button'
        onClick={nextPage}
        className='btn btn-primary'
      >
        Next Page{'   '}
        <i className='fa fa-caret-right' aria-hidden='true' />
      </button>
      <footer className='blockquote-footer'>
        Page {currentPage}
      </footer>
      <div className='footer-blockquote' />
    </div>
  )
}
