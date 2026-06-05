import {Link, useLocation} from "react-router-dom"
import {cn} from "@/lib/utils.ts"

const links = [
  {name: "Home", path: "/"},
  {name: "services", path: "/services"},
  {name: "resume", path: "/resume"},
  {name: "work", path: "/work"},
  {name: "contact", path: "/contact"},
]

export function Nav({vertical = false}: {vertical?: boolean}) {
  const {pathname} = useLocation()

  return (
    <nav className={cn("flex", vertical ? "flex-col gap-4" : "gap-8")}>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "capitalize font-medium hover:text-primary magnetic transition-colors",
            pathname === link.path && "text-primary border-primary border-b-2",
            vertical && "border-b-0"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
