
'use client';
import Typewriter from 'typewriter-effect';
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, } from "framer-motion";

const Welcome = ({ lanugage, message }: Props) => {
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
        <motion.div
            dir={lanugage == 'ar' ? 'rtl' : ''}
            animate={hidden ? "hidden" : "visible"}
            onHoverStart={() => setHidden(false)}
            transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                initial: { opacity: 0, y: -75 },
                hidden: { opacity: 0, y: -25 }
            }}
        >
            <Typewriter
                options={{
                    strings: message,
                    autoStart: true,
                    delay: 25,
                    deleteSpeed: 5,
                    wrapperClassName: 'text-base md:text-2xl font-cairo text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)] font-bold',
                    cursor: '|',
                    cursorClassName: 'text-[#326C85] animate-[pulse_1s_ease-in-out_infinite] font-extrabold text-2xl'
                }}
            />
        </motion.div>
    );
}

interface Props {
    lanugage: string,
    message: string
}

export default Welcome;