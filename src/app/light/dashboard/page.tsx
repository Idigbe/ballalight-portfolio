'use client';

import { useState, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProjectEditor from "@/components/admin/ProjectEditor";
import initialProjectsData from "@/data/projects.json";

interface Project {
    id: string;
    slug: string;
    title: string;
    subTitle: string;
    mainImage: string;
    heroImage: string;
    order: number;
    passwordProtected?: boolean;
    isRawLegacy?: boolean;
    overview: {
        about: string;
        challenge: string;
        problemStatement?: string;
    };
    details: {
        roles: string[];
        designedFor: string[];
        responsibilities: string[];
        toolsImage: string;
    };
    sections: any[];
    prevProject: { slug: string; title: string };
    nextProject: { slug: string; title: string };
}

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const data = initialProjectsData as any;
        const sorted = [...data.projects].sort((a: any, b: any) => a.order - b.order);
        setProjects(sorted);
    }, []);

    const handleSave = async (updatedProject: Project, action: 'save' | 'publish') => {
        setMessage("");
        let updatedList;
        const exists = projects.find(p => p.id === updatedProject.id);
        if (exists) {
            updatedList = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        } else {
            updatedList = [...projects, updatedProject];
        }
        setProjects(updatedList);

        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    projects: updatedList,
                    action: action
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(action === 'save' ? "Draft saved locally! Preview updated." : "Changes published to GitHub!");
                if (action === 'publish') setEditingProject(null);
                setTimeout(() => setMessage(""), 4000);
            } else {
                setMessage(`Error: ${data.error || "Failed to save"}`);
            }
        } catch (error) {
            setMessage("Failed to connect to server.");
        }
    };

    const handleReorder = async (newOrder: Project[]) => {
        const updated = newOrder.map((p, i) => ({ ...p, order: i + 1 }));
        setProjects(updated);
        await fetch("/api/admin/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projects: updated, action: 'save' }),
        });
    };

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure? This will remove the project from the list.")) return;
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
        fetch("/api/admin/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projects: updated, action: 'save' }),
        });
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-100">
            <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter italic" style={{ color: '#0f172a' }}>Balla.CMS</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Portfolio Core v2.0</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6 lg:p-12">
                <AnimatePresence>
                    {message && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`p-4 rounded-2xl mb-8 text-center text-sm font-bold shadow-xl border-2 ${
                                message.includes("Error") ? "bg-white border-red-100 text-red-600" : "bg-white border-emerald-100 text-emerald-600"
                            }`}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span 
                                style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                                className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm"
                            >
                                Admin Console
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">v2.0 Stable</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter mb-2 text-slate-900" style={{ color: '#0f172a' }}>Projects Gallery</h2>
                        <p className="text-slate-400 font-bold text-lg max-w-xl leading-relaxed">Curate your professional narrative with precision and live preview.</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                        <button 
                            onClick={() => setEditingProject({
                                id: `proj-${Date.now()}`,
                                slug: "",
                                title: "",
                                subTitle: "",
                                mainImage: "",
                                heroImage: "",
                                order: projects.length + 1,
                                overview: { about: "", challenge: "" },
                                details: { roles: [], designedFor: [], responsibilities: [], toolsImage: "" },
                                sections: [],
                                prevProject: { slug: "", title: "" },
                                nextProject: { slug: "", title: "" }
                            })}
                            style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                            className="px-6 py-3 rounded-xl text-sm font-black hover:opacity-90 transition-all shadow-xl shadow-slate-100 active:scale-95 flex items-center gap-3 group whitespace-nowrap"
                        >
                            <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </div>
                            Create New Project
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
                    <div className="p-6 bg-slate-50/50 grid grid-cols-12 gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-gray-100">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-7 px-4">Case Study</div>
                        <div className="col-span-2">Access</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="divide-y divide-gray-50">
                        {projects.length === 0 ? (
                            <div className="p-20 text-center space-y-4">
                                <p className="text-slate-300 font-bold">Your gallery is currently empty.</p>
                                <button 
                                    onClick={() => setEditingProject({ id: `proj-${Date.now()}`, slug: "", title: "", subTitle: "", mainImage: "", heroImage: "", order: 1, overview: { about: "", challenge: "" }, details: { roles: [], designedFor: [], responsibilities: [], toolsImage: "" }, sections: [], prevProject: { slug: "", title: "" }, nextProject: { slug: "", title: "" }})}
                                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Start by creating your first project
                                </button>
                            </div>
                        ) : (
                            projects.map((project, index) => (
                                <Reorder.Item 
                                    key={project.id} 
                                    value={project}
                                    className={`p-6 grid grid-cols-12 gap-4 items-center transition-all cursor-grab active:cursor-grabbing group border-l-[6px] border-l-transparent hover:border-l-slate-900 ${
                                        index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                                    }`}
                                >
                                    <div className="col-span-1 text-center text-slate-300 font-mono font-bold text-lg">{index + 1}</div>
                                    <div className="col-span-7 flex items-center gap-6 px-4">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0 relative border border-slate-100 shadow-sm">
                                            {project.mainImage ? (
                                                <Image src={project.mainImage} alt="" fill className="object-cover unoptimized" unoptimized />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-extrabold text-slate-900 text-lg group-hover:translate-x-1 transition-transform">{project.title}</span>
                                            <span className="text-xs text-slate-400 font-mono italic">/work/{project.slug}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-1.5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${
                                            project.passwordProtected ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        }`}>
                                            {project.passwordProtected ? "Gated" : "Public"}
                                        </span>
                                        {project.isRawLegacy && (
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit bg-violet-50 text-violet-600 border border-violet-100">
                                                Raw Legacy
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-1">
                                        <a 
                                            href={`/work/${project.slug}`} 
                                            target="_blank"
                                            className="p-3 text-slate-300 hover:text-blue-500 transition-colors"
                                            title="Preview on localhost"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                        </a>
                                        <button 
                                            onClick={() => !project.isRawLegacy && setEditingProject(project)}
                                            className={`p-3 transition-colors ${
                                                project.isRawLegacy
                                                    ? 'text-slate-200 cursor-not-allowed'
                                                    : 'text-slate-300 hover:text-slate-900 cursor-pointer'
                                            }`}
                                            title={project.isRawLegacy ? "Raw Legacy — content is managed in the source file, not the CMS" : "Edit Project"}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(project.id)}
                                            className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                        </button>
                                    </div>
                                </Reorder.Item>
                            ))
                        )}
                    </Reorder.Group>
                </div>
                
                <div className="mt-12 p-8 rounded-3xl bg-blue-50/50 border border-blue-100 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900">Pro Tip: Workflow</h4>
                        <p className="text-sm text-blue-700/70">Click <strong>Save Draft</strong> inside any project to instantly see it on <code className="bg-blue-100 px-1 rounded text-blue-900">localhost:3000</code>. Only use <strong>Publish</strong> when you are ready to update the live website.</p>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {editingProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-md">
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="w-full md:max-w-[75%] h-full bg-white shadow-2xl overflow-hidden"
                        >
                            <ProjectEditor 
                                project={editingProject} 
                                onCancel={() => setEditingProject(null)} 
                                onSave={handleSave}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
