
import { Cursor, useCursorState } from "motion-plus/react"
import { animate, motion, useMotionValue } from "motion/react"
import { useEffect } from "react"

export function CursorMagnetic() {
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
        <>
            {/* Cursor that only targets elements with 'magnetic' class */}
            <Cursor magnetic={{ morph: false, snap: 0 }} style={{ width: 5, height: 5 }} className="cursor" />
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
        </>
    )
}

// function Button({ children, className }: { children: React.ReactNode; className?: string }) {
//     const isMagnetic = className?.includes("magnetic") && !className?.includes("non-magnetic")
//
//     return (
//         <motion.button
//             className={`
//         bg-transparent p-2 w-36 h-12 text-white flex items-center justify-center
//         border rounded-none select-none gap-2 relative
//         ${
//                 isMagnetic
//                     ? "border-solid border-green-400 bg-green-400/10 hover:bg-green-400/20"
//                     : "border-dashed border-red-400 bg-red-400/5 hover:bg-red-400/10"
//             }
//         ${className || ""}
//       `}
//             whileTap={{ scale: 0.9 }}
//         >
//             {children}
//             <span className="text-xs opacity-80">{isMagnetic ? "🧲" : "🚫"}</span>
//         </motion.button>
//     )
// }

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
                className="bg-white absolute"
                style={{
                    width: thickness,
                    height: length,
                    ...position,
                }}
            />
            <motion.div
                layout
                className="bg-white absolute"
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
                .cursor {
                    background-color: var(--white);
                }

                .reticule {
                    background-color: transparent;
                    border-radius: 0;
                }

                /* Hide non-magnetic elements from cursor detection */
                .non-magnetic {
                    pointer-events: none !important;
                }
                
                .non-magnetic:hover {
                    pointer-events: auto !important;
                }

                /* Ensure the grid positioning works */
                .grid > :nth-child(6) {
                    grid-column: 2;
                    grid-row: 1 / span 4;
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                }
            `}
        </style>
    )
}
