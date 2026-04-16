
'use client';
import Image from 'next/image';
import { motion } from "framer-motion";
import Pageheaders from '@/components/ui/Pageheaders';

const Gallery = () => {

  const imageVariant = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  }

  return (
    <article className="pr-2 md:pr-0">
      <Pageheaders className="px-1" information={`A curated showcase of my creative works and diverse projects`} />
      <div className='flex'>
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        >
          <Image
            className="w-[auto] h-[auto] object-scale-down"
            src="/assets/gallery/gallery.png" alt="Gallery"
            fill={false}
            // width={1024}
            // height={1440}
            width={0}
            height={0}
            unoptimized
            priority
          />
        </motion.div>
      </div>


    </article >
  );
}
export default Gallery;
