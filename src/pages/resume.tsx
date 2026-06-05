import {PageHeading} from "@/components/page-heading.tsx"
import {profile} from "@/data/profile.ts"

export function ResumePage() {
  return (
    <section className="min-h-[calc(100vh-8rem)] py-12 pb-20">
      <PageHeading
        eyebrow="Background"
        title="Resume"
        description="Skills and experience drawn from my GitHub activity and shipped projects."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">About</h3>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m {profile.name}, a developer based in {profile.location}. I&apos;ve been
            building on GitHub since {profile.joined}, with {profile.stats.repos} public
            repositories covering web apps, data tooling, and low-level C work.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I enjoy shipping real products — from agricultural platforms and portfolio sites to
            sales data engines — and keeping the code open whenever I can.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="magnetic rounded-md border border-border bg-card px-3 py-1.5 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <h3 className="text-xl font-semibold">Highlights</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="border-l-2 border-primary pl-4">
              <strong className="text-foreground">sam-store</strong> — Built a cash sales
              transformation engine to validate and normalize JSON into relational tables.
            </li>
            <li className="border-l-2 border-primary pl-4">
              <strong className="text-foreground">agrapro</strong> — Shipped an agricultural
              management web app deployed at agrapro.vercel.app.
            </li>
            <li className="border-l-2 border-primary pl-4">
              <strong className="text-foreground">Open source</strong> — {profile.stats.followers}{" "}
              GitHub followers across TypeScript, JavaScript, C, Python, and Shell projects.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
