import React from 'react'

import LabelRounded from '../LabelRounded'

export default function Navbar(props) {
  // Justify center -> height jadi full parrent
  return (
    <nav className="flex justify-center h-16 bg-green-100">
      <div className="w-full max-w-6xl mx-6 md:mx-12 lg:mx-16 bg-yellow-100">
        <div className="h-full flex items-center">
          <div className="flex-grow flex-shrink-0">Freeticles Logo</div>
          <div className="flex-grow-0 flex-shrink-0">
            <div className="flex gap-4 justify-end items-center">
              <LabelRounded text="Preview" />
              <LabelRounded blue text="Publish" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
