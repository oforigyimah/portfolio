"use client"

import { Cursor, useCursorState } from "motion-plus/react"
import { animate, motion, useMotionValue } from "motion/react"
import { useEffect } from "react"

export function CursorMagnetic() {
    const state = useCursorState()
    const rotate = useMotionValue(0)

    useEffect(() => {
        if (!state.targetBoundingBox) {
            /**
             * If we don't have a current target then we want to make an infinite
             * rotation animation. We do an infinite rotation between the current rotation
             * and +360 degrees.
             */
            animate(rotate, [rotate.get(), rotate.get() + 360], {
                duration: 3,
                ease: "linear",
                repeat: Infinity,
            })
        } else {
            /**
             * If we do have a target then we want to animate the rotation to
             * the nearest 180 degree angle. We can use 180 instead of 360 to minimise
             * the spin and because it doesn't visually matter if the cursor is upside down
             * for this effect. We could increase the spin by doing something like
             * (rotate.get() + minimumSpin) / 180
             */
            animate(rotate, Math.round(rotate.get() / 180) * 180, {
                type: "spring",
                bounce: 0.3,
            })
        }
    }, [rotate, state.targetBoundingBox])

    return (
        <div className="container">
            <Button >About</Button>
            <Button>Blog</Button>
            <Button>Contact</Button>
            <Button>Photos</Button>

            <Cursor
                magnetic={{ morph: false, snap: 0 }}
                style={{ width: 5, height: 5 }}
                className="cursor"
            />
            <Cursor
                magnetic={{ snap: 0.9 }}
                style={{ rotate, width: 40, height: 40 }}
                variants={{
                    pressed: { scale: state.targetBoundingBox ? 0.9 : 0.7 },
                }}
                className="reticule"
            >
                <>
                    <Corner top={0} left={0} />
                    <Corner top={0} right={0} />
                    <Corner bottom={0} left={0} />
                    <Corner bottom={0} right={0} />
                </>
            </Cursor>
            <Stylesheet />
        </div>
    )
}

function Button({ children }: { children: React.ReactNode }) {
    return (
        <motion.button className="button" whileTap={{ scale: 0.9 }}>
            {children}
        </motion.button>
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
                className="corner"
                style={{
                    width: thickness,
                    height: length,
                    ...position,
                }}
            />
            <motion.div
                layout
                className="corner"
                style={{
                    width: length,
                    height: thickness,
                    ...position,
                }}
            />
        </>
    )
}

/**
 * ==============   Styles   ================
 */

function Stylesheet() {
    return (
        <style>
            {`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 30px;
                    align-items: center;
                    justify-content: center;
                }
                
                @media (max-width: 650px) {
                    .container {
                        grid-template-columns: 1fr 200px;
                        gap: 10px;
                    }
                }

                .container > :nth-child(4) {
                    grid-column: 2;
                    grid-row: 1 / span 3;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }

                .corner {
                    background: green;
                    position: absolute;
                }

                .cursor {
                    background-color: #f5f5f5;
                }

                .reticule {
                    background-color: transparent;
                    border-radius: 0;
                }

                .button {
                    background: none;
                    padding: 8px;
                    width: 140px;
                    height: 50px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #fff4;
                    border-radius: 0;
                    user-select: none;
                }
            `}
        </style>
    )
}
