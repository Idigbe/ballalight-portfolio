

import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';
import LetsConnect from '../LetsConnect';
import PrevLink from "../PrevLink";
import NextLink from "../NextLink";

const DS = () => {
  return (

    <article className="pr-2 md:pr-0">

      <div className="flex flex-col items-center px-0 md:px-2  py-5 md:py-10">
        <h1 className='project-main-header md:project-main-header-md'>Design System</h1>
        <p className="project-main-sub md:project-main-sub-md">
          Open-source design system
        </p>
      </div>

      <div className="grid grid-cols-12 my-1">
        {/* Row */}
        <div className="grid col-span-12 justify-items-center px-4 md:px-12 my-2">
          <MotionImage
            isInView={false}
            xWidth="800"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/1.png"}
            alt="Design System"
          />
        </div>

        {/* Start ==================================================================*/}
        <div className="grid col-span-12  px-4 md:px-12 ">
          <h1 className='project-header md:project-header-md  py-5 md:py-10'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-4 md:px-12 my-2 md:pr-16">
          <p className="py-2 project-title md:project-title-md">About</p>
          <article className='project-text md:project-text-md'>
            Light&apos;s Design System and Component Library is an open-source project I created to provide designers with a robust foundation for their work. Launched on May 20, 2024, in the Figma community, this system is designed to be a versatile tool that designers can adapt, learn from, and experiment with according to their needs. Whether you&apos;re starting a new project, refining an existing one, or just exploring design concepts, Light&apos;s Design System offers the resources to help you succeed.
          </article>

          <p className="py-2 project-title md:project-title-md">Challenge</p>
          <article className='project-text md:project-text-md'>
            Designers often struggle with having a consistent and high-quality foundation to start their projects, which can lead to inefficiencies and a steep learning curve when adopting new design tools or standards. Additionally, designers need a versatile and adaptable system that they can customize to fit their unique project requirements and personal design styles.
          </article>

          <p className="py-2 project-title md:project-title-md">Problem Statement</p>
          <article className='project-text md:project-text-md'>
            How might we provide designers with an open-source, adaptable design system that offers a solid foundation for starting new projects, encourages experimentation and learning, and ensures consistency and quality in their design work?
          </article>

        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-4  md:px-2 my-2">
          <div className="">
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 mb-5 space-y-2'>
              <li>Design system designer</li>
              <li>Lead UI Designer</li>
            </ol>

            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 mb-5 space-y-2'>
              <li>Web and Mobile</li>
            </ol>

            <span className="project-title md:project-title-md">Responsibilities</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 mb-5 space-y-2'>
              <li>Research</li>
              <li>Color styles</li>
              <li>Text styles</li>
              <li>Grid and Spacing</li>
              <li>Effect styles</li>
              <li>Icon</li>
              <li>Components i.e Alert, breadcrumb, button, input field etc</li>
              <li>Documentations</li>
              <li>Visual</li>
              <li>Atoms and Molecules</li>
            </ol>
            <span className="project-title md:project-title-md">Tool(s)</span>
            <div className="grid grid-cols-8 md:my-4 md:px-2">
              <div className="grid col-span-12 ">
                <MotionImage
                  isInView={false}
                  xWidth="70"
                  xHeight="auto"
                  imageSrc={"/assets/utility/figma.png"}
                  alt="Design System"
                />
              </div>
              {/* Div */}
            </div>
          </div>

        </div>
        {/* End ==================================================================*/}

        <div className="grid col-span-12  px-4 md:px-12 ">
          <h1 className='project-header md:project-header-md  py-5 md:py-10'> Snapshots of the Local styles ...</h1>
        </div>
        <div className="grid col-span-12 px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/2.png"}
            alt="Design System"
          />
        </div>
        <div className="grid col-span-12 px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/3.png"}
            alt="Design System"
          />
        </div>
        <div className="grid col-span-12 px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/4.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-6 justify-items-center px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/5.png"}
            alt="Design System"
          />
        </div>
        <div className="grid col-span-6 justify-items-center px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/6.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-6 justify-items-center px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/7.png"}
            alt="Design System"
          />
        </div>
        <div className="grid col-span-6 justify-items-center px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/8.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12  px-2 ">
          <h1 className='project-header md:project-header-md  py-5 md:py-10'> Snapshots of some components ...</h1>
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/9.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/10.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/11.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/12.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/13.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/14.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/15.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/16.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/17.png"}
            alt="Design System"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12 justify-items-left px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/ds/18.png"}
            alt="Design System"
          />
        </div>

        {/* Row */}
        <div className="grid col-span-12  px-2 ">
          <h1 className='project-header md:project-header-md  py-5 md:py-10'> Outcome </h1>
        </div>
        <div className="grid col-span-12 justify-items-start px-2">
          <article className='project-text md:project-text-md'>
            Within just two weeks of launching on the Figma community, my design system achieved over 1,000 downloads, receiving positive feedback from other designers who shared how it had significantly improved their workflow and design processes.
          </article>
        </div>

      </div>

      <div className="flex flex-row w-full justify-between justify-items-center my-10 md:px-2">
        <PrevLink link={"/work/ub"} isBack={false} projectTitle="Union Bank - Financials" />
        <NextLink link={"/work/ss"} isNext={true} projectTitle="6th Street - E-commerce" />
      </div>
      <LetsConnect />

    </article >
  );
}

export default DS;