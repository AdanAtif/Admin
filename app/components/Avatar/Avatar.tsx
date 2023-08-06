'use client'
import Image from "next/image";


interface AvatarProps {
    image?:string
}

const Avatar: React.FC<AvatarProps> = ({ image }) => {

    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 ">
                <Image alt="Avator" fill src={image || '/images/placeholder.jpg'} />
            </div>
        </div>
    )
}

export default Avatar