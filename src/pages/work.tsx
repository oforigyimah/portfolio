import {PageHeading} from "@/components/page-heading.tsx"
import {ProjectCard} from "@/components/project-card.tsx"
import {projects} from "@/data/projects.ts"

export function WorkPage() {
  return (
    <section className="min-h-[calc(100vh-8rem)] py-12 pb-20">
      <PageHeading
        eyebrow="Portfolio"
        title="Work"
        description={`${projects.length} open-source projects on GitHub — spanning TypeScript apps, data tooling, and systems work.`}
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
