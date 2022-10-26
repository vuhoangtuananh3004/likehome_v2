import React, { useContext, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SignupContext from '../Context/SignupContext';

function ForgotPassword() {
    const { setSignup, setForgotpass } = useContext(SignupContext)

    const LoginForm = () =>{
        setSignup(false)
        setForgotpass(false)
    }
    return (
        <div className='backdrop-blur-md bg-white/30 top-[-200px] border-4 border-slate-200 rounded-[50px] w-[500px] h-[600px] text-center ml-10'>
            <div className='text-black font-bold text-[40px] pt-10 tracking-widest'>Reset your password</div>
            <div className='text-black text-[20px] pt-10 tracking-wider'>Enter the email address associated with your account, and we will email you a link to reset your password</div>
            <div className='flex flex-col h-full w-full p-10 mt-5'>
                <div className='flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c'>
                    <input className='rounded-l-full pl-10 h-full w-full outline-none' placeholder='Email address'></input>
                    <EmailOutlinedIcon className='mr-5' />
                </div>
                <button className='w-[400px] h-[50px] rounded-full mt-10 mb-4 text-[20px] bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 font-bold' onClick={LoginForm}>Send</button>
            </div>
        </div>
    )
}

export default ForgotPassword