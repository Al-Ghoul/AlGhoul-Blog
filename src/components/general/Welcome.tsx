
'use client';
import Typewriter from 'typewriter-effect';
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, } from "framer-motion";
import Link from 'next/link';

const Welcome = ({ lanugage, message, styles }: Props) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    function update() {
        if (scrollY.get() > scrollY.getPrevious()) {
            setHidden(true);
        } else if (scrollY.get() < scrollY.getPrevious()) {
            setHidden(false);
        }
    }

    useMotionValueEvent(scrollY, "change", (latest) => {
        update();
    });

    return (
        <>
            <header>
                <motion.article
                    dir={lanugage == 'ar' ? 'rtl' : ''}
                    animate={hidden ? "hidden" : "visible"}
                    onHoverStart={() => setHidden(false)}
                    transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        initial: { opacity: 0, y: -75 },
                        hidden: { opacity: 0, y: -25 }
                    }}
                    className={styles}
                >
                    <Typewriter
                        options={{
                            strings: message,
                            autoStart: true,
                            delay: 25,
                            deleteSpeed: 5,
                            wrapperClassName: 'text-base md:text-2xl font-cairo text-white backdrop-blur-md bg-black/25 font-bold',
                            cursor: '|',
                            cursorClassName: 'text-white animate-[pulse_1s_ease-in-out_infinite] font-extrabold text-2xl'
                        }}
                    />
                </motion.article>
            </header>
            <Link
                className='relative flex h-10 w-10 my-7 bg-[#1f2eff] rounded-full items-center'
                href='#mainsection'
                role="link"
            >
                <div className='absolute bg-[#1f2eff] animate-ping  h-full w-full rounded-full opacity-75'></div>
                <svg className='flex-auto h-5' aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </>

    );
}

interface Props {
    lanugage: string,
    message: string,
    styles: string,
}

export default Welcome;