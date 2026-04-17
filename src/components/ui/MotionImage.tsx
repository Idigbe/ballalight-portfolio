'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageProps {
  isInView?: boolean;
  imageSrc: string;
  xWidth: string;
  xHeight: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export const MotionImage = ({ isInView = false, imageSrc, alt, xWidth, xHeight, priority = false, className }: ImageProps) => {
  const [xWidthString, setXWidthString] = useState('auto');
  const [xHeightString, setXHeightString] = useState('auto');

  const imageVariant = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.95 },
  }

  useEffect(() => {
    setXWidthString(xWidth.includes('%') || xWidth === 'auto' ? xWidth : `${xWidth}px`);
    setXHeightString(xHeight.includes('%') || xHeight === 'auto' ? xHeight : `${xHeight}px`);
  }, [xWidth, xHeight]);

  // Safe number parsing for Next.js Image attributes
  const safeWidth = isNaN(Number(xWidth)) ? 1200 : Number(xWidth);
  const safeHeight = isNaN(Number(xHeight)) ? 800 : Number(xHeight);

  return (
    <motion.div
      variants={imageVariant}
      initial={isInView ? "hidden" : "visible"}
      animate="visible"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden"
      style={{ 
        width: xWidthString, 
        ...(xHeightString !== 'auto' ? { height: xHeightString } : {}) 
      }}
    >
      <Image
        src={imageSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNFMkU4RjAiLz48L3N2Zz4='}
        alt={alt}
        width={safeWidth}
        height={safeHeight}
        className={className || "object-scale-down w-full h-auto"}
        priority={priority}
        unoptimized // Necessary for static export without Image Optimization API
        loading={priority ? undefined : "lazy"}
      />
    </motion.div>
  );
};