'use client'

// In here we have some events like Clike events, 
// server side componets we cannot add any event, It's not possible
// That's why this commponent as 'client side' component

// when u make that file is 'client com' child components are also 'client com'

import React, { useState } from 'react'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { CgProfile } from 'react-icons/cg'

import AuthScreen from "../screens/AuthScreen"

const ProfileDropDown = () => {
    const [signIn, setSignIn] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <div className=' flex items-center gap-4'>
            {signIn ? (
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar
                            as="button"
                            className=' transition-transform'
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem key="profile" className=' h-14 gap-2'>
                            <p className=' font-semibold'> Sign is as</p>
                            <p>support@ic.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Profile</DropdownItem>
                        <DropdownItem key="all_orders">All Orders</DropdownItem>
                        <DropdownItem key="team_settings">Apply for seller account</DropdownItem>
                        <DropdownItem key="logout" color='danger'>Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <CgProfile className='text-2xl cursor-pointer' onClick={() => setOpen(!open)} />
            )}
            {open && <AuthScreen />}
        </div>
    )
}

export default ProfileDropDown