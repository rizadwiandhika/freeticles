import React, { useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/client'

import { GET_USER_BY_USERNAME } from '../graphql/query'
import { INSERT_ONE_USER } from '../graphql/mutation'
import { saveUser } from '../store/user'
import UnderlineInput from '../components/UI/Input/UnderlineInput'
import Overlay from '../components/Overlay'
import LabelRounded from '../components/UI/LabelRounded'

export default function withAuthOverlay(Component) {
  return function (props) {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState('login')
    const [userInput, setUserInput] = useState({
      name: '',
      username: '',
      password: ''
    })

    const { refetch } = useQuery(GET_USER_BY_USERNAME)
    const [insertOneUser, insertOneUserInfo] = useMutation(INSERT_ONE_USER)

    /* const { loading, data, error } = useQuery(GET_USER_BY_USERNAME, {
      variables: { username: 'something' }
    })

    useEffect(() => {
      if (loading) return
      if (error) {
        console.error(error)
        return
      }

      console.log(data)
    }, [loading, data, error, dispatch]) */

    function handleInputChange(e) {
      const { name, value } = e.target
      setUserInput({ ...userInput, [name]: value })
    }

    async function handleRegisterSubmit(e) {
      const newUser = { ...userInput }

      try {
        const SALT = 12
        newUser.password = await bcrypt.hash(newUser.password, SALT)
      } catch (error) {
        return console.error(error)
      }

      await insertOneUser({ variables: { user: newUser } })

      if (insertOneUserInfo.error) {
        return console.error(insertOneUserInfo.error)
      }

      dispatch(saveUser(userInput))
      setIsOpen(false)
      alert('register success!')
    }

    async function handleLoginSubmit(e) {
      const SALT = 12
      let isValid = false
      let fetchedUser = null

      try {
        const response = await refetch({ username: userInput.username })
        fetchedUser = response.data.users_by_pk
      } catch (error) {
        return console.error('something wrong with refetching...', error)
      }

      if (!fetchedUser) {
        return alert('incorrect username or password')
      }

      try {
        isValid = await bcrypt.compare(userInput.password, fetchedUser.password)
      } catch (error) {
        return console.error(error)
      }

      if (!isValid) {
        return alert('incorrect username or password')
      }

      const { name, username } = fetchedUser
      dispatch(saveUser({ name, username, password: userInput.password }))
      alert('login success')
    }

    function closeOverlay() {
      setIsOpen(false)
    }

    function openOverlayLogin() {
      setIsOpen(true)
      setView('login')
    }

    function openOverlayRegister() {
      setIsOpen(true)
      setView('register')
    }

    function switchView() {
      const newView = view === 'login' ? 'register' : 'login'
      setView(newView)
    }

    const title = view === 'login' ? 'Sign In' : 'Create Account'
    const label = view === 'login' ? 'Login' : 'Create'
    const footer2 = view === 'login' ? 'Create one.' : 'Sign in.'

    const footer1 =
      view === 'login' ? 'No account?' : 'Already have an account?'

    const subtitle =
      view === 'login'
        ? 'Enter your username and password'
        : 'Enter your username and password to create an account'

    return (
      <>
        <Component
          isOverlayOpen={isOpen}
          closeOverlay={closeOverlay}
          openOverlayLogin={openOverlayLogin}
          openOverlayRegister={openOverlayRegister}
          {...props}
        />

        <Overlay isOpen={isOpen} closeOverlay={closeOverlay}>
          <div className="relative mx-auto max-w-screen-sm bg-white min-h-screen">
            <div className="h-screen flex justify-center items-center">
              <div className="h-4/5 max-w-sm flex flex-col justify-around">
                <div>
                  <p className="text-center text-2xl">{title}</p>
                  <p className="mt-2 text-center">{subtitle}</p>
                </div>

                <div>
                  {view === 'register' && (
                    <div className="my-8">
                      <p className="text-center text-sm">Your fullname</p>
                      <UnderlineInput
                        onChange={handleInputChange}
                        value={userInput.name}
                        name="name"
                        className="my-4 pb-1 text-center border-b border-gray-300"
                      />
                    </div>
                  )}

                  <div className="my-8">
                    <p className="text-center text-sm">Username</p>
                    <UnderlineInput
                      onChange={handleInputChange}
                      name="username"
                      className="my-4 pb-1 text-center border-b border-gray-300"
                    />
                  </div>

                  <div className="my-8">
                    <p className="text-center text-sm">Password</p>
                    <UnderlineInput
                      onChange={handleInputChange}
                      type="password"
                      name="password"
                      className="my-4  pb-1 border-b border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <div className="w-48 mx-auto">
                    <LabelRounded
                      onClick={
                        view === 'login'
                          ? handleLoginSubmit
                          : handleRegisterSubmit
                      }
                      theme="black"
                      text={label}
                    />
                  </div>
                  <p className="mt-8 text-center">
                    {footer1}{' '}
                    <span
                      onClick={switchView}
                      className="hover:cursor-pointer text-blue-theme"
                    >
                      {footer2}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      </>
    )
  }
}
