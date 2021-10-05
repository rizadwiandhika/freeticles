import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_ARTICLES } from '../graphql/query'
import withOverlay from '../hoc/withAuthOverlay'
import Navbar from '../components/Navbar'
import DefaultNavItems from '../components/Navbar/Items/DefaultNavItems'
import ArticleCard from '../components/Article/ArticleCard'
import LabelRounded from '../components/UI/LabelRounded'
import NavSearch from '../containers/Navbar/NavSearch'

import loadingFetch from '../assets/loading-fetch.svg'

function Home(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password
  const { loading, data, error } = useQuery(GET_ARTICLES)

  function afterAuthCallback(err) {
    if (err) return
    props.closeOverlay()
  }

  function handleClickSignIn() {
    props.openOverlayLogin()
    props.setLoginCallback(afterAuthCallback)
    props.setRegisterCallback(afterAuthCallback)
  }

  function handleClickGetStarted() {
    props.openOverlayRegister()
    props.setLoginCallback(afterAuthCallback)
    props.setRegisterCallback(afterAuthCallback)
  }

  function handleClickLogout() {
    dispatch(logout())
  }

  function handleClickStartWriting() {
    if (isAuth) return props.history.push('/create-article')

    function callback(err) {
      if (err) return
      props.history.push('/create-article')
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }

  function handleLabelClick(query) {
    props.history.push(`/search?q=${query}`)
  }

  if (error) {
    console.error(error)
  }

  return (
    <>
      <Navbar shadow>
        <NavSearch />
        <DefaultNavItems
          isAuth={isAuth}
          handleClickGetStarted={handleClickGetStarted}
          handleClickSignIn={handleClickSignIn}
          handleClickLogout={handleClickLogout}
        />
      </Navbar>

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
              {loading && (
                <img
                  className="block mx-auto"
                  src={loadingFetch}
                  alt="loading pic"
                />
              )}

              {data?.articles.map((article) => (
                <ArticleCard
                  key={article.articleId}
                  className="mt-12"
                  data={article}
                />
              ))}

              {/* <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" />
              <ArticleCard className="mt-12" /> */}
            </div>
          </div>
        </div>
        <div className="hidden mx-auto border-l border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Recommended topics</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <LabelRounded
                onClick={() => handleLabelClick('Programming')}
                theme="gray"
                text="Programming"
              />
              <LabelRounded
                onClick={() => handleLabelClick('TV')}
                theme="gray"
                text="TV"
              />
              <LabelRounded
                onClick={() => handleLabelClick('Book')}
                theme="gray"
                text="Book"
              />
              <LabelRounded
                onClick={() => handleLabelClick('Guitar')}
                theme="gray"
                text="Guitar"
              />
              <LabelRounded
                onClick={() => handleLabelClick('Self')}
                theme="gray"
                text="Self"
              />
              <LabelRounded
                onClick={() => handleLabelClick('Mindfulness')}
                theme="gray"
                text="Mindfulness"
              />
              <LabelRounded
                onClick={() => handleLabelClick('Lifestyle')}
                theme="gray"
                text="Lifestyle"
              />
              <LabelRounded
                onClick={() => handleLabelClick('React JS')}
                theme="gray"
                text="React JS"
              />
            </div>

            <div className="mt-12">
              <p className="pb-2 font-bold ">WRITE AN ARTICLE</p>
              <p className="pb-2 text-sm ">
                You can start share article to million readres
              </p>
              <div className="mt-4 min-w-max w-12 mx-auto">
                <LabelRounded
                  className="text-sm"
                  onClick={handleClickStartWriting}
                  py={2}
                  px={8}
                  theme="blue"
                  text="Start Writing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withOverlay(Home)
