import {profile} from "@/data/profile.ts"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            GitHub
          </a>
          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            ofori.dev
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-primary">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
