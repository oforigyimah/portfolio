"use client"

import type React from "react"

import {Cursor, useCursorState} from "motion-plus/react"
import {animate, motion, useMotionValue} from "motion/react"
import {useEffect} from "react"

export function CursorMagnetic({children}: {children?: React.ReactNode}) {
    const state = useCursorState()
    const rotate = useMotionValue(0)

    useEffect(() => {
        if (!state.targetBoundingBox) {
            animate(rotate, [rotate.get(), rotate.get() + 360], {
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
            })
        } else {
            animate(rotate, Math.round(rotate.get() / 180) * 180, {
                type: "spring",
                bounce: 0.3,
            })
        }
    }, [rotate, state.targetBoundingBox])

    return (
        <div className="relative min-h-screen">
            <div className="relative min-h-screen">
                {children}
                <Cursor magnetic={{morph: false, snap: 0}} style={{width: 5, height: 5}} className="cursor"/>
                <Cursor
                    magnetic={{snap: 0.9}}
                    style={{rotate, width: 40, height: 40}}
                    variants={{
                        pressed: {scale: state.targetBoundingBox ? 0.9 : 0.7},
                    }}
                    className="reticule"
                >
                    <>
                        <Corner top={0} left={0}/>
                        <Corner top={0} right={0}/>
                        <Corner bottom={0} left={0}/>
                        <Corner bottom={0} right={0}/>
                    </>
                </Cursor>
                <Stylesheet/>
            </div>
        </div>
    )
}

function Corner({
    thickness = 2,
    length = 10,
    ...position
}: {
    thickness?: number
    length?: number
    top?: number
    right?: number
    bottom?: number
    left?: number
}) {
    return (
        <>
            <motion.div
                layout
                className="absolute bg-white"
                style={{
                    width: thickness,
                    height: length,
                    ...position,
                }}
            />
            <motion.div
                layout
                className="absolute bg-white"
                style={{
                    width: length,
                    height: thickness,
                    ...position,
                }}
            />
        </>
    )
}

function Stylesheet() {
    return (
        <style>
            {`
        .cursor {
          background-color: var(--white);
        }

        .reticule {
          background-color: transparent;
          border-radius: 0;
        }
      `}
        </style>
    )
}
