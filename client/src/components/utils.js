import React from 'react'
import { JOB_STATUS } from '../redux/constants'


export function statusElement(status, statusText) {
  switch(status) {
    case JOB_STATUS.SUCCESS:
      return <span className="text-success" title={statusText}><i className="fa fa-check" /></span>
    case JOB_STATUS.ONGOING:
      return <span className="text-warning" title={statusText}><i className="fa fa-hourglass" /></span>
    case JOB_STATUS.FAILURE:
      return <span className="text-danger" title={statusText}><i className="fa fa-times" /></span>
    default:
      return null
  }
}
