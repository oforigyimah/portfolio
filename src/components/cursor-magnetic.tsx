"use client"

import type React from "react"

import {Cursor, useCursorState} from "motion-plus/react"
import {animate, motion, useMotionValue} from "motion/react"
import {useEffect, useState, useRef, useMemo} from "react"

export function CursorMagnetic() {
    const state = useCursorState()
    const rotate = useMotionValue(0)

    // Grid animation state
    const grid = useRef<HTMLDivElement>(null)
    const [gridSize, setGridSize] = useState({cols: 0, rows: 0})
    const [originIndex, setOriginIndex] = useState<number | null>(null)
    const [calculatedDelay, setCalculatedDelay] = useState<number[]>([])
    const [animationKey, setAnimationKey] = useState(0)
    const [hasBeenClicked, setHasBeenClicked] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)

    const totalCells = gridSize.cols * gridSize.rows
    const baseDelay = 0.0008
    const noise = 0.1

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

    // Calculate grid size based on screen dimensions
    useEffect(() => {
        const calculateGridSize = () => {
            const cellSize = 80
            const gap = 1

            const cols = Math.floor((window.innerWidth - gap) / (cellSize + gap))
            const rows = Math.floor((window.innerHeight - gap) / (cellSize + gap))

            setGridSize({
                cols: Math.max(5, cols),
                rows: Math.max(5, rows),
            })
        }

        calculateGridSize()
        window.addEventListener("resize", calculateGridSize)
        return () => window.removeEventListener("resize", calculateGridSize)
    }, [])

    const calculateDelays = useMemo(() => (originIdx: number) => {
        const cells = grid.current?.querySelectorAll(".cell")
        if (!cells) return []

        const originCell = cells[originIdx]
        const originPoint = getCenter(originCell as HTMLElement)
        const delays: number[] = []

        for (let i = 0; i < totalCells; i++) {
            const cell = cells[i]
            const cellPoint = getCenter(cell as HTMLElement)
            const distance = Math.sqrt((cellPoint.x - originPoint.x) ** 2 + (cellPoint.y - originPoint.y) ** 2)
            const delay = distance * baseDelay + Math.random() * noise
            delays.push(delay)
        }

        return delays
    }, [totalCells, baseDelay, noise]);

    const triggerGridAnimation = useMemo(() => (event?: React.MouseEvent) => {
        if (!grid.current) return

        const gridRect = grid.current.getBoundingClientRect()
        let clickX, clickY

        if (event) {
            clickX = event.clientX - gridRect.left
            clickY = event.clientY - gridRect.top
        } else {
            // Default to center if no event
            clickX = gridRect.width / 2
            clickY = gridRect.height / 2
        }

        // Calculate which cell was clicked
        const cellWidth = gridRect.width / gridSize.cols
        const cellHeight = gridRect.height / gridSize.rows

        const col = Math.floor(clickX / cellWidth)
        const row = Math.floor(clickY / cellHeight)

        const clampedCol = Math.max(0, Math.min(col, gridSize.cols - 1))
        const clampedRow = Math.max(0, Math.min(row, gridSize.rows - 1))

        const clickedIndex = clampedRow * gridSize.cols + clampedCol

        // Calculate new delays from clicked position
        const delays = calculateDelays(clickedIndex)

        // Update state to trigger new animation
        setCalculatedDelay(delays)
        setOriginIndex(clickedIndex)
        setAnimationKey((prev) => prev + 1)
        setHasBeenClicked(true)
        setShowAnimation(true)

        // Calculate animation completion time
        const maxDelay = Math.max(...delays)
        const springDuration = 0.6
        const totalAnimationTime = (maxDelay + springDuration) * 1000

        setTimeout(() => {
            setShowAnimation(false)
        }, totalAnimationTime + 1)
    }, [gridSize, calculateDelays, setCalculatedDelay, setOriginIndex, setAnimationKey, setHasBeenClicked, setShowAnimation]);
    // Global mouse press listener
    useEffect(() => {
        const handleGlobalMouseDown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest("button")) {
                const syntheticEvent = {
                    clientX: e.clientX,
                    clientY: e.clientY,
                } as React.MouseEvent
                triggerGridAnimation(syntheticEvent)
            }
        }

        document.addEventListener("mousedown", handleGlobalMouseDown)
        return () => document.removeEventListener("mousedown", handleGlobalMouseDown)
    }, [gridSize, triggerGridAnimation])

    const cells = useMemo(() =>
            Array.from({length: totalCells}, (_, index) => (
                <motion.div
                    className="cell bg-primary/60 rounded transition-colors duration-100 min-h-5 min-w-5"
                    variants={gridVariants}
                    transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 20,
                        delay: index === originIndex ? 0 : calculatedDelay[index],
                    }}
                    key={`${animationKey}-${index}`}
                />
            )),
        [totalCells, originIndex, calculatedDelay, animationKey]
    );

    return (
        <div className="relative min-h-screen">
            {/* Staggered Grid Overlay */}
            <motion.div
                ref={grid}
                className="fixed top-0 left-0 w-screen h-screen p-2.5 box-border pointer-events-none z-10"
                initial="hidden"
                animate={showAnimation && hasBeenClicked && originIndex !== null ? "visible" : "hidden"}
                key={animationKey}
                style={{
                    display: "grid",
                    gap: "1px",
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                }}
            >
                {cells}
            </motion.div>

            <div
                className="grid grid-cols-[1fr_400px] gap-8 items-center justify-center md:grid-cols-[1fr_200px] md:gap-3 min-h-screen relative z-20">
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

const gridVariants = {
    hidden: {opacity: 0, scale: 0.5},
    visible: {opacity: 1, scale: 1},
}

function getCenter(element: HTMLElement) {
    const {x, y, width, height} = element.getBoundingClientRect()
    return {x: x + width / 2, y: y + height / 2}
}
