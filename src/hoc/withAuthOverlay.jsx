import React, { useState } from 'react'
import UnderlineInput from '../components/UI/Input/UnderlineInput'
import Overlay from '../components/Overlay'
import LabelRounded from '../components/UI/LabelRounded'

export default function withAuthOverlay(Component) {
  return function (props) {
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState('login')

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
                        name="fullname"
                        className="my-4 pb-1 text-center border-b border-gray-300"
                      />
                    </div>
                  )}

                  <div className="my-8">
                    <p className="text-center text-sm">Username</p>
                    <UnderlineInput
                      name="username"
                      className="my-4 pb-1 text-center border-b border-gray-300"
                    />
                  </div>

                  <div className="my-8">
                    <p className="text-center text-sm">Password</p>
                    <UnderlineInput
                      name="password"
                      className="my-4  pb-1 border-b border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <div className="w-48 mx-auto">
                    <LabelRounded theme="black" text={label} />
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
