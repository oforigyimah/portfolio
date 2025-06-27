import {Nav} from "@/components/nav.tsx";
import {Button} from "@/components/ui/button.tsx";


export function Header() {

    return <header className="py-8 xl:py-12  text-white">
        <div className="container mx-auto flex items-center justify-between no-magnetic">
            {/*Logo*/}
            <a href="/" >
                <h1 className="text-4xl font-semibold w-fit">
                    Ofori <span className="text-primary">.</span>
                </h1>
            </a>
            {/*    Desktop nav*/}
            <div className="hidden xl:flex gap-8">
                <Nav/>
                <a href="/contact" className="">
                    <Button>Hire me</Button>
                </a>
            </div>
            <div className="xl:hidden">mobile nav</div>
        </div>
    </header>
}