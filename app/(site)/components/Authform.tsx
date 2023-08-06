'use client'
import clsx from  'clsx'
import Button from '@/app/components/button/Button'
import { toast } from "react-hot-toast";
import { useEffect, useState,} from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";


const Authform = () => {



    const [isloading, setIsloading] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")

    const router = useRouter()
    useEffect(()=>{
user()
    },[])
  const user =()=>{
    const token = localStorage.getItem("token")
    console.log("token",token)
    if (token) {
        setIsloading(true);
        const headers ={
            "authorization":`Bearer ${token}`
        }
        axios.post('/api/authorization', {},{headers})
            .then((res) => {
              if (res.data.status == "success") {
                router.push("/Products")
              }
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsloading(false))
    } 
  }


    const onSubmit =async (event:any) => {
        event.preventDefault();
        setIsloading(true);
        axios.post('/api/auth', {email,password})
            .then((res) => {
              if (res.data.status =="sussess") {
                localStorage.setItem("token", res.data.token)
                router.push("/Products")
              } else if(res.data.status =="Failed") {
                setError(res.data.message)
              }  else{
                setError("Connect Error please try again")
              } 
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsloading(false))
    }



    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-5 text-gray-900" htmlFor="email">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                disabled={isloading}
                                   value={email}
                                   onChange={(e)=>setEmail(e.target.value)}
                                className={clsx(`form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                 focus:ring-inset focus:ring-sky-600 sm:textt-sm sm:leading-6`,
                                    isloading && "opacity-50 cursor-default")}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-5 text-gray-900" htmlFor="password">Password</label>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                disabled={isloading}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className={clsx(`form-input block w-full rounded-md border-0 py-1.5 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                 focus:ring-inset focus:ring-sky-600 sm:textt-sm sm:leading-6`,
                                    isloading && "opacity-50 cursor-default")}
                            />
                        </div>
                    </div>
                
                    <div>
                        <Button disabled={isloading} fullWidth type='submit'>
                            Login
                        </Button>
                    </div>
                    <p onClick={user}>hello</p>
                    <p className='text-center text-red-600 text-sm'>{error}</p>
                </form>
            </div>
        </div>
    )
}

export default Authform
