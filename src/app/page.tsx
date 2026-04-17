'use client';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import Image from 'next/image';
import arrow from '../../public/images/arrow.gif';

let videoVariant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
}

const Showcase = ({ url, width, height, bgColor }: { url: string, width: string, height: string, bgColor: string }) => {
  const [ref, inView] = useInView();
  return (
    <div className={`grid col-span-12 md:col-span-4 justify-items-center p-2 my-2 md:my-0  md:p-2 md:mx-2 rounded-3xl `} style={{ backgroundColor: bgColor }}>
      <motion.div
        ref={ref}
        variants={videoVariant}
        initial="hidden"
        animate="visible"
        // whileInView="visible"
        className='video'
      >
        <ReactPlayer playing loop muted width={width} height={height} className="react-player"
          url={url}
        />
      </motion.div>
    </div>
  )
}
const Home = () => {

  return (
    <article className="pr-2 md:pr-0">
      <section className="md:grid md:grid-cols-12 mt-2 ">
        <div className="grid md:col-span-5">
          <div className="flex flex-col md:pt-10">
            {/* <article className="prose lg:prose-xl"> */}
            <p className='font-normal text-base md:text-xl md:px-1'>Hi 👋🏾, my name is</p>
            {/* <p className='text-5xl font-bold my-2'>Light Balla</p> */}
            <motion.div
              initial={{ y: -1000, opacity: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
              className="text-[60px] md:text-[90px] font-extrabold"
            >
              Light Balla
            </motion.div>
            <p className='font-normal text-base md:text-xl mb-1  md:px-1' >aka Light Design</p>
            <p className='font-normal text-base md:text-xl my-3  md:px-1'>
              I am a Product Designer based in <span className='font-thin text-gray-300 line-through'>Lagos, Dubai </span>London, with over 8 years of expertise in creating innovative user-centered & data-driven designs for both Mobile and Web.
            </p>
            <div className="flex-none md:pt-10 md:px-1">
              <span className="dark-outline  md:dark-outline-md mt-6 " >
                <i className="fas fa-circle fa-2xs text-[#5DEE2A]" />
                &nbsp;Available for opportunities
              </span>
            </div>

            <div className='hidden  md:flex md:flex-col md:items-end md:justify-items-right pr-10'>
              <div className='hidden  md:flex md:flex-row max-h-24 md:items-end md:justify-items-right'>
                <Image
                  className="w-[auto] h-[80%] object-scale-down"
                  src={arrow}
                  alt="loading..."
                  unoptimized
                  width={0}
                  height={0}
                />
              </div>
            </div>
          </div>

        </div>

        <div className="grid md:col-span-3">
        </div>

        <div className="hidden md:grid md:col-span-4 p-2">
          <div className="flex flex-col items-end justify-items-right">
            <motion.div
              variants={videoVariant}
              initial="hidden"
              animate="visible"
              // whileInView="visible"
              className='video'
            >
              <video autoPlay loop muted className="w-[auto] h-[auto] object-cover rounded-3xl">
                <source
                  src={"/assets/home/vid-1.mp4"}
                  type="video/mp4"
                  width={0}
                  height={0}
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>

      </section>
      <section className="flex flex-col items-start mb-1 mt-20 md:mt-0 md:px-1">
        <p className='title md:title-md'>Preview of my work</p>
        <motion.div
          variants={videoVariant}
          initial="hidden"
          animate="visible"
          // whileInView="visible"
          className='video'
        >
          <div className="flex flex-col items-center my-2">
            <video autoPlay loop muted className="w-[auto] h-[auto] object-cover">
              <source src={"/assets/home/web-portfolio.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </section>
      <section className="flex flex-col  md:items-end my-6 px-0 md:px-1">
        <Link href="/work" className=" btn-primary md:btn-primary-md  my-4 md:my-4">
          View Case Study &nbsp;
          <i className="fas fa-arrow-right" />
        </Link>
      </section>

      <section className="flex flex-col items-center justify-items-center p-0 my-2 md:hidden ">
        <motion.div
          variants={videoVariant}
          initial="hidden"
          animate="visible"
          // whileInView="visible"
          className='video'
        >
          <video autoPlay loop muted className="w-[auto] h-[auto]  object-cover rounded-xl">
            <source src={"/assets/home/vid-1.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </section>

      <section className="flex flex-col items-start my-5  md:px-1">
        <p className='title md:title-md md:px-1'>Design Showcase</p>
      </section>
      <section className="grid grid-cols-12 my-1 ">
        <Showcase
          url={"/assets/home/bt-1.mp4"}
          // width={"380px"}
          // height={"620px"}
          width={"100%"}
          height={"100%"}
          bgColor="#D8D6DD"
        />
        <Showcase
          url={"/assets/home/bt-2.mp4"}
          width={"100%"}
          height={"100%"}
          bgColor="#FAFAFA"
        />
        <Showcase
          url={"/assets/home/bt-3.mp4"}
          width={"100%"}
          height={"100%"}
          bgColor="#F5F5F5"
        />
      </section>

      <section className="flex flex-col  md:items-start my-6 px-0 md:px-1">
        <p className='title md:title-md'> Need more details on my experience? </p>
        <Link href="/assets/my-portfolio.pdf" target='_blank' className="btn-primary md:btn-primary-md  my-4 md:my-4">
          Download CV&nbsp;
          <i className="fas fa-arrow-right" />
        </Link>
      </section>

    </article >
  );
}
export default Home;
