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
}

export const MotionImage = ({ isInView = false, imageSrc, alt, xWidth, xHeight, priority = false }: ImageProps) => {
  const [xWidthString, setXWidthString] = useState('auto');
  const [xHeightString, setXHeightString] = useState('auto');

  const imageVariant = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.95 },
  }

  useEffect(() => {
    setXWidthString(xWidth === 'auto' ? 'auto' : `${xWidth}px`);
    setXHeightString(xHeight === 'auto' ? 'auto' : `${xHeight}px`);
  }, [xWidth, xHeight]);

  return (
    <motion.div
      variants={imageVariant}
      initial={isInView ? "hidden" : "visible"}
      animate="visible"
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden"
      style={{ width: xWidthString, height: xHeightString }}
    >
      <Image
        src={imageSrc || ''}
        alt={alt}
        width={xWidth === 'auto' ? 1200 : Number(xWidth)}
        height={xHeight === 'auto' ? 800 : Number(xHeight)}
        className="object-scale-down w-full h-auto"
        priority={priority}
        unoptimized // Necessary for static export without Image Optimization API
        loading={priority ? undefined : "lazy"}
      />
    </motion.div>
  );
};