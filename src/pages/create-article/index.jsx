import React, { useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import rt from 'reading-time'
import ReactQuill from 'react-quill'
import Quill from 'quill'
import { useMutation } from '@apollo/client'
import { INSERT_ONE_ARTICLE, INSERT_TAGS } from '../../graphql/mutation'
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
  const [articleMeta, setArticleMeta] = useState({
    username: user.username,
    title: '',
    subtitle: '',
    tags: [],
    publishDate: new Date().toISOString().split('T')[0],
    readingTime: ''
  })
  const [article, setArticle] = useState('')
  const [inputTag, setInputTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isPublish, setIsPublish] = useState(false)
  const [invalidTitle, setInvalidTitle] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const [publishError, setPublishError] = useState(false)

  const [insertArticle] = useMutation(INSERT_ONE_ARTICLE)
  const [insertTags] = useMutation(INSERT_TAGS)

  const quillRef = useRef(null)

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
    setArticleMeta({ ...articleMeta, readingTime })
  }

  function togglePublish(e) {
    e.preventDefault?.()
    e.stopPropagation?.()

    if (!articleMeta.title) return setInvalidTitle(true)
    setIsPublish((prev) => !prev)
  }

  // TODO: limit only 5 tags allowed
  function handleAddTag(e) {
    e.preventDefault()
    const { tags } = articleMeta

    setInputTag('')
    if (tags.includes(inputTag)) return

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

    articleData.content = article
    articleData.thumbnail = findThumbnail(article)
    articleData.publishDate = new Date().toISOString().split('T')[0]

    try {
      setPublishError(false)
      setPublishLoading(true)

      let result = await insertArticle({ variables: { articleData } })
      const { articleId } = result.data.insert_articles_one

      const tags = articleTags.map((tag) => ({ tagName: tag, articleId }))
      result = await insertTags({ variables: { tags } })

      console.log(result.data.insert_articleTags)
      alert('berhasil')
      props.history.push('/profile/your-article')
    } catch (error) {
      console.error(error)
      alert('error')
      setPublishError(true)
    } finally {
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

                console.log(file)

                // Save current cursor state
                const range = quill.getSelection(true)

                // Insert temporary loading placeholder image
                quill.insertEmbed(
                  range.index,
                  'image',
                  // `${window.location.origin}/images/loaders/placeholder.gif`
                  // 'https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80'
                  loadingUpload
                )

                // Move cursor to right side of image (easier to continue typing)
                quill.setSelection(range.index + 1)

                // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
                const [url, error] = await uploadImage('default', file)

                // Remove placeholder image
                quill.deleteText(range.index, 1)

                if (error) return console.error(error)

                console.log('upload finished. url', url)

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
            <Article isPreview articleMeta={articleMeta} article={article} />
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
                  Publisher: <strong>Riza Dwi Andhika</strong>
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
                      handleChange={(e) => setInputTag(e.target.value)}
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
                    onClick={handlePublish}
                    theme={publishLoading ? 'gray' : 'blue'}
                    text={publishLoading ? 'Publishing...' : 'Publish now'}
                  />
                </div>

                <p className="mt-8 text-red-500 opacity-80">
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
  const imageTagRegex = /<img src=".*">/
  const urlRegex = /".*"/
  return article?.match(imageTagRegex)?.[0]?.match(urlRegex)?.[0]?.slice(1, -1)
}

/* 
  <div
    data-text-editor="name"
    className="relative h-72 overflow-y-scroll w-4/5 mx-auto bg-red-50"
  >
    <ReactQuill
      // scrollingContainer (query ke HTML element) biar ga bug saat embed link
      // (kalo ngga nanti posisi scroll Y pas insert link / upload gambar / apapun lah lupa gw, bakal jump ke paling atas.)
      scrollingContainer={`[data-text-editor="name"]`}
      className="min-h-full h-auto py-24"
      bounds={`[data-text-editor="name"]`}
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder="Write a story..."
      value={text}
      onChange={setText}
    />
  </div> 
*/

// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia perferendis sunt eos vero qui nostrum, et inventore unde molestiae at incidunt totam eaque aliquam, mollitia eum, dolore voluptatibus veritatis repellendus. Asperiores neque minus inventore, quas unde nisi illum ullam eius id officia atque modi amet qui nemo suscipit voluptate dicta, magnam fuga quibusdam. Voluptatem sint exercitationem doloremque nemo quo corporis tempore sed? Neque ab repellendus officia tempore aliquid mollitia, dignissimos culpa voluptatibus nisi odio fugiat, veniam inventore architecto cumque ea! Facilis repellat at, hic dignissimos mollitia perferendis fuga quisquam quos labore eum. Sapiente ipsa quidem voluptas eum consequatur dignissimos vitae dolorem dolore doloribus hic neque unde animi eius similique, asperiores tempore sunt. Quaerat officia eius,
