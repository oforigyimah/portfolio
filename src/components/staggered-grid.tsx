import * as motion from "motion/react-client"
import { useEffect, useRef, useState, useCallback } from "react"
import {useStaggerAnimationTrigger} from "@/components/src/context/stagger-animation-context.tsx";

export  function StaggeredGrid({
                                          baseDelay = 0.0008,
                                          noise = 0.1,
                                      }: {
    baseDelay?: number
    noise?: number
}) {
    const grid = useRef<HTMLDivElement>(null)
    const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 })
    const [originIndex, setOriginIndex] = useState<number | null>(null)
    const [calculatedDelay, setCalculatedDelay] = useState<number[]>([])
    const [animationKey, setAnimationKey] = useState(0)
    const [hasBeenClicked, setHasBeenClicked] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)
    const { lastClickPosition } = useStaggerAnimationTrigger()

    const totalCells = gridSize.cols * gridSize.rows

    const calculateDelays = useCallback((originIdx: number) => {
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
    }, [baseDelay, noise, totalCells])

    // Calculate grid size based on screen dimensions
    useEffect(() => {
        const calculateGridSize = () => {
            const cellSize = 80 // Minimum cell size in pixels
            const gap = 2 // Gap between cells

            const cols = Math.floor((window.innerWidth - gap) / (cellSize + gap))
            const rows = Math.floor((window.innerHeight - gap) / (cellSize + gap))

            setGridSize({
                cols: Math.max(5, cols), // Minimum 5 columns
                rows: Math.max(5, rows), // Minimum 5 rows
            })
        }

        calculateGridSize()
        window.addEventListener("resize", calculateGridSize)

        return () => window.removeEventListener("resize", calculateGridSize)
    }, [])

    useEffect(() => {
        if (lastClickPosition && grid.current) {
            const gridRect = grid.current.getBoundingClientRect()
            const clickX = lastClickPosition.x - gridRect.left
            const clickY = lastClickPosition.y - gridRect.top

            // Calculate which cell was clicked
            const cellWidth = gridRect.width / gridSize.cols
            const cellHeight = gridRect.height / gridSize.rows

            const col = Math.floor(clickX / cellWidth)
            const row = Math.floor(clickY / cellHeight)

            // Ensure we're within bounds
            const clampedCol = Math.max(0, Math.min(col, gridSize.cols - 1))
            const clampedRow = Math.max(0, Math.min(row, gridSize.rows - 1))

            const clickedIndex = clampedRow * gridSize.cols + clampedCol

            // Calculate new delays from clicked position
            const delays = calculateDelays(clickedIndex)

            // Update state to trigger new animation
            setCalculatedDelay(delays)
            setOriginIndex(clickedIndex)
            setAnimationKey((prev) => prev + 1) // Force re-animation
            setHasBeenClicked(true)
            setShowAnimation(true)

            // Calculate the maximum delay to know when animation completes
            const maxDelay = Math.max(...delays)
            const springDuration = 0.6 // Approximate spring animation duration
            const totalAnimationTime = (maxDelay + springDuration) * 1000

            // Fade out as soon as the stagger animation is complete
            setTimeout(() => {
                setShowAnimation(false)
            }, totalAnimationTime + 500)
        }
    }, [calculateDelays, gridSize.cols, gridSize.rows, lastClickPosition]);


    const cells = Array.from({ length: totalCells }, (_, index) => (
        <motion.div
            className="cell bg-white/20 rounded hover:bg-white/30 transition-colors duration-200 min-h-5 min-w-5"
            variants={variants}
            transition={{
                type: "spring",
                stiffness: 600,
                damping: 20,
                delay: index === originIndex ? 0 : calculatedDelay[index],
            }}
            key={`${animationKey}-${index}`} // Key includes animationKey to force re-mount
        />
    ))

    return (
        <div
            className="flex flex-col justify-center items-center w-screen h-screen gap-5 fixed top-0 left-0"
            style={{ zIndex: -1 }}
        >
            <motion.div
                ref={grid}
                className="grid gap-2.5 w-screen h-screen p-2.5 box-border"
                initial="hidden"
                animate={showAnimation && hasBeenClicked && originIndex !== null ? "visible" : "hidden"}
                key={animationKey}
                style={{
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
                }}
            >
                {cells}
            </motion.div>
        </div>
    );
}

const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
}

/**
 * ==============   Utils   ================
 */
function getCenter(element: HTMLElement) {
    const { x, y, width, height } = element.getBoundingClientRect()
    return { x: x + width / 2, y: y + height / 2 }
}
