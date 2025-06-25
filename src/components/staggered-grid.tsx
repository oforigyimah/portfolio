import { useEffect, useRef, useState, type MouseEvent } from "react"
import * as motion from "motion/react-client"

/**
 * 3-step flow
 * step 0 – intro copy (clickable)
 * step 1 – physical-stagger animation
 * step 2 – follow-up content
 */
export function StaggeredGrid({
                                          baseDelay = 0.0008,
                                          noise = 0.1,
                                      }: {
    baseDelay?: number
    noise?: number
}) {
    const gridRef = useRef<HTMLDivElement>(null)

    /* UI state ------------------------------------------------------------- */
    const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 })
    const [originIdx, setOriginIdx] = useState<number | null>(null)
    const [delays, setDelays] = useState<number[]>([])
    const [animKey, setAnimKey] = useState(0)
    const [step, setStep] = useState<0 | 1 | 2>(0) // 0-intro,1-anim,2-content
    const [showAnim, setShowAnim] = useState(false)

    /* resize observer ------------------------------------------------------ */
    useEffect(() => {
        const updateGrid = () => {
            const cell = 60 // px
            const gap = 2
            const cols = Math.floor((window.innerWidth - gap) / (cell + gap))
            const rows = Math.floor((window.innerHeight - gap) / (cell + gap))
            setGridSize({ cols: Math.max(5, cols), rows: Math.max(5, rows) })
        }
        updateGrid()
        window.addEventListener("resize", updateGrid)
        return () => window.removeEventListener("resize", updateGrid)
    }, [])

    const total = gridSize.cols * gridSize.rows

    /* helpers -------------------------------------------------------------- */
    function cellCenter(el: HTMLElement) {
        const { x, y, width, height } = el.getBoundingClientRect()
        return { x: x + width / 2, y: y + height / 2 }
    }

    function buildDelays(start: number) {
        const cells = gridRef.current?.querySelectorAll(".cell")
        if (!cells) return []
        const origin = cellCenter(cells[start] as HTMLElement)
        const d: number[] = []
        cells.forEach((cell) => {
            const c = cellCenter(cell as HTMLElement)
            const dist = Math.hypot(c.x - origin.x, c.y - origin.y)
            d.push(dist * baseDelay + Math.random() * noise)
        })
        return d
    }

    /* click handler -------------------------------------------------------- */
    function handleIntroClick(e: MouseEvent<HTMLDivElement>) {
        if (step !== 0 || !gridRef.current) return
        const rect = gridRef.current.getBoundingClientRect()
        const col = Math.floor(((e.clientX - rect.left) / rect.width) * gridSize.cols)
        const row = Math.floor(((e.clientY - rect.top) / rect.height) * gridSize.rows)
        const idx = row * gridSize.cols + col

        const newDelays = buildDelays(idx)
        setOriginIdx(idx)
        setDelays(newDelays)
        setAnimKey((k) => k + 1)
        setStep(1)
        setShowAnim(true)

        /* work out when the last spring ends, then show next content */
        const maxDelay = Math.max(...newDelays)
        const springMs = 600
        const totalMs = maxDelay * 1000 + springMs + 300
        setTimeout(() => {
            setShowAnim(false)
            setStep(2)
        }, totalMs)
    }

    /* reset button --------------------------------------------------------- */
    function reset() {
        setStep(0)
        setShowAnim(false)
        setOriginIdx(null)
    }

    /* render grid cells ---------------------------------------------------- */
    const cells = Array.from({ length: total }, (_, i) => (
        <motion.div
            key={`${animKey}-${i}`}
            className="cell bg-white/20 rounded transition-colors duration-200 min-h-5 min-w-5 hover:bg-white/30"
            variants={variants}
            transition={{
                type: "spring",
                stiffness: 600,
                damping: 20,
                delay: i === originIdx ? 0 : delays[i],
            }}
        />
    ))

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
            {/* background stagger grid */}
            <motion.div
                ref={gridRef}
                key={animKey}
                initial="hidden"
                animate={showAnim ? "visible" : "hidden"}
                className="absolute inset-0 grid gap-2.5 p-2.5 -z-10 select-none"
                style={{
                    gridTemplateColumns: `repeat(${gridSize.cols},1fr)`,
                    gridTemplateRows: `repeat(${gridSize.rows},1fr)`,
                }}
            >
                {cells}
            </motion.div>

            {/* INTRO (step 0) --------------------------------------------------- */}
            <motion.div
                onClick={handleIntroClick}
                initial={{ opacity: 1 }}
                animate={{
                    opacity: step === 0 ? 1 : 0,
                    scale: step === 0 ? 1 : 0.9,
                }}
                transition={{ duration: 0.5 }}
                className="z-10 cursor-pointer text-center max-w-xl px-6"
            >
                {step === 0 && (
                    <>
                        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-white">Interactive Experience</h1>
                        <p className="text-white/80 text-lg">
                            Click anywhere on this text to trigger a physics-based stagger animation.
                        </p>
                    </>
                )}
            </motion.div>

            {/* FOLLOW-UP CONTENT (step 2) -------------------------------------- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: step === 2 ? 1 : 0,
                    scale: step === 2 ? 1 : 0.9,
                }}
                transition={{ duration: 0.6 }}
                className="z-10 text-center max-w-2xl px-6"
            >
                {step === 2 && (
                    <>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight text-white">Animation Complete</h2>
                        <p className="text-white/80 text-lg mb-8">
                            Each cell animated according to its distance from your click, creating a natural ripple effect.
                        </p>
                        <button
                            onClick={reset}
                            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                        >
                            Experience again
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    )
}

/* simple opacity-/scale variants for cells */
const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
}
