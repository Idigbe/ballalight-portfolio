'use client'
import { motion } from "framer-motion";
import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';

interface ImageProps {
  imageSrc: string;
  xWidth: string;
  xHeight: string;
  alt: string;
  link?: string;
  title: string;
  subTitle?: string;

}

export const MotionPortfolio = ({ imageSrc, alt, xWidth, xHeight, link, title, subTitle }: ImageProps) => {

  const imageMotion = {
    rest: {
      // color: "#1d1d1f",
      color: 'var(--foreground)',
      x: 0,
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn"
      }
    },
    hover: {
      color: "#ec7e7e",
      x: 10,
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeOut"
      }
    }
  };

  const backgroundVariant = {
    initial: {
      backgroundColor: "#ec7e7e",
    },
    hover: {
      backgroundColor: "#022D42",
      transition: {
        delay: 0.1,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    },
    animate: {
      backgroundColor: "#F2FFBD",
      transition: {
        delay: 0.1,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };


  return (
    <motion.div
      className="grid col-span-12 md:col-span-6 justify-items-center py-2 p-1 md:p-2"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={imageMotion}
    >
      <Link href={link || ""}>
        <MotionImage
          isInView={false}
          xWidth={xWidth}
          xHeight={xHeight}
          imageSrc={imageSrc}
          alt={alt}
        />

        <div className="flex flex-row  w-full justify-between my-4 px-2 md:px-4">
          <div className="font-semibold text-base md:text-2xl px-0">
            <span className="flex">
              {title}
            </span>
            <span className="font-light md:font-normal text-[10px] md:text-base">
              {subTitle}
            </span>
          </div>

          <div className="flex" >
            <i className="fas fa-arrow-right text-xl md:text-2xl btn-icon-primary" />
          </div>
        </div>
      </Link>
    </motion.div>
  );

};