/* eslint-disable react/prop-types */
import Carousel from './Carousel';
import { useEffect, useRef } from 'react';
const HomeHeading = () => {
    const fullText = 'Best Insurance';
    const typingSpeed = 150; // Adjust the typing speed
    const pauseBeforeRemove = 1500; // 2 seconds pause before starting removal
    const removalSpeed = 200; // Adjust the removal speed
    const textRef = useRef(null);
    const indexRef = useRef(0);
    const isDeletingRef = useRef(false);

    // typewritter text
    useEffect(() => {
        const updateText = () => {
            // Check if textRef.current is not null
            if (textRef.current) {
                const currentText = isDeletingRef.current
                    ? fullText.substring(0, indexRef.current - 1)
                    : fullText.substring(0, indexRef.current + 1);
                textRef.current.textContent = currentText;
                indexRef.current = isDeletingRef.current ? indexRef.current - 1 : indexRef.current + 1;
                // Toggle between typing and deleting when reaching the ends
                if (indexRef.current === fullText.length) {
                    setTimeout(() => {
                        isDeletingRef.current = true;
                    }, pauseBeforeRemove);
                } else if (indexRef.current === 0) {
                    isDeletingRef.current = false;
                }
            }
        };
        const timer = setInterval(updateText, isDeletingRef.current ? removalSpeed : typingSpeed);
        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, [fullText]);

    return <>
        <div className="container-fluid relative bg-white " >
            <div className="container-fluid  flex justify-around items-center ml-2 mr-2   bg-white  ">
                {/* part-1 */}
                <div className=" justify-center hidden sm:flex md:flex lg:flex xl:flex relative  ">
                    <div className='flex flex-col'>
                        <picture>
                            <source srcSet="logo.webp" type="image/webp" />
                            <img src="/logo.webp" alt="Description" className="lg:w-72 md:w-72 sm:w-52 w-32 xl:h-52 lg:h-40 md:h-32 sm:h-32 xs:h-32 mx-auto   max-w-lg " loading="lazy" />
                        </picture>
                        {/* <img src="/logo.webp" rel='preload' className="xl:w-78 xl:h-32 lg:h-32 md:h-32 sm:h-32 xs:h-32 h-32  max-w-lg mx-auto" alt="Logo"/> */}
                        <span className="self-center xs:text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl font-semibold  whitespace-nowrap font-sans ">Eleedom IMF Private Limited</span>
                    </div>
                </div>
                <Carousel />
            </div>

        </div>

    </>
}


export default HomeHeading;