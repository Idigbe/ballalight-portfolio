
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
    <div className="md:hidden grid col-span-6 justify-items-center px-1  my-2">
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

const DesignsMd = ({ url }: { url: string }) => {
  return (
    <div className="hidden md:grid  justify-items-center pr-2">
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

const BetKingPayments = () => {

  const [isValiated, setIsValiated] = useState(false);

  const verifyPS = (val: any) => {
    // console.log("BP verifyPS: ", val)
    if (val.verified) {
      // console.log("BP Verified");
      localStorage.setItem("isValiated", val.verified);
      setIsValiated(val.verified);
    }
  }

  useEffect(() => {
    // console.log("BP localStorage PS: ", Boolean(localStorage.getItem("isValiated")))
    setIsValiated(Boolean(localStorage.getItem("isValiated")));

  }, [isValiated]);


  return (
    <article className="pr-2 md:pr-0">

      <div className="flex flex-col items-center px-0 md:px-2 my-10">
        <h1 className='project-main-header md:project-main-header-md'>BetKing - Payments</h1>
        <p className="project-main-sub md:project-main-sub-md">
          Revamping the payment experience
        </p>
      </div>

      <div className="grid grid-cols-12 my-1 px-0 md:px-0">
        <div className="grid col-span-12 justify-items-center px-0 md:px-0 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/bk-deposit-landing.jpg"}
            alt="BetKing: Payments"
          />
        </div>
        {/* Start ==================================================================*/}
        <div className="grid col-span-12  px-0  ">
          <h1 className='project-header md:project-header-md py-5 md:py-10'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-1  my-2">
          <span className="project-title md:project-title-md md:pr-16">About

            <div className='project-text md:project-text-md'>
              BetKing is a leading sports betting and gaming company in Africa, known for its extensive sportsbook, virtual games, and online casino offerings.
              <br /> <br />
              It provides competitive odds, a user-friendly platform, and innovative features tailored to the African market.
            </div>

            <span className="project-title md:project-title-md">Challenge</span>

            <div className='project-text md:project-text-md'>
              The pain points based on customer feedback and analytical tools insights were information overload, difficulty choosing a payment method, inconsistency & repetitive experience, leading to a high drop-off rate and long completion time.
            </div>

            <span className="project-title md:project-title-md">Problem Statement</span>
            <div className='project-text md:project-text-md'>
              User who is a first time or existing customer need to be able to make and complete a deposit with ease and in due time because they need to be able to place their bet.
            </div>

          </span>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
          <div >
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Senior Product Designer - Payment</li>
            </ol>
            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>iOS / Android</li>
              <li>Responsive Web</li>
            </ol>

            <span className="project-title md:project-title-md">Responsibilities</span>
            <article className='project-text md:project-text-md'>
              As the sole designer on the payment team, my responsibilities includes:
            </article>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Survey</li>
              <li>Data Analytics - Demographics | Behavioral | Engagement | Usability</li>
              <li>Competitive analysis</li>
              <li>Empathy Mapping</li>
              <li>Customer Journey Mapping</li>
              <li>Workshops</li>
              <li>User flow</li>
              <li>Payment Design System</li>
              <li>Designs</li>
              <li>Prototypes</li>
              <li>User testing - Focus group</li>
            </ol>
            <span className="project-title md:project-title-md">Tool(s)</span>
            {/* <div className={`grid grid-cols-8 md:my-4 md:px-2 ${mode === 'dark' ? `bg-foreground` : ''} `}> */}
            <div className='grid grid-cols-8 md:my-4 md:px-2'>
              <div className="grid col-span-12 ">
                <MotionImage
                  isInView={false}
                  xWidth="400"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/utility/bk-mob-util.png"}
                  alt="Trade Trackers"
                />
              </div>
              {/* Div */}
            </div>
          </div>
        </div>
      </div>
      {
        isValiated &&
        <>
          <div className="grid grid-cols-12 my-1 px-0 md:px-2">
            <div className="grid col-span-12  px-0 ">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Context</h1>
            </div>

            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 my-2  md:pr-16">
              <p className="project-title md:project-title-md">The goal</p>
              <article className='project-text md:project-text-md '>
                The goal is to revamp payments to meet customer&apos;s needs by defining the users&apos; problems and finding creative solutions for these problems. Blending user needs with business goals to help make consistently successful products
              </article>

              <p className="project-title md:project-title-md">What to understand</p>
              <article className='project-text md:project-text-md '>
                User who is a first time or existing customer need to be able to make and complete a deposit with ease and in due time because they need to be able to place their bet.
              </article>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>The current journey of depositing and withdrawing</li>
                <li>The biggest struggles and frustrations for users when using paymentThe biggest struggles and frustrations for users when using payment</li>
                <li>The unique preferences of what users look out for when making payment</li>
                <li>The non-negotiable when it comes to depositing and withdrawing</li>
                <li>What motivates the users to deposit on one platform over another</li>
              </ol>

            </div>

            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/target.png"}
                alt="BetKing: Payments"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-left px-0 my-8">
              <h1 className='project-header md:project-header-md py-5 md:py-10'>Survey</h1>
            </div>

            <div className="grid  col-span-12 md:col-span-6 px-0  my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/user-survey.png"}
                alt="BetKing: Payments"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <span className="project-header md:project-header-md">Insights
                <br /><br />
                <span className='project-text md:project-text-md  md:pr-16'>
                  All payment methods needed to be grouped into their respective categories. We realised that the current deposit journey was priotizing the third-party providers rather than the payment method itself i.e Based on the survey on Maze, we realised that 26% of testers picked Card as a category over Paystack (24%) which provides the same function.
                  <br /><br />
                  This further validates our assumption that not users are aware of what the third-party providers do and it was expedient that we provided a way to aids their decision making.
                </span>
              </span>

            </div>
            <div className="grid col-span-12 justify-items-left px-0 my-8">
              <h1 className='project-header md:project-header-md py-5 md:py-10'>Customer Journey Map</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6  justify-items-left px-0 md:px-2 my-2  md:pr-16">
              <p className="project-title md:project-title-md">Major Insights</p>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li> We discovered that the <b>average conversion rate</b> was <b>59.90s%</b> which was quite low</li>
                <li> <b>Long completion time</b> which was an average of <b></b>7mins</li>
                <li><b>High drop of rate</b> and failed deposit was an average of <b>36.8%</b></li>
                <li>Existing users always having to input card details every time they want to make a deposit</li>
                <li> Information overload and inconsistent experience</li>
                <li> Time out due to numerous OTP requests etc which led to a <b>18.4%</b> abandoned deposit transaction</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6  justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/paystack.png"}
                alt="BetKing: Payments"
              />
            </div>

            {/* Row */}
            <div className="grid col-span-12 justify-items-left px-0 my-8">
              <h1 className='project-header md:project-header-md py-5 md:py-10'>Competitive Analysis</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/cs.png"}
                alt="BetKing: Payments"
              />
            </div>

            <div className="grid col-span-12 md:col-span-6  justify-items-left px-0 md:px-2 my-2  md:pr-16">
              <p className="project-title md:project-title-md">Insights</p>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li> Competitors are excelling in offering diverse payment options, leveraging fintech apps for reliability, speed, and cost-effectiveness.</li>
                <li> Identified opportunities to enhance both deposit and withdrawal processes.</li>
                <li>Recognized our lack of standout features compared to competitors.</li>
                <li>Identified key areas for improvement, including modern payment methods, ease of use, error reduction, faster completion times, seamless transitions to third-party providers, and consistent UI.</li>
                <li>Competitors lag in ease of use, outdated technology, lengthy completion times, inconsistent UI, and lack of intuitiveness.</li>
                <li>Leveraged insights to become industry benchmark, prompting competitors to emulate our designs post-launch.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12 px-0 pb-4">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Ideation: Behavioral pyschology</h1>
              <p className="project-text md:project-text-md">In other to generate ideas and solve clearly defined design problems - we needed to answer the how might we questions.</p>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li> How might we reduce information overload?</li>
                <li> How might we simplify choosing a payment method?</li>
                <li>How might we reduce high drop off rate?</li>
                <li>How might we reduce completion time?</li>
                <li>How might we reduce repetitive experiences?</li>
                <li>How might we introduce consistent UI?</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 px-0 md:px-2 ">
              <div className="max-w-[75%] md:max-w-[50%]">
                <MotionImage
                  isInView={false}
                  xWidth="auto"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/risk.png"}
                  alt="BetKing: Payments"
                />
              </div>
              <div className="flex flex-row  w-[90%]  my-4  md:pr-16">
                <span className="project-text md:project-text-md">
                  In other not to confuse already existing users
                  we decided to introduce an idea of having a section that will be tagged <b className="font-semibold">“Popular deposit method”</b>.
                  <br /><br />
                  Introducing popular deposit method will ensure
                  that users who are already familiar with choosing a particular method stick to what they know.
                  <br /><br />
                  When making choices we tend to avoid new and mysterious ones, even if comes with benefit, having that balance was expedient in this process.
                  <span className="hidden md:flex md:h-10">
                    &nbsp;
                  </span>
                </span>
              </div>
            </div>
            <div className="grid col-span-12 md:col-span-6 px-0 md:px-2">
              <div className="max-w-[75%] md:max-w-[50%]">
                <MotionImage
                  isInView={false}
                  xWidth="auto"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/chunking.png"}
                  alt="BetKing: Payments"
                />
              </div>
              <div className="flex flex-row  w-[90%]  my-4  md:pr-16">
                <span className="project-text md:project-text-md">
                  One the major pain point was around the difficulty of depositing due to the difficulty of choosing a payment method. We decided to introduce <b className="font-semibold">“Chunking”</b>
                  <br /><br />
                  Grouping all the payment method into categories will help the users process information better. Chunking information has a significant effect on our ability to first read and then remember it.
                  <br /><br />
                  So instead of having all the third-party logos listed without context, we decide to introduce chunking them which will provide enough understanding of the payment method without too much information.
                </span>
              </div>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 px-0 md:px-2">
              <div className="max-w-[75%] md:max-w-[50%]">
                <MotionImage
                  isInView={false}
                  xWidth="auto"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/default-effect.png"}
                  alt="BetKing: Payments"
                />
              </div>

              <div className="flex flex-row  w-[90%] my-4  md:pr-16 ">
                <span className="project-text md:project-text-md">
                  In other to solve the problem of repetitive experiences, we decided to introduce the <b className="font-semibold">default effect</b>
                  <br /><br />
                  Pre- selecting options like saved cards and Payment Gateway helps to make the experience easier.
                  <br /><br />
                  Hence, users are unlikely to deviate from default options presented to them and users take mental shortcuts (especially when tired) and because there&apos;s implied trust that they&apos;re the &apos;right&apos; choice.
                </span>
              </div>
            </div>
            <div className="grid col-span-12 md:col-span-6 px-0 md:px-2">
              <div className="max-w-[75%] md:max-w-[50%]">
                <MotionImage
                  isInView={false}
                  xWidth="auto"
                  xHeight="auto"
                  imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/feedback-loops.png"}
                  alt="BetKing: Payments"
                />
              </div>
              <div className="flex flex-row  w-[90%] my-4  md:pr-16 ">
                <span className="project-text md:project-text-md">
                  In other to solve the problem of high drop of rate. we decided to introduce <b className="font-semibold">feedback loops </b>
                  <br /><br />
                  Feedback loops helps provide enough clarity on what users are doing or why they need to wait while processing transactions.
                  <br /><br />
                  Users look for information that provides clarity to their actions.
                  <span className="hidden md:flex md:h-16">
                    &nbsp;
                  </span>
                </span>
              </div>
            </div>

            <div className="grid col-span-12 px-0  my-4">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Designs</h1>
            </div>
            {/* Div Mobile =========================================================== */}
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-1.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-2.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-3.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-4.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-5.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-6.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-7.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-8.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-10.png" />
            <Designs url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-9.png" />

          </div>
          {/*  =========================================================== */}
          <div className="flex flex-row  justify-items-center md:my-4 px-0">
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-1.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-2.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-3.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-4.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-5.png" />

          </div>
          {/*  =========================================================== */}
          <div className="flex flex-row  justify-items-center md:my-4 md:px-0">
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-6.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-7.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-8.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-10.png" />
            <DesignsMd url="https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/dep-card-9.png" />
          </div>
          {/*  =========================================================== */}
          {/* Row */}
          <div className="grid grid-cols-12 my-1 px-0 md:px-2">
            <div className="grid col-span-12  px-0">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Before meets After</h1>
            </div>
            <div className="grid col-span-12 justify-items-center px-0 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/before-meets-after.png"}
                alt="BetKing: Payments"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 ">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Test and Result</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-start px-0 md:px-2 my-2">
              <p className="project-title md:project-title-md py-2">Focus Group</p>
              <span className="project-text md:project-text-md">
                The general sentiment regarding the new deposit experience was positive, with customers expressing that it was “fantastic” and “easy” to complete. While some users mentioned occasional deposit issues, they acknowledged that these were usually not BetKing&apos;s fault, but rather resulted from banks or service provider issues.
              </span>

              <p className="project-title md:project-title-md py-2 pt-5">Outcome</p>

              <span className="project-text md:project-text-md pt-2 pb-5 ">  The outcome were remarkable. </span>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>We noticed an improve success rate by <b className="font-semibold">12% on card</b> journeys and</li>
                <li>A reduction in time to <b className="font-semibold">completion by 40%</b>. With Deposit reduction in time from 7mins to 2mins. And a reduced in the amount of steps from 12 to 4 steps</li>
                <li>Opay deposit method increased to about <b className="font-semibold">70% usage</b></li>
                <li>Experience and interface more consistent , reduction in information overload and overall user satisfaction</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6  justify-items-center px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/projects/bk-payment/target2.png"}
                alt="BetKing: Payments"
              />
            </div>
            {/* Bottom Nav */}
          </div>
        </>
      }

      {
        !isValiated &&
        <>
          <div className="px-1">
            <VerifyPermission onVerify={verifyPS} />
          </div>

        </>
      }
      <div className="flex flex-row w-full justify-between justify-items-center my-4 md:px-2">
        <PrevLink link={"/work/"} isBack={true} projectTitle="" />
        <NextLink link={"/work/tt"} isNext={true} projectTitle="TradeTracker - SaaS" />
      </div>

      <LetsConnect />


    </article >
  );
}

export default BetKingPayments;