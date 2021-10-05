import React, { useState, useEffect } from 'react'
import qs from 'query-string'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/client'
import { GET_RELATED_ARTICLES } from '../../graphql/query'
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

  // !BUG kalo variables depends pada state. saat state berubah Query auto ke-triggered
  const { loading, data, error } = useQuery(GET_RELATED_ARTICLES, {
    variables: {
      keyword: `%${qs.parse(props.location.search).q}%`, //! jangan pake state query
      username: user.username
    }
  })

  useEffect(() => {
    function callback(err) {
      if (err) return
      props.closeOverlay()
    }

    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }, [])

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
  }

  /* if (loading) return 'loading'
  if (error) {
    console.error(error)
    return 'error'
  } */

  let content

  if (loading) {
    console.log('loading')
    content = (
      <img className="block mt-8 mx-auto" src={loadingFetch} alt="loading" />
    )
  } else if (error) {
    content = (
      <h1 className="mt-4 text-xl text-center">
        Something went wrong.. Try again
      </h1>
    )
  } else {
    content = data?.articles?.map((article) => (
      <ArticleSearchCard
        key={article.articleId}
        data={article}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthOverlay(Search)
