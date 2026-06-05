import {useState} from "react"
import {Link} from "react-router-dom"
import {Menu, X} from "lucide-react"
import {Nav} from "@/components/nav.tsx"
import {Button} from "@/components/ui/button.tsx"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="xl:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {open && (
        <div className="absolute right-4 top-20 z-50 w-56 rounded-xl border border-border bg-card p-4 shadow-lg">
          <div className="flex flex-col gap-4" onClick={() => setOpen(false)}>
            <Nav vertical />
            <Link to="/contact">
              <Button className="w-full">Hire me</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
