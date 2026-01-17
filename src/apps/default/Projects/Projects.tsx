import './Projects.scss';
import ProjectsCard, { ProjectsCardProps } from './ProjectsCard/ProjectsCard';

export interface ProjectsProps {
  projects: ProjectsCardProps[];
}

function Projects({ projects }: ProjectsProps) {
  return (
    <div className="projects">
      {projects.map((project, index) => (
        <ProjectsCard
          key={index}
          title={project.title}
          description={project.description}
          coverImage={project.coverImage}
          badges={project.badges}
        />
      ))}
    </div>
  );
}

export default Projects;
