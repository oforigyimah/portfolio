import {PageHeading} from "@/components/page-heading.tsx"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Code2, Database, Globe, Layers} from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Responsive React and Next.js applications with clean UI, fast performance, and deployable to Vercel or custom infra.",
  },
  {
    icon: Database,
    title: "Data & APIs",
    description:
      "Backend services, JSON transformation pipelines, and database-backed tools — like validating and normalizing complex sale data.",
  },
  {
    icon: Layers,
    title: "Full-Stack Products",
    description:
      "End-to-end product builds from prototype to production, including auth, dashboards, and third-party integrations.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description:
      "52 public repos on GitHub. I ship iteratively, document well, and keep codebases maintainable for the long run.",
  },
]

export function ServicesPage() {
  return (
    <section className="min-h-[calc(100vh-8rem)] py-12 pb-20">
      <PageHeading
        eyebrow="What I do"
        title="Services"
        description="I help teams and founders turn ideas into working software — from front-end polish to backend logic."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="magnetic transition-colors hover:border-primary/40">
            <CardHeader>
              <service.icon className="mb-2 size-8 text-primary" />
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  )
}
