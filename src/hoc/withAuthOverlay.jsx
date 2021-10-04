import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { useDispatch } from 'react-redux'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { XIcon } from '@heroicons/react/outline'

import { GET_USER_BY_USERNAME } from '../graphql/query'
import { INSERT_ONE_USER } from '../graphql/mutation'
import { saveUser } from '../store/user'
import UnderlineInput from '../components/UI/Input/UnderlineInput'
import Overlay from '../components/Overlay'
import LabelRounded from '../components/UI/LabelRounded'

export default function withAuthOverlay(Component) {
  return function (props) {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState('login')
    const [userInput, setUserInput] = useState({
      name: '',
      username: '',
      password: ''
    })
    const [registerLoading, setRegisterLoading] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [loginCallback, setLoginCallback] = useState(() => () => {
      console.log('hello login in withOverlay')
    })
    const [registerCallback, setRegisterCallback] = useState(() => () => {
      console.log('hello login in withOverlay')
    })

    const { refetch } = useQuery(GET_USER_BY_USERNAME)
    // const [lazy, { refetch }] = useLazyQuery(GET_USER_BY_USERNAME)
    const [insertOneUser, insertOneUserInfo] = useMutation(INSERT_ONE_USER)

    async function handleRegisterSubmit(e) {
      if (!(userInput.name && userInput.username && userInput.password)) {
        return setErrorMessage('Fill the fullname, username, and password')
      }

      const SALT = 12
      const newUser = { ...userInput }
      let registerError = ''

      try {
        setRegisterLoading(true)

        newUser.password = await bcrypt.hash(newUser.password, SALT)
        await insertOneUser({ variables: { user: newUser } })

        if (insertOneUserInfo.error) throw Error('register failed')

        dispatch(saveUser(userInput))

        // TODO: popup label persegi panjang di pokok kiri bawah layar
      } catch (err) {
        registerError = err.message
        switch (err.message) {
          case 'register failed':
            setErrorMessage('Failed registering user...')
            break

          default:
            setErrorMessage('Something went wrong...')
            break
        }
      } finally {
        setRegisterLoading(false)
        registerCallback?.(registerError)
      }
    }

    async function handleLoginSubmit(e) {
      if (!(userInput.username && userInput.password)) {
        return setErrorMessage('Fill the username and password')
      }

      let loginError = ''
      let isValid = false
      let fetchedUser = null

      try {
        setLoginLoading(true)

        const response = await refetch({ username: userInput.username })
        fetchedUser = response.data.users_by_pk

        if (!fetchedUser) throw Error('not found')

        isValid = await bcrypt.compare(userInput.password, fetchedUser.password)
        if (!isValid) throw Error('not found')

        const { name, username } = fetchedUser
        dispatch(saveUser({ name, username, password: userInput.password }))

        // TODO: popup label persegi panjang di pokok kiri bawah layar
      } catch (err) {
        console.log(err)
        loginError = err.message
        switch (err.message) {
          case 'not found':
            setErrorMessage('Wrong username or password')
            break

          default:
            setErrorMessage('Whoops.. something went wrong. Try again')
            break
        }
      } finally {
        setLoginLoading(false)
        loginCallback?.(loginError)
      }
    }

    function handleSetLoginCallback(cb = (err) => {}) {
      setLoginCallback(() => cb)
    }

    function handleSetRegisterCallback(cb = (err) => {}) {
      setRegisterCallback(() => cb)
    }

    function handleInputChange(e) {
      const { name, value } = e.target
      setUserInput({ ...userInput, [name]: value })
      setErrorMessage('')
    }

    function closeOverlay() {
      setErrorMessage('')
      setIsOpen(false)
    }

    function openOverlayLogin() {
      setErrorMessage('')
      setIsOpen(true)
      setView('login')
    }

    function openOverlayRegister() {
      setErrorMessage('')
      setIsOpen(true)
      setView('register')
    }

    function switchView() {
      const newView = view === 'login' ? 'register' : 'login'
      setView(newView)
      setErrorMessage('')
    }

    function getLabelText() {
      if (view === 'register' && registerLoading) return 'Registering...'
      if (view === 'login' && loginLoading) return 'Loging In...'

      return view === 'login' ? 'Login' : 'Create'
    }

    function getLableHandler() {
      if (registerLoading || loginLoading) return null

      return view === 'login' ? handleLoginSubmit : handleRegisterSubmit
    }

    const label = getLabelText()
    const title = view === 'login' ? 'Sign In' : 'Create Account'
    const footer2 = view === 'login' ? 'Create one.' : 'Sign in.'

    const footer1 =
      view === 'login' ? 'No account?' : 'Already have an account?'

    const subtitle =
      view === 'login'
        ? 'Enter your username and password'
        : 'Enter your username and password to create an account'

    console.log('overlay render')
    return (
      <>
        <Component
          isOverlayOpen={isOpen}
          closeOverlay={closeOverlay}
          setLoginCallback={handleSetLoginCallback}
          setRegisterCallback={handleSetRegisterCallback}
          openOverlayLogin={openOverlayLogin}
          openOverlayRegister={openOverlayRegister}
          {...props}
        />

        <Overlay isOpen={isOpen} closeOverlay={closeOverlay}>
          <div className="relative mx-auto max-w-screen-sm bg-white min-h-screen shadow-lg">
            <XIcon
              onClick={closeOverlay}
              width={24}
              className="absolute hover:cursor-pointer right-16 top-12"
            />

            <div className="h-screen flex justify-center items-center">
              <div className="h-4/5 w-3/5 max-w-sm flex flex-col justify-around">
                <div>
                  <p className="text-center text-2xl">{title}</p>
                  <p className="mt-2 text-center">{subtitle}</p>
                  <p
                    className={`mt-4 text-center text-red-400 ${
                      errorMessage ? '' : 'invisible'
                    }`}
                  >
                    {errorMessage || '...'}
                  </p>
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
                      onClick={getLableHandler()}
                      theme={loginLoading || registerLoading ? 'gray' : 'black'}
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
