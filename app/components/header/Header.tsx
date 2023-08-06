"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/Ai";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Avatar from '../Avatar/Avatar';
import LoginModel from '../Model/LoginModel';
import LogoutModel from '../Model/LogoutModel';


const Header = () => {


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [confrimOpen, setConfrimOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);


    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        console.log("session", session?.status);

    }, [session?.status])
    return (
        <>
            <LoginModel isOpen={confrimOpen}
                onClose={() => setConfrimOpen(false)} />
            <LogoutModel isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)} />
            <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-600 to-cyan-800 dark:from-slate-800 dark:to-slate-600 text-slate-50 dark:text-cyan-300 p-4">
                <div className="flex items-center flex-shrink-0 text-slate-50 dark:text-cyan-300  mr-6 cursor-pointer">
                    <Image
                        className="border-2  dark:border-slate-300 border:rounded-full rounded-full"
                        src="/images/logo.png"
                        alt="Logo" width={40} height={40} />
                    <span className="font-semibold text-3xl hover:uppercase  tracking-tight ml-2 text-slate-50 dark:text-blue-50  ">
                        Project
                    </span>
                </div>
                <div className="block lg:hidden">
                    <button
                        className="flex items-center px-3 py-2 cursor-pointer border rounded text-gray-900 dark:text-slate-50 border-gray-400 hover:text-gray hover:border-gray"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">View Cart</span>
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" fillRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
                    <div className="text-sm lg:flex-grow">
                        <span className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={() => router.push('/')}>  Orders</span>
                        <span className="block mt-4 text-[1.15rem]  lg:inline-block lg:mt-0 text-slate-300 dark:text-cyan-600 hover:dark:text-cyan-500  hover:text-gray-50 pt-2 cursor-pointer mr-4" onClick={() => router.push('/Aboutus')}>Add Product</span> 
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
