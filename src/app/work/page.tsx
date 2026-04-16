

import { MotionPortfolio } from '@/components/ui/MotionPortfolio';
import Pageheaders from '@/components/ui/Pageheaders';
import projectsData from '@/data/projects.json';

const Portfolio = () => {
    // Sort projects by the 'order' field
    const sortedProjects = [...projectsData.projects].sort((a, b) => a.order - b.order);

    return (
        <article className="pr-2 md:pr-0">
            <Pageheaders information={`My Work`} />
            <div className="grid grid-cols-12 my-1 ">
                {sortedProjects.map((project) => (
                    <MotionPortfolio
                        key={project.id}
                        link={`/work/${project.slug}`}
                        title={project.title}
                        subTitle={project.subTitle}
                        xWidth="auto"
                        xHeight="auto"
                        imageSrc={project.mainImage}
                        alt={project.title}
                    />
                ))}
            </div>
        </article>
    );
}

export default Portfolio;