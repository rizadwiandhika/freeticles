import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import { v4 as uuidv4 } from 'uuid'

export default function MenuDropdown({ children }) {
  return (
    <Menu as="div" className="relative flex items-center">
      <Menu.Button className="align-bottom">{children[0]}</Menu.Button>
      <Menu.Items
        as="ul"
        className="absolute top-8 -right-2  w-40 z-10 py-2 px-8 bg-white shadow-xl rounded-md text-sm"
      >
        {React.Children.map(children[1], (item) => (
          <Menu.Item key={uuidv4()}>{item}</Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
