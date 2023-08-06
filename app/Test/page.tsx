'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'


export default function Home() {
    return (
        <div
            className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className="flex items-center justify-center px-30">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-gray-900 dark:border-white border-solid"></div>
                </div>
            </div>
        </div>
    )
}
