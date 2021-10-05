import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_RELATED_ARTICLES,
  GET_POPULAR_TAGS,
  GET_ARTICLE_BY_ID
} from '../../graphql/query'
import {
  INSERT_ONE_BOOKMARK,
  DELETE_USER_BOOKMARK,
  INSERT_ONE_LIKE,
  DELETE_USER_LIKE
} from '../../graphql/mutation'
import { logout } from '../../store/user'
import Navbar from '../../components/Navbar'
import DefaultNavItems from '../../components/Navbar/Items/DefaultNavItems'
import ArticleSearchCard from '../../components/Article/ArticleSearchCard'
import LabelRounded from '../../components/UI/LabelRounded'
import withAuthOverlay from '../../hoc/withAuthOverlay'
import loadingFetch from '../../assets/loading-fetch.svg'

function Search(props) {
  const dispatch = useDispatch()
  const [query, setQuery] = useState(() => qs.parse(props.location.search).q)
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password

  const [tags, setTags] = useState({ loading: true, data: null, error: '' })
  const [articles, setArticles] = useState({
    loading: true,
    data: null,
    error: ''
  })

  // !BUG kalo variables depends pada state. saat state berubah Query auto ke-triggered
  /* const { loading, data, error } = useQuery(GET_RELATED_ARTICLES, {
    variables: {
      keyword: `%${qs.parse(props.location.search).q}%`, //! jangan pake state query
      username: user.username
    }
  }) */
  const { refetch } = useQuery(GET_RELATED_ARTICLES, {
    variables: {
      keyword: 'one piece',
      username: user.username
    }
  })

  const { refetch: refetchPopularTags } = useQuery(GET_POPULAR_TAGS, {
    skip: true
  })
  const { refetch: refetchArticleByIdAndUsername } = useQuery(
    GET_ARTICLE_BY_ID,
    {
      skip: true,
      variables: { username: '', articleId: 0 }
    }
  )
  const [insertOneBookmark] = useMutation(INSERT_ONE_BOOKMARK)
  const [insertOneLike] = useMutation(INSERT_ONE_LIKE)
  const [deleteUserBookmark] = useMutation(DELETE_USER_BOOKMARK)
  const [deleteUserLike] = useMutation(DELETE_USER_LIKE)

  useEffect(() => {
    function callback(err) {
      if (err) return
      props.closeOverlay()
    }

    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)

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
          keyword: `%${qs.parse(props.location.search).q}%`
        }

        setArticles({ loading: true, error: '', data: null })
        const { data } = await refetch(fetchData)

        setArticles({ loading: false, error: '', data: data.articles })
      } catch (err) {
        setArticles({ loading: false, error: err.message, data: null })
      }
    }
    getArticles()
  }, [user.username, props.location.search])

  async function handleSubmitBookmark(userInfo, articleId) {
    const fetchData = {
      username: userInfo.username,
      keyword: `%${qs.parse(props.location.search).q}%`
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

      const { data: newData } = await refetch(fetchData)
      setArticles({ loading: false, error: '', data: newData.articles })
    } catch (err) {
      console.error(err)
      alert('failed bookmarking')
      setArticles({ loading: false, error: err.message, data: null })
    }
  }

  async function handleSubmitLike(userInfo, articleId) {
    const fetchData = {
      username: userInfo.username,
      keyword: `%${qs.parse(props.location.search).q}%`
    }

    const likeData = {
      articleId: articleId,
      username: userInfo.username
    }

    try {
      const { data } = await refetchArticleByIdAndUsername(likeData)
      const isLiked = data?.articles_by_pk?.likes.length > 0

      isLiked
        ? await deleteUserLike({ variables: likeData })
        : await insertOneLike({ variables: { data: likeData } })

      const { data: newData } = await refetch(fetchData)
      setArticles({ loading: false, error: '', data: newData.articles })
    } catch (error) {
      console.error(error)
      alert('Like failed')
      setArticles({ loading: false, error: error.message, data: null })
    }
  }

  function handleClickLike(articleId) {
    if (isAuth) return handleSubmitLike(user, articleId)

    function callback(err, loginUser) {
      if (err) return

      props.closeOverlay()
      handleSubmitLike(loginUser, articleId)
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
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

  function handleClickLogout() {
    dispatch(logout())
  }

  function handleSubmit(e) {
    e.preventDefault()

    const searchQuery = qs.stringify({ q: query })
    props.history.push({ pathname: '/search', search: searchQuery })
  }

  function handleLabelClick(query) {
    props.history.push(`/search?q=${query}`)
    setQuery(query)
  }

  let content

  if (articles.loading) {
    content = (
      <img className="block mt-8 mx-auto" src={loadingFetch} alt="loading" />
    )
  } else if (articles.error) {
    content = (
      <h1 className="mt-4 text-xl text-center">
        Something went wrong.. Try again
      </h1>
    )
  } else {
    content = articles.data?.map((article) => (
      <ArticleSearchCard
        key={article.articleId}
        data={article}
        handleClickLike={() => handleClickLike(article.articleId)}
        handleClickBookmark={() => handleClickBookmark(article.articleId)}
        className="mt-12"
      />
    ))
  }

  return (
    <>
      <Navbar shadow>
        <DefaultNavItems
          isAuth={isAuth}
          handleClickGetStarted={props.openOverlayRegister}
          handleClickSignIn={props.openOverlayLogin}
          handleClickLogout={handleClickLogout}
        />
      </Navbar>

      <div className="w-11/12 max-w-screen-xl mx-auto md:grid md:grid-cols-12">
        <div className="md:col-span-8 ">
          <div className="mt-12 ">
            <div className="flex gap-6 border-b border-gray-300">
              <form className="w-full" onSubmit={handleSubmit}>
                <input
                  className="block w-full h-20 text-4xl placeholder-gray-400 border-none focus:outline-none focus:border-transparent focus:ring-transparent"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  name="q"
                  id="q"
                  type="text"
                  placeholder="Search freticles"
                />
              </form>
            </div>
            <div>{content}</div>
          </div>
        </div>
        <div className="hidden mx-auto border-l min-h-screen border-gray-300 w-0 md:block md:col-span-1" />
        <div className="hidden md:block md:col-span-3">
          <div className="mt-12 sticky top-0 w-full">
            <p className="pb-2 font-bold ">Tags</p>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthOverlay(Search)
