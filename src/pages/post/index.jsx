import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_ARTICLE_BY_ID,
  GET_DIFFERENT_RELATED_ARTICLES
} from '../../graphql/query'
import {
  INSERT_ONE_COMMENT,
  INSERT_ONE_LIKE,
  INSERT_ONE_BOOKMARK,
  DELETE_USER_LIKE,
  DELETE_USER_BOOKMARK
} from '../../graphql/mutation'
import { logout } from '../../store/user'
import withAuthOverlay from '../../hoc/withAuthOverlay'
import Navbar from '../../components/Navbar'
import NavSearch from '../../containers/Navbar/NavSearch'
import DefaultNavItems from '../../components/Navbar/Items/DefaultNavItems'
import Article from '../../components/Article'
import ArticleBoxCard from '../../components/Article/ArticleBoxCard'
import Comment from '../../components/Comment'
import LabelRounded from '../../components/UI/LabelRounded'
import Tag from '../../components/UI/Tag'
import MenuDropdown from '../../components/UI/MenuDropdown'
import {
  ThumbUpIcon,
  ChatIcon,
  BookmarkIcon,
  DotsVerticalIcon
} from '@heroicons/react/outline'

import loadingFetch from '../../assets/loading-fetch.svg'

function Post(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password

  const [relatedArticle, setRelatedArticle] = useState({
    loading: true,
    data: null,
    error: '',
    hasRun: false
  })
  const [article, setArticle] = useState({
    loading: true,
    data: null,
    error: ''
  })

  const { refetch } = useQuery(GET_ARTICLE_BY_ID, {
    variables: {
      articleId: props.match.params.articleId,
      username: user.username
    },
    skip: true
  })
  const { refetch: refetchRelated } = useQuery(GET_DIFFERENT_RELATED_ARTICLES, {
    variables: {
      keyword: '',
      username: user.username,
      articleId: props.match.params.articleId
    },
    skip: true
  })

  const [insertOneComment] = useMutation(INSERT_ONE_COMMENT)
  const [insertOneLike] = useMutation(INSERT_ONE_LIKE)
  const [insertOneBookmark] = useMutation(INSERT_ONE_BOOKMARK)
  const [deleteUserLike] = useMutation(DELETE_USER_LIKE)
  const [deleteUserBookmark] = useMutation(DELETE_USER_BOOKMARK)

  // const [isLiked, setIsLiked] = useState({status: false, count: 0})
  // const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [tempComments, setTempComments] = useState([])
  const [isShowComments, setIsShowComments] = useState(false)
  const [isShowCommentButton, setIsShowCommentButton] = useState(false)
  const [inputComment, setInputComment] = useState({
    value: '',
    loading: false,
    errorMsg: ''
  })

  useEffect(() => {
    async function getArticleData() {
      try {
        const { data } = await refetch({
          articleId: props.match.params.articleId,
          username: user.username
        })
        setArticle({ loading: false, error: '', data: data.articles_by_pk })

        if (relatedArticle.hasRun) return

        const tags = data.articles_by_pk.articleTags
        let related = []
        for (let i = 0; i < tags.length; i++) {
          const { data: relatedData } = await refetchRelated({
            keyword: tags[i].tagName
          })
          related = [...related, ...relatedData.articles]

          if (related.length > 3) {
            related = related.slice(0, 3)
            break
          }
        }

        setRelatedArticle({
          loading: false,
          data: related,
          error: '',
          hasRun: true
        })
      } catch (err) {
        console.error(err)
        setArticle({ loading: false, error: err.message, data: null })
        setRelatedArticle({
          loading: false,
          error: err.message,
          data: null,
          hasRun: true
        })
      }
    }
    getArticleData()
  }, [user.username])

  async function handleSubmitLike(userInfo) {
    setIsLiking(true)

    const likeData = {
      articleId: props.match.params.articleId,
      username: userInfo.username
    }

    try {
      const { data } = await refetch(likeData)
      const isLiked = data?.articles_by_pk?.likes.length > 0

      isLiked
        ? await deleteUserLike({ variables: likeData })
        : await insertOneLike({ variables: { data: likeData } })

      const { data: newData } = await refetch(likeData)
      setArticle({ loading: false, error: '', data: newData.articles_by_pk })
    } catch (error) {
      console.error(error)
      alert('failed like')
    } finally {
      setIsLiking(false)
    }
  }

  async function handleSubmitBookmark(userInfo) {
    const refetchData = {
      articleId: props.match.params.articleId,
      username: userInfo.username
    }

    const userArticleBookmarkData = {
      username: userInfo.username,
      articleId: props.match.params.articleId
    }

    try {
      const { data } = await refetch(refetchData)
      const isBookmarked = data?.articles_by_pk?.bookmarks.length > 0

      isBookmarked
        ? await deleteUserBookmark({ variables: userArticleBookmarkData })
        : await insertOneBookmark({
            variables: { data: userArticleBookmarkData }
          })

      const { data: newData } = await refetch(refetchData)
      setArticle({ loading: false, error: '', data: newData.articles_by_pk })
    } catch (error) {
      console.error(error)
      alert('failed bookmarking')
    }
  }

  async function handleSubmitComment(e) {
    e.preventDefault()

    const commentData = {
      articleId: props.match.params.articleId,
      username: user.username,
      date: new Date().toISOString().split('T')[0],
      commentar: inputComment.value
    }

    setInputComment({ ...inputComment, loading: true })

    try {
      await insertOneComment({ variables: { comment: commentData } })
      setTempComments((prev) => [...prev, commentData])
      setInputComment({ value: '', loading: false, errorMsg: '' })
    } catch (error) {
      console.error(error)
      alert('error')
      setInputComment({
        ...inputComment,
        loading: false,
        errorMsg: 'Comment upload failed!'
      })
    }
  }

  function handleClickLike(e) {
    if (isAuth) return handleSubmitLike(user)

    function callback(err, loginUser) {
      if (err) return

      props.closeOverlay()
      handleSubmitLike(loginUser)
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }

  function handleClickBookmark(e) {
    if (isAuth) return handleSubmitBookmark(user)

    function callback(err, loginUser) {
      if (err) return

      props.closeOverlay()
      handleSubmitBookmark(loginUser)
    }

    props.openOverlayLogin()
    props.setLoginCallback(callback)
    props.setRegisterCallback(callback)
  }

  function handleInputChange(e) {
    setInputComment({ ...inputComment, value: e.target.value })
  }

  function handleInputFocus() {
    if (isShowCommentButton) return
    setIsShowCommentButton(true)
  }

  function handleHideCommentButton() {
    setIsShowCommentButton(false)
  }

  function toggleShowComments() {
    setIsShowComments((prev) => !prev)
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

  if (article.loading) {
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
        <img className="block mt-8 mx-auto" src={loadingFetch} alt="loading" />
      </>
    )
  }

  if (article.error) {
    console.error(article.error)
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
        <h1 className="mt-4 text-xl text-center">
          Something went wrong.. Try again
        </h1>
      </>
    )
  }

  const data = article.data

  const likes = data?.likes_aggregate?.aggregate?.count
  const articleComments = data?.comments

  const isBookmarked = data?.bookmarks.length > 0
  const isLiked = data?.likes.length > 0
  const bookmarkIconFill = isBookmarked ? 'black' : 'white'
  const likeIconFill = isLiked ? 'black' : 'white'

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
      <div className="w-11/12 max-w-screen-xl mx-auto">
        <div className="max-w-screen-md my-12 mx-auto border-b border-gray-300">
          <Article
            isBookmarked={isBookmarked}
            isLiked={isLiked}
            data={data}
            handleClickBookmark={handleClickBookmark}
          />

          <div className="mt-12 flex flex-wrap gap-3">
            {data?.articleTags.map(({ tagName }) => (
              <Tag key={tagName} text={tagName} px={2} />
            ))}
          </div>

          <div className="mt-8 pb-8 flex justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-1">
                <ThumbUpIcon
                  fill={likeIconFill}
                  className="hover:cursor-pointer"
                  width={24}
                  onClick={isLiking ? null : handleClickLike}
                />
                <span>{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatIcon
                  onClick={toggleShowComments}
                  className="hover:cursor-pointer"
                  width={24}
                />
                <span>
                  {articleComments
                    ? articleComments.length + tempComments.length
                    : 0 + tempComments.length}
                </span>
              </div>
            </div>

            <div className="mr-4 flex gap-1">
              <BookmarkIcon
                onClick={handleClickBookmark}
                fill={bookmarkIconFill}
                className="hover:cursor-pointer"
                width={24}
              />

              <MenuDropdown>
                <DotsVerticalIcon
                  className="hover:cursor-pointer"
                  width="1.2rem"
                />

                <>
                  <li className="my-4 text-gray-500 hover:cursor-pointer hover:text-black ">
                    Report article
                  </li>
                </>
              </MenuDropdown>
            </div>
          </div>

          {isShowComments && (
            <div>
              <div className="border-b border-gray-300 focus-within:border-gray-600">
                <form className="w-full" onSubmit={handleSubmitComment}>
                  <input
                    className="block w-full text-base placeholder-gray-400 border-none focus:ring-transparent"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={inputComment.value}
                    name="q"
                    id="q"
                    type="text"
                    placeholder="Add a public commentar..."
                  />
                </form>
              </div>

              <div
                className={`mt-4 flex justify-end gap-4 text-sm ${
                  isShowCommentButton ? 'block' : 'hidden'
                }`}
              >
                <div onClick={handleHideCommentButton} className="w-24">
                  <LabelRounded py={2} text="Cancel" theme="blue-invert" />
                </div>
                <div
                  onClick={inputComment.loading ? null : handleSubmitComment}
                  className="w-24"
                >
                  <LabelRounded
                    py={2}
                    text={inputComment.loading ? 'Uploading...' : 'Comment'}
                    theme={inputComment.loading ? 'gray' : 'blue'}
                  />
                </div>
              </div>

              <div className="mt-8">
                {tempComments.map((c, index) => (
                  <Comment
                    key={index}
                    username={user.username}
                    commentData={c}
                    className="my-8"
                  />
                ))}
                {articleComments.map((c) => (
                  <Comment key={c.commentId} commentData={c} className="my-8" />
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-12 font-bold">More from FREETICLES</p>
        <div className="mb-16 md:flex md:gap-8">
          {relatedArticle?.data?.map?.((article) => (
            <ArticleBoxCard key={article.articleId} data={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default withAuthOverlay(Post)
