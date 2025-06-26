import {Nav} from "@/components/nav.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useStaggerAnimationTrigger} from "@/components/src/context/stagger-animation-context.tsx";


export function Header() {
    const {triggerAnimation} = useStaggerAnimationTrigger();

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        triggerAnimation(x, y);
    };
    return <header className="py-8 xl:py-12  text-white">
        <div className="container mx-auto flex items-center justify-between no-magnetic">
            {/*Logo*/}
            <a href="/" onClick={handleClick}>
                <h1 className="text-4xl font-semibold w-fit">
                    Ofori <span className="text-primary">.</span>
                </h1>
            </a>
            {/*    Desktop nav*/}
            <div className="hidden xl:flex gap-8">
                <Nav/>
                <a href="/contact" className="" onClick={handleClick}>
                    <Button>Hire me</Button>
                </a>
            </div>
            <div className="xl:hidden">mobile nav</div>
        </div>
    </header>
}