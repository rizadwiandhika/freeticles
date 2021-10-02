import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import qs from 'query-string'
import { SearchIcon } from '@heroicons/react/outline'

export default function Search({ name, value, onChange, onSubmit }) {
  const [query, setQuery] = useState('')
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    const url = { pathname: '/search', search: qs.stringify({ q: query }) }
    console.log(url)
    history.push(url)
  }

  function handleChange(e) {
    setQuery(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-full pl-2 rounded-3xl overflow-hidden bg-gray-theme focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-theme">
        <SearchIcon className="inline-block h-full w-4 " />
        <input
          value={query}
          placeholder="Search on..."
          onChange={handleChange}
          type="text"
          name="query"
          id="query"
          className="text-sm h-full border-none bg-transparent focus:ring-transparent focus:border-transparent focus:outline-none"
        />
      </div>
    </form>
  )
}
