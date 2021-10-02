import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Search from '../../components/Navbar/Search'
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

export default function Post(props) {
  const [isShowComments, setIsShowComments] = useState(false)
  const [isShowCommentButton, setIsShowCommentButton] = useState(false)
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setComment('')
  }
  function handleInputChange(e) {
    setComment(e.target.value)
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

  return (
    <>
      <Navbar shadow>
        <Search />
        <p className="ml-4">SignIn</p>
        <LabelRounded theme="blue" text="Get started" />
      </Navbar>

      <div className="w-11/12 max-w-screen-xl mx-auto">
        <div className="max-w-screen-md my-12 mx-auto border-b border-gray-300">
          <Article
            articleMeta={{
              title: 'The snowballing',
              subtitle: 'What the f...',
              author: 'anonim'
            }}
            article={lorem500}
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Tag px={2} text="Mantapp" />
            <Tag px={2} text="Asalole" />
            <Tag px={2} text="Shippuden" />
            <Tag px={2} text="Goks" />
          </div>

          <div className="mt-8 pb-8 flex justify-between">
            <div className="flex gap-6">
              <div className="flex items-center gap-1">
                <ThumbUpIcon className="hover:cursor-pointer" width={24} />
                <span>23</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatIcon
                  onClick={toggleShowComments}
                  className="hover:cursor-pointer"
                  width={24}
                />
                <span>5</span>
              </div>
            </div>

            <div className="mr-4 flex gap-1">
              <BookmarkIcon className="hover:cursor-pointer" width={24} />
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
                    value={comment}
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
                <div className="w-24">
                  <LabelRounded py={2} text="Comment" theme="blue" />
                </div>
              </div>

              <div className="mt-8">
                <Comment className="my-8" />
                <Comment className="my-8" />
                <Comment className="my-8" />
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

const lorem500 =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odit molestias nulla nostrum, quisquam consequatur id non cupiditate dicta voluptate fugit laboriosam beatae distinctio, nihil, ducimus exercitationem praesentium eum tenetur quo. Iusto iure amet doloremque ipsam aliquam possimus sit deleniti quo, dignissimos perspiciatis, a voluptas ut! Ullam dignissimos quod consectetur nihil necessitatibus atque quas autem, neque praesentium eligendi soluta eum optio officiis ad delectus eos voluptatibus inventore culpa ut qui iure. Nihil error reiciendis commodi, vitae distinctio vero, neque repudiandae, beatae consequuntur quis voluptas dolore. Nobis veniam placeat magnam suscipit maxime culpa, autem totam. Hic accusamus porro, eligendi molestiae sed corrupti harum necessitatibus saepe quis autem voluptatum, voluptatem ratione numquam delectus eveniet blanditiis accusantium. Mollitia nihil sint veniam numquam omnis doloremque adipisci tenetur in delectus error provident facilis, corporis atque placeat beatae obcaecati vitae voluptates asperiores culpa eligendi perspiciatis! Quibusdam facere accusamus harum impedit quasi, dolor recusandae, numquam commodi consectetur expedita repellendus dicta fuga fugiat tempora facilis! Voluptatum maiores doloremque sint hic quaerat natus velit enim odit commodi alias iste, temporibus quisquam corporis ea consequuntur qui voluptas. Blanditiis maxime, dolores nihil molestiae cum exercitationem mollitia cupiditate facilis aperiam, maiores ab enim quod repudiandae unde nesciunt perspiciatis autem harum error amet. Labore ut culpa iure officia, nobis sint in quod recusandae quo mollitia accusamus accusantium fuga laborum corrupti numquam ab aspernatur qui officiis nisi fugit? Quod voluptatem expedita debitis quibusdam libero ipsum vitae eius itaque officiis asperiores, atque fugiat aperiam eos doloribus similique iure quis corrupti rerum culpa soluta labore distinctio maxime error odit! Eius inventore repellat pariatur tempore et esse molestiae nemo veniam. Impedit in suscipit exercitationem tenetur inventore quam reprehenderit repudiandae odit. Aliquam maxime officiis modi illo placeat deleniti harum, recusandae excepturi quasi. Pariatur quos nemo asperiores et nostrum, quas ratione earum, culpa tempore praesentium rem officia voluptas ullam eaque sunt nesciunt voluptatibus fuga laborum. Ullam, provident accusantium incidunt iste ratione architecto voluptate eaque pariatur consequuntur quaerat culpa placeat voluptas consequatur. Nihil, perspiciatis! Tenetur assumenda incidunt, architecto sint fugit itaque necessitatibus illo culpa sapiente nesciunt magni cum consequuntur, harum voluptatibus ex animi dolorum veniam excepturi totam aliquid? Harum minima veritatis ipsam ab, laudantium ipsa non laboriosam rem earum corporis necessitatibus tenetur saepe dicta quod ipsum tempora maxime cum voluptates iusto molestiae dolore dignissimos fugit doloribus voluptatibus? Minus dolor sint animi alias praesentium cumque impedit? Saepe, porro nemo soluta atque error quae quo quam? Ducimus, atque accusamus iusto doloribus voluptatibus ut sequi eaque eos sit nihil perspiciatis eligendi a placeat? Distinctio illum velit ad. Quidem, ea voluptatibus? Deserunt, laborum? Animi minima officia voluptates? Aspernatur, nulla possimus ad modi alias a harum porro, distinctio ducimus, eveniet tempora commodi. Quas at repudiandae eius illum sed laudantium! Commodi ducimus tenetur quisquam dolor possimus sunt, modi totam consequuntur, hic veritatis unde non pariatur. Vitae perferendis, libero aperiam debitis necessitatibus harum iure inventore fugit dolore ullam eos modi placeat ab incidunt minus accusamus natus obcaecati cum praesentium laboriosam illum quis! Fugiat provident repudiandae ut. Assumenda, necessitatibus! Omnis eum architecto accusamus adipisci consequuntur beatae fugit culpa.'
