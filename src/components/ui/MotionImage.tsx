'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import Link from 'next/link';
import Image from "next/image";

// let xWidthString = "";
let xHeightString = "";

interface ImageProps {
  // children?: string;
  isInView: boolean;
  imageSrc: string;
  xWidth: string;
  xHeight: string;
  alt: string;
  // link?: string;

}


export const MotionImage = ({ isInView, imageSrc, alt, xWidth, xHeight }: ImageProps) => {

  const [xWidthString, setXWidthString] = useState('auto');
  const [xHeightString, setXHeightString] = useState('auto');

  // console.log("MotionImage : ", isInView, imageSrc, alt, xWidth, xHeight)
  const imageVariant = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  }

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

  useEffect(() => {

    xWidth === 'auto' ? setXWidthString('auto') : setXWidthString(`${xWidth}px`);
    xHeight === 'auto' ? setXHeightString('auto') : setXHeightString(`${xHeight}px`);
    // console.log("MotionImage alt: ", alt)
    // console.log("MotionImage xWidthString: ", xWidthString)
    // console.log("MotionImage xHeightString: ", xHeightString)

  }, [xWidth, xHeight])

  return (
    <>
      {isInView &&
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        >
          <Image
            className={`w-[${xWidthString}  h-[${xHeightString}] object-scale-down`}
            src={imageSrc || ''}
            alt={alt}
            width={xWidth === 'auto' ? 0 : Number(xWidth)}
            height={xHeight === 'auto' ? 0 : Number(xHeight)}
            fill={false}
            priority={false}
          />
        </motion.div>
      }

      {!isInView &&
        <motion.div
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        // whileInView="visible"
        >
          <Image
            className={`w-[${xWidthString}] h-[${xHeightString}] object-scale-down`}
            src={imageSrc || ''}
            alt={alt}
            width={xWidth === 'auto' ? 0 : Number(xWidth)}
            height={xHeight === 'auto' ? 0 : Number(xHeight)}
            fill={false}
            priority={false}
          />
        </motion.div>
      }


    </>
  );

};