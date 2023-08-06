import Image from 'next/image'
import AuthFrom from './components/Authform'

export default function Home() {
  return (
    <div
      className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-cyan-800 dark:from-slate-800 dark:to-slate-600'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image alt="logo" height="48" width="48" className='mx-auto w-auto' src="/images/logo.png" />
        <h1 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h1>
      </div>
      <AuthFrom />
    </div>
  )
}
