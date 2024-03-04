'use client'

// In here we have some events like Clike events, 
// server side componets we cannot add any event, It's not possible
// That's why this commponent as 'client side' component

// when u make that file is 'client com' child components are also 'client com'

import React, { useEffect, useState } from 'react'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { CgProfile } from 'react-icons/cg'
import Cookies from 'js-cookie'

import AuthScreen from "../screens/AuthScreen"
import useUser from '../hooks/useUser'
import toast from 'react-hot-toast'
import { signOut, useSession } from 'next-auth/react'
import { registerUser } from '../actions/register-user'

const ProfileDropDown = () => {

    const { user, loading } = useUser();

    const [signIn, setSignIn] = useState(false)
    const [open, setOpen] = useState(false)
    const { data } = useSession()

    useEffect(() => {
        if (!loading) {
            setSignIn(!!user)
        }

        if (data?.user) {
            setSignIn(true)
            addUser(data?.user)
        }
    }, [loading, user, open, data])

    const logoutHandler = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        toast.success("Log out successfull!")
        window.location.reload();
    }

    const addUser = async (user: any) => {
        await registerUser(user)
    }

    return (
        <div className=' flex items-center gap-4'>
            {signIn ? (
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar
                            as="button"
                            className=' transition-transform'
                            src={data?.user ? data.user.image : user?.avatar?.url} />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem key="profile" className=' h-14 gap-2'>
                            <p className=' font-semibold'> Sign is as</p>
                            <p>{data?.user ? data.user.email : user?.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Profile</DropdownItem>
                        <DropdownItem key="all_orders">All Orders</DropdownItem>
                        <DropdownItem key="team_settings">Apply for seller account</DropdownItem>
                        <DropdownItem key="logout" color='danger'
                            onClick={() => signOut() || logoutHandler}
                        >Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            ) : (
                <CgProfile className='text-2xl cursor-pointer' onClick={() => setOpen(!open)} />
            )}
            {open && <AuthScreen setOpen={setOpen} />}
        </div>
    )
}

export default ProfileDropDown