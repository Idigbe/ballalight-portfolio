'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';
import VerifyPermission from "@/components/ui/VerifyPermission";
import LetsConnect from '@/app/projects/LetsConnect';
import PrevLink from "@/app/projects/PrevLink";
import NextLink from "@/app/projects/NextLink";

export default function ProjectView({ project }: { project: any }) {
    const [isValidated, setIsValidated] = useState(false);

    useEffect(() => {
        setIsValidated(localStorage.getItem("isValidated") === "true");
    }, []);

    const verifyPS = (val: { verified: boolean }) => {
        if (val.verified) {
            localStorage.setItem("isValidated", "true");
            setIsValidated(true);
        }
    }

    // Helper for rendering sections
    const renderSection = (section: any, index: number) => {
        switch (section.type) {
            case 'gallery':
                return (
                    <div key={index} className="grid grid-cols-12 my-1 px-0 md:px-2">
                        <div className="grid col-span-12 px-0 md:px-2">
                            <h1 className='project-header md:project-header-md py-5 md:py-10'>{section.title}</h1>
                        </div>
                        {section.images?.map((img: any, i: number) => (
                            <div key={i} className={`grid col-span-${img.cols || 12} justify-items-center px-2 my-4`}>
                                <MotionImage
                                    isInView={false}
                                    xWidth="auto"
                                    xHeight="auto"
                                    imageSrc={img.src}
                                    alt={project.title}
                                />
                            </div>
                        ))}
                        {section.content && (
                            <div className="grid col-span-12 px-0 md:px-2 my-2">
                                <span className="project-text md:project-text-md">{section.content}</span>
                            </div>
                        )}
                        {(section.pros || section.cons) && (
                            <div className="grid grid-cols-12 col-span-12">
                                {section.pros && (
                                    <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2 md:pr-16">
                                        <p className="py-2 text-sm md:text-base font-medium pt-5">Pros:</p>
                                        <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                                            {section.pros.map((pro: string, i: number) => (
                                                <li key={i}>{pro}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                                {section.cons && (
                                    <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2">
                                        <p className="py-2 text-sm md:text-base font-medium pt-5">Cons:</p>
                                        <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                                            {section.cons.map((con: string, i: number) => (
                                                <li key={i}>{con}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 'text_block':
                return (
                    <div key={index} className="grid grid-cols-12 my-1 px-0 md:px-2">
                        <div className="grid col-span-12 px-0 md:px-2">
                            <h1 className='project-header md:project-header-md py-5 md:py-10'>{section.title}</h1>
                        </div>
                        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
                            <article className='project-text md:project-text-md'>{section.content}</article>
                        </div>
                        {section.image && (
                            <div className="grid col-span-12 md:col-span-6 justify-items-center px-0 md:px-2 my-2">
                                <MotionImage
                                    isInView={false}
                                    xWidth="auto"
                                    xHeight="auto"
                                    imageSrc={section.image}
                                    alt={section.title}
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const showContent = !project.passwordProtected || isValidated;

    return (
        <article className="pr-2 md:pr-0">
            <div className="flex flex-col items-center px-0 md:px-2 my-10">
                <h1 className='project-main-header md:project-main-header-md'>{project.title}</h1>
                <p className="project-main-sub md:project-main-sub-md">{project.subTitle}</p>
            </div>

            <div className="grid grid-cols-12 my-1 px-0 md:px-2">
                <div className="grid col-span-12 justify-items-center px-0 md:px-2 my-2">
                    <MotionImage
                        isInView={false}
                        xWidth="800"
                        xHeight="auto"
                        imageSrc={project.heroImage}
                        alt={project.title}
                        priority={true}
                    />
                </div>

                <div className="grid col-span-12 px-0 md:px-2">
                    <h1 className='project-header md:project-header-md py-5 md:py-10'>Overview</h1>
                </div>

                <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
                    <p className="py-2 project-title md:project-title-md">About</p>
                    <article className='project-text md:project-text-md'>{project.overview.about}</article>

                    <p className="py-2 project-title md:project-title-md">Challenge</p>
                    <article className='project-text md:project-text-md'>{project.overview.challenge}</article>

                    {project.overview.problemStatement && (
                        <>
                            <p className="py-2 project-title md:project-title-md">Problem Statement</p>
                            <article className='project-text md:project-text-md'>{project.overview.problemStatement}</article>
                        </>
                    )}
                </div>

                <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
                    <span className="project-title md:project-title-md">Role(s)</span>
                    <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                        {project.details.roles.map((role: string, i: number) => <li key={i}>{role}</li>)}
                    </ol>

                    <span className="project-title md:project-title-md">Designed For</span>
                    <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                        {project.details.designedFor.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ol>

                    <span className="project-title md:project-title-md">Responsibilities</span>
                    <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                        {project.details.responsibilities.map((resp: string, i: number) => <li key={i}>{resp}</li>)}
                    </ol>

                    <span className="project-title md:project-title-md">Tool(s)</span>
                    <div className="grid grid-cols-8 md:my-4 md:px-2">
                        <div className="grid col-span-12">
                            <MotionImage
                                isInView={false}
                                xWidth="400"
                                xHeight="auto"
                                imageSrc={project.details.toolsImage}
                                alt="Tools"
                                priority={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showContent ? (
                <>
                    {project.sections.map((section: any, index: number) => renderSection(section, index))}
                </>
            ) : (
                <div className="px-1 py-10">
                    <VerifyPermission onVerify={verifyPS} />
                </div>
            )}

            <div className="flex flex-row w-full justify-between my-4 md:px-2 mt-20">
                <PrevLink
                    link={project.prevProject.slug ? `/work/${project.prevProject.slug}` : "/work"}
                    isBack={!project.prevProject.slug}
                    projectTitle={project.prevProject.title}
                />
                <NextLink
                    link={project.nextProject.slug ? `/work/${project.nextProject.slug}` : "/work"}
                    isNext={!!project.nextProject.slug}
                    projectTitle={project.nextProject.title}
                />
            </div>
            <LetsConnect />
        </article>
    );
}
