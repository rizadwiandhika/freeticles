import React from 'react'
import Navbar from '../../components/Navbar'
import ArticleCard from '../../components/Article/ArticleCard'
import LabelRounded from '../../components/UI/LabelRounded'

export default function Home(props) {
  return (
    <>
      <Navbar mode="notAuthenticated" noSticky />

      <div className="w-11/12 max-w-screen-xl mx-auto md:grid md:grid-cols-12">
        <div className="md:col-span-8 ">
          <div className="mt-12 ">
            <div className="flex gap-6 border-b border-gray-300">
              <p className="pb-2 border-b border-none text-sm">TODAY</p>
              <p className="pb-2 border-b border-black text-sm font-bold">
                RECOMMENDED ARTICLES
              </p>
            </div>
            <div className="mt-12">
              <div>
                <ArticleCard />
              </div>
              <div className="mt-12">
                <ArticleCard />
              </div>
              <div className="mt-12">
                <ArticleCard />
              </div>
              <div className="mt-12">
                <ArticleCard />
              </div>
              <div className="mt-12">
                <ArticleCard />
              </div>
              <div className="mt-12">
                <ArticleCard />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden mx-auto border-l border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Recommended topics</p>
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

            <div className="mt-12">
              <p className="pb-2 font-bold ">WRITE AN ARTICLE</p>
              <p className="pb-2 text-sm ">
                You can start share article to million readres
              </p>
              <div className="mt-4 min-w-max w-12 mx-auto">
                <LabelRounded py={2} px={8} theme="blue" text="Start Writing" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
