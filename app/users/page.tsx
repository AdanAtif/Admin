'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'


export default function Home() {
  return (
    <div
      className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image alt="logo" height="48" width="48" className='mx-auto w-auto' src="/images/logo.png" />
        <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900' onClick={() => signOut()}>
          Hello
        </h1>
        <p onClick={() => signOut()}>hello</p>
      </div>

    </div>
  )
}
