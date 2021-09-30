import React from 'react'

import { SearchIcon } from '@heroicons/react/outline'

export default function Search(props) {
  return (
    <div className="h-full pl-2 rounded-3xl overflow-hidden bg-white">
      <SearchIcon className="inline-block h-full w-4 text-gray-500" />
      <input
        className="text-sm h-full border-none focus:outline-none"
        value={props.value}
        placeholder="Search on..."
        onChange={props.changed}
        type="text"
        name="query"
        id="query"
      />
    </div>
  )
}
