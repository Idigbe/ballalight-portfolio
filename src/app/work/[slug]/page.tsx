import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import projectsData from '@/data/projects.json';
import ProjectView from './ProjectView';

// Static params for export (Server Side)
export async function generateStaticParams() {
    return projectsData.projects.map((project) => ({
        slug: project.slug,
    }));
}

// Raw legacy slugs — must match the folder names under /projects/
const RAW_LEGACY_COMPONENTS: Record<string, React.ComponentType<any>> = {
    bp: dynamic(() => import('@/projects/bp/page')),
    tt: dynamic(() => import('@/projects/tt/page')),
    ub: dynamic(() => import('@/projects/ub/page')),
    ds: dynamic(() => import('@/projects/ds/page')),
    ss: dynamic(() => import('@/projects/ss/page')),
    wz: dynamic(() => import('@/projects/wz/page')),
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Find project based on slug
    const project = projectsData.projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Raw legacy projects are rendered as-is, using their original handcrafted components
    if ((project as any).isRawLegacy) {
        const RawComponent = RAW_LEGACY_COMPONENTS[slug];
        if (RawComponent) {
            return <RawComponent />;
        }
    }

    return (
        <ProjectView project={project} />
    );
}

