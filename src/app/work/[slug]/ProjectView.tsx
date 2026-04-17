'use client';

import { useEffect, useState } from "react";
import LetsConnect from '@/app/projects/LetsConnect';
import PrevLink from "@/app/projects/PrevLink";
import NextLink from "@/app/projects/NextLink";
import ModularProjectView from "./ModularProjectView";

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

    const showContent = !project.passwordProtected || isValidated;

    return (
        <>
            <ModularProjectView project={project} showContent={showContent} verifyPS={verifyPS} />


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
        </>
    );
}
