import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// ! props.children dari overlay harus relative supaya
export default function Overlay({
  isOpen,
  closeOverlay,
  noOverlayBackdrop,
  children
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={closeOverlay}>
        <div className="fixed  z-20 inset-0 min-h-screen overflow-y-auto">
          <Transition.Child
            leave="transition duration-200 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {noOverlayBackdrop || (
              <Dialog.Overlay className="fixed inset-0 bg-white opacity-90 " />
            )}
          </Transition.Child>

          <Transition.Child
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-90 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

function UNUSED_Popup(props) {
  const overlay = useRef(null)
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={props.closeOverlay}>
        <Dialog.Overlay
          ref={overlay}
          className="fixed inset-0  bg-black opacity-30"
        />

        <Transition.Child
          // className="absolute top-0 z-20 h-screen overflow-y-auto"
          // onClick={props.closeOverlay}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-75 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          {/* <div className="flex justify-center items-start">
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-11/12 my-12 bg-green-200"
            >
            </div>
          </div> */}
          <Dialog.Description>
            <div
              // onClick={(e) => e.stopPropagation()}
              className="w-11/12 mx-auto bg-green-200"
            >
              nemo quo corporis tempore sed? Neque ab repellendus officia
              tempore aliquid mollitia, dignissimos culpa voluptatibus nisi odio
              fugiat, veniam inventore architecto cumque ea! Facilis repellat
              at, hic dignissimos mollitia perferendis fuga quisquam quos labore
              eum. Sapiente ipsa quidem voluptas eum consequatur dignissimos
              vitae dolorem dolore doloribus hic neque unde animi eius
              similique, asperiores tempore sunt. Quaerat officia eius,
              laboriosam natus ex officiis tempora minus saepe praesentium earum
              error corrupti et iste perspiciatis molestias maxime amet laborum
              molestiae cum optio repellendus. Maiores deserunt, placeat
              voluptatum cumque iure tenetur. Nam odit totam cum suscipit
              excepturi, ipsum vero ex et minus temporibus commodi mollitia
              assumenda iure architecto repudiandae quasi nulla numquam animi
              doloremque. Distinctio quibusdam minima voluptas rem ab placeat
              incidunt! Reprehenderit nobis repellendus explicabo porro? Tenetur
            </div>
          </Dialog.Description>

          {/* {props.children} */}
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

/* 
<Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={props.closeOverlay}>
        // <Dialog.Overlay className="fixed z-20 inset-0 bg-black opacity-30" /> 

        <div
          onClick={() => {
            console.log('clicked green')
          }}
          className="absolute z-20 top-0 left-0 right-0 h-screen overflow-y-auto bg-green-100"
        >
          <Transition.Child
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-75 opacity-0"
            enterTo="transform scale-100 opacity-100"
            // leave="transition duration-1000 ease-out"
            // leaveFrom="transform scale-100 opacity-100"
            // leaveTo="transform scale-95 opacity-0"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-11/12 max-w-screen-lg mx-auto mt-8 flex justify-end"
            >
              <XIcon
                className="hover:cursor-pointer"
                width="24px"
                onClick={props.closeOverlay}
              />
            </div>
            {props.children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
*/
