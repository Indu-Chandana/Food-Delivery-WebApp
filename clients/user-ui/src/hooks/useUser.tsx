import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER } from '../graphql/actions/getUser.action'

const useUser = () => {
    const { loading, data, error } = useQuery(GET_USER)

    console.log('useUser data :: ', data)
    console.warn('error useUser', error)
    return {
        loading, user: data?.getLoggedInUser?.user
    }
}

export default useUser