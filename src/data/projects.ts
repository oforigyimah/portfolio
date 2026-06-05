export type Project = {
  name: string
  description: string
  url: string
  homepage?: string
  language: string
  stars: number
}

export const projects: Project[] = [
  {
    name: "sam-store",
    description:
      "Cash sales transformation engine — validate and normalize sale JSON into linked tables.",
    url: "https://github.com/oforigyimah/sam-store",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "agrapro",
    description: "Agricultural management platform for tracking crops, inputs, and operations.",
    url: "https://github.com/oforigyimah/agrapro_v0_1",
    homepage: "https://agrapro.vercel.app",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "words-portfolio",
    description: "Interactive words-themed portfolio showcasing creative front-end work.",
    url: "https://github.com/oforigyimah/words-portfolio",
    homepage: "https://words-portfolio.vercel.app",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "apphosting",
    description: "Application hosting utilities and deployment tooling.",
    url: "https://github.com/oforigyimah/apphosting",
    language: "TypeScript",
    stars: 0,
  },
  {
    name: "HO2",
    description: "Low-level systems project exploring C and hardware-adjacent programming.",
    url: "https://github.com/oforigyimah/HO2",
    language: "C",
    stars: 1,
  },
  {
    name: "portfolio",
    description: "Personal portfolio website — this site, built with React, Vite, and Motion.",
    url: "https://github.com/oforigyimah/portfolio",
    homepage: "https://portfolio-theta-ten-92t0w493i1.vercel.app",
    language: "TypeScript",
    stars: 0,
  },
]
