import React from 'react'

import LabelRounded from '../UI/LabelRounded'

const defaultMode = ''
const mode = {
  notAuthenticated: defaultMode,
  authenticated: '',
  profile: '',
  writing: ''
}

export default function Navbar(props) {
  // Justify center -> height jadi full parrent

  const ui = mode[props.view] || defaultMode

  return (
    <nav className="flex justify-center h-16 bg-yellow-100">
      <div className="w-full max-w-6xl mx-6 md:mx-12 lg:mx-16 bg-white">
        <div className="h-full flex items-center">
          <div className="flex-grow flex-shrink-0">Freeticles Logo</div>
          <div className="flex-grow-0 flex-shrink-0">
            <div className="flex gap-4 justify-end items-center">
              {props.children || 'Default items'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
