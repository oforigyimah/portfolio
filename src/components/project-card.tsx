import {ExternalLink, Github, Star} from "lucide-react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Button} from "@/components/ui/button.tsx"
import type {Project} from "@/data/projects.ts"

export function ProjectCard({project}: {project: Project}) {
  return (
    <Card className="magnetic h-full transition-colors hover:border-primary/40">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{project.name}</CardTitle>
          {project.stars > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-3.5 fill-primary text-primary" />
              {project.stars}
            </span>
          )}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="inline-flex rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">
          {project.language}
        </span>
      </CardContent>
      <CardFooter className="mt-auto gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <Github />
            Code
          </a>
        </Button>
        {project.homepage && (
          <Button size="sm" asChild>
            <a href={project.homepage} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              Live
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
