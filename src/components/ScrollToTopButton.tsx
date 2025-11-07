"use client"

import { useEffect, useState } from "react"
// import { ChevronUp } from "lucide-react"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // if the user scrolls down, show the button
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }
        // listen for scroll events
        window.addEventListener("scroll", toggleVisibility)

        // clear the listener on component unmount
        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    // handles the animation when scrolling to the top
    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "auto",
            })
    }

    return (
        <button
            className={`fixed bottom-2 right-2 outline-none transition-opacity duration-200 ${isVisible ? "opacity-90" : "opacity-0"
                }`}
            onClick={scrollToTop}
        >
            <div className="bg-gray-50 p-2  w-full rounded-lg text-xl md:text-2xl">
                <i className="fa fa-arrow-up text-primary" />
            </div>

        </button>
    )
}

export default ScrollToTopButton