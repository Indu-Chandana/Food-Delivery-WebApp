import { LOGIN_USER } from '@/src/graphql/actions/login.action'
import styles from '@/src/utils/style'
import { useMutation } from '@apollo/client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import Cookies from "js-cookie"
import { signIn } from 'next-auth/react'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long!")
})

type LoginSchema = z.infer<typeof formSchema>

const Login = ({ setActiveState, setOpen }: { setActiveState: (e: string) => void, setOpen: (e: boolean) => void }) => {

    const [LoginUserMutation, { loading, error, data }] = useMutation(LOGIN_USER);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginSchema>({
        resolver: zodResolver(formSchema)
    })
    const [show, setShow] = useState(false)

    const onSubmit = async (data: LoginSchema) => {

        try {
            const loginData = {
                email: data.email,
                password: data.password
            }

            const response = await LoginUserMutation({
                variables: loginData
            })

            console.log('Login response ::', response);

            if (response.data.Login.user) {
                toast.success("Login Successfull!")
                Cookies.set('access_token', response.data.Login.accessToken)
                Cookies.set('refresh_token', response.data.Login.refreshToken)
                setOpen(false)
                window.location.reload();
            } else {
                toast.error(response.data.Login.error.message)
            }
        } catch (error: any) {
            toast.error(error.message)
        }

        reset()
    }

    return (
        <div>

            <h1 className={`${styles.title}`}>Login with Foodies</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label className={`${styles.label}`}>Enter your Email</label>
                <input {...register("email")} type="email" placeholder='loginmail@gmail.com' className={`${styles.input}`} />
                {errors.email && (
                    <span className=' text-red-500 block mt-1 '>{`${errors.email.message}`}</span>
                )}
                <div className=' w-full mt-5 relative mb-1'>
                    <label htmlFor="password" className={`${styles.label}`}>Enter Your password</label>
                    <input {...register("password")} type={!show ? 'password' : "text"} placeholder='password!@%' className={`${styles.input}`} />
                    {errors.password && (
                        <span className=' text-red-500 block mt-1 '>{`${errors.password.message}`}</span>
                    )}

                    {!show ? (
                        <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />
                    ) : (<AiOutlineEye size={20} onClick={() => setShow(false)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />)}
                </div>
                <div className=' w-full mt-5'>
                    <span className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
                        onClick={() => setActiveState("Forgot-Password")}
                    >Forgot your  password?</span>
                    <input type="submit" value="Login" disabled={isSubmitting || loading} className={`${styles.button} mt-3`} />
                </div>
                <br />

                <h5 className=' text-center pt-4 font-Poppins text-[14px] text-white'>Or join with</h5>
                <div className=' flex items-center justify-center my-3'>
                    <div onClick={() => signIn()}><FcGoogle size={30} className=' cursor-pointer mr-2' /></div>
                    <AiFillGithub size={30} className=' cursor-pointer ml-2' />
                </div>

                <h5 className=' text-center pt-4 font-Poppins text-[14px]'>Not have any account? <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setActiveState("Signup")}>Sign up</span></h5>
                <br />
            </form>
        </div>
    )
}

export default Login  