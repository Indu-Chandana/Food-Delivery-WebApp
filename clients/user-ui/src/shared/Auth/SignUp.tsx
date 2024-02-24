import { REGISTER_USER } from '@/src/graphql/actions/register.action'
import styles from '@/src/utils/style'
import { useMutation } from '@apollo/client'


import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long!"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long!"),
    phone_number: z.number().min(11, "Phone number must be at least 11 characters!"),
})

type SignUpSchema = z.infer<typeof formSchema>

const SignUp = ({ setActiveState }: { setActiveState: (e: string) => void }) => {

    const [registerUserMutation, { loading, error, data }] = useMutation(REGISTER_USER);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignUpSchema>({
        resolver: zodResolver(formSchema)
    })
    const [show, setShow] = useState(false)

    const onSubmit = async (data: SignUpSchema) => {
        // console.log(data)
        try {
            const response = await registerUserMutation({
                variables: data,
            });

            console.log(response);
            // {
            //     "data": {
            //         "register": {
            //             "activation_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJJbmR1IENoYW5kYW5hIiwiZW1haWwiOiJpbmR1Ljk5LmljQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFFIRHdCeFFZcExMakNRSHJ2aHE4RHVjZVQ4aktmeWVXa3FyNnJUVFlUWWEuY0ZQTGdJdXNlIiwicGhvbmVfbnVtYmVyIjo3NzIxODcxMjR9LCJhY3RpdmF0aW9uQ29kZSI6IjcyNTMiLCJpYXQiOjE3MDg3NTY0NjQsImV4cCI6MTcwODc1Njc2NH0.1Y-KmJn7b28HJ25X-U2WfAsdcmqIRdM_3HNSmVfsm8s",
            //             "__typename": "RegisterRepose"
            //         }
            //     }
            // }

            // this is in ur localstorage but ur enterring wrong OTP this will doesn't work.
            localStorage.setItem("activation_token", response.data.register.activation_token)

            toast.success("Please check your email to activate your account!")
            reset()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div>

            <h1 className={`${styles.title}`}>SignUp with Foodies</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' w-full mb-3'>
                    <label className={`${styles.label}`}>Enter your Name</label>
                    <input {...register("name")} type="string" placeholder='Indu**' className={`${styles.input}`} />
                    {errors.email && (
                        <span className=' text-red-500 block mt-1 '>{`${errors.email.message}`}</span>
                    )}
                </div>

                <label className={`${styles.label}`}>Enter your Email</label>
                <input {...register("email")} type="email" placeholder='loginmail@gmail.com' className={`${styles.input}`} />
                {errors.email && (
                    <span className=' text-red-500 block mt-1 '>{`${errors.email.message}`}</span>
                )}

                <div className=' w-full mt-3'>
                    <label className={`${styles.label}`}>Enter your Phone Number</label>
                    <input {...register("phone_number", { valueAsNumber: true })} type="number" placeholder='+94ß77652**' className={`${styles.input}`} />
                    {errors.email && (
                        <span className=' text-red-500 block mt-1 '>{`${errors.email.message}`}</span>
                    )}
                </div>

                <div className=' w-full mt-5 relative mb-1'>
                    <label htmlFor="password" className={`${styles.label}`}>Enter Your password</label>
                    <input {...register("password")} type={!show ? 'password' : "text"} placeholder='password!@%' className={`${styles.input}`} />


                    {!show ? (
                        <AiOutlineEyeInvisible size={20} onClick={() => setShow(true)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />
                    ) : (<AiOutlineEye size={20} onClick={() => setShow(false)} className=' absolute bottom-3 right-2 z-1 cursor-pointer' />)}
                </div>
                {errors.password && (
                    <span className=' text-red-500 block mt-1 '>{`${errors.password.message}`}</span>
                )}

                <div className=' w-full mt-5'>
                    {/* <span className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}>Forgot your  password?</span> */}
                    <input type="submit" value="Sign Up" disabled={isSubmitting || loading} className={`${styles.button} mt-3`} />
                </div>
                <br />

                <h5 className=' text-center pt-4 font-Poppins text-[14px] text-white'>Or join with</h5>
                <div className=' flex items-center justify-center my-3'>
                    <FcGoogle size={30} className=' cursor-pointer mr-2' />
                    <AiFillGithub size={30} className=' cursor-pointer ml-2' />
                </div>

                <h5 className=' text-center pt-4 font-Poppins text-[14px]'>Already have an account? <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setActiveState("Login")}>Login</span></h5>
                <br />
            </form>
        </div>
    )
}

export default SignUp