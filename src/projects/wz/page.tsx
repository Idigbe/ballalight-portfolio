
import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';
import LetsConnect from '../LetsConnect';
import PrevLink from "../PrevLink";
import NextLink from "../NextLink";


const WoozeeeCom = () => {
  return (
    <article className="pr-2 md:pr-0">

      <div className="flex flex-col items-center px-0 md:px-2 my-10">
        <h1 className='project-main-header md:project-main-header-md'>Woozeee - E-commerce</h1>
        <p className="project-main-sub md:project-main-sub-md">
          E-commerce UI Design
        </p>
      </div>

      <div className="grid grid-cols-12 my-1 px-2">
        {/* Row */}
        <div className="grid col-span-12 justify-items-center px-0 md:px-2 my-2">
          <MotionImage
            isInView={false}
            xWidth="800"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/1.png"}
            alt="woozeee"
          />
        </div>

        {/* Row */}
        <div className="grid col-span-12  px-0 md:px-2 py-10">
          <h1 className='project-header md:project-header-md'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:p-2 md:pr-5 my-2 md:pr-16">
          <p className="py-2 project-title md:project-title-md ">About</p>
          <article className='project-text md:project-text-md'>
            Woozeee Click N&apos; Shop is the number one marketplace for smart people worldwide. A lifestyle platform that combines the power of a social media community and an eCommerce marketplace to create an experience like no other. The platform makes everylightg users need available, and it&apos;s a place where people can compare prices of the same product with different merchants, thereby getting the best price. Additionally, delivery is prompt (same-day delivery), and orders can be tracked easily.
          </article>

          <p className="py-2 project-title md:project-title-md ">Challenge</p>
          <article className='project-text md:project-text-md'>
            To enhance the user experience on an e-commerce website by making it easier for users to compare prices of products and improve the visual appeal of the website.
          </article>

          <p className="py-2 project-title md:project-title-md ">Problem Statement</p>
          <article className='project-text md:project-text-md'>
            Users on the e-commerce website are finding it difficult to quickly and easily compare prices of similar products, leading to frustration and potential loss of sales. Additionally, the current visual design of the website does not effectively engage users or reflect a modern, appealing aesthetic, which negatively impacts user satisfaction and retention.
            <br /><br />
            The goal is to implement features and design improvements that facilitate effortless price comparison and create a visually attractive and cohesive shopping experience.
          </article>

        </div>

        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:p-2 md:pl-5 my-2">

          <div >
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-0'>
              <li>Lead UI Designer</li>
            </ol>

            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-0'>
              <li>Web and Mobile</li>
              <li>Responsive website</li>
            </ol>

            <span className="project-title md:project-title-md">Responsibilities</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-0'>
              <li>Design System</li>
              <li>Visual Design for mobile</li>
              <li>Visual Design for web</li>
              <li>Visual Design for admin dashboard</li>
            </ol>

            <span className="project-title md:project-title-md">Tool(s)</span>
            <div className="grid grid-cols-8 md:my-4 md:px-2">
              <div className="grid col-span-12 ">
                <MotionImage
                  isInView={false}
                  xWidth="400"
                  xHeight="auto"
                  imageSrc={"/assets/utility/wz-util.png"}
                  alt="woozeee"
                />
              </div>
              {/* Div */}
            </div>
          </div>

        </div>
        {/* Row */}
        <div className="grid col-span-12  px-0 md:px-2  py-10 ">
          <h1 className='project-header md:project-header-md'> Web Designs</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-center px-2 my-4">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/2.png"}
            alt="woozeee"
          />
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-center  px-2  my-4">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/3.png"}
            alt="woozeee"
          />
        </div>
        {/* Row */}
        <div className="grid col-span-12  px-0 md:px-2  py-10">
          <h1 className='project-header md:project-header-md'> Mobile Designs</h1>
        </div>
        {/* Row */}
        <div className="grid col-span-6  md:col-span-3 justify-items-center  px-2  my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/4.png"}
            alt="woozeee"
          />
        </div>
        <div className="grid col-span-6 md:col-span-3 justify-items-center  px-2  my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/5.png"}
            alt="woozeee"
          />
        </div>
        <div className="grid col-span-6 md:col-span-3 justify-items-center  px-2  my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/6.png"}
            alt="woozeee"
          />
        </div>
        <div className="grid col-span-6 md:col-span-3 justify-items-center  px-2  my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/7.png"}
            alt="woozeee"
          />
        </div>

        {/* Row */}
        <div className="grid col-span-12  px-0 md:px-2  py-10">
          <h1 className='project-header md:project-header-md'> Admin and Merchant Dashboard Designs</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6  justify-items-center  px-2 my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/8.png"}
            alt="woozeee"
          />
        </div>
        <div className="grid col-span-12 md:col-span-6  justify-items-center  px-2 my-6">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/woozeee-ecom/9.png"}
            alt="woozeee"
          />
        </div>
      </div>

      <div className="flex flex-row w-full justify-between my-4 md:px-2">
        <PrevLink link={"/work/ss"} isBack={false} projectTitle="6th Street - E-commerce" />
        <NextLink link={"/work/"} isNext={false} projectTitle="" />
      </div>
      <LetsConnect />


    </article >
  );
}

export default WoozeeeCom;