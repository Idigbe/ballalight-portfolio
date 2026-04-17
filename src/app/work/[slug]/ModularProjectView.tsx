'use client';

import { MotionImage } from '@/components/ui/MotionImage';
import VerifyPermission from "@/components/ui/VerifyPermission";

export default function ModularProjectView({ project, showContent, verifyPS }: { project: any, showContent: boolean, verifyPS: (val: { verified: boolean }) => void }) {
    // Helper for rendering sections
    const renderTitle = (section: any) => {
        if (!section.title) return null;
        if (section.titleStyle === 'label') {
            return (
                <h2 className="text-[14px] font-[600] uppercase tracking-[1.4px] text-[#00000066] leading-[20px] mb-6">
                    {section.title}
                </h2>
            );
        }
        return (
            <h2 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] mb-6">
                {section.title}
            </h2>
        );
    };

    const renderSection = (section: any, index: number) => {
        const titleStyle = section.titleStyle;
        const mtClass = index === 0 ? '' : section.title ? (titleStyle === 'label' ? 'mt-10' : 'mt-20') : 'mt-10';

        switch (section.type) {
            case 'gallery':
                return (
                    <div key={index} className={`${mtClass} grid grid-cols-12 px-0 md:px-2 gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        <div className="col-span-12">
                            {renderTitle(section)}
                        </div>
                        <div className="grid grid-cols-12 col-span-12 gap-4">
                            {section.images?.map((img: any, i: number) => {
                                // Determine grid size based on layout setting
                                let colSpan = "col-span-12"; // Default for 'full'
                                if (section.layout === 'split') colSpan = "col-span-12 md:col-span-6";
                                if (section.layout === 'grid' || !section.layout) colSpan = `col-span-12 md:col-span-6 lg:col-span-${img.cols || 4}`;

                                // Determine Aspect Ratio class
                                let aspectClass = "aspect-auto";
                                if (section.aspectRatio === 'video') aspectClass = "aspect-video";
                                if (section.aspectRatio === 'classic') aspectClass = "aspect-[4/3]";
                                if (section.aspectRatio === 'square') aspectClass = "aspect-square";

                                return (
                                    <div key={i} className={`${colSpan} justify-items-center px-0 md:px-2`}>
                                        <div className={`relative w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 ${aspectClass}`}>
                                            <MotionImage
                                                isInView={false}
                                                xWidth="100%"
                                                xHeight="100%"
                                                imageSrc={img.src}
                                                alt={project.title}
                                                className={`w-full h-full ${section.objectFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'grid_block':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        {renderTitle(section)}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
                            {(section.cards || []).map((card: any, idx: number) => (
                                <div key={idx} className="p-8 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
                                    <h4 className="text-md font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors uppercase italic">{card.title}</h4>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'text_block':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        {renderTitle(section)}
                        <div className="justify-items-left my-2 md:pr-16">
                            <article
                                className={`project-text md:project-text-md ${section.isHighlight
                                    ? 'p-8 md:p-12 bg-[#F5F5F5] border-l-[6px] border-[#1E1E1E] rounded-tr-2xl rounded-br-2xl'
                                    : ''
                                    }`}
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        </div>
                        {section.image && (
                            <div className="md:col-span-6 justify-items-center my-2">
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
            case 'text':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150`}>
                        {renderTitle(section)}
                        <div className={`${section.isHighlight
                            ? 'pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.05)] border-l-[4px] border-[rgba(0,0,0,0.2)] rounded-r-[10px]'
                            : ''
                            }`}>
                            <div className="prose prose-slate max-w-none text-[#000000B2] text-[18px] leading-[32.5px] font-normal" dangerouslySetInnerHTML={{ __html: section.content || "" }} />
                        </div>
                    </div>
                );
            case 'metrics': {
                const layout = section.layoutFormat || 'outlined_top';
                const validMetrics = (section.metrics || []).filter((m: any) => m.value || m.label);
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-12 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        {renderTitle(section)}
                        {section.content && (
                            <div className="prose prose-slate max-w-none text-[#00000099] text-[16px] leading-[26px]">
                                <div dangerouslySetInnerHTML={{ __html: section.content || "" }} />
                            </div>
                        )}
                        {layout === 'flow_sequence' ? (
                            <div className="flex flex-col md:flex-row items-center gap-4 w-full overflow-x-auto pb-4">
                                {validMetrics.map((metric: any, mIdx: number) => {
                                    const isLast = mIdx === validMetrics.length - 1;
                                    return [
                                        <div key={`box-${mIdx}`} className={`flex flex-col items-center justify-center p-6 sm:p-8 rounded-[8px] min-w-[200px] flex-1 min-h-[140px] text-center ${isLast ? 'bg-[#FDF3E7] border border-[#E3C6B1]' : 'bg-white border border-slate-200'}`}>
                                            <span className="text-[28px] sm:text-[36px] font-bold tracking-tight text-[#1E1E1E] leading-none mb-3">
                                                {metric.value}
                                            </span>
                                            {metric.label && (
                                                <span className="text-[12px] font-[500] text-[#00000099] leading-[15px] max-w-[250px] mx-auto whitespace-pre-line text-center font-sans tracking-normal">
                                                    {metric.label}
                                                </span>
                                            )}
                                        </div>,
                                        !isLast ? (
                                            <div key={`arrow-${mIdx}`} className="text-[#00000066] text-[18px] font-[400] leading-[28px] text-center rotate-90 md:rotate-0 flex-shrink-0 font-sans tracking-normal">
                                                →
                                            </div>
                                        ) : null
                                    ];
                                })}
                            </div>
                        ) : (
                            <div className={`grid gap-4 md:gap-7 ${validMetrics.length === 1 ? 'grid-cols-1' :
                                validMetrics.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                    validMetrics.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                                        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                                }`}>
                                {validMetrics.map((metric: any, mIdx: number) => (
                                    layout === 'filled_centered' ? (
                                        <div key={mIdx} className="bg-[#F4F4F4] rounded-[8px] flex flex-col items-center justify-center p-8 min-h-[220px] text-center">
                                            <span className="text-[48px] font-bold tracking-tight text-[#1E1E1E] leading-none mb-4">
                                                {metric.value}
                                            </span>
                                            {metric.label && (
                                                <span className="text-[14px] font-normal leading-[1.4] text-[#00000099] max-w-[200px] mx-auto whitespace-pre-line">
                                                    {metric.label}
                                                </span>
                                            )}
                                        </div>
                                    ) : layout === 'highlight_row' ? (
                                        <div key={mIdx} className="bg-[#F4F4F4] rounded-[8px] flex flex-col md:flex-row items-center w-full col-span-full border border-slate-100/50">
                                            <div className="p-8 md:p-12 w-full md:w-1/3 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200/40">
                                                <span className="text-[48px] md:text-[64px] font-bold tracking-tighter text-[#1E1E1E] leading-none">
                                                    {metric.value}
                                                </span>
                                            </div>
                                            <div className="p-8 md:p-10 w-full md:w-2/3 space-y-2 md:space-y-3">
                                                {metric.label && (
                                                    <h4 className="text-[16px] md:text-[18px] font-bold text-[#1E1E1E] leading-[24px] font-sans">
                                                        {metric.label}
                                                    </h4>
                                                )}
                                                {metric.description && (
                                                    <p className="text-[14px] md:text-[16px] leading-[24px] md:leading-[26px] text-[#00000099] font-normal font-sans">
                                                        {metric.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={mIdx} className="pt-[33px] pr-[33px] pb-px pl-[33px] border border-[#0000001A] flex flex-col gap-[12px] min-h-[220px] transition-all hover:bg-black/5">
                                            <div className="flex flex-col gap-[4px]">
                                                <span className="text-[32px] font-semibold tracking-tight text-[#1E1E1E]">
                                                    {metric.value}
                                                </span>
                                                <span className="text-[12px] font-[600] uppercase tracking-[0.96px] text-[#00000066]">
                                                    {metric.label}
                                                </span>
                                            </div>
                                            <p className="text-[14px] leading-[22.5px] text-[#00000099] font-normal">
                                                {metric.description}
                                            </p>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                        {section.insight && (
                            <div className="pt-4">
                                <div className={`w-full ${section.isHighlight ? 'pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.05)] border-l-[4px] border-[rgba(0,0,0,0.2)] rounded-r-[10px]' : ''}`}>
                                    <div className="prose prose-slate max-w-none text-[#00000099] text-[16px] leading-[26px]">
                                        <div dangerouslySetInnerHTML={{ __html: section.insight || "" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }
            case 'cards':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150`}>
                        <div className="space-y-8">
                            {renderTitle(section)}
                            {section.content && (
                                <div
                                    className={`w-full ${section.isHighlight
                                        ? 'pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.05)] border-l-[4px] border-[rgba(0,0,0,0.2)] rounded-r-[10px]'
                                        : ''
                                        }`}
                                >
                                    <div
                                        className="prose prose-slate max-w-none text-[#00000099] text-[16px] leading-[26px]"
                                        dangerouslySetInnerHTML={{ __html: section.content || "" }}
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {(section.items || []).map((card: any, cIdx: number) => (
                                    <div key={cIdx} className="group p-10 border border-[#0000000D] bg-white rounded-[24px] hover:border-[#0000001A] transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)]">
                                        <div className="space-y-8">
                                            <div className="space-y-4 text-left items-start flex flex-col">
                                                {card.label && (
                                                    <span className="px-3 py-1 bg-black/[0.03] rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
                                                        {card.label}
                                                    </span>
                                                )}
                                                <h3 className="text-[20px] font-semibold tracking-tight text-[#0A0A0A]">
                                                    {card.title}
                                                </h3>
                                                <p className="text-[15px] leading-[24px] text-[#00000099] font-normal">
                                                    {card.content}
                                                </p>
                                            </div>
                                            {card.image && (
                                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#0000000D]">
                                                    <img
                                                        src={card.image}
                                                        alt={card.title}
                                                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'tags_grid':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        <div className="space-y-8">
                            {renderTitle(section)}
                            {section.content && (
                                <div className="prose prose-slate max-w-none text-[#000000B2] text-[18px] leading-[32.5px] font-normal" dangerouslySetInnerHTML={{ __html: section.content }} />
                            )}
                            <div className={`grid grid-cols-1 ${(section.items?.length || 0) > 1 ? 'md:grid-cols-2' : ''} gap-6 pt-4`}>
                                {(section.items || []).map((item: any, iIdx: number) => (
                                    <div key={iIdx} className="bg-[#0000000D] border border-[#0000001A] border-l-4 border-l-[#0000001A] rounded-[10px] p-8 space-y-6 transition-all hover:bg-black/[0.07]">
                                        <p className="text-[16px] font-semibold text-black leading-[24px] font-sans">{item.title}</p>
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {(item.tags || "").split(",").map((tag: string, tIdx: number) => {
                                                const trimmed = tag.trim();
                                                if (!trimmed) return null;
                                                return (
                                                    <span key={tIdx} className="inline-block px-4 py-2 bg-white rounded-[8px] text-[14px] font-medium text-black leading-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-[#00000008] font-sans">
                                                        {trimmed}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {section.footerInsight && (
                                <div className={`pt-4 ${section.isFooterHighlight ? 'mt-8 pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.03)] border-l-[4px] border-[rgba(0,0,0,0.15)] rounded-r-[8px]' : ''}`}>
                                    <div className="prose prose-slate max-w-none text-[#00000099] text-[16px] md:text-[18px] leading-[32.5px] font-normal" dangerouslySetInnerHTML={{ __html: section.footerInsight }} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'table':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
                        {renderTitle(section)}
                        <div className={`overflow-hidden mt-8 ${section.isHighlight ? 'bg-[#0000000D] border border-[#0000001A] rounded-[10px]' : 'bg-white border border-[#00000010] rounded-[8px]'}`}>
                            {(section.items || []).map((item: any, iIdx: number) => (
                                <div key={iIdx} className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-8 p-6 md:p-8 ${iIdx !== (section.items?.length || 0) - 1 ? 'border-b border-[#00000010]' : ''}`}>
                                    <div className="w-full md:w-1/4 flex-shrink-0">
                                        <p className="text-[16px] leading-[24px] tracking-[0px] font-[500] text-[#00000099] pb-0 md:pb-0" style={{ fontFamily: 'var(--font-bricolage)' }}>{item.label}</p>
                                    </div>
                                    <div className="w-full md:w-3/4">
                                        <p className="text-[16px] leading-[24px] tracking-[0px] font-[400] text-[#000000] text-left whitespace-pre-line" style={{ fontFamily: 'var(--font-bricolage)' }}>{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'tagged_list':
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150`}>
                        <div className="space-y-8 md:space-y-12">
                            {renderTitle(section)}
                            {section.content && (
                                <div className={`w-full ${section.isHighlight ? 'pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.04)] border-l-[4px] border-[rgba(0,0,0,0.15)] rounded-r-[10px]' : ''}`}>
                                    <div className="prose prose-slate max-w-none text-[#000000B2] text-[16px] md:text-[18px] leading-[32.5px] font-normal" dangerouslySetInnerHTML={{ __html: section.content }} />
                                </div>
                            )}
                            <div className="flex flex-col">
                                {(section.items || []).map((item: any, iIdx: number) => (
                                    <div key={iIdx} className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-8 ${section.bulletStyle === 'hidden' ? 'py-4' : 'py-6 md:py-8'} ${iIdx !== 0 ? 'border-t border-[#00000010]' : ''}`}>
                                        {section.bulletStyle !== 'hidden' && (
                                            <div className="w-full md:w-1/4 flex-shrink-0">
                                                {item.tag && (
                                                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.08)] rounded-[6px] text-[12px] font-[600] text-[#1D1D1F] whitespace-nowrap">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className={`w-full ${section.bulletStyle === 'hidden' ? 'md:w-full' : 'md:w-3/4'} space-y-3 mt-1 md:mt-0`}>
                                            {item.title && (
                                                <h4 className="text-[16px] md:text-[17px] font-[600] text-[#1D1D1F] leading-[26px] font-sans">
                                                    {item.title}
                                                </h4>
                                            )}
                                            {item.content && (
                                                <p className="text-[14px] md:text-[15px] font-normal text-[#00000099] leading-[1.65] font-sans">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {section.footer_content && (
                                <div className={`mt-8 ${section.isFooterHighlight ? 'pt-5 pr-6 pb-5 pl-6 bg-[rgba(0,0,0,0.03)] border-l-[4px] border-[rgba(0,0,0,0.15)] rounded-r-[8px]' : ''}`}>
                                    <div
                                        className={`prose prose-slate max-w-none text-[#00000099] text-[14px] leading-[24px] prose-p:my-0 ${section.isFooterHighlight ? 'prose-strong:text-[#1D1D1F]' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: section.footer_content || "" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'numbered_list': {
                const isGrid = section.layoutFormat === 'grid';
                const isGreyBullet = section.bulletStyle === 'grey';
                const isHiddenBullet = section.bulletStyle === 'hidden';
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150`}>
                        <div className="space-y-8">
                            {renderTitle(section)}
                            {section.content && (
                                <div
                                    className={`w-full ${section.isHighlight
                                        ? 'pt-6 pr-6 pb-6 pl-7 bg-[rgba(0,0,0,0.05)] border-l-[4px] border-[rgba(0,0,0,0.2)] rounded-r-[10px]'
                                        : ''
                                        }`}
                                >
                                    <div
                                        className="prose prose-slate max-w-none text-[#00000099] text-[16px] leading-[26px]"
                                        dangerouslySetInnerHTML={{ __html: section.content || "" }}
                                    />
                                </div>
                            )}
                            {section.layoutFormat === 'process_list' ? (
                                <div className="flex flex-col pt-4">
                                    {(section.items || []).map((item: any, iIdx: number) => (
                                        <div key={iIdx} className={`flex flex-col md:flex-row gap-6 md:gap-12 py-10 ${iIdx !== 0 ? 'border-t border-[#00000010]' : ''}`}>
                                            <div className="flex-shrink-0 w-full md:w-[60px] pt-1">
                                                <span className="text-[24px] font-[500] text-[#00000020] leading-none font-sans uppercase">
                                                    {String(iIdx + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="flex-grow space-y-2">
                                                {item.label && (
                                                    <p className="text-[12px] font-[600] uppercase tracking-[0.08em] text-[#00000040] leading-none mb-3">
                                                        {item.label}
                                                    </p>
                                                )}
                                                <h4 className="text-[18px] md:text-[19px] font-[600] text-[#1D1D1F] leading-[28px] font-sans">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[15px] md:text-[16px] font-[400] text-[#00000099] leading-[28px] font-sans">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={`${isGrid ? 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12' : (isHiddenBullet ? 'grid grid-cols-1 gap-y-6' : 'grid grid-cols-1 gap-y-10')} group/list pt-4`}>
                                    {(section.items || []).map((item: any, iIdx: number) => (
                                        <div key={iIdx} className={`flex gap-6 group/item ${isHiddenBullet ? 'pt-0' : 'pt-4'}`}>
                                            {!isHiddenBullet && (
                                                <div className={`flex-shrink-0 ${isGreyBullet ? 'w-10 h-10 md:w-11 md:h-11 rounded-full bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.12)] flex items-center justify-center text-[#1D1D1F] text-[13px] md:text-[14px] font-bold group-hover/item:scale-110 transition-transform duration-300' : 'w-12 h-12 rounded-full bg-[#305CDE] flex items-center justify-center text-white text-[14px] font-bold shadow-lg shadow-blue-200/50 group-hover/item:scale-110 transition-transform duration-300'}`}>
                                                    {isGreyBullet ? (iIdx + 1) : String(iIdx + 1).padStart(2, '0')}
                                                </div>
                                            )}
                                            <div className={`space-y-1 ${isHiddenBullet ? 'w-full' : (isGreyBullet ? '' : 'mt-1')}`}>
                                                <h4 className="text-[17px] md:text-[18px] font-[600] text-[#000000] leading-[28px]">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[15px] md:text-[16px] font-[400] text-[#000000B2] leading-[26px]">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }
            case 'showcase_grid': {
                const getLabelPos = (pos: string) => {
                    const mapped = pos === 'top' ? 'top-center' : (pos === 'bottom' ? 'bottom-center' : (pos || 'top-left'));
                    if (mapped.includes('left')) return 'text-left self-start text-start';
                    if (mapped.includes('right')) return 'text-right self-end text-end';
                    return 'text-center self-center';
                };
                const getLabelStyle = (style: string) => {
                    if (style === 'faded') return 'text-[12px] md:text-[14px] font-semibold text-black/50 tracking-[0.15em] uppercase';
                    return 'text-[16px] font-[600] text-[#1E1E1E] tracking-tight';
                };
                return (
                    <div key={index} className={`${mtClass} col-span-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150`}>
                        <div className="space-y-8">
                            {renderTitle(section)}
                            {section.label && (
                                <p className="text-[12px] font-[600] uppercase tracking-[0.96px] text-[#00000066] leading-[16px]">{section.label}</p>
                            )}

                            {section.layoutMode === 'unified' ? (
                                <div className={`bg-[#0000000D] border border-[#0000001A] rounded-[10px] flex flex-nowrap items-center justify-center gap-4 md:gap-16 overflow-hidden h-auto py-8 md:py-8 ${(section.items || []).some((i: any) => i.isSquare) ? 'px-8 md:px-32' : 'px-8 md:px-16'}`}>
                                    {(section.items || []).map((item: any, iIdx: number) => (
                                        <div
                                            key={iIdx}
                                            className={`relative flex flex-col items-center justify-center ${item.isSquare ? 'max-w-[40%]' : 'max-w-[49%]'}`}
                                        >
                                            {item.label && (item.labelPosition === 'top' || (item.labelPosition || 'top-left').includes('top')) && (
                                                <p className={`mb-6 w-full ${getLabelPos(item.labelPosition)} ${getLabelStyle(item.labelStyle)}`}>{item.label}</p>
                                            )}
                                            <div className="relative transition-transform duration-700 hover:scale-[1.05] flex-shrink flex items-center justify-center w-full">
                                                <img
                                                    src={item.image}
                                                    alt={item.title || "Showcase Screen"}
                                                    className={`w-full object-contain block mix-blend-multiply ${item.isSquare ? 'h-[250px] md:h-[420px]' : 'h-[200px] md:h-[350px]'}`}
                                                />
                                            </div>
                                            {item.label && !(item.labelPosition === 'top' || (item.labelPosition || 'top-left').includes('top')) && (
                                                <p className={`mt-6 w-full ${getLabelPos(item.labelPosition)} ${getLabelStyle(item.labelStyle)}`}>{item.label}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-12 gap-6 md:gap-10 pt-4">
                                    {(section.items || []).map((item: any, iIdx: number) => (
                                        <div key={iIdx} className={`${item.size === 'full' ? 'col-span-12' : 'col-span-12 md:col-span-6'} flex flex-col`}>
                                            {item.label && (item.labelPosition === 'top' || (item.labelPosition || 'top-left').includes('top')) && (
                                                <p className={`mb-4 w-full ${getLabelPos(item.labelPosition)} ${getLabelStyle(item.labelStyle)}`}>{item.label}</p>
                                            )}
                                            <div
                                                className={`w-full bg-[#0000000D] border border-[#0000001A] rounded-[10px] p-8 md:p-16 flex items-center justify-center overflow-hidden group transition-all duration-700 min-h-[400px] md:min-h-[500px] flex-grow`}
                                            >
                                                <div className="w-full h-full flex items-center justify-center relative transition-transform duration-700 group-hover:scale-[1.02]">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title || "Showcase Screen"}
                                                        className="w-full h-auto max-h-[300px] md:max-h-[450px] object-contain block mix-blend-multiply"
                                                    />
                                                </div>
                                            </div>
                                            {item.label && !(item.labelPosition === 'top' || (item.labelPosition || 'top-left').includes('top')) && (
                                                <p className={`mt-4 w-full ${getLabelPos(item.labelPosition)} ${getLabelStyle(item.labelStyle)}`}>{item.label}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return (
        <article className="pr-2 md:pr-0 font-sans">
            <div className="flex flex-col items-center px-0 md:px-2 mt-8 mb-2">
                <h1 className="text-[32px] md:text-[40px] font-semibold text-[#1D1D1F] leading-none tracking-normal mb-8 text-center" style={{ fontFamily: 'var(--font-bricolage)' }}>{project.title}</h1>
                <div className="w-full max-w-[1240px] px-0">
                    <p className="text-[16px] md:text-[20px] text-[#000000B2] font-normal w-full text-left leading-[32.5px] tracking-normal mb-8" style={{ fontFamily: 'var(--font-bricolage)' }}>
                        {project.tagline || project.description || project.subTitle}
                    </p>
                </div>

                <div className="w-full max-w-[1240px] px-0">
                    {/* Modern Floating Matrix */}
                    <div className="w-full pb-10 mb-10 space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 md:gap-y-0 text-left">
                            <div className="col-span-1">
                                <p className="text-[14px] font-medium uppercase tracking-[0.7px] text-[#00000066] leading-[20px] mb-2">Company</p>
                                <p className="text-[16px] font-medium text-[#000000] leading-[24px]">
                                    {project.details?.designedFor?.join(" / ")}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] font-medium uppercase tracking-[0.7px] text-[#00000066] leading-[20px] mb-2">Product</p>
                                <p className="text-[16px] font-medium text-[#000000] leading-[24px]">
                                    {project.details?.productName || "—"}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] font-medium uppercase tracking-[0.7px] text-[#00000066] leading-[20px] mb-2">My Role</p>
                                <p className="text-[16px] font-medium text-[#000000] leading-[24px]">
                                    {project.details?.roles?.join(" / ")}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[14px] font-medium uppercase tracking-[0.7px] text-[#00000066] leading-[20px] mb-2">Platform</p>
                                <p className="text-[16px] font-medium text-[#000000] leading-[24px]">
                                    {project.details?.platform}
                                </p>
                            </div>
                            <div className="col-span-1 text-right md:text-left">
                                <p className="text-[14px] font-medium uppercase tracking-[0.7px] text-[#00000066] leading-[20px] mb-2">Timeline</p>
                                <p className="text-[16px] font-medium text-[#000000] leading-[24px]">
                                    {project.details?.timeline}
                                </p>
                            </div>
                        </div>

                        {/* Pills Row */}
                        {project.details?.services && project.details.services.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-4 justify-start">
                                {project.details.services.map((service: string, i: number) => (
                                    <span key={i} className="px-6 py-2 rounded-full border border-[#00000015] text-[14px] font-medium text-[#1D1D1F] whitespace-nowrap hover:bg-[#1E1E1E] hover:text-white transition-all tracking-tight capitalize">
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 mb-1 px-4 md:px-2 overflow-hidden">
                <div className="grid col-span-12 justify-items-center px-0 w-full mb-2">
                    <div className="w-full">
                        <MotionImage
                            isInView={false}
                            xWidth="100%"
                            xHeight="auto"
                            imageSrc={project.heroImage}
                            alt={project.title}
                            priority={true}
                            className="rounded-xl shadow-lg shadow-slate-100/40 w-full h-auto"
                        />
                    </div>
                </div>

                {/* Gating Section */}
                {!showContent && (
                    <div className="col-span-12 border-t border-[#00000010] mt-20 md:mt-20 pt-20 mb-0 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
                        <VerifyPermission onVerify={verifyPS} />
                    </div>
                )}

                {showContent && (
                    <div className="col-span-12 mt-20 md:mt-20 mb-32">
                        {project.sections?.map((section: any, idx: number) => renderSection(section, idx))}
                    </div>
                )}
            </div>
        </article>
    );
}
