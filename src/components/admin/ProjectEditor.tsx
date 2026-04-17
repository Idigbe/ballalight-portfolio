'use client';

import { useState, useRef, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { 
    ssr: false,
    loading: () => <div className="h-40 w-full bg-gray-50 animate-pulse rounded-lg" />
});
import "react-quill/dist/quill.snow.css";

interface ProjectEditorProps {
    project: any;
    onSave: (updated: any, action: 'save' | 'publish') => void;
    onCancel: () => void;
}

export default function ProjectEditor({ project: initialProject, onSave, onCancel }: ProjectEditorProps) {
    const [project, setProject] = useState(JSON.parse(JSON.stringify(initialProject)));
    const [isUploading, setIsUploading] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'info' | 'details' | 'sections' | 'advanced'>('info');
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleUpload = async (file: File, subFolder: string = '') => {
        if (!project.slug || project.slug.trim() === '') {
            alert("⚠️ Please enter a 'Unique Slug' for this project in the Info tab before uploading images. Images must be stored under the project's specific folder path.");
            return null;
        }

        setIsUploading(`${subFolder}-${file.name}`);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('slug', project.slug);
        formData.append('subFolder', subFolder);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.path) return data.path;
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setIsUploading(null);
        }
        return null;
    };

    const handleImageUpload = async (e: any, type: string) => {
        e.preventDefault();
        const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (file) {
            const path = await handleUpload(file);
            if (path) setProject({ ...project, [type]: path });
        }
    };

    const handleSectionImageUpload = async (e: any, index: number) => {
        e.preventDefault();
        const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (file) {
            const path = await handleUpload(file, `section-${index}`);
            if (path) {
                const updated = [...project.sections];
                updated[index].image = path;
                setProject({ ...project, sections: updated });
            }
        }
    };

    const handleGalleryImageUpload = async (e: any, index: number, imgIdx: number) => {
        e.preventDefault();
        const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
        if (file) {
            const path = await handleUpload(file, `section-${index}`);
            if (path) {
                const updated = [...project.sections];
                updated[index].images[imgIdx].src = path;
                setProject({ ...project, sections: updated });
            }
        }
    };

    const addSection = (type: 'text_block' | 'gallery' | 'grid_block') => {
        const newSection = type === 'text_block' 
            ? { type, title: "New Section", content: "" }
            : type === 'gallery'
            ? { type, title: "New Gallery", images: [] }
            : { type, title: "New Card Grid", cards: [{ title: "New Card", description: "" }] };
        setProject({ ...project, sections: [...project.sections, newSection] });
    };

    const removeSection = (index: number) => {
        const updated = [...project.sections];
        updated.splice(index, 1);
        setProject({ ...project, sections: updated });
    };

    const handleSave = (action: 'save' | 'publish') => {
        const payload = JSON.parse(JSON.stringify(project));
        if (payload.details) {
            ['designedFor', 'roles', 'services', 'responsibilities'].forEach(key => {
                if (Array.isArray(payload.details[key])) {
                    payload.details[key] = payload.details[key]
                        .map((s: string) => s.trim())
                        .filter((s: string) => s !== "");
                }
            });
        }
        onSave(payload, action);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Inner Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter italic" style={{ color: '#0f172a' }}>Balla.CMS</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">Portfolio Core v2.0</p>
                        </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => handleSave('save')}
                        style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#e2e8f0' }}
                        className="px-6 py-2 border rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                    >
                        Save Draft
                    </button>
                    <button 
                        onClick={() => handleSave('publish')}
                        style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                        className="px-6 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-sm shadow-slate-200"
                    >
                        Publish changes
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex px-8 border-b border-gray-100 gap-8">
                {['info', 'details', 'sections', 'advanced'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${
                            activeTab === tab ? "border-slate-900 text-slate-900 !text-slate-900" : "border-transparent text-slate-300 hover:text-slate-500"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                <div className="max-w-6xl mx-auto space-y-12 pb-20">
                    
                    {/* INFO TAB */}
                    {activeTab === 'info' && (
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Header Information</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Display Title</label>
                                        <input 
                                            type="text" 
                                            value={project.title || ""} 
                                            onChange={e => setProject({...project, title: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-slate-200 rounded-xl text-sm font-medium transition-all outline-none"
                                            placeholder="e.g. BetKing - Payments"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Unique Slug</label>
                                        <input 
                                            type="text" 
                                            value={project.slug || ""} 
                                            onChange={e => setProject({...project, slug: e.target.value})}
                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-slate-200 rounded-xl text-sm font-medium transition-all outline-none font-mono"
                                            placeholder="e.g. bk-payments"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Project Description (Tagline)</label>
                                    <textarea 
                                        value={project.description || project.subTitle || ""} 
                                        onChange={e => setProject({...project, description: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-slate-200 rounded-xl text-sm font-medium transition-all outline-none resize-none h-32"
                                        placeholder="Paste your long editorial tagline here from Figma (e.g. End-to-end product design...)"
                                    />
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Visibility</h3>
                                <div className="p-6 bg-slate-50/50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Password Protection</p>
                                        <p className="text-xs text-slate-400">Require the secret case study PIN to view this project.</p>
                                    </div>
                                    <button 
                                        onClick={() => setProject({...project, passwordProtected: !project.passwordProtected})}
                                        style={{ backgroundColor: project.passwordProtected ? '#0f172a' : '#e2e8f0' }}
                                        className="w-12 h-6 rounded-full transition-all flex items-center p-1 border border-slate-200/50 relative"
                                    >
                                        <span 
                                            style={{ backgroundColor: '#ffffff', transform: project.passwordProtected ? 'translateX(24px)' : 'translateX(0)' }}
                                            className="w-4 h-4 rounded-full shadow-md transition-transform" 
                                        />
                                    </button>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Main Assets</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Hero Image Upload */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold text-slate-700 flex justify-between">
                                            Hero Image
                                            <span className="text-[9px] text-slate-400">(Header Header Image)</span>
                                        </label>
                                        <div className="group relative aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden hover:border-slate-200 transition-all cursor-pointer">
                                            {project.heroImage ? (
                                                <Image src={project.heroImage} alt="" fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 group-hover:-translate-y-1 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                                    <span className="text-xs font-black tracking-tight text-slate-400">Drop Hero Image</span>
                                                    <span className="text-[10px] opacity-50 underline text-slate-300">or Browse Files</span>
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, 'heroImage')} />
                                        </div>
                                    </div>

                                    {/* List Image Upload */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-slate-700">List Image</label>
                                            <span className="text-[10px] text-slate-400 font-mono">(Thumbnail)</span>
                                        </div>
                                        <div 
                                            onDragOver={e => e.preventDefault()}
                                            onDrop={e => handleImageUpload(e, 'mainImage')}
                                            className="group relative aspect-video rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center text-slate-300 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-600 transition-all cursor-pointer overflow-hidden shadow-inner"
                                        >
                                            {project.mainImage ? (
                                                <Image src={project.mainImage} alt="" fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 group-hover:-translate-y-1 transition-transform">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                                    <span className="text-xs font-black tracking-tight text-slate-400">Drop List Image</span>
                                                    <span className="text-[10px] opacity-50 underline text-slate-300">or Browse Files</span>
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, 'mainImage')} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Overview</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">About the Project</label>
                                        {mounted && (
                                            <ReactQuill 
                                                key="about-editor"
                                                theme="snow" 
                                                value={project.overview.about} 
                                                onChange={val => {
                                                    if (val !== project.overview.about) {
                                                        setProject({...project, overview: {...project.overview, about: val}});
                                                    }
                                                }}
                                                className="rounded-2xl overflow-hidden border border-slate-100 bg-gray-50/30"
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">The Challenge</label>
                                        {mounted && (
                                            <ReactQuill 
                                                key="challenge-editor"
                                                theme="snow" 
                                                value={project.overview.challenge} 
                                                onChange={val => {
                                                    if (val !== project.overview.challenge) {
                                                        setProject({...project, overview: {...project.overview, challenge: val}});
                                                    }
                                                }}
                                                className="rounded-2xl overflow-hidden border border-slate-100 bg-gray-50/30"
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">The Problem Statement</label>
                                        {mounted && (
                                            <ReactQuill 
                                                key="problem-editor"
                                                theme="snow" 
                                                value={project.overview.problemStatement || ""} 
                                                onChange={val => {
                                                    if (val !== project.overview.problemStatement) {
                                                        setProject({...project, overview: {...project.overview, problemStatement: val}});
                                                    }
                                                }}
                                                className="rounded-2xl overflow-hidden border border-slate-100 bg-gray-50/30"
                                            />
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* DETAILS TAB */}
                    {activeTab === 'details' && (
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project Metadata</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Company / Client</label>
                                        <input 
                                            type="text" 
                                            value={project.details?.designedFor?.join(",") || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), designedFor: e.target.value.split(",")}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm"
                                            placeholder="Personal Project, Google"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Product Name (Optional)</label>
                                        <input 
                                            type="text" 
                                            value={project.details?.productName || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), productName: e.target.value}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm"
                                            placeholder="Momentum, Yawa-Learn"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">My Role / Type</label>
                                        <input 
                                            type="text" 
                                            value={project.details?.roles?.join(",") || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), roles: e.target.value.split(",")}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm"
                                            placeholder="AI Product Designer + Builder"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Platform</label>
                                        <input 
                                            type="text" 
                                            value={project.details?.platform || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), platform: e.target.value}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm"
                                            placeholder="Web (mobile-responsive)"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Timeline</label>
                                        <input 
                                            type="text" 
                                            value={project.details?.timeline || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), timeline: e.target.value}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm"
                                            placeholder="2026"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">Services / Tags (comma separated)</label>
                                        <textarea 
                                            value={project.details?.services?.join(",") || ""} 
                                            onChange={e => setProject({...project, details: {...(project.details || {}), services: e.target.value.split(",")}})}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm min-h-[100px] resize-none"
                                            placeholder="Product Strategy, UX Research, UI Design"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700">Key Responsibilities (Legacy)</label>
                                    <textarea 
                                        value={project.details?.responsibilities?.join(",") || ""} 
                                        onChange={e => setProject({...project, details: {...(project.details || {}), responsibilities: e.target.value.split(",")}})}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm min-h-[100px] resize-none"
                                        placeholder="UX Audit, Design System, Prototyping"
                                    />
                                </div>
                            </section>

                            <section className="space-y-4 pt-6 border-t border-gray-100">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tools & Stack</h3>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-700">Tools Logo Grid (Overlay)</label>
                                    <div className="group relative h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden hover:border-slate-200 transition-all cursor-pointer">
                                        {project.details?.toolsImage ? (
                                            <Image src={project.details.toolsImage} alt="" fill className="object-contain p-4 transition-transform group-hover:scale-105" unoptimized />
                                        ) : (
                                            <div className="flex flex-col items-center gap-1 group-hover:-translate-y-1 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M7 7h10v10H7z"/></svg>
                                                <span className="text-[10px] font-bold text-slate-400">Upload Tools Logos</span>
                                            </div>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleImageUpload(e, 'details.toolsImage')} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                    {activeTab === 'sections' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                            <section className="space-y-6">
                                <div className="sticky top-0 z-50 -mx-8 px-8 py-6 bg-white/95 backdrop-blur border-b border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Architect</h3>
                                        <p className="text-[20px] font-bold text-slate-900 tracking-tight mt-1">Modular Block Builder</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                const newSections = [...(project.sections || [])];
                                                newSections.push({ type: 'text', title: '', content: '' });
                                                setProject({ ...project, sections: newSections });
                                            }}
                                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-plus text-[10px]"></i> Text Section
                                        </button>

                                        <button 
                                            onClick={() => {
                                                const newSections = [...(project.sections || [])];
                                                newSections.push({ 
                                                    type: 'cards', 
                                                    title: '', 
                                                    content: '', 
                                                    items: [{},{},{},{}],
                                                    insight: "" 
                                                });
                                                setProject({ ...project, sections: newSections });
                                            }}
                                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-layer-group text-[10px]"></i> Feature Grid
                                        </button>
                                        <button 
                                            onClick={() => {
                                                const newSections = [...(project.sections || [])];
                                                newSections.push({ 
                                                    type: 'numbered_list', 
                                                    title: '', 
                                                    label: '',
                                                    content: '', 
                                                    items: [{title: "", content: ""}, {title: "", content: ""}, {title: "", content: ""}, {title: "", content: ""}, {title: "", content: ""}, {title: "" ,content: ""}]
                                                });
                                                setProject({ ...project, sections: newSections });
                                            }}
                                            className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-bold hover:bg-purple-100 transition-all flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-list-ol text-[10px]"></i> Roles/Steps
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {(project.sections || []).length === 0 ? (
                                        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50/50">
                                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                                                <i className="fa-solid fa-shapes text-slate-300 text-2xl"></i>
                                            </div>
                                            <p className="text-sm font-bold text-slate-400">No content blocks yet</p>
                                            <p className="text-[10px] text-slate-300 uppercase tracking-widest mt-2">Add your first section to tell your story</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {(project.sections || []).map((section: any, idx: number) => (
                                                <div key={idx} className="p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm space-y-8 relative group">
                                                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                                                        <div className="flex items-center gap-4">
                                                            <div 
                                                                style={{ backgroundColor: '#0f172a', color: 'white' }}
                                                                className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold shadow-lg shadow-slate-200"
                                                            >
                                                                {idx + 1}
                                                            </div>
                                                            <div>
                                                                <select 
                                                                    value={section.type}
                                                                    onChange={e => {
                                                                        const newSections = [...project.sections];
                                                                        newSections[idx] = { ...newSections[idx], type: e.target.value };
                                                                        setProject({ ...project, sections: newSections });
                                                                    }}
                                                                    className="bg-transparent font-black text-xs uppercase text-slate-900 focus:outline-none cursor-pointer hover:underline"
                                                                >
                                                                    <option value="text">Text Narrative Block</option>
                                                                    <option value="metrics">Figma Metrics Grid</option>
                                                                    <option value="cards">Feature Grid (Persona Cards)</option>
                                                                    <option value="numbered_list">Numbered List (Role & Responsibilities)</option>
                                                                    <option value="showcase_grid">Showcase Grid (Key Screens)</option>
                                                                    <option value="tags_grid">Tags Grid (Tools & Technologies)</option>
                                                                    <option value="table">Table Layout (Key-Value Rows)</option>
                                                                    <option value="tagged_list">Tagged List (Feature List)</option>
                                                                </select>
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">Section Type</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
                                                            <button 
                                                                disabled={idx === 0}
                                                                onClick={() => {
                                                                    const newSections = [...project.sections];
                                                                    const temp = newSections[idx];
                                                                    newSections[idx] = newSections[idx-1];
                                                                    newSections[idx-1] = temp;
                                                                    setProject({ ...project, sections: newSections });
                                                                }}
                                                                className="p-2.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 disabled:opacity-20 transition-all"
                                                            >
                                                                <i className="fa-solid fa-arrow-up text-xs"></i>
                                                            </button>
                                                            <button 
                                                                disabled={idx === project.sections.length - 1}
                                                                onClick={() => {
                                                                    const newSections = [...project.sections];
                                                                    const temp = newSections[idx];
                                                                    newSections[idx] = newSections[idx+1];
                                                                    newSections[idx+1] = temp;
                                                                    setProject({ ...project, sections: newSections });
                                                                }}
                                                                className="p-2.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 disabled:opacity-20 transition-all"
                                                            >
                                                                <i className="fa-solid fa-arrow-down text-xs"></i>
                                                            </button>
                                                            <div className="w-[1px] h-4 bg-slate-200 mx-1"></div>
                                                            <button 
                                                                onClick={() => {
                                                                    const newSections = project.sections.filter((_: any, i: number) => i !== idx);
                                                                    setProject({ ...project, sections: newSections });
                                                                }}
                                                                className="p-2.5 hover:bg-red-50 text-red-300 hover:text-red-500 rounded-lg transition-all"
                                                            >
                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-end pl-1">
                                                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section Header Title (Figma Match)</label>
                                                                <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            ns[idx] = { ...ns[idx], titleStyle: 'header' };
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${section.titleStyle !== 'label' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                                                    >
                                                                        Header
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            ns[idx] = { ...ns[idx], titleStyle: 'label' };
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${section.titleStyle === 'label' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                                                    >
                                                                        Label
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <input 
                                                                type="text"
                                                                value={section.title || ""}
                                                                onChange={e => {
                                                                    const newSections = [...project.sections];
                                                                    newSections[idx] = { ...newSections[idx], title: e.target.value };
                                                                    setProject({ ...project, sections: newSections });
                                                                }}
                                                                className={`w-full px-6 py-4 bg-gray-50/50 rounded-2xl border border-transparent focus:border-slate-200 focus:bg-white transition-all tracking-tight ${section.titleStyle === 'label' ? 'text-[14px] font-semibold uppercase tracking-[1.4px]' : 'text-[20px] font-semibold'}`}
                                                                placeholder="e.g. Scale and Context"
                                                            />
                                                        </div>

                                                        {section.type === 'text' ? (
                                                            <div className="space-y-6">
                                                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        id={`isHighlight-${idx}`}
                                                                        checked={section.isHighlight || false}
                                                                        onChange={e => {
                                                                            const newSections = [...project.sections];
                                                                            newSections[idx] = { ...newSections[idx], isHighlight: e.target.checked };
                                                                            setProject({ ...project, sections: newSections });
                                                                        }}
                                                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                    <label htmlFor={`isHighlight-${idx}`} className="text-xs font-bold text-slate-600 cursor-pointer">
                                                                        Enable Editorial Highlight Style (Grey Box + Border)
                                                                    </label>
                                                                </div>
                                                                <div className="space-y-1.5">
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Narrative Content</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`section-editor-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.content || ""}
                                                                                onChange={val => {
                                                                                    if (val !== section.content) {
                                                                                        const newSections = [...project.sections];
                                                                                        newSections[idx] = { ...newSections[idx], content: val };
                                                                                        setProject({ ...project, sections: newSections });
                                                                                    }
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'cards' ? (
                                                            <div className="space-y-12">
                                                                <div className="space-y-4">
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Introduction Narrative</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`card-narrative-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.content || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    {(section.items || []).map((card: any, iIdx: number) => (
                                                                        <div key={iIdx} className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100 space-y-6 relative group/card">
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Persona {iIdx + 1}</span>
                                                                                <input 
                                                                                    placeholder="LABEL"
                                                                                    value={card.label || ""}
                                                                                    onChange={e => {
                                                                                        const ns = [...project.sections];
                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                        ni[iIdx] = { ...ni[iIdx], label: e.target.value };
                                                                                        ns[idx].items = ni;
                                                                                        setProject({ ...project, sections: ns });
                                                                                    }}
                                                                                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold uppercase outline-none"
                                                                                />
                                                                            </div>

                                                                            <div className="space-y-4">
                                                                                <div className="space-y-1">
                                                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Card Title</p>
                                                                                    <input 
                                                                                        value={card.title || ""}
                                                                                        onChange={e => {
                                                                                            const ns = [...project.sections];
                                                                                            const ni = [...(ns[idx].items || [])];
                                                                                            ni[iIdx] = { ...ni[iIdx], title: e.target.value };
                                                                                            ns[idx].items = ni;
                                                                                            setProject({ ...project, sections: ns });
                                                                                        }}
                                                                                        className="w-full px-4 py-2 bg-white rounded-xl text-xs font-bold outline-none"
                                                                                        placeholder="Persona Title"
                                                                                    />
                                                                                </div>

                                                                                <div className="space-y-1">
                                                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Card Content</p>
                                                                                    <textarea 
                                                                                        value={card.content || ""}
                                                                                        onChange={e => {
                                                                                            const ns = [...project.sections];
                                                                                            const ni = [...(ns[idx].items || [])];
                                                                                            ni[iIdx] = { ...ni[iIdx], content: e.target.value };
                                                                                            ns[idx].items = ni;
                                                                                            setProject({ ...project, sections: ns });
                                                                                        }}
                                                                                        className="w-full px-4 py-2 bg-white rounded-xl text-[11px] font-medium resize-none min-h-[100px] outline-none"
                                                                                        placeholder="Persona details..."
                                                                                    />
                                                                                </div>

                                                                                <div className="space-y-1">
                                                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Visual (D&D Image)</p>
                                                                                    {card.image ? (
                                                                                        <div className="relative rounded-xl overflow-hidden group/img aspect-video">
                                                                                            <img src={card.image} alt="" className="w-full h-full object-cover" />
                                                                                            <button 
                                                                                                onClick={() => {
                                                                                                    const ns = [...project.sections];
                                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                                    ni[iIdx] = { ...ni[iIdx], image: "" };
                                                                                                    ns[idx].items = ni;
                                                                                                    setProject({ ...project, sections: ns });
                                                                                                }}
                                                                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-all shadow-lg"
                                                                                            >
                                                                                                <i className="fa-solid fa-trash-can text-[10px]"></i>
                                                                                            </button>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div 
                                                                                            onDragOver={e => e.preventDefault()}
                                                                                            onDrop={async e => {
                                                                                                e.preventDefault();
                                                                                                const file = e.dataTransfer.files[0];
                                                                                                if (file) {
                                                                                                    const path = await handleUpload(file, `persona-${idx}-${iIdx}`);
                                                                                                    if (path) {
                                                                                                        const ns = [...project.sections];
                                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                                        ni[iIdx] = { ...ni[iIdx], image: path };
                                                                                                        ns[idx].items = ni;
                                                                                                        setProject({ ...project, sections: ns });
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                            onClick={() => {
                                                                                                const input = document.createElement('input');
                                                                                                input.type = 'file';
                                                                                                input.accept = 'image/*';
                                                                                                input.onchange = async (e: any) => {
                                                                                                    const file = e.target.files[0];
                                                                                                    if (file) {
                                                                                                        const path = await handleUpload(file, `persona-${idx}-${iIdx}`);
                                                                                                        if (path) {
                                                                                                            const ns = [...project.sections];
                                                                                                            const ni = [...(ns[idx].items || [])];
                                                                                                            ni[iIdx] = { ...ni[iIdx], image: path };
                                                                                                            ns[idx].items = ni;
                                                                                                            setProject({ ...project, sections: ns });
                                                                                                        }
                                                                                                    }
                                                                                                };
                                                                                                input.click();
                                                                                            }}
                                                                                            className="w-full h-[100px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-slate-300 hover:bg-white cursor-pointer transition-all"
                                                                                        >
                                                                                            <i className="fa-solid fa-cloud-arrow-up text-slate-400 text-xs"></i>
                                                                                            <p className="text-[9px] font-bold text-slate-400">Drag image here</p>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <button 
                                                                                onClick={() => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover/card:opacity-100"
                                                                            >
                                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            const ni = [...(ns[idx].items || [])];
                                                                            ni.push({ title: "", content: "", label: "", image: "" });
                                                                            ns[idx].items = ni;
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className="w-full py-8 border-2 border-dashed border-slate-100 rounded-[32px] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2"
                                                                    >
                                                                        <i className="fa-solid fa-plus text-xs"></i> Add New Persona Card
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'showcase_grid' ? (
                                                            <div className="space-y-8">
                                                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Grid Layout Style</label>
                                                                    <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
                                                                        <button 
                                                                            onClick={() => {
                                                                                const ns = [...project.sections];
                                                                                ns[idx] = { ...ns[idx], layoutMode: 'separate' };
                                                                                setProject({ ...project, sections: ns });
                                                                            }}
                                                                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all flex items-center justify-center ${section.layoutMode !== 'unified' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-400'}`}
                                                                        >Separate Cards</button>
                                                                        <button 
                                                                            onClick={() => {
                                                                                const ns = [...project.sections];
                                                                                ns[idx] = { ...ns[idx], layoutMode: 'unified' };
                                                                                setProject({ ...project, sections: ns });
                                                                            }}
                                                                            className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase transition-all flex items-center justify-center ${section.layoutMode === 'unified' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-400'}`}
                                                                        >Unified Background</button>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    {(section.items || []).map((item: any, iIdx: number) => (
                                                                        <div key={iIdx} className="p-6 bg-slate-50/50 rounded-[10px] border border-slate-100 space-y-6 relative group/item">
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Screen {iIdx + 1}</span>
                                                                                <div className="flex gap-2">
                                                                                    <div className="flex bg-slate-100 p-1 rounded-lg gap-1 mr-2">
                                                                                        <button 
                                                                                            onClick={() => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], size: 'full' };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${item.size === 'full' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                                                                        >
                                                                                            Full
                                                                                        </button>
                                                                                        <button 
                                                                                            onClick={() => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], size: 'half' };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${item.size !== 'full' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                                                                        >
                                                                                            Half
                                                                                        </button>
                                                                                    </div>
                                                                                    
                                                                                    <button 
                                                                                        onClick={() => {
                                                                                            const ns = [...project.sections];
                                                                                            const ni = [...(ns[idx].items || [])];
                                                                                            ni[iIdx] = { ...ni[iIdx], isSquare: !ni[iIdx].isSquare };
                                                                                            ns[idx].items = ni;
                                                                                            setProject({ ...project, sections: ns });
                                                                                        }}
                                                                                        className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase transition-all flex items-center gap-2 ${item.isSquare ? 'bg-black text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                                                                                    >
                                                                                        <div className={`w-2 h-2 rounded-[2px] border ${item.isSquare ? 'bg-white border-white' : 'bg-transparent border-slate-300'}`} />
                                                                                        1:1 Ratio
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase">Screen Image (D&D)</p>
                                                                                {item.image ? (
                                                                                    <div className="relative rounded-xl overflow-hidden group/img aspect-video bg-white shadow-sm border border-slate-100">
                                                                                        <img src={item.image} alt="" className="w-full h-full object-contain p-12" />
                                                                                        <button 
                                                                                            onClick={() => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], image: "" };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-all shadow-lg"
                                                                                        >
                                                                                            <i className="fa-solid fa-trash-can text-[10px]"></i>
                                                                                        </button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div 
                                                                                        onDragOver={e => e.preventDefault()}
                                                                                        onDrop={async e => {
                                                                                            e.preventDefault();
                                                                                            const file = e.dataTransfer.files[0];
                                                                                            if (file) {
                                                                                                const path = await handleUpload(file, `showcase-${idx}-${iIdx}`);
                                                                                                if (path) {
                                                                                                    const ns = [...project.sections];
                                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                                    ni[iIdx] = { ...ni[iIdx], image: path };
                                                                                                    ns[idx].items = ni;
                                                                                                    setProject({ ...project, sections: ns });
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            const input = document.createElement('input');
                                                                                            input.type = 'file';
                                                                                            input.accept = 'image/*';
                                                                                            input.onchange = async (e: any) => {
                                                                                                const file = e.target.files[0];
                                                                                                if (file) {
                                                                                                    const path = await handleUpload(file, `showcase-${idx}-${iIdx}`);
                                                                                                    if (path) {
                                                                                                        const ns = [...project.sections];
                                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                                        ni[iIdx] = { ...ni[iIdx], image: path };
                                                                                                        ns[idx].items = ni;
                                                                                                        setProject({ ...project, sections: ns });
                                                                                                    }
                                                                                                }
                                                                                            };
                                                                                            input.click();
                                                                                        }}
                                                                                        className="w-full h-[120px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-slate-300 hover:bg-white cursor-pointer transition-all"
                                                                                    >
                                                                                        <i className="fa-solid fa-image text-slate-300 text-xl"></i>
                                                                                        <p className="text-[9px] font-bold text-slate-400">Add Screenshot</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="space-y-3 pt-2">
                                                                                <div className="flex justify-between items-center">
                                                                                    <label className="text-[9px] font-black text-slate-400 uppercase">Image Label text</label>
                                                                                    <div className="flex gap-2">
                                                                                        <select
                                                                                            value={item.labelPosition === 'top' ? 'top-center' : (item.labelPosition === 'bottom' ? 'bottom-center' : (item.labelPosition || 'top-left'))}
                                                                                            onChange={e => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], labelPosition: e.target.value };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className="px-2 py-1 max-w-[100px] rounded text-[9px] font-bold uppercase transition-all bg-white border border-slate-200 outline-none text-slate-600"
                                                                                        >
                                                                                            <option value="top-left">Top L</option>
                                                                                            <option value="top-center">Top C</option>
                                                                                            <option value="top-right">Top R</option>
                                                                                            <option value="bottom-left">Bot L</option>
                                                                                            <option value="bottom-center">Bot C</option>
                                                                                            <option value="bottom-right">Bot R</option>
                                                                                        </select>
                                                                                        <select
                                                                                            value={item.labelStyle || 'normal'}
                                                                                            onChange={e => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], labelStyle: e.target.value };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className="px-2 py-1 max-w-[100px] rounded text-[9px] font-bold uppercase transition-all bg-white border border-slate-200 outline-none text-slate-600"
                                                                                        >
                                                                                            <option value="normal">Normal Bold</option>
                                                                                            <option value="faded">Tiny Faded</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={item.label || ""}
                                                                                    onChange={e => {
                                                                                        const ns = [...project.sections];
                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                        ni[iIdx] = { ...ni[iIdx], label: e.target.value };
                                                                                        ns[idx].items = ni;
                                                                                        setProject({ ...project, sections: ns });
                                                                                    }}
                                                                                    className="w-full px-3 py-2 bg-white rounded-lg text-xs font-medium border border-slate-200 outline-none focus:border-blue-400 transition-all"
                                                                                    placeholder="Optional caption..."
                                                                                />
                                                                            </div>
                                                                            <button 
                                                                                onClick={() => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover/item:opacity-100"
                                                                            >
                                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            const ni = [...(ns[idx].items || [])];
                                                                            ni.push({ image: "", size: 'full' });
                                                                            ns[idx].items = ni;
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className="w-full py-12 border-2 border-dashed border-slate-100 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-3"
                                                                    >
                                                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                                                            <i className="fa-solid fa-plus text-[12px]"></i>
                                                                        </div>
                                                                        Add Screenshot to Showcase
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'numbered_list' ? (
                                                            <div className="space-y-8">
                                                                 <div className="grid grid-cols-2 gap-6">
                                                                     <div className="space-y-1.5">
                                                                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Topic Label</label>
                                                                         <input 
                                                                             type="text"
                                                                             value={section.label || ""}
                                                                             onChange={e => {
                                                                                 const newSections = [...project.sections];
                                                                                 newSections[idx] = { ...newSections[idx], label: e.target.value };
                                                                                 setProject({ ...project, sections: newSections });
                                                                             }}
                                                                             className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl text-xs border border-transparent focus:border-slate-200 focus:bg-white transition-all font-bold tracking-widest uppercase"
                                                                             placeholder="e.g. ROLE & RESPONSIBILITIES"
                                                                         />
                                                                     </div>
                                                                 </div>

                                                                 <div className="space-y-4">
                                                                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intro Narrative</label>
                                                                     <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                         {mounted && (
                                                                             <ReactQuill 
                                                                                 key={`numbered-narrative-${idx}`}
                                                                                 theme="snow" 
                                                                                 value={section.content || ""}
                                                                                 onChange={val => {
                                                                                     if (val !== section.content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                             />
                                                                         )}
                                                                     </div>
                                                                 </div>
                                                                <div className="flex gap-4 mb-4 pt-4 border-t border-slate-100">
                                                                    <div className="flex-1 space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Layout Format</label>
                                                                        <select 
                                                                            value={section.layoutFormat || 'list'}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], layoutFormat: e.target.value };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm font-semibold outline-none focus:border-blue-400 transition-all shadow-sm"
                                                                        >
                                                                            <option value="list">1-Column Stack (Default)</option>
                                                                            <option value="grid">2-Column Grid</option>
                                                                            <option value="process_list">Process List (Large Numbers Left)</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="flex-1 space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Bullet Style</label>
                                                                        <select 
                                                                            value={section.bulletStyle || 'blue'}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], bulletStyle: e.target.value };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm font-semibold outline-none focus:border-blue-400 transition-all shadow-sm"
                                                                        >
                                                                            <option value="blue">Solid Blue (Default)</option>
                                                                            <option value="grey">Light Grey Outlined</option>
                                                                            <option value="hidden">Hidden Bullets (Text Only)</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-6">
                                                                    {(section.items || []).map((item: any, iIdx: number) => (
                                                                        <div key={iIdx} className="p-8 bg-slate-50/30 rounded-[32px] border border-slate-100 flex gap-8 relative group/item">
                                                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#305CDE] flex items-center justify-center text-white text-[14px] font-bold shadow-lg shadow-blue-100">
                                                                                {String(iIdx + 1).padStart(2, '0')}
                                                                            </div>
                                                                            <div className="flex-grow space-y-4">
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div className="space-y-1">
                                                                                        <p className="text-[9px] font-black text-slate-400 uppercase">Step Tag (Optional)</p>
                                                                                        <input 
                                                                                            value={item.label || ""}
                                                                                            onChange={e => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], label: e.target.value };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className="w-full px-0 py-1 bg-transparent border-b border-slate-100 focus:border-blue-400 text-[10px] font-bold uppercase tracking-wider text-slate-500 outline-none transition-all"
                                                                                            placeholder="e.g. DISCOVERY"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <p className="text-[9px] font-black text-slate-400 uppercase">Item Title (18px SemiBold)</p>
                                                                                        <input 
                                                                                            value={item.title || ""}
                                                                                            onChange={e => {
                                                                                                const ns = [...project.sections];
                                                                                                const ni = [...(ns[idx].items || [])];
                                                                                                ni[iIdx] = { ...ni[iIdx], title: e.target.value };
                                                                                                ns[idx].items = ni;
                                                                                                setProject({ ...project, sections: ns });
                                                                                            }}
                                                                                            className="w-full px-0 py-1 bg-transparent border-b border-slate-100 focus:border-blue-400 text-lg font-bold outline-none transition-all"
                                                                                            placeholder="Role or Step Title"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Item Description (16px Regular)</p>
                                                                                    <textarea 
                                                                                        value={item.content || ""}
                                                                                        onChange={e => {
                                                                                            const ns = [...project.sections];
                                                                                            const ni = [...(ns[idx].items || [])];
                                                                                            ni[iIdx] = { ...ni[iIdx], content: e.target.value };
                                                                                            ns[idx].items = ni;
                                                                                            setProject({ ...project, sections: ns });
                                                                                        }}
                                                                                        className="w-full px-0 py-1 bg-transparent text-sm min-h-[60px] outline-none resize-none"
                                                                                        placeholder="Describe the responsibilities or process..."
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <button 
                                                                                onClick={() => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                                                            >
                                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            const ni = [...(ns[idx].items || [])];
                                                                            ni.push({ title: "", content: "" });
                                                                            ns[idx].items = ni;
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[32px] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                                    >
                                                                        <i className="fa-solid fa-plus text-[8px]"></i> Add New Step
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'tagged_list' ? (
                                                            <div className="space-y-8">
                                                                <div className="grid grid-cols-2 gap-6">
                                                                    <div className="space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Topic Label</label>
                                                                        <input 
                                                                            type="text"
                                                                            value={section.label || ""}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], label: e.target.value };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-full px-6 py-4 bg-gray-50/50 rounded-2xl text-xs border border-transparent focus:border-slate-200 focus:bg-white transition-all font-bold tracking-widest uppercase"
                                                                            placeholder="e.g. ROLE & RESPONSIBILITIES"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-200 w-fit">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            id={`isHighlight-${idx}`}
                                                                            checked={section.isHighlight || false}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], isHighlight: e.target.checked };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <label htmlFor={`isHighlight-${idx}`} className="text-[10px] font-bold text-slate-600 cursor-pointer uppercase tracking-wide">
                                                                            Enable Editorial Highlight Style (Grey Box + Border)
                                                                        </label>
                                                                    </div>
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intro Narrative</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`tagged-narrative-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.content || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-4">
                                                                    <div className="flex-1 space-y-1.5">
                                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Bullet Style</p>
                                                                        <select 
                                                                            value={section.bulletStyle || 'default'}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], bulletStyle: e.target.value };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-[240px] px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-blue-400 transition-all shadow-sm"
                                                                        >
                                                                            <option value="default">Show Bullets/Tags (Standard)</option>
                                                                            <option value="hidden">Hide Bullets/Tags (Full Width Rendering)</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="space-y-6">
                                                                    {(section.items || []).map((item: any, iIdx: number) => (
                                                                        <div key={iIdx} className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col gap-4 relative group/item">
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase">Tag Pill Text</p>
                                                                                <input 
                                                                                    value={item.tag || ""}
                                                                                    onChange={e => {
                                                                                        const ns = [...project.sections];
                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                        ni[iIdx] = { ...ni[iIdx], tag: e.target.value };
                                                                                        ns[idx].items = ni;
                                                                                        setProject({ ...project, sections: ns });
                                                                                    }}
                                                                                    className="w-[200px] px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-blue-400 transition-all"
                                                                                    placeholder="e.g. Microcopy"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase">Item Title</p>
                                                                                <input 
                                                                                    value={item.title || ""}
                                                                                    onChange={e => {
                                                                                        const ns = [...project.sections];
                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                        ni[iIdx] = { ...ni[iIdx], title: e.target.value };
                                                                                        ns[idx].items = ni;
                                                                                        setProject({ ...project, sections: ns });
                                                                                    }}
                                                                                    className="w-full px-0 py-1 bg-transparent border-b border-slate-100 focus:border-blue-400 text-sm font-bold outline-none transition-all"
                                                                                    placeholder="Generating and stress-testing..."
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase">Item Description</p>
                                                                                <textarea 
                                                                                    value={item.content || ""}
                                                                                    onChange={e => {
                                                                                        const ns = [...project.sections];
                                                                                        const ni = [...(ns[idx].items || [])];
                                                                                        ni[iIdx] = { ...ni[iIdx], content: e.target.value };
                                                                                        ns[idx].items = ni;
                                                                                        setProject({ ...project, sections: ns });
                                                                                    }}
                                                                                    className="w-full px-0 py-1 bg-transparent text-sm min-h-[60px] outline-none resize-none"
                                                                                    placeholder="Describe the feature..."
                                                                                />
                                                                            </div>
                                                                            <button 
                                                                                onClick={() => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                                                            >
                                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            const ni = [...(ns[idx].items || [])];
                                                                            ni.push({ tag: "", title: "", content: "" });
                                                                            ns[idx].items = ni;
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[20px] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                                    >
                                                                        <i className="fa-solid fa-plus text-[8px]"></i> Add New Tagged Feature
                                                                    </button>
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-dashed border-slate-200 w-fit">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            id={`isFooterHighlight-${idx}`}
                                                                            checked={section.isFooterHighlight || false}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], isFooterHighlight: e.target.checked };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <label htmlFor={`isFooterHighlight-${idx}`} className="text-[10px] font-bold text-slate-600 cursor-pointer uppercase tracking-wide">
                                                                            Enable Editorial Highlight Style (Grey Box + Border)
                                                                        </label>
                                                                    </div>
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Footer Callout (Optional)</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`tagged-footer-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.footer_content || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.footer_content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], footer_content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'table' ? (
                                                            <div className="space-y-6">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <input 
                                                                        type="checkbox"
                                                                        id={`isHighlight-${idx}`}
                                                                        checked={section.isHighlight || false}
                                                                        onChange={e => {
                                                                            const newSections = [...project.sections];
                                                                            newSections[idx] = { ...newSections[idx], isHighlight: e.target.checked };
                                                                            setProject({ ...project, sections: newSections });
                                                                        }}
                                                                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                    <label htmlFor={`isHighlight-${idx}`} className="text-[10px] font-bold text-slate-600 cursor-pointer uppercase tracking-wide">
                                                                        Enable Editorial Highlight Style (Grey Box + Border)
                                                                    </label>
                                                                </div>
                                                                <div className={`space-y-4 p-4 rounded-xl transition-all ${section.isHighlight ? 'bg-slate-100/30 ring-1 ring-slate-200' : ''}`}>
                                                                {(section.items || []).map((item: any, iIdx: number) => (
                                                                    <div key={iIdx} className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 flex gap-6 relative group/item">
                                                                        <div className="w-[30%]">
                                                                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Row Column 1 (Label)</p>
                                                                            <input 
                                                                                value={item.label || ""}
                                                                                onChange={e => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                    ni[iIdx] = { ...ni[iIdx], label: e.target.value };
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-sm font-semibold outline-none focus:border-blue-400 transition-all shadow-sm"
                                                                                placeholder="e.g. Design lead"
                                                                            />
                                                                        </div>
                                                                        <div className="w-[70%]">
                                                                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Row Column 2 (Content)</p>
                                                                            <textarea 
                                                                                value={item.content || ""}
                                                                                onChange={e => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                    ni[iIdx] = { ...ni[iIdx], content: e.target.value };
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-sm min-h-[60px] outline-none focus:border-blue-400 resize-y transition-all shadow-sm"
                                                                                placeholder="Owned end-to-end UX and UI design across..."
                                                                            />
                                                                        </div>
                                                                        <button 
                                                                            onClick={() => {
                                                                                const ns = [...project.sections];
                                                                                const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                ns[idx].items = ni;
                                                                                setProject({ ...project, sections: ns });
                                                                            }}
                                                                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                                                        >
                                                                            <i className="fa-solid fa-trash-can text-xs"></i>
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <button 
                                                                    onClick={() => {
                                                                        const ns = [...project.sections];
                                                                        const ni = [...(ns[idx].items || [])];
                                                                        ni.push({ label: "", content: "" });
                                                                        ns[idx].items = ni;
                                                                        setProject({ ...project, sections: ns });
                                                                    }}
                                                                    className="w-full py-4 border-2 border-dashed border-slate-100 rounded-[20px] text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                                >
                                                                    <i className="fa-solid fa-plus text-[8px]"></i> Add New Table Row
                                                                </button>
                                                                </div>
                                                            </div>
                                                        ) : section.type === 'tags_grid' ? (
                                                            <div className="space-y-12">
                                                                <div className="space-y-4">
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intro Narrative</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`tags-narrative-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.content || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className={`grid grid-cols-1 ${ (section.items?.length || 0) > 1 ? 'md:grid-cols-2' : ''} gap-6`}>
                                                                    {(section.items || []).map((item: any, iIdx: number) => (
                                                                        <div key={iIdx} className="p-6 bg-slate-50/50 rounded-xl border-l-4 border-slate-200 space-y-4 relative group/item">
                                                                            <input 
                                                                                value={item.title || ""}
                                                                                onChange={e => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                    ni[iIdx] = { ...ni[iIdx], title: e.target.value };
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="w-full bg-transparent text-sm font-bold outline-none"
                                                                                placeholder="Category Title"
                                                                            />
                                                                            <textarea 
                                                                                value={item.tags || ""}
                                                                                onChange={e => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = [...(ns[idx].items || [])];
                                                                                    ni[iIdx] = { ...ni[iIdx], tags: e.target.value };
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="w-full bg-white p-3 rounded-lg text-xs outline-none resize-none min-h-[60px] border border-slate-100"
                                                                                placeholder="Tags (comma separated: Figma, Claude, ChatGPT)"
                                                                            />
                                                                            <button 
                                                                                onClick={() => {
                                                                                    const ns = [...project.sections];
                                                                                    const ni = (ns[idx].items || []).filter((_: any, i: number) => i !== iIdx);
                                                                                    ns[idx].items = ni;
                                                                                    setProject({ ...project, sections: ns });
                                                                                }}
                                                                                className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 opacity-0 group/item group-hover/item:opacity-100 transition-all shadow-sm"
                                                                            >
                                                                                <i className="fa-solid fa-xmark text-[10px]"></i>
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                    <button 
                                                                        onClick={() => {
                                                                            const ns = [...project.sections];
                                                                            const ni = [...(ns[idx].items || [])];
                                                                            ni.push({ title: "", tags: "" });
                                                                            ns[idx].items = ni;
                                                                            setProject({ ...project, sections: ns });
                                                                        }}
                                                                        className="w-full p-6 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                                                                    >
                                                                        <i className="fa-solid fa-plus text-[8px]"></i> Add Category
                                                                    </button>
                                                                </div>

                                                                <div className="space-y-4 pt-10 mt-10 border-t border-slate-100">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <input 
                                                                            type="checkbox"
                                                                            id={`isFooterHighlight-${idx}`}
                                                                            checked={section.isFooterHighlight || false}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], isFooterHighlight: e.target.checked };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <label htmlFor={`isFooterHighlight-${idx}`} className="text-[10px] font-bold text-slate-600 cursor-pointer uppercase tracking-wide">
                                                                            Enable Editorial Highlight Style (Grey Box + Border)
                                                                        </label>
                                                                    </div>
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Footer Insight (Optional)</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`tags-footer-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.footerInsight || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.footerInsight) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], footerInsight: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            ) : (
                                                            <div className="space-y-10">
                                                                <div className="space-y-4">
                                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Intro Narrative (Optional)</label>
                                                                    <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
                                                                        {mounted && (
                                                                            <ReactQuill 
                                                                                key={`metrics-narrative-${idx}`}
                                                                                theme="snow" 
                                                                                value={section.content || ""}
                                                                                onChange={val => {
                                                                                     if (val !== section.content) {
                                                                                         const newSections = [...project.sections];
                                                                                         newSections[idx] = { ...newSections[idx], content: val };
                                                                                         setProject({ ...project, sections: newSections });
                                                                                     }
                                                                                 }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-4">
                                                                    <div className="flex-1 space-y-1.5">
                                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Card Style Format</label>
                                                                        <select 
                                                                            value={section.layoutFormat || 'outlined_top'}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], layoutFormat: e.target.value };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md text-sm font-semibold outline-none focus:border-blue-400 transition-all shadow-sm"
                                                                        >
                                                                            <option value="outlined_top">Outlined Top-Aligned (Default)</option>
                                                                            <option value="filled_centered">Filled Grey Centered</option>
                                                                            <option value="flow_sequence">Sequence Flow (with arrows)</option>
                                                                            <option value="highlight_row">Side-by-Side Highlight Box</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-6">
                                                                    {[0, 1, 2, 3].map((mIdx) => (
                                                                        <div key={mIdx} className="p-6 bg-gray-50/30 rounded-[24px] border border-gray-100 space-y-4 hover:bg-white transition-all">
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Metric {mIdx + 1} Value</p>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={section.metrics?.[mIdx]?.value || ""}
                                                                                    onChange={e => {
                                                                                        const newSections = [...project.sections];
                                                                                        const newMetrics = [...(newSections[idx].metrics || [{},{},{},{}])];
                                                                                        newMetrics[mIdx] = { ...newMetrics[mIdx], value: e.target.value };
                                                                                        newSections[idx].metrics = newMetrics;
                                                                                        setProject({ ...project, sections: newSections });
                                                                                    }}
                                                                                    className="w-full px-4 py-2 bg-white rounded-xl text-[24px] font-bold tracking-tight outline-none"
                                                                                    placeholder="600+"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Metric Title</p>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={section.metrics?.[mIdx]?.label || ""}
                                                                                    onChange={e => {
                                                                                        const newSections = [...project.sections];
                                                                                        const newMetrics = [...(newSections[idx].metrics || [{},{},{},{}])];
                                                                                        newMetrics[mIdx] = { ...newMetrics[mIdx], label: e.target.value };
                                                                                        newSections[idx].metrics = newMetrics;
                                                                                        setProject({ ...project, sections: newSections });
                                                                                    }}
                                                                                    className="w-full px-4 py-2 bg-white rounded-xl text-sm font-semibold outline-none"
                                                                                    placeholder="Metric Title (e.g. Satisfaction Score)"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Metric Description</p>
                                                                                <textarea 
                                                                                    value={section.metrics?.[mIdx]?.description || ""}
                                                                                    onChange={e => {
                                                                                        const newSections = [...project.sections];
                                                                                        const newMetrics = [...(newSections[idx].metrics || [{},{},{},{}])];
                                                                                        newMetrics[mIdx] = { ...newMetrics[mIdx], description: e.target.value };
                                                                                        newSections[idx].metrics = newMetrics;
                                                                                        setProject({ ...project, sections: newSections });
                                                                                    }}
                                                                                    className="w-full px-4 py-2 bg-white rounded-xl text-xs font-medium resize-none min-h-[80px] outline-none"
                                                                                    placeholder="Provide deeper context for this metric..."
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="space-y-4">
                                                                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                                                                        <input 
                                                                            type="checkbox" 
                                                                            id={`insightHighlight-${idx}`}
                                                                            checked={section.isHighlight || false}
                                                                            onChange={e => {
                                                                                const newSections = [...project.sections];
                                                                                newSections[idx] = { ...newSections[idx], isHighlight: e.target.checked };
                                                                                setProject({ ...project, sections: newSections });
                                                                            }}
                                                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                                        />
                                                                        <label htmlFor={`insightHighlight-${idx}`} className="text-xs font-bold text-slate-600 cursor-pointer">
                                                                            Enable Editorial Highlight Style (Grey Box + Border)
                                                                        </label>
                                                                    </div>
                                                                    <div 
                                                                        className={`space-y-1.5 p-6 rounded-[24px] bg-white border border-slate-100 shadow-sm`}
                                                                    >
                                                                        <label className={`text-[9px] font-black uppercase tracking-widest text-slate-400`}>Editorial Takeaway (Insight Box)</label>
                                                                        <div className="mt-2 text-editor-container">
                                                                            {mounted && (
                                                                                <ReactQuill 
                                                                                    key={`insight-editor-${idx}`}
                                                                                    theme="snow" 
                                                                                    value={section.insight || ""}
                                                                                    onChange={val => {
                                                                                         if (val !== section.insight) {
                                                                                             const newSections = [...project.sections];
                                                                                             newSections[idx] = { ...newSections[idx], insight: val };
                                                                                             setProject({ ...project, sections: newSections });
                                                                                         }
                                                                                     }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ADVANCED TAB */}
                    {activeTab === 'advanced' && (
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation Links</h3>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Previous Project Slug</label>
                                            <input 
                                                type="text" 
                                                value={project.prevProject?.slug || ""} 
                                                onChange={e => setProject({...project, prevProject: {...project.prevProject, slug: e.target.value}})}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-300"
                                                placeholder="e.g. tradetracker-saas"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Previous Project Title</label>
                                            <input 
                                                type="text" 
                                                value={project.prevProject?.title || ""} 
                                                onChange={e => setProject({...project, prevProject: {...project.prevProject, title: e.target.value}})}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-300"
                                                placeholder="e.g. TradeTracker"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Next Project Slug</label>
                                            <input 
                                                type="text" 
                                                value={project.nextProject?.slug || ""} 
                                                onChange={e => setProject({...project, nextProject: {...project.nextProject, slug: e.target.value}})}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-300"
                                                placeholder="e.g. ballalight-portfolio"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Next Project Title</label>
                                            <input 
                                                type="text" 
                                                value={project.nextProject?.title || ""} 
                                                onChange={e => setProject({...project, nextProject: {...project.nextProject, title: e.target.value}})}
                                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 placeholder:text-slate-300"
                                                placeholder="e.g. Balla Light"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
