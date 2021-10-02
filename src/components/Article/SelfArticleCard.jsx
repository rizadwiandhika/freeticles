import React from 'react'

export default function SelfArticleCard({ className }) {
  return (
    <div className={className}>
      <div className="max-w-screen-sm">
        <h1 className="text-xl font-bold">
          How to Turn the Complex Mathematics of Vector Calculus Into Simple
          Pictures
        </h1>
        <h3 className="mt-2 text-gray-500">
          Feynman diagrams revolutionized particle physics. Now mathematicians
          want to do the same for vector calculus...
        </h3>
        <p className="mt-4 text-sm text-gray-500">Sep 6 • 8 min read</p>
      </div>
    </div>
  )
}
