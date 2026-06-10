import { projects } from "@/lib/constants"
import ProjectContent from "./project-content"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function Page() {
  return <ProjectContent />
}
