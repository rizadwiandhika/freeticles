import React from 'react'
import { getDateFormat } from '../../utils'

export default function Comment({
  className,
  commentData = {
    username: '',
    date: '',
    commentar: ''
  }
}) {
  return (
    <div className={className}>
      <p className="font-bold">
        {commentData.username}
        <span className="ml-2 font-normal text-gray-500">
          {getDateFormat(commentData.date)}
        </span>
      </p>
      <p className="mt-2">{commentData.commentar}</p>
    </div>
  )
}
