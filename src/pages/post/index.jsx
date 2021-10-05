import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ARTICLE_BY_ID } from '../../graphql/query'
import {
  INSERT_ONE_COMMENT,
  INSERT_ONE_LIKE,
  DELETE_LIKE_BY_ID
} from '../../graphql/mutation'
import { logout } from '../../store/user'
import useDebouce from '../../hooks/useDebounce'
import withAuthOverlay from '../../hoc/withAuthOverlay'
import Navbar from '../../components/Navbar'
import NavSearch from '../../containers/Navbar/NavSearch'
import DefaultNavItems from '../../components/Navbar/Items/DefaultNavItems'
import Article from '../../components/Article'
import ArticleBoxCard from '../../components/Article/ArticleBoxCard'
import Comment from '../../components/Comment'
import LabelRounded from '../../components/UI/LabelRounded'
import Tag from '../../components/UI/Tag'
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
  const {
    loading,
    data: rawData,
    error
  } = useQuery(GET_ARTICLE_BY_ID, {
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    variables: {
      articleId: props.match.params.articleId,
      username: user.username
    }
  })
  const [insertOneComment] = useMutation(INSERT_ONE_COMMENT)
  // const [deleteLikeById] = useMutation(DELETE_LIKE_BY_ID)

  // const [isLiked, setIsLiked] = useState(false)
  // const [isBookmarked, setIsBookmarked] = useState(false)
  const [tempComments, setTempComments] = useState([])
  const [isShowComments, setIsShowComments] = useState(false)
  const [isShowCommentButton, setIsShowCommentButton] = useState(false)
  const [inputComment, setInputComment] = useState({
    value: '',
    loading: false,
    errorMsg: ''
  })

  console.log(props)

  // const isLikedDebounced = useDebouce(isLiked, 300)

  // useEffect(() => {
  //   if (loading || error) return

  //   setIsLiked(rawData.articles_by_pk.likes.length > 0)
  //   setIsBookmarked(rawData.articles_by_pk.bookmarks.length > 0)
  // }, [loading, rawData, error])

  // useEffect(() => {
  //   async function handleLike() {
  //     const data = rawData?.articles_by_pk
  //     const isLiked = data.likes.length > 0

  //     try {
  //       if (isLikedDebounced) {
  //         const likeId = data.likes[0].likeId
  //         await deleteLikeById(likeId)
  //       } else {

  //       }
  //     } catch (error) {}
  //   }
  //   handleLike()
  // }, [isLikedDebounced])

  // function handleClickLike() {
  //   setIsLiked((prev) => !prev)
  // }

  async function handleSubmit(e) {
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

  if (loading) {
    console.log('loading')

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

  if (error) {
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

  const data = rawData?.articles_by_pk

  const likes = data?.likes_aggregate?.aggregate?.count
  const articleComments = data?.comments

  const isLiked = data?.likes.length > 0
  const isBookmarked = data?.bookmarks.length > 0
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
          <Article isBookmarked={isBookmarked} isLiked={isLiked} data={data} />

          <div className="mt-12 flex flex-wrap gap-3">
            {data.articleTags.map(({ tagName }) => (
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
                fill={bookmarkIconFill}
                className="hover:cursor-pointer"
                width={24}
              />
              <DotsVerticalIcon className="hover:cursor-pointer" width={24} />
            </div>
          </div>

          {isShowComments && (
            <div>
              <div className="border-b border-gray-300 focus-within:border-gray-600">
                <form className="w-full" onSubmit={handleSubmit}>
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
                  onClick={inputComment.loading ? null : handleSubmit}
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
        <div className="md:flex md:gap-8">
          <ArticleBoxCard />
          <ArticleBoxCard />
          <ArticleBoxCard />
        </div>
      </div>
    </>
  )
}

export default withAuthOverlay(Post)
