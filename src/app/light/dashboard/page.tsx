'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Reorder } from "framer-motion";
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
    overview: any;
    details: any;
    sections: any[];
    prevProject: any;
    nextProject: any;
}

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Load projects and sort by order
        const sorted = [...initialProjectsData.projects].sort((a, b) => a.order - b.order);
        setProjects(sorted);
    }, []);

    const handleReorder = (newOrder: Project[]) => {
        const updated = newOrder.map((p, index) => ({
            ...p,
            order: index + 1
        }));
        setProjects(updated);
    };

    const handleToggleAuth = (id: string) => {
        setProjects(projects.map(p => 
            p.id === id ? { ...p, passwordProtected: !p.passwordProtected } : p
        ));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage("");

        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projects }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Changes published successfully!");
            } else {
                setMessage(`Error: ${data.error || "Failed to save"}`);
            }
        } catch (error) {
            setMessage("Failed to connect to server.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/light");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-10 font-sans">
            <header className="max-w-5xl mx-auto flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm">Manage portfolio projects and their display order</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all
                            ${isSaving ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'}
                        `}
                    >
                        {isSaving ? "Saving..." : "Publish Changes"}
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto">
                {message && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-4 rounded-xl mb-8 text-center text-sm font-bold border ${
                            message.includes("Error") ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-green-500/10 border-green-500/30 text-green-500"
                        }`}
                    >
                        {message}
                    </motion.div>
                )}

                <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-4 bg-white/5 grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 border-b border-white/5">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-5">Project Title</div>
                        <div className="col-span-3">Slug</div>
                        <div className="col-span-3 text-right">Access Control</div>
                    </div>

                    <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="divide-y divide-white/5">
                        {projects.map((project, index) => (
                            <Reorder.Item 
                                key={project.id} 
                                value={project}
                                className="p-4 grid grid-cols-12 gap-4 items-center bg-[#111] hover:bg-white/[0.02] transition-colors cursor-grab active:cursor-grabbing"
                            >
                                <div className="col-span-1 text-center text-gray-600 font-mono">{index + 1}</div>
                                <div className="col-span-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                                        <img src={project.mainImage} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-medium">{project.title}</span>
                                </div>
                                <div className="col-span-3 text-gray-500 font-mono text-sm">/{project.slug}</div>
                                <div className="col-span-3 text-right">
                                    <button 
                                        onClick={() => handleToggleAuth(project.id)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all
                                            ${project.passwordProtected 
                                                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' 
                                                : 'bg-green-500/10 text-green-500 border border-green-500/30'}
                                        `}
                                    >
                                        {project.passwordProtected ? "Protected" : "Public"}
                                    </button>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                <div className="mt-10 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-sm">
                    <h3 className="font-bold mb-2 text-blue-400">💡 Tip: Drag and Drop to Reorder</h3>
                    <p className="text-gray-400 leading-relaxed">
                        The order here matches the order on your <a href="/work" className="text-blue-400 underline" target="_blank">Work page</a>. 
                        Simply drag rows to rearrange them. Click "Publish Changes" to update the live site via GitHub.
                    </p>
                </div>
            </main>
        </div>
    );
}
