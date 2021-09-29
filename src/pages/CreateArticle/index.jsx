import React, { useState, useRef, useMemo } from 'react'
import ReactQuill from 'react-quill'
import Quill from 'quill'

import { uploadImage } from '../../firebase'

import Navbar from '../../components/Navbar'
import PopupPage from '../../components/PopupPage'
import LabelRounded from '../../components/UI/LabelRounded'

import 'react-quill/dist/quill.snow.css'

// https://github.com/zenoamaro/react-quill/issues/529
// Supaya link pada quil ngga prepend dari localhost:3000/
const Link = Quill.import('formats/link')
Link.sanitize = function (url) {
  // quill by default creates relative links if scheme is missing.
  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    return `http://${url}`
  }

  return url
}

export default function Index() {
  const [text, setText] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const quillRef = useRef(null)

  function togglePreview(e) {
    e.preventDefault()
    setIsPreview((prev) => !prev)
  }

  // https://stackoverflow.com/questions/59825450/react-quill-custom-image-handler-module-causing-typing-issues-with-the-editor
  const { modules, formats } = useMemo(() => {
    return {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video']
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
                  'https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80'
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
        'video'
      ]
    }
  }, [])

  return (
    <>
      <Navbar>
        <LabelRounded clicked={togglePreview} text="Preview" />
        <LabelRounded blue text="Publish" />
      </Navbar>

      {isPreview ? (
        <PopupPage togglePreview={togglePreview} article={text} />
      ) : (
        <div
          // - relative
          // * karena .ql-toolbar itu gw buat sticky
          className="w-11/12 max-w-screen-md my-5 mx-auto"
        >
          <div
            // - h-screen min-h-full overflow-y-auto pt-10
            // * .ql-toolbar itu sticky
            className="the-editor-container"
          >
            <ReactQuill
              ref={quillRef}
              scrollingContainer=".the-editor-container"
              // className="min-h-full h-auto"
              // * .ql-toolbar itu sticky
              theme="snow"
              bounds=".the-editor-container"
              modules={modules}
              formats={formats}
              placeholder="Write a story..."
              value={text}
              onChange={setText}
            />
          </div>
        </div>
      )}
    </>
  )
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

// Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia perferendis sunt eos vero qui nostrum, et inventore unde molestiae at incidunt totam eaque aliquam, mollitia eum, dolore voluptatibus veritatis repellendus. Asperiores neque minus inventore, quas unde nisi illum ullam eius id officia atque modi amet qui nemo suscipit voluptate dicta, magnam fuga quibusdam. Voluptatem sint exercitationem doloremque nemo quo corporis tempore sed? Neque ab repellendus officia tempore aliquid mollitia, dignissimos culpa voluptatibus nisi odio fugiat, veniam inventore architecto cumque ea! Facilis repellat at, hic dignissimos mollitia perferendis fuga quisquam quos labore eum. Sapiente ipsa quidem voluptas eum consequatur dignissimos vitae dolorem dolore doloribus hic neque unde animi eius similique, asperiores tempore sunt. Quaerat officia eius, laboriosam natus ex officiis tempora minus saepe praesentium earum error corrupti et iste perspiciatis molestias maxime amet laborum molestiae cum optio repellendus. Maiores deserunt, placeat voluptatum cumque iure tenetur. Nam odit totam cum suscipit excepturi, ipsum vero ex et minus temporibus commodi mollitia assumenda iure architecto repudiandae quasi nulla numquam animi doloremque. Distinctio quibusdam minima voluptas rem ab placeat incidunt! Reprehenderit nobis repellendus explicabo porro? Tenetur omnis asperiores, esse libero recusandae consequuntur. Eos illo, aperiam quibusdam ipsum tempore, laboriosam voluptatum impedit quasi exercitationem perferendis in, vitae optio? Adipisci eligendi eveniet deserunt nemo! Vero accusantium at quasi esse sequi tempore nobis veritatis! Illo fugit blanditiis provident itaque facere voluptatum eos nam, suscipit sequi nemo fugiat pariatur explicabo ratione labore soluta consectetur placeat autem assumenda reiciendis doloremque nulla? Repellendus voluptatum, dignissimos esse dolor ullam ducimus quam beatae, laudantium voluptates quasi consequatur minima quisquam incidunt eaque, praesentium deserunt corrupti. Voluptatem at in, quos, nihil eaque ratione adipisci totam aliquam molestiae ab cupiditate quis eius quae sunt fugiat dolore consectetur! Est a quaerat adipisci recusandae cumque? Eos, perspiciatis ipsam. Modi sed ipsum voluptate. Earum nulla dolore dolorum labore, dicta maiores odio libero ducimus consequatur quibusdam non suscipit harum doloremque inventore incidunt totam sunt reiciendis pariatur eius ab. Quibusdam placeat nulla voluptas, voluptatibus esse ab illo quis unde aspernatur earum architecto sapiente nobis tenetur dolor explicabo molestias, praesentium minima a alias tempora cupiditate. Mollitia nemo dolore, tenetur officiis odio autem, ut quisquam corporis amet, eius nesciunt earum repellat cum voluptatum architecto! Dolor blanditiis vero, accusantium eum expedita aperiam modi officiis minima similique corrupti rem molestiae officia eius, magni tempore quae quia error itaque aliquam facere? Provident alias reiciendis, recusandae eos corporis tempora nobis libero! Ipsam molestiae qui facilis quod ipsum magnam autem. Magnam ex assumenda quibusdam mollitia ad culpa dolor recusandae facilis ducimus tempora dicta, nobis veritatis doloremque tempore eos quos at hic ipsam corporis, quas neque eaque ea. Reiciendis consequatur voluptates enim libero deleniti quaerat dicta rerum aliquam ab tempora, incidunt placeat in velit natus aspernatur assumenda quidem nisi sequi mollitia dolor animi sunt ea. Quisquam nobis ea, illo laborum est impedit ipsa adipisci labore quaerat consequatur facilis sed necessitatibus id alias! Incidunt commodi accusamus voluptas aliquam, labore ducimus, modi laboriosam non culpa architecto perspiciatis dicta eaque! Placeat, quo. Voluptate consequuntur consequatur doloremque quas voluptas beatae accusantium recusandae placeat?
