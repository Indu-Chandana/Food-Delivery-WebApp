'use client'

import { RESET_PASSWORD } from '@/src/graphql/actions/reset-password.action'
import styles from '@/src/utils/style'
import { useMutation } from '@apollo/client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { z } from 'zod'

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    confirmPassword: z.string()
}).refine((values) => {
    return values.password === values.confirmPassword;
}, {
    message: "Passwords must need to match!",
    path: ["confirmPassword"]
})

type ResetPasswordSchema = z.infer<typeof formSchema>

const ResetPassword = ({ activationToken }: { activationToken: string | string[] }) => {

    const [ResetPassword, { loading }] = useMutation(RESET_PASSWORD)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(formSchema)
    })

    const [show, setShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

    const onSubmit = async (data: ResetPasswordSchema) => {

        try {
            const response = await ResetPassword({
                variables: {
                    password: data.password,
                    activationToken: activationToken
                }
            })
            console.log(' Reset pw response ::', response)
            toast.success("Password updated successfully!")
        } catch (error: any) {
            console.log('error ::', error)
            toast.error(error.message)
        }

        reset()
    }

    return (
        <div className=' w-full flex justify-center items-center h-screen'>
            <div className=' md:w-[500px] w-full'>


                <h1 className={`${styles.title}`}>Rest Your Password</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className=' w-full mt-5 relative mb-1'>
                        <div className='w-full mt-5 relative mb-1'>
                            <label htmlFor="password" className={`${styles.label}`}>Enter Your password</label>
                            <input {...register("password")} type={!show ? 'password' : "text"} placeholder='password!@%' className={`${styles.input}`} />
                            {errors.password && (
                                <span className=' text-red-500 block mt-1 '>{`${errors.password.message}`}</span>
                            )}
                            {!show ? (
                                <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />
                            ) : (<AiOutlineEye size={20} onClick={() => setShow(false)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />)}
                        </div>

                        <div className='w-full mt-5 relative mb-1'>
                            <label htmlFor="password" className={`${styles.label}`}>Enter Your confirm password</label>
                            <input {...register("confirmPassword")} type={!confirmPasswordShow ? 'password' : "text"} placeholder='password!@%' className={`${styles.input}`} />
                            {errors.confirmPassword && (
                                <span className=' text-red-500 block mt-1 '>{`${errors.confirmPassword.message}`}</span>
                            )}
                            {!confirmPasswordShow ? (
                                <AiOutlineEyeInvisible size={20} onClick={() => setConfirmPasswordShow(true)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />
                            ) : (<AiOutlineEye size={20} onClick={() => setConfirmPasswordShow(false)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />)}
                        </div>
                    </div>
                    <br />
                    <input type="submit" value="Submit" disabled={isSubmitting || loading} className={`${styles.button} mt-3`} />

                    <br />

                </form>
            </div>
        </div>
    )
}

export default ResetPassword  