import {Link} from "react-router-dom"
import {ArrowRight, Github, MapPin} from "lucide-react"
import {profile} from "@/data/profile.ts"
import {Button} from "@/components/ui/button.tsx"
import {StatsBar} from "@/components/stats-bar.tsx"

export function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] flex-col justify-center gap-10 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-primary">
            Software Developer
          </p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl xl:text-6xl">
            Hi, I&apos;m {profile.displayName}
            <span className="text-primary">.</span>
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">{profile.tagline}</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            {profile.location} · {profile.bio}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/work">
                View my work
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        <div className="magnetic mx-auto flex flex-col items-center gap-6 lg:mx-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative size-48 rounded-full border-2 border-primary/50 object-cover sm:size-56"
            />
          </div>
          <div className="text-center">
            <p className="font-semibold">{profile.name}</p>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              ofori.dev
            </a>
          </div>
        </div>
      </div>

      <StatsBar />
    </section>
  )
}
