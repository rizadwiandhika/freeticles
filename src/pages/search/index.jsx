import React from 'react'
import Navbar from '../../components/Navbar'
import ArticleSearchCard from '../../components/Article/ArticleSearchCard'
import LabelRounded from '../../components/UI/LabelRounded'

export default function Search(props) {
  return (
    <>
      <Navbar mode="authenticatedSearch" noSticky />

      <div className="w-11/12 max-w-screen-xl mx-auto md:grid md:grid-cols-12">
        <div className="md:col-span-8 ">
          <div className="mt-12 ">
            <div className="flex gap-6 border-b border-gray-300">
              <form className="w-full">
                <input
                  className="block w-full h-20 text-4xl placeholder-gray-400 border-none focus:outline-none focus:border-transparent focus:ring-transparent"
                  type="text"
                  name="q"
                  id="q"
                  placeholder="Search freticles"
                />
              </form>
            </div>
            <div className="mt-12">
              <div>
                <ArticleSearchCard />
              </div>
              <div className="mt-12">
                <ArticleSearchCard />
              </div>
              <div className="mt-12">
                <ArticleSearchCard />
              </div>
              <div className="mt-12">
                <ArticleSearchCard />
              </div>
              <div className="mt-12">
                <ArticleSearchCard />
              </div>
              <div className="mt-12">
                <ArticleSearchCard />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden mx-auto border-l border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Tags</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <LabelRounded theme="gray" text="Programming" />
              <LabelRounded theme="gray" text="TV" />
              <LabelRounded theme="gray" text="Book" />
              <LabelRounded theme="gray" text="Guitar" />
              <LabelRounded theme="gray" text="Self" />
              <LabelRounded theme="gray" text="Mindfulness" />
              <LabelRounded theme="gray" text="Lifestyle" />
              <LabelRounded theme="gray" text="React JS" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
