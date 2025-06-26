import {useStaggerAnimationTrigger} from "@/components/src/context/stagger-animation-context.tsx";

const links = [
      { name: "Home", path: "/" },
      { name: "services", path: "/services" },
      { name: "resume", path: "/resume" },
      { name: "work", path: "/work" },
      { name: "contact", path: "/contact" }
    ];

  export function Nav() {
    const { triggerAnimation } = useStaggerAnimationTrigger();
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      triggerAnimation(x, y);
    };
    // Use window.location.pathname directly
    const currentPath = window.location.pathname;

    return (
      <div className="flex gap-8">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`${currentPath === link.path ? "text-primary border-primary border-b-2" : ""} capitalize
             font-medium hover:text-primary magnetic}`}
            onClick={handleClick}
          >
            {link.name}
          </a>
        ))}
      </div>
    );
  }