'use client'

import Input from '@/app/components/Input/Input'
import Button from '@/app/components/button/Button'
import { toast } from "react-hot-toast";

import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { CldUploadButton } from 'next-cloudinary';
import axios from 'axios'

import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export default function Home() {



    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState<string>("")
    const [Category, setCategory] = useState<string>("")
    const [Size, setSize] = useState<string>("")
    const [Color, setColor] = useState<string>("")


    const router = useRouter()

  


    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            stock: Number,
            price: Number,
            image: '',

        },
    })

    // Image handler
    const handleupload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }
    const image = watch('image')



    const onSubmit: SubmitHandler<FieldValues> = (data) => {
if (!Color || !Size || !Category) {
    setError("please fill all the fields")
} else {
   const token = localStorage.getItem("token")
        console.log("token", token)
        if (token) {
            setIsloading(true);
            const headers = {
                "authorization": `Bearer ${token}`
            }
            axios.post('/api/Input', {data,Color,Size,Category}, { headers })
                .then((res) => {
                    if (res.data.status == "success") {
                    toast.success("Product has been added")
                    }else{
                        setError("something went wrong")
                    }
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsloading(false))
        }else{
            router.push("/")
        } 
}};




    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white px-4 py-8 sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>

                    <Input label='Product Name' register={register} id="name" type='text' errors={errors} disabled={isloading} />
                    <Input label='Price' register={register} id="price" type='number' errors={errors} disabled={isloading} />
                    <Input label='stock' register={register} id="stock" type='number' errors={errors} disabled={isloading} />

                    <div className='fle fle-col gap-2'>
                        <Select onValueChange={setCategory} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="clothing">clothing</SelectItem>
                                <SelectItem value="shoes">shoes</SelectItem>
                                <SelectItem value="accessories">accessories</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSize}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="xl">xl</SelectItem>
                                <SelectItem value="lg">lg</SelectItem>
                                <SelectItem value="md">md</SelectItem>
                                <SelectItem value="sm">sm</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Select onValueChange={setColor} >
                        <SelectTrigger className="w-[180px]"  >
                            <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Red">Red</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="White">White</SelectItem>

                        </SelectContent>
                    </Select>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='black text-sm font-medium leading text-gray-900 '>Product Photo</label>
                        <div className='mt-2 flex items-center gap-x-3'>
                            <CldUploadButton
                                options={{ maxFiles: 1 }}
                                onUpload={handleupload}
                                uploadPreset="o0xrxsjr">
                                <Image
                                    width="48"
                                    height="48"
                                    className='rounded-md'
                                    src={image || '/images/placeholder.jpg'}
                                    alt="Avatar"
                                />
                            </CldUploadButton>
                        </div>
                    </div>
                    <div>
                        <Button disabled={isloading} fullWidth type='submit'>
                            Enter
                        </Button>
                    </div>
                    <p className='text-center text-red-600 text-sm'>{error}</p>
                </form>
            </div>
        </div>
    )
}


