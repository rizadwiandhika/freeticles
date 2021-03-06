import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import rt from 'reading-time'
import qs from 'query-string'
import ReactQuill from 'react-quill'
import Quill from 'quill'
import { useMutation, useQuery } from '@apollo/client'
import { getCurrentDate } from '../../utils'
import { GET_ARTICLE_BY_ID } from '../../graphql/query'
import {
  INSERT_ONE_ARTICLE,
  INSERT_TAGS,
  DELETE_AND_INSERT_TAGS_BY_ARTICLE_ID,
  UPDATE_ARTICLE_BY_ID
} from '../../graphql/mutation'
import { uploadImage } from '../../firebase'
import Article from '../../components/Article'
import Overlay from '../../components/Overlay'
import Navbar from '../../components/Navbar'
import LabelRounded from '../../components/UI/LabelRounded'
import { XIcon } from '@heroicons/react/outline'
import Input from '../../components/UI/Input'
import Tag from '../../components/UI/Tag'

import loadingUpload from '../../assets/loading-upload.svg'
import 'react-quill/dist/quill.snow.css'
import '../../styles/create-article.css'

// https://github.com/zenoamaro/react-quill/issues/529
// Quill by default creates relative links if scheme is missing.
const Link = Quill.import('formats/link')
Link.sanitize = function (url) {
  return url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `http://${url}`
}

export default function Index(props) {
  const user = useSelector((state) => state.user)
  const isAuth = user.username && user.password
  const [isEditing, setIsEditing] = useState(false)
  const [articleMeta, setArticleMeta] = useState({
    username: user.username,
    title: '',
    subtitle: '',
    tags: [],
    publishDate: getCurrentDate(),
    readingTime: ''
  })
  const [article, setArticle] = useState('')
  const [inputTag, setInputTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isPublish, setIsPublish] = useState(false)
  const [invalidTitle, setInvalidTitle] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const [publishError, setPublishError] = useState(false)

  const { refetch: refetchArticle } = useQuery(GET_ARTICLE_BY_ID, {
    skip: true,
    variables: { articleId: '', username: '' }
  })
  const [deleteInsertTagsByArticleId] = useMutation(
    DELETE_AND_INSERT_TAGS_BY_ARTICLE_ID
  )
  const [updateArticleById] = useMutation(UPDATE_ARTICLE_BY_ID)
  const [insertArticle] = useMutation(INSERT_ONE_ARTICLE)
  const [insertTags] = useMutation(INSERT_TAGS)

  const quillRef = useRef(null)

  useEffect(() => {
    async function validateArticle() {
      const id = qs.parse(props.location.search).edit
      if (!id) return

      let article
      try {
        const { data: raw } = await refetchArticle({ articleId: id })
        article = raw.articles_by_pk
      } catch (err) {
        console.error(err)
        return alert('Whopss somthing went wrong...')
      }

      if (article.username !== user.username) {
        return props.history.replace('/profile/your-article')
      }

      setIsEditing(true)
      setArticle(article.content)
      setArticleMeta({
        username: user.username,
        title: article.title,
        subtitle: article.subtitle,
        tags: article.articleTags.map(({ tagName }) => tagName),
        publishDate: article.publishDate,
        readingTime: article.readingTime
      })
    }
    validateArticle()
  }, [])

  function handleArticleMetaChange(e) {
    const { name, value } = e.target
    setArticleMeta({ ...articleMeta, [name]: value })

    if (name === 'title') setInvalidTitle(false)
  }

  function togglePreview(e) {
    e.preventDefault?.()
    e.stopPropagation?.()

    const readingTime = rt(article).text

    setIsPreview((prev) => !prev)
    setArticleMeta({
      ...articleMeta,
      readingTime,
      publishDate: getCurrentDate()
    })
  }

  function togglePublish(e) {
    e.preventDefault?.()
    e.stopPropagation?.()

    if (!articleMeta.title) return setInvalidTitle(true)
    setIsPublish((prev) => !prev)
  }

  function handleAddTag(e) {
    e.preventDefault()
    const { tags } = articleMeta

    setInputTag('')
    if (tags.includes(inputTag) || tags.length >= 5) return

    setArticleMeta({
      ...articleMeta,
      tags: [...articleMeta.tags, inputTag]
    })
  }

  function handleDeleteTag(name) {
    const tags = articleMeta.tags.filter((tag) => tag !== name)
    setArticleMeta({ ...articleMeta, tags })
  }

  async function handlePublish() {
    const { tags: articleTags, ...articleData } = articleMeta

    // tambahan: content & thumbnail
    articleData.content = article
    articleData.readingTime = rt(article).text
    articleData.thumbnail = findThumbnail(article)
    articleData.publishDate = getCurrentDate()

    try {
      setPublishError(false)
      setPublishLoading(true)

      if (isEditing) {
        const id = qs.parse(props.location.search).edit
        const { username, ...updatedData } = articleData
        updatedData.articleId = id

        const update = updateArticleById({ variables: updatedData })
        const deleteInsert = deleteInsertTagsByArticleId({
          variables: {
            articleId: id,
            newTags: articleTags.map((tagName) => ({ articleId: id, tagName }))
          }
        })

        await Promise.all([update, deleteInsert])
      } else {
        let result = await insertArticle({ variables: { articleData } })
        const { articleId } = result.data.insert_articles_one

        const tags = articleTags.map((tag) => ({ tagName: tag, articleId }))
        result = await insertTags({ variables: { tags } })
      }

      props.history.replace('/profile/your-article')
    } catch (error) {
      console.error(error)
      setPublishError(true)
      setPublishLoading(false)
    }
  }

  // https://stackoverflow.com/questions/59825450/react-quill-custom-image-handler-module-causing-typing-issues-with-the-editor
  const { modules, formats } = useMemo(() => {
    return {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block']
          ],
          handlers: {
            image: function () {
              const input = document.createElement('input')

              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')
              input.click()

              input.onchange = async () => {
                const file = input.files[0]
                const quill = quillRef.current.getEditor()
                //// const formData = new FormData()
                //// formData.append('image', file)

                // Save current cursor state
                const range = quill.getSelection(true)

                // Insert temporary loading placeholder image
                quill.insertEmbed(
                  range.index,
                  'image',
                  // `${window.location.origin}/images/loaders/placeholder.gif`
                  loadingUpload
                )

                // Move cursor to right side of image (easier to continue typing)
                quill.setSelection(range.index + 1)

                // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
                const [url, error] = await uploadImage('default', file)

                // Remove placeholder image
                quill.deleteText(range.index, 1)

                if (error) return console.error(error)

                // Insert uploaded image
                quill.insertEmbed(range.index, 'image', url)
                quill.setSelection(range.index + 1)
              }
            }
          }
        }
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'video',
        'code-block'
      ]
    }
  }, [])

  if (!isAuth) return <Redirect to="/" />

  return (
    <>
      <Navbar>
        <LabelRounded
          onClick={togglePreview}
          theme="blue-invert"
          text="Preview"
        />
        <LabelRounded onClick={togglePublish} theme="blue" text="Publish" />
      </Navbar>

      {/* Preview article */}
      <Overlay
        noOverlayBackdrop
        isOpen={isPreview}
        closeOverlay={togglePreview}
      >
        <div className="relative w-full bg-white">
          <div className="relative py-24 w-11/12 min-h-screen max-w-screen-md mx-auto">
            <XIcon
              onClick={togglePreview}
              className="absolute right-2 transform -translate-y-12 hover:cursor-pointer"
              width={24}
            />
            <Article isPreview data={{ ...articleMeta, content: article }} />
          </div>
        </div>
      </Overlay>

      {/* Publish article */}
      <Overlay
        noOverlayBackdrop
        isOpen={isPublish}
        closeOverlay={togglePublish}
      >
        <div className="relative w-full bg-white">
          <div className="relative py-24 w-11/12 min-h-screen max-w-screen-lg mx-auto">
            <XIcon
              onClick={togglePublish}
              className="absolute right-2 transform -translate-y-12 hover:cursor-pointer"
              width={24}
            />
            <div className="md:grid grid-cols-2 gap-x-16">
              <div className="md:col-span-1">
                <h1 className="text-xl font-bold">Story Preview</h1>
                <img
                  className="block my-8 max-h-72 object-cover"
                  src={findThumbnail(article)}
                  alt="thumbnail-article"
                />
                <h1 className="my-8 pb-2 border-b border-gray-300 text-xl font-bold">
                  {articleMeta.title}
                </h1>
                <h3 className="my-4 pb-2 border-b border-gray-300 text-base text-gray-400">
                  {articleMeta.subtitle}
                </h3>
              </div>
              <div className="md:col-span-1">
                <h1 className="text-xl">
                  Publisher: <strong>{user.username}</strong>
                </h1>
                <div className="mt-8 max-w-sm">
                  <p className="my-4 text-gray-500 text-sm">
                    Add up to five tags for your article
                  </p>
                  <form onSubmit={handleAddTag}>
                    <Input
                      name="tag"
                      value={inputTag}
                      placeholder="Add tags..."
                      handleChange={(e) =>
                        setInputTag(e.target.value.toLowerCase())
                      }
                    />

                    <button type="submit" />
                  </form>
                  <div className="flex flex-wrap gap-4">
                    {articleMeta.tags.map((tag) => (
                      <Tag px={2} key={tag} text={tag}>
                        <XIcon
                          onClick={() => handleDeleteTag(tag)}
                          name={tag}
                          className="ml-2 hover:cursor-pointer"
                          height={16}
                        />
                      </Tag>
                    ))}
                  </div>
                </div>
                <div className="mt-8 w-36 font-bold">
                  <LabelRounded
                    onClick={publishLoading ? null : handlePublish}
                    theme={publishLoading ? 'gray' : 'blue'}
                    text={publishLoading ? 'Publishing...' : 'Publish now'}
                  />
                </div>

                <p
                  className={`mt-8 text-red-500 opacity-80 ${
                    publishError ? 'visible' : 'invisible'
                  }`}
                >
                  Publishing failed... Try again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Overlay>

      <div className="w-11/12 max-w-screen-md my-5 mx-auto">
        <div>
          <Input
            name="title"
            value={articleMeta.title}
            placeholder="Title..."
            handleChange={handleArticleMetaChange}
            err={invalidTitle}
            errMessage="Article should have a title"
          />
        </div>
        <div className="mt-4">
          <Input
            name="subtitle"
            value={articleMeta.subtitle}
            placeholder="Subtitle..."
            handleChange={handleArticleMetaChange}
          />
        </div>
        <div className="my-8 the-editor-container">
          <ReactQuill
            ref={quillRef}
            scrollingContainer=".the-editor-container"
            theme="snow"
            bounds=".the-editor-container"
            modules={modules}
            formats={formats}
            placeholder="Write a story..."
            value={article}
            onChange={setArticle}
          />
        </div>
      </div>
    </>
  )
}

function findThumbnail(article) {
  const imageTagRegex = /<img([\w\W]+?)>/
  const urlRegex = /".*"/
  return (
    article?.match(imageTagRegex)?.[0]?.match(urlRegex)?.[0]?.slice(1, -1) || ''
  )
  // const imageTagRegex = /<img src=".*">/
  // const urlRegex = /".*"/
  // return article?.match(imageTagRegex)?.[0]?.match(urlRegex)?.[0]?.slice(1, -1)
}
