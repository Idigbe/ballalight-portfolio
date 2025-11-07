import React from 'react';
// import Image from "next/image";
const Footer = () => {
    return (
        <footer>
            <div className="max-w-7xl mx-auto py-12 px-3 md:px-2 lg:py-16 ">

                {/* Copyright */}
                {/* <div className="mt-4 border-t border-gray-700 pt-4"> */}
                <div className="pt-4">
                    <p className="text-xs md:text-base font-normal text-[#8E8E93]">
                        &copy; Copyright {new Date().getFullYear()} <u>Balla Light</u>. All rights reserved.
                    </p>
                </div>
                {/* <div className="pt-4 flex justify-center">
                    <div className="flex items-center justify-center gap-3 text-muted-foreground">
                        <span className="text-sm">Powered by</span>
                        <a
                            href="https://breakoutventures.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src="/images/breakout.png"
                                alt="Breakout Ventures logo"
                                width={120}
                                height={24}
                                className="h-6 w-auto"
                            />
                            <span className="font-medium text-foreground">Breakout Ventures</span>
                        </a>
                    </div>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
