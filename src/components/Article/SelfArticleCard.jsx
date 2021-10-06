import React from 'react'
import { NavLink } from 'react-router-dom'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { getDateFormat } from '../../utils'
import MenuDropdown from '../../components/UI/MenuDropdown'

export default function SelfArticleCard({
  className,
  data,
  handleDeleteArticle,
  handleEditArticle,
  isDeleting
}) {
  return (
    <div className={className}>
      <div className="max-w-screen-sm">
        <NavLink
          to={`/post/${data.articleId}`}
          className="block text-xl font-bold"
        >
          {data?.title}
        </NavLink>
        <NavLink
          to={`/post/${data.articleId}`}
          className="mt-2 block text-gray-500"
        >
          {data?.subtitle}
        </NavLink>
        <div className="mt-4 flex gap-3">
          <p className="text-sm text-gray-500">
            {`${getDateFormat(data?.publishDate)} • ${data?.readingTime}`}
          </p>
          <MenuDropdown>
            <DotsVerticalIcon className="hover:cursor-pointer" width="1.2rem" />
            <>
              <li
                onClick={handleEditArticle}
                className="my-4 text-gray-500 hover:cursor-pointer hover:text-black "
              >
                Edit article
              </li>
              <li
                onClick={handleDeleteArticle}
                className="my-4 text-gray-500 hover:cursor-pointer hover:text-black "
              >
                Delete article
              </li>
            </>
          </MenuDropdown>

          <p
            className={`"text-sm text-red-600 opacity-70" ${
              isDeleting ? 'visible' : 'invisible'
            }`}
          >
            Deleting...
          </p>
        </div>
      </div>
    </div>
  )
}
