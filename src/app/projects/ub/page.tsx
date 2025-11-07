'use client';
import { useEffect, useState } from "react";

import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';
import VerifyPermission from "@/components/ui/VerifyPermission";
import LetsConnect from '../LetsConnect';
import PrevLink from "../PrevLink";
import NextLink from "../NextLink";

const Designs = ({ url }: { url: string }) => {
  return (
    <div className="grid col-span-6 md:col-span-2 justify-items-center px-1 md:px-2 my-2">
      <MotionImage
        isInView={false}
        xWidth="auto"
        xHeight="auto"
        imageSrc={url}
        alt="BetKing: Payments"
      />
    </div>
  )
}

const UB = () => {
  const [isValiated, setIsValiated] = useState(false);

  const verifyPS = (val: any) => {
    // console.log("UB verifyPS: ", val)
    if (val.verified) {
      // console.log("BP Verified");
      localStorage.setItem("isValiated", val.verified);
      setIsValiated(val.verified);
    }
  }
  useEffect(() => {
    // console.log("localStorage PS: ", Boolean(localStorage.getItem("isValiated")))
    setIsValiated(Boolean(localStorage.getItem("isValiated")));

  }, [isValiated]);

  return (
    <article className="pr-2 md:pr-0">

      <div className="flex flex-col items-center px-0 md:px-2 my-10">
        <h1 className='project-main-header md:project-main-header-md'>Union Bank - Financials</h1>
        <p className="project-main-sub md:project-main-sub-md">
          Improving the mobile banking experience
        </p>
      </div>

      <div className="grid grid-cols-12 my-1 px-0 md:px-2">
        {/* Row */}
        <div className="grid col-span-12 justify-items-center px-0 md:px-2 my-2">
          <MotionImage
            isInView={false}
            xWidth="800"
            xHeight="auto"
            imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/1.png"}
            alt="Union Bank"
          />
        </div>

        {/* Start ==================================================================*/}
        <div className="grid col-span-12  px-0 md:px-2 ">
          <h1 className='project-header md:project-header-md  py-5 md:py-10'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
          <p className="py-2 project-title md:project-title-md">About</p>
          <article className='project-text md:project-text-md'>
            Union Bank of Nigeria (UBN) was established in 1917 and is one of Nigeria&apos;s long-standing and most respected financial institutions, offering a portfolio of banking services to individuals, SMEs, and commercial and corporate clients. With a robust geographical network comprising more than 293 service centers and over 937+ ATMs spread across Nigeria, they have remained committed to helping individuals, families, and businesses grow for nearly a century.
          </article>

          <p className="py-2 project-title md:project-title-md">Challenge</p>
          <article className='project-text md:project-text-md'>
            The current banking app lacks intuitive navigation and fails to provide a seamless user experience, leading to low user engagement and increased customer support inquiries. Users struggle to find essential features, such as account information, transaction history, and fund transfer options, resulting in frustration and a decline in app usage. Additionally, the app&apos;s outdated interface does not reflect the modern banking experience users expect, impacting the bank&apos;s ability to attract and retain customers in a competitive market.
          </article>

        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
          <div className="">
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Lead UX/UI Designer</li>
            </ol>

            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Mobile App</li>
            </ol>
            <span className="project-title md:project-title-md">Responsibilities</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li> User Interview</li>
              <li>Heuristic evaluation</li>
              <li>Define the Problem</li>
              <li>Persona</li>
              <li>Ideation - behavioral psychology</li>
              <li>Information Architecture</li>
              <li>Design System</li>
              <li>Design</li>
              <li>Test</li>
            </ol>

            <span className="project-title md:project-title-md">Tool(s)</span>
            <div className="grid grid-cols-8 md:my-4 md:px-2">
              <div className="grid col-span-12 ">
                <MotionImage
                  isInView={false}
                  xWidth="500"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/utility/ub-util.png"}
                  alt="Union Bank"
                />
              </div>
              {/* Div */}
            </div>
          </div>

        </div>
        {/* End ==================================================================*/}
      </div>
      {
        isValiated &&
        <>
          <div className="grid grid-cols-12 my-1 px-0 md:px-2">

            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md  py-5 md:py-10'> What Customers are saying (Old UI)...</h1>
            </div>
            <div className="grid col-span-12 justify-items-center px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="800"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/2.png"}
                alt="Union Bank"
              />
            </div>
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Insights from Research</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-0 md:px-2 my-2">
              <span className="project-text md:project-text-md">
                We wanted to understand better our users&apos; emotional and physical needs and how they see, understand, and interact with banking platform. We used three methods to understand the problem: Focus group interview, Competitive analysis and CX insights.
                <br /><br />
                Based on user research, typical user responses indicate a mixed experience with the banking app. While users appreciate the app&apos;s convenience for checking balances and conducting basic transactions, they encounter frustrations with complex tasks like fund transfers and occasional errors during transactions, particularly with mobile check deposits.
                <br /><br />
                Users desire enhanced features such as recurring payments and personalized financial insights. Additionally, they prioritize security measures like two-factor authentication and express a need for more intuitive navigation within the app. Overall, users express a willingness to recommend the app with improvements focused on usability, feature enhancement, and responsive customer support.
              </span>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Customer Journey Map </h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/3.png"}
                alt="Union Bank"
              />
            </div>
            <div className='grid col-span-12  justify-items-left px-0 md:px-2 my-2'>
              <span className="project-text md:project-text-md">
                The customer journey map for transferring money to a different bank highlights several issues in the user experience. The process involves multiple steps, resulting in a total time of 25 seconds. Key pain points include a slow app startup, confusing screens, lack of search functionality, redundant information display, and bland page design. Comments suggest improvements such as streamlining the login process, enhancing the visual appeal of pages, adding search capabilities, and clarifying user instructions. These insights indicate a need for a more intuitive, efficient, and visually engaging user interface to enhance the overall customer experience.
              </span>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Competitive Analysis </h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/4.png"}
                alt="Union Bank"
              />
            </div>
            <div className='grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2'>
              <span className="project-text md:project-text-md">
                The competitive analysis reveals that Union Bank needs improvement in navigation and offers inconsistent experiences across devices.
                <br /><br />
                GTBank suffers from information overload but has consistent design. Zenith Bank excels in clear navigation and comprehensive tools. Access Bank provides an intuitive interface with limited customization. Sterling Bank uses vibrant visuals but lacks functionality, while FirstBank focuses on essential features but can improve further.
                <br /><br />
                Performance issues, such as occasional crashes and slow transaction processing, are common across several banks. Customer support varies, with some banks offering 24/7 live chat while others have slow response times. Visual design ranges from outdated to sophisticated across different banks.
              </span>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2 ">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Define the Problem</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <p className="py-2 project-title md:project-title-md pt-5">Empathy Mapping</p>
              <span className="project-text md:project-text-md">
                We divided the mapping into four quadrants that best reflect the key traits the users demonstrated during the observation stage. The four quadrants refer to what the users said, do, say, think and feel.
              </span>

              <p className="py-2 project-title md:project-title-md pt-5">Pain</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li> Difficulty navigating the app leads to frustration and wasted time.</li>
                <li>Errors during transfers cause anxiety and distrust in the app&apos;s reliability.</li>
                <li>Lack of personalized recommendations makes it challenging to manage finances effectively.</li>
                <li>Concerns about data security impact trust and confidence in the app.</li>
              </ol>
              <p className="py-2 project-title md:project-title-md pt-5">Gain</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Quick access to account information saves time and simplifies financial management.</li>
                <li>Personalized financial insights empower users to make informed decisions.</li>
                <li>Reliable security measures build trust and confidence in the app</li>
              </ol>

            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/5.png"}
                alt="Union Bank"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Ideation</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li> To streamline app navigation, we&apos;ll restructure the menu with clear categorization and prioritize frequently used features. This will help users locate functions quickly without unnecessary clicks.</li>
                <li>Enhancing security involves implementing multi-factor authentication and biometric recognition. Real-time transaction monitoring and anomaly detection will prevent fraud, ensuring user peace of mind.</li>
                <li>Personalized financial insights will be provided using machine learning to analyze spending habits and financial goals. This will offer tailored budgeting, savings strategies, and investment opportunities.</li>
                <li>The onboarding process will feature a guided setup wizard with step-by-step instructions, tooltips, and visual cues to assist users.</li>
                <li>Optimizing app performance involves improving backend infrastructure, caching mechanisms, and code optimization to enhance responsiveness and reduce loading times.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/6.png"}
                alt="Union Bank"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Information Architecture </h1>
            </div>
            <div className="grid col-span-12 justify-items-start px-0 md:px-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/7.png"}
                alt="Union Bank"
              />
            </div>
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Designs</h1>
            </div>
            {/* Div */}
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-1.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-2.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-3.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-4.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-5.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-6.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-7.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-8.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-9.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-10.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-11.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/ub/b-12.png" />
          </div>
        </>
      }
      {
        !isValiated &&
        <>
          <VerifyPermission onVerify={verifyPS} />
        </>
      }

      <div className="flex flex-row w-full justify-between justify-items-center my-4 md:px-2">
        <PrevLink link={"/work/tt"} isBack={false} projectTitle="TradeTracker - SaaS" />
        <NextLink link={"/work/ds"} isNext={true} projectTitle="Design System" />
      </div>
      <LetsConnect />


    </article >
  );
}

export default UB;