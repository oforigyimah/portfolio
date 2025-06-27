
const links = [
      { name: "Home", path: "/" },
      { name: "services", path: "/services" },
      { name: "resume", path: "/resume" },
      { name: "work", path: "/work" },
      { name: "contact", path: "/contact" }
    ];

  export function Nav() {
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
          >
            {link.name}
          </a>
        ))}
      </div>
    );
  }