import {PageHeading} from "@/components/page-heading.tsx"
import {profile} from "@/data/profile.ts"
import {Button} from "@/components/ui/button.tsx"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx"
import {Github, Globe, Mail, MapPin} from "lucide-react"

const links = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${profile.username}`,
    href: profile.github,
  },
  {
    icon: Globe,
    label: "Website",
    value: "ofori.dev",
    href: profile.website,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: undefined,
  },
]

export function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-8rem)] py-12 pb-20">
      <PageHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Open to freelance work, collaborations, and interesting projects. Reach out anytime."
      />

      <div className="grid max-w-3xl gap-6">
        {links.map((link) => (
          <Card key={link.label} className="magnetic">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              <link.icon className="size-5 text-primary" />
              <div>
                <CardTitle className="text-base">{link.label}</CardTitle>
                <CardDescription>{link.value}</CardDescription>
              </div>
            </CardHeader>
            {link.href && (
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {link.label === "Email" ? "Send email" : "Open link"}
                  </a>
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
