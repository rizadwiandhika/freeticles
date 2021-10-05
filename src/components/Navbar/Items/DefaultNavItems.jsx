import React from 'react'
import AvatarItem from './Item/AvatarItem'
import BookmarkItem from './Item/BookmarkItem'
import LabelRounded from '../../UI/LabelRounded'

export default function DefaultNavItems({
  isAuth,
  handleClickSignIn,
  handleClickGetStarted,
  handleClickLogout
}) {
  const navItems = isAuth ? (
    <>
      <BookmarkItem />
      <AvatarItem handleClickLogout={handleClickLogout} />
    </>
  ) : (
    <>
      <p
        onClick={handleClickSignIn}
        className="hover:cursor-pointer ml-4 text-sm"
      >
        Sign In
      </p>
      <LabelRounded
        className="text-sm"
        onClick={handleClickGetStarted}
        theme="blue"
        text="Get started"
      />
    </>
  )

  return navItems
}
