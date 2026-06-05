import {profile} from "@/data/profile.ts"

const stats = [
  {label: "Public repos", value: profile.stats.repos},
  {label: "Followers", value: profile.stats.followers},
  {label: "Following", value: profile.stats.following},
  {label: "On GitHub since", value: profile.joined},
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="magnetic rounded-xl border border-border/60 bg-card/50 px-4 py-3 text-center backdrop-blur-sm"
        >
          <p className="text-2xl font-semibold text-primary">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
