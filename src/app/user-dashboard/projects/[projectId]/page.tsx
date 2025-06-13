import { UserDashboardHeader } from "@/src/components/user-dashboard/dashboard-header"
import { DashboardShell } from "@/src/components/dashboard-shell"
import { ProjectDetails } from "@/src/components/user-dashboard/projects/project-details"
import { ProjectTasks } from "@/src/components/user-dashboard/projects/project-tasks"
import { ProjectMembers } from "@/src/components/user-dashboard/projects/project-members"
import { ProjectProgress } from "@/src/components/user-dashboard/projects/project-progress"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = params

  // In a real app, you would fetch the project data
  // const project = await getProject(projectId)
  // if (!project) notFound()

  // Mock project data
  const project = {
    id: projectId,
    name: "Website Redesign",
    description: "Redesign the company website with modern UI/UX principles",
    startDate: "2023-03-01",
    dueDate: "2023-06-30",
    status: "ONGOING",
  }

  return (
    <DashboardShell>
      <UserDashboardHeader heading={project.name} text={project.description} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProjectDetails project={project} />
        </div>
        <div>
          <ProjectProgress projectId={projectId} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProjectTasks projectId={projectId} />
        </div>
        <div>
          <ProjectMembers projectId={projectId} />
        </div>
      </div>
    </DashboardShell>
  )
}
