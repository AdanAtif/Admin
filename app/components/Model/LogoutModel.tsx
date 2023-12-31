'use client'
import Button from "../button/Button"
import Model from "./Model";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from 'react-icons/fi'
import { signOut } from 'next-auth/react'

interface LogoutModelProps {
    isOpen?: boolean;
    onClose: () => void;
}
const LogoutModel: React.FC<LogoutModelProps> = ({ isOpen, onClose }) => {

    const router = useRouter();
    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-13 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className='h-6 w-6 text-red-600' />
                </div>
                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Logout website
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to Logout this website?.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button onClick={() => signOut().then(() => { router.push("/"); router.refresh() })} danger>
                    Logout
                </Button>
                <Button secondary onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Model>
    )
}

export default LogoutModel