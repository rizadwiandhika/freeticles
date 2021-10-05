import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/user'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_ARTICLES,
  GET_TODAY_ARTICLES,
  GET_ARTICLE_BY_ID,
  GET_POPULAR_TAGS
} from '../graphql/query'
import { INSERT_ONE_BOOKMARK, DELETE_USER_BOOKMARK } from '../graphql/mutation'
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

  const { refetch: refetchPopularTags } = useQuery(GET_POPULAR_TAGS, {
    skip: true
  })
  const { refetch } = useQuery(GET_ARTICLES, {
    skip: true,
    variables: { username: user.username }
  })
  const { refetch: refetchToday } = useQuery(GET_TODAY_ARTICLES, {
    skip: true,
    variables: { username: user.username }
  })
  const { refetch: refetchArticleByIdAndUsername } = useQuery(
    GET_ARTICLE_BY_ID,
    {
      skip: true,
      variables: { username: user.username, articleId: 0 }
    }
  )
  const [insertOneBookmark] = useMutation(INSERT_ONE_BOOKMARK)
  const [deleteUserBookmark] = useMutation(DELETE_USER_BOOKMARK)

  const [view, setView] = useState('recommended')
  const [cards, setCards] = useState({ loading: true, data: null, error: '' })
  const [tags, setTags] = useState({ loading: true, data: null, error: '' })

  useEffect(() => {
    async function getTags() {
      try {
        const {
          data: { tagCountView }
        } = await refetchPopularTags()
        setTags({ loading: false, data: tagCountView, error: '' })
      } catch (err) {
        setTags({ loading: false, data: null, error: err.message })
      }
    }
    getTags()
  }, [])

  useEffect(() => {
    async function getArticles() {
      try {
        const fetchData = {
          username: user.username,
          today: new Date().toISOString().split('T')[0]
        }

        setCards({ loading: true, error: '', data: null })

        const { data } =
          view === 'recommended'
            ? await refetch(fetchData)
            : await refetchToday(fetchData)

        setCards({ loading: false, error: '', data: data.articles })
      } catch (err) {
        setCards({ loading: false, error: err.message, data: null })
      }
    }
    getArticles()
  }, [user.username, view])

  async function handleSubmitBookmark(userInfo, articleId) {
    const refetchData = {
      username: user.username,
      today: new Date().toISOString().split('T')[0]
    }

    const userArticleBookmarkData = {
      username: userInfo.username,
      articleId: articleId
    }

    try {
      const { data } = await refetchArticleByIdAndUsername(
        userArticleBookmarkData
      )

      const isBookmarked = data?.articles_by_pk?.bookmarks.length > 0

      isBookmarked
        ? await deleteUserBookmark({ variables: userArticleBookmarkData })
        : await insertOneBookmark({
            variables: { data: userArticleBookmarkData }
          })

      const { data: newData } =
        view === 'recommended'
          ? await refetch(refetchData)
          : await refetchToday(refetchData)

      setCards({ loading: false, error: '', data: newData.articles })
    } catch (err) {
      console.error(err)
      alert('failed bookmarking')
      setCards({ loading: false, error: err.message, data: null })
    }
  }

  function handleClickBookmark(articleId) {
    if (isAuth) return handleSubmitBookmark(user, articleId)

    function callback(err, loginUser) {
      if (err) return

      props.closeOverlay()
      handleSubmitBookmark(loginUser, articleId)
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }

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

  if (cards.error) {
    console.error(cards.error)
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

      <div className="w-11/12 mb-12 max-w-screen-xl mx-auto md:grid md:grid-cols-12">
        <div className="md:col-span-8 ">
          <div className="mt-12 ">
            <div className="flex gap-6 border-b border-gray-300">
              <p
                onClick={() => setView('today')}
                className={`hover:cursor-pointer pb-2 border-black text-sm ${
                  view === 'today' ? 'border-b font-bold' : ''
                }`}
              >
                TODAY
              </p>
              <p
                onClick={() => setView('recommended')}
                className={`hover:cursor-pointer pb-2 border-black text-sm ${
                  view === 'recommended' ? 'border-b font-bold' : ''
                }`}
              >
                RECOMMENDED ARTICLES
              </p>
            </div>
            <div className="mt-12">
              {cards.loading && (
                <img
                  className="block mx-auto"
                  src={loadingFetch}
                  alt="loading pic"
                />
              )}

              {cards.data?.map((article) => (
                <ArticleCard
                  key={article.articleId}
                  className="mt-12"
                  data={article}
                  handleClickBookmark={() =>
                    handleClickBookmark(article.articleId)
                  }
                />
              ))}

              {cards.data?.length <= 0 && (
                <h1 className="mt-4 text-xl text-gray-600 ">
                  There are no articles found
                </h1>
              )}

              {cards?.error && (
                <h1 className="mt-4 text-xl text-gray-600">
                  Something went wrong... Try again
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="hidden mx-auto border-l border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Recommended topics</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              {tags?.data?.map(({ tagName }) => (
                <LabelRounded
                  key={tagName}
                  onClick={() => handleLabelClick(tagName)}
                  theme="gray"
                  text={tagName}
                />
              ))}
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
