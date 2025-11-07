'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import logo from '../../../../../public/images/logo.png';
import avatar from '../../../../../public/images/logo-avatar.png';

const Links = ({ page, refLink, currentPath }: { page: string; refLink: string; currentPath: string }) => {
    return (
        <Link href={refLink} className={currentPath === refLink ?
            "text-primary  font-normal  hover:bg-white hover:text-black px-2 py-2  " :
            "text-foreground  font-normal hover:bg-white hover:text-primary px-2 py-2"} >
            {page}
        </Link>
    );
}

const DeskNav = () => {
    const currentPath = usePathname();
    const ImageToggleOnMouseOver = ({ primaryImg, secondaryImg, alt }: { primaryImg: string, secondaryImg: string, alt: string }) => {
        const imageRef = useRef<HTMLImageElement>(null);

        return (
            <Image
                className="h-10 w-10"
                onMouseOver={() => {
                    if (imageRef.current) imageRef.current.src = secondaryImg;
                }}
                onMouseOut={() => {
                    if (imageRef.current) imageRef.current.src = primaryImg;
                }}
                width={0}
                height={0}
                src={primaryImg}
                alt={alt}
                ref={imageRef}
                sizes='(max-width: 200px) 100vw, (max-height: auto) 50vw, 33vw'
            />
        )
    }
    const ImageChangeOnMouseOver = () => {
        return (
            <div>
                <ImageToggleOnMouseOver
                    primaryImg={logo.src}
                    secondaryImg={avatar.src}
                    alt="Balla Light" />
            </div>
        )
    }
    return (
        <nav className='bg-white-800'>
            <article className="max-w-7xl mx-auto px-2">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className=" flex-shrink-0">
                        <Link href="/" className="text-foreground font-bold text-xl">
                            <ImageChangeOnMouseOver />
                        </Link>
                    </div>
                    <div className="">
                        <div className="flex items-baseline space-x-2">
                            <Links page="Home" refLink="/" currentPath={currentPath} />
                            <Links page="Work" refLink="/work" currentPath={currentPath} />
                            <Links page="Gallery" refLink="/gallery" currentPath={currentPath} />
                            <Links page="Contact" refLink="/contact" currentPath={currentPath} />
                        </div>
                    </div>
                </div>
            </article>
        </nav>
    );
};

export default DeskNav;


