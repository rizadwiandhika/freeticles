import React from 'react'

import { SearchIcon } from '@heroicons/react/outline'

export default function Search(props) {
  return (
    <div className="h-full pl-2 rounded-3xl overflow-hidden bg-gray-theme">
      <SearchIcon className="inline-block h-full w-4 " />
      <input
        className="text-sm h-full border-none focus:border-transparent focus:outline-none bg-gray-theme"
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
