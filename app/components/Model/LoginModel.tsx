'use client'

import Button from "../button/Button"
import Model from "./Model";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from 'next/image'

interface LoginModelProps {
    isOpen?: boolean;
    onClose: () => void;
}
const LoginModel: React.FC<LoginModelProps> = ({ isOpen, onClose }) => {

    const router = useRouter();

    return (
        <Model
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-13 w-12 flex-shrink-0 items-center  justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Image width={45} height={45}  alt="Avator" src='/images/placeholder.jpg' className="rounded-full" />
                </div>
                <div className=" mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Dashboard page
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            To access this page you need to be a authenticated user.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button onClick={() => router.push('/Auth')}>
                    Login
                </Button>
                <Button secondary onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Model>
    )
}

export default LoginModel