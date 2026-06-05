import {Link} from "react-router-dom"
import {ArrowRight} from "lucide-react"
import {Hero} from "@/components/hero.tsx"
import {PageHeading} from "@/components/page-heading.tsx"
import {ProjectCard} from "@/components/project-card.tsx"
import {projects} from "@/data/projects.ts"
import {Button} from "@/components/ui/button.tsx"

export function HomePage() {
  const featured = projects.slice(0, 3)

  return (
    <>
      <Hero />
      <section className="pb-20">
        <PageHeading
          eyebrow="Featured"
          title="Selected work"
          description="A few projects pulled from my GitHub — full list on the work page."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link to="/work">
              See all projects
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
