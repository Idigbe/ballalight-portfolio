'use client';
import Image from 'next/image';
import { useAnimate, stagger, motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import avatar from '../../../../../public/images/logo-avatar.png';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        animate(
            "ul",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );

        animate(
            "li",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen, animate]);

    return scope;
}

const Links = ({ page, refLink, currentPath, icon }: { page: string; refLink: string; currentPath: string, icon: string }) => {
    let activeLink = "/";
    currentPath.includes('/work') ? activeLink = "/work" : activeLink = currentPath;

    let cssClass = "text-foreground hover:bg-white hover:text-primary block py-2 rounded-md text-base font-normal";
    activeLink === refLink ?
        cssClass = "text-primary hover:bg-white block py-2 rounded-md text-base font-normal"
        :
        cssClass = "text-foreground hover:bg-white hover:text-primary block py-2 rounded-md text-base font-normal"

    return (
        <li className='align-middle justify-items-center'>
            <Link href={refLink} className={cssClass}>
                {
                    activeLink === refLink ?
                        <i className={`${icon} fa-beat`} style={{ '--fa-animation-duration': '1s', '--fa-beat-fade-scale': '2.0' } as React.CSSProperties} />
                        : <i className={`${icon} `} />
                }
                &nbsp;
                {page}
            </Link>
        </li>
    );
}

const MobileNav = () => {
    const currentPath = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    return (
        <nav className='bg-white-800'>
            <div className="max-w-7xl mx-auto px-1" ref={scope}>
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className=" flex-shrink-0">
                        <Link href="/" className="text-foreground font-bold text-xl">
                            <Image className="h-10 w-10" src={avatar} alt="Balla Light" width={0} height={0} sizes='(max-width: 250px) 100vw, (max-height: auto) 50vw, 33vw' />
                        </Link>
                    </div>
                    <div className="">
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="arrow inline-flex items-center justify-center p-4 rounded-md text-primary hover:text-primary "
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </motion.button>
                    </div>
                </div>
                <div className={` ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="px-2 pt-2 pb-3 space-y-1 mx-0 bg-white " onClick={() => setIsOpen(!isOpen)}>
                        <Links page="Home" refLink="/" currentPath={currentPath} icon="fas fa-house btn-icon-black" />
                        <Links page="Work" refLink="/work" currentPath={currentPath} icon="fas fa-briefcase btn-icon-black" />
                        <Links page="Gallery" refLink="/gallery" currentPath={currentPath} icon="fas fa-palette btn-icon-black" />
                        <Links page="Contact" refLink="/contact" currentPath={currentPath} icon="fas fa-comments btn-icon-black" />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MobileNav;


