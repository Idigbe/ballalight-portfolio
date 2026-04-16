import { notFound } from 'next/navigation';
import projectsData from '@/data/projects.json';
import ProjectView from './ProjectView';

// Static params for export (Server Side)
export async function generateStaticParams() {
    return projectsData.projects.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    
    // Find project based on slug
    const project = projectsData.projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <ProjectView project={project} />
    );
}
