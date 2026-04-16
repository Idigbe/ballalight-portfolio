'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const sorted = [...initialProjectsData.projects].sort((a, b) => a.order - b.order);
        setProjects(sorted);
    }, []);

    const handleSave = async (updatedProjects = projects) => {
        setIsSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projects: updatedProjects }),
            });

            if (res.ok) {
                setMessage("Changes published successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                const data = await res.json();
                setMessage(`Error: ${data.error || "Failed to save"}`);
            }
        } catch (error) {
            setMessage("Failed to connect to server.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCreateProject = () => {
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            slug: "new-project",
            title: "New Project",
            subTitle: "Project Subtitle",
            mainImage: "/assets/work/home/row-1/1.png",
            heroImage: "/assets/work/projects/bk-payment/bk-deposit-landing.jpg",
            order: projects.length + 1,
            passwordProtected: false,
            overview: { about: "", challenge: "", problemStatement: "" },
            details: { roles: [], designedFor: [], responsibilities: [], toolsImage: "" },
            sections: [],
            prevProject: { slug: "", title: "" },
            nextProject: { slug: "", title: "" }
        };
        setEditingProject(newProject);
    };

    const handleDeleteProject = (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            const updated = projects.filter(p => p.id !== id);
            setProjects(updated);
            handleSave(updated);
        }
    };

    const handleUpdateProject = (updated: Project) => {
        const exists = projects.find(p => p.id === updated.id);
        let updatedList;
        if (exists) {
            updatedList = projects.map(p => p.id === updated.id ? updated : p);
        } else {
            updatedList = [...projects, updated];
        }
        setProjects(updatedList);
        setEditingProject(null);
        handleSave(updatedList);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">Portfolio CMS</h1>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Local Instance</p>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleCreateProject}
                            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm"
                        >
                            + New Project
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                {message && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl mb-6 text-center text-sm font-bold shadow-sm border ${
                            message.includes("Error") ? "bg-red-50 border-red-100 text-red-600" : "bg-emerald-50 border-emerald-100 text-emerald-600"
                        }`}
                    >
                        {message}
                    </motion.div>
                )}

                {/* Main List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
                    <div className="p-4 bg-gray-50/50 grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-gray-200">
                        <div className="col-span-1 text-center">Order</div>
                        <div className="col-span-6">Project Details</div>
                        <div className="col-span-2">Slug</div>
                        <div className="col-span-3 text-right">Actions</div>
                    </div>

                    <Reorder.Group axis="y" values={projects} onReorder={(newOrder) => {
                        const updated = newOrder.map((p, i) => ({ ...p, order: i + 1 }));
                        setProjects(updated);
                        handleSave(updated);
                    }} className="divide-y divide-gray-100">
                        {projects.map((project, index) => (
                            <Reorder.Item 
                                key={project.id} 
                                value={project}
                                className="p-4 grid grid-cols-12 gap-4 items-center bg-white hover:bg-gray-50/50 transition-colors cursor-grab active:cursor-grabbing group"
                            >
                                <div className="col-span-1 text-center text-slate-300 font-mono font-bold">{index + 1}</div>
                                <div className="col-span-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative border border-gray-200">
                                        <Image src={project.mainImage} alt="" fill className="object-cover" unoptimized />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-slate-800">{project.title}</span>
                                        <span className="text-xs text-slate-400">{project.subTitle}</span>
                                    </div>
                                </div>
                                <div className="col-span-2 text-slate-400 font-mono text-xs">/{project.slug}</div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <button 
                                        onClick={() => setEditingProject(project)}
                                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                    </button>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
            </main>

            {/* Editor Modal */}
            <AnimatePresence>
                {editingProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm">
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold">Edit Project</h2>
                                <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                </button>
                            </div>
                            
                            <div className="flex-grow overflow-y-auto p-8 space-y-8">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Basic Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5">Project Title</label>
                                            <input 
                                                type="text" 
                                                value={editingProject.title} 
                                                onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5">URL Slug</label>
                                            <input 
                                                type="text" 
                                                value={editingProject.slug} 
                                                onChange={e => setEditingProject({...editingProject, slug: e.target.value})}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/5"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1.5">Subtitle</label>
                                        <input 
                                            type="text" 
                                            value={editingProject.subTitle} 
                                            onChange={e => setEditingProject({...editingProject, subTitle: e.target.value})}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-950/5"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <input 
                                            type="checkbox" 
                                            checked={editingProject.passwordProtected} 
                                            onChange={e => setEditingProject({...editingProject, passwordProtected: e.target.checked})}
                                            className="w-4 h-4 accent-slate-900"
                                        />
                                        <label className="text-sm font-medium">Password Protected Case Study</label>
                                    </div>
                                </div>

                                {/* Media */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project Assets</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5">Main Image (List)</label>
                                            <input 
                                                type="text" 
                                                value={editingProject.mainImage} 
                                                onChange={e => setEditingProject({...editingProject, mainImage: e.target.value})}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-[10px]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5">Hero Image (Header)</label>
                                            <input 
                                                type="text" 
                                                value={editingProject.heroImage} 
                                                onChange={e => setEditingProject({...editingProject, heroImage: e.target.value})}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg font-mono text-[10px]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Overview */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Overview Text</h3>
                                    <div>
                                        <label className="block text-xs font-bold mb-1.5">About</label>
                                        <textarea 
                                            rows={3}
                                            value={editingProject.overview.about} 
                                            onChange={e => setEditingProject({...editingProject, overview: {...editingProject.overview, about: e.target.value}})}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold mb-1.5">Challenge</label>
                                        <textarea 
                                            rows={3}
                                            value={editingProject.overview.challenge} 
                                            onChange={e => setEditingProject({...editingProject, overview: {...editingProject.overview, challenge: e.target.value}})}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="pt-8 border-t border-gray-100">
                                    <button 
                                        onClick={() => handleUpdateProject(editingProject)}
                                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                    >
                                        Update Project
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-200 text-center">
                <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Balla Light Design • Local CMS v2.0</p>
            </footer>
        </div>
    );
}
