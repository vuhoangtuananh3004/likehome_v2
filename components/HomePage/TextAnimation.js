import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function TextAnimation({ text }) {
    const [reload, setReload] = useState(true)
    const letters = Array.from(text)
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.04 * i }
        })
    }
    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 20,
                stiffness: 100
            }
        }
    }


    return (
        <>
            <motion.div variants={container} initial="hidden" animate="visible">
                {
                    letters.map((letter, index) => (
                        <motion.span variants={child} className="font-bold text-[100px] text-black/80" key={index}>
                            {letter}
                        </motion.span>
                    ))
                }
            </motion.div> :
        </>
    )
}

export default TextAnimation