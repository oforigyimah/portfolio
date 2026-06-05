export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-12 space-y-3">
      {eyebrow && (
        <p className="text-sm uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold sm:text-4xl">
        {title}
        <span className="text-primary">.</span>
      </h2>
      {description && (
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
