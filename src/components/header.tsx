import {Link} from "react-router-dom"
import {Nav} from "@/components/nav.tsx"
import {MobileNav} from "@/components/mobile-nav.tsx"
import {Button} from "@/components/ui/button.tsx"

export function Header() {
  return (
    <header className="relative z-30 py-8 text-white xl:py-12">
      <div className="container mx-auto flex items-center justify-between no-magnetic">
        <Link to="/">
          <h1 className="text-4xl font-semibold w-fit">
            Ofori <span className="text-primary">.</span>
          </h1>
        </Link>

        <div className="hidden xl:flex gap-8">
          <Nav />
          <Link to="/contact">
            <Button>Hire me</Button>
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  )
}
