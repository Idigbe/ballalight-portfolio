
'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { MotionImage } from '@/components/ui/MotionImage';
import VerifyPermission from "@/components/ui/VerifyPermission";
import LetsConnect from '../LetsConnect';
import PrevLink from "../PrevLink";
import NextLink from "../NextLink";

const TradeTracker = () => {

  const [isValiated, setIsValiated] = useState(false);

  const verifyPS = (val: any) => {
    // console.log("TT verifyPS: ", val)
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
        <h1 className='project-main-header md:project-main-header-md'>TradeTracker - SaaS</h1>
        <p className="project-main-sub md:project-main-sub-md">
          Upgraded main dashboard for TradeTracker affiliate app
        </p>
      </div>

      <div className="grid grid-cols-12 my-1 px-0 md:px-2">
        {/* Row */}
        <div className="grid col-span-12 justify-items-center px-2 my-2">
          <MotionImage
            isInView={false}
            xWidth="auto"
            xHeight="auto"
            imageSrc={"/assets/work/projects/trade-tracker/tt.png"}
            alt="Trade Trackers"
          />
        </div>

        {/* Start ==================================================================*/}
        <div className="grid col-span-12  px-0 md:px-2 ">
          <h1 className='project-header md:project-header-md py-5 md:py-10'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
          <p className="py-2 project-title md:project-title-md">About</p>
          <article className='project-text md:project-text-md'>
            TradeTracker is a leading affiliate marketing platform that connects advertisers with publishers to drive sales and revenue. Our platform serves a diverse range of users, including advertisers, publishers, and agencies.
          </article>

          <p className="py-2 project-title md:project-title-md">Challenge</p>
          <article className='project-text md:project-text-md'>
            The platform serves a diverse range of users, including advertisers, publishers, and agencies. Challenge is to design an intuitive and user-friendly dashboard that caters to the unique needs of these diverse user groups.
          </article>

          <p className="py-2 project-title md:project-title-md">Problem Statement</p>
          <article className='project-text md:project-text-md'>
            User who is a first time or existing customer need to be able to make and complete a deposit with ease and in due time because they need to be able to place their bet.
          </article>

        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
          <div className="">
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Senior Product Designer </li>
            </ol>

            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Responsive Web</li>
            </ol>

            <span className="project-title md:project-title-md">Responsibilities</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
              <li>Heuristic evaluation</li>
              <li>Platform analysis</li>
              <li>Personas</li>
              <li>Information architecture</li>
              <li>Wireframes</li>
              <li>Design system</li>
              <li>Designs</li>
              <li>Prototypes</li>
            </ol>

            <span className="project-title md:project-title-md">Tool(s)</span>
            <div className="grid grid-cols-8 md:my-4 md:px-2">
              <div className="grid col-span-12 ">
                <MotionImage
                  isInView={false}
                  xWidth="400"
                  xHeight="auto"
                  imageSrc={"/assets/utility/tt-util.png"}
                  alt="Trade Trackers"
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
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Heuristic evaluation - Understand</h1>
            </div>

            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <article className='project-text md:project-text-md'>
                Before carrying out any product feature, revamp, initiative or project. It&apos;s essential to first of all understand the problem you are trying to solve before going into the define stage, ideation and essential Design.
                <br /><br />
                In this case on the method I used to understand the problem for this approach is the <b className="font-semibold">“Heuristic evaluation approach”</b>
                <br /><br />
                Here are the Issues Identified in summary:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Lack of contextual information and real-time updates.</li>
                <li>Overly technical language without explanations.</li>
                <li>Limited user control and less accessible top menu.</li>
                <li>Inconsistencies in layout and icons.</li>
                <li>Cluttered interface causing difficulty in recognizing information.</li>
                <li>Not flexible for new users.</li>
                <li>Cluttered design lacking focus on key metrics.</li>
                <li>Lack of help and documentation.</li>
              </ol>

            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-center px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/tt-3.png"}
                alt="Trade Trackers"
              />
            </div>

            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2 ">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Heuristic evaluation - Solution</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <article className='project-text md:project-text-md'>
                Now that I have been able to understand the problem, here are the proffered solutions to it
                <br /> <br />
                <b className="font-semibold">Solutions:</b>
                <br /> <br />
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Enhance real-time updates and add contextual comparisons.</li>
                <li>Use intuitive language and provide tooltips.</li>
                <li>Implement and use a sidebar menu.</li>
                <li>Ensure consistency in design elements.</li>
                <li>Add data validation and feedback mechanisms.</li>
                <li>Simplify the interface with grouping and progressive disclosure.</li>
                <li>Provide customizable views for different user levels.</li>
                <li>Reduce visual clutter and use whitespace.</li>
                <li>Include a comprehensive help section with tutorials and FAQs.</li>
              </ol>

            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-center px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/tt-4.png"}
                alt="Trade Trackers"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> 5 Platform Analysis</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/slack.png"}
                alt="Trade Trackers"
              />
              <article className='project-text md:project-text-md my-5'>
                Reason for Choice:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>User-Centric Design: Slack prioritizes user experience with a highly intuitive interface and seamless onboarding process.</li>
                <li>Customizable Workspace: Users can personalize their workspaces with themes and shortcuts, enhancing usability.</li>
                <li>Effective Collaboration Tools: Integrated features like channels, direct messages, and third-party app integrations streamline communication and collaboration.</li>
                <li>Engaging Micro-Interactions: Subtle animations and feedback mechanisms keep users engaged and informed about ongoing actions.</li>
              </ol>
            </div>

            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/stripe.png"}
                alt="Trade Trackers"
              />
              <article className='project-text md:project-text-md  my-5'>
                Reason for Choice:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Clean and Modern Design: Stripe uses a minimalistic design with ample white space, making the interface clean and easy to navigate.</li>
                <li>Intuitive Navigation: The platform features intuitive navigation with well-organized menus and a clear information hierarchy.</li>
                <li>Developer-Friendly: Comprehensive and user-friendly documentation, along with an interactive API reference, enhances the developer experience.</li>
                <li>Consistent Branding: The use of consistent color schemes, typography, and visual elements strengthens brand identity.</li>
              </ol>
            </div>

            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/notion.png"}
                alt="Trade Trackers"
              />
              <article className='project-text md:project-text-md  my-5'>
                Reason for Choice:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Flexibility and Versatility: Notion offers a flexible workspace that can be customized for various use cases, from note-taking to project management.</li>
                <li>Visual Clarity: A clean, minimalist design with drag-and-drop functionality makes it easy to organize information visually.</li>
                <li>Seamless Collaboration: Real-time collaboration features, including comments and shared workspaces, improve team productivity.</li>
                <li>Ease of Use: The platform provides intuitive templates and a user-friendly interface, reducing the learning curve.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/duolingo.png"}
                alt="Trade Trackers"
              />
              <article className='project-text md:project-text-md  my-5'>
                Reason for Choice:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Engaging and Fun Interface: Duolingo&apos;s gamified approach to language learning makes the experience engaging and enjoyable.</li>
                <li>Clear Progress Tracking: Users can easily track their learning progress and achievements, motivating continued use.</li>
                <li>Bite-Sized Lessons: The platform&apos;s design focuses on short, manageable lessons that fit into any schedule, enhancing usability.</li>
                <li>Vibrant Visuals and Animations: Bright colors, animations, and characters create an inviting and interactive learning environment.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/salesforce.png"}
                alt="Trade Trackers"
              />
              <article className='project-text md:project-text-md  my-5'>
                Reason for Choice:
              </article>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-6 md:px-8 mb-5 space-y-2'>
                <li>Comprehensive Dashboards: Salesforce offers customizable dashboards that provide clear visualizations of key metrics and data.</li>
                <li>Modular Design: The platform uses a modular design approach, allowing users to tailor their experience based on their specific needs.</li>
                <li>Robust Search Functionality: Advanced search and filtering options enable users to find information quickly and efficiently.</li>
                <li>Integration Capabilities: Seamless integration with other tools and platforms enhances user productivity and streamlines workflows.</li>
              </ol>
            </div>
            {/* <div className="grid col-span-6 justify-items-left px-2 my-2">
              &nbsp;
            </div> */}
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Personas </h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-start px-0 md:px-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/ux-persona-1.png"}
                alt="Trade Trackers"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-start px-0 md:px-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/ux-persona-2.png"}
                alt="Trade Trackers"
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
                imageSrc={"/assets/work/projects/trade-tracker/as-tt.png"}
                alt="Trade Trackers"
              />
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Designs - Light and Dark Mode</h1>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-start px-0 md:px-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/dash-light.png"}
                alt="Trade Trackers"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-start px-0 md:px-2">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/trade-tracker/dash-dark.png"}
                alt="Trade Trackers"
              />
            </div>
            <div className="grid col-span-12  px-0 md:px-2">
              <h1 className='project-header md:project-header-md py-5 md:py-10'> Design Rationale</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
              <p className="py-2 project-title md:project-title-md">Overview</p>
              <span className="project-text md:project-text-md">
                The redesigned TradeTracker.com dashboard enhances user experience by addressing the needs of two primary personas: Wade Warren, an independent affiliate marketer, and Sandra Olus, a digital marketing manager at an agency. The new design focuses on intuitive navigation, visual appeal, and functional robustness, featuring both dark and light modes for user preference.
              </span>

              <p className="py-2 project-title md:project-title-md pt-5">Design Choices</p>

              <ul style={{ listStyleType: '' }} className='project-text md:project-text-md px-0 mb-5 space-y-2'>
                <li> 1. Color Scheme and Mode:
                  <br /><br />
                  Dark Mode: Reduces eye strain, ideal for low-light environments, and provides a modern look.<br />
                  Light Mode: Clean and bright, ensuring clarity and readability for daytime use.
                </li>
                <li> 2. Layout and Navigation:
                  <br /><br />
                  Sidebar Menu: Improves accessibility and content space, categorized into Overview, Tools, and Account sections.<br />
                  Top Bar: Contains user profile, notifications, search, and quick settings, maintaining a clean interface.
                </li>
                <li> 3. Information Hierarchy:
                  <br /><br />
                  Key Metrics: Prominently displayed for a quick overview of important figures like clicks, leads, impressions, sales, and commission.<br />
                  Performance Graphs: Central placement for trend analysis.<br />
                  Detailed Tables: In-depth data on campaigns with pagination for easy navigation.
                </li>
                <li> 4. Interactive Elements:
                  <br /><br />
                  Filters and Comparison Tools: Allow customized data views, providing analysis flexibility.<br />
                  Micro Animations and Tooltips: Offer additional information on hover, enhancing usability.
                </li>
                <li> 5. Branding and Visual Consistency:
                  <br /><br />
                  Logo and Color Palette: Ensures consistent branding.<br />
                  Typography: Uses clean, modern fonts for readability.
                </li>
              </ul>

            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 ">
              <p className=" project-title md:project-title-md py-5 md:py-10">User Journey</p>

              <p className="py-2 project-text md:project-text-md pt-5">Wade Warren - Independent Affiliate Marketer:</p>

              <ul style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-4 md:px-7 mb-5 space-y-1'>
                <li>Login: Checks key metrics.</li>
                <li>Review Performance: Analyzes trends and identifies underperforming areas.</li>
                <li>Optimize Campaigns: Adjusts budget and updates creatives.</li>
                <li>Explore Offers: Browses new promotional opportunities.</li>
                <li>Logout: Logs out after adjustments.</li>
              </ul>

              <p className="py-2 project-text md:project-text-md pt-5">Sandra Olus - Digital Marketing Manager:</p>

              <ul style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-4 md:px-7 mb-5 space-y-1'>
                <li>Login: Views client campaign performance.</li>
                <li>Client Report Preparation: Compiles and exports reports.</li>
                <li>Monitor and Adjust Campaigns: Tracks KPI and ROI, making strategic adjustments.</li>
                <li>Client Communication: Uses messaging for updates.</li>
                <li>Explore Trends and Offers: Recommends new trends and offers to clients.</li>
                <li>Logout: Ensures all tasks are up-to-date before logging out.</li>
              </ul>

              <p className="py-2 project-title md:project-title-md pt-5">Key Features</p>

              <ul style={{ listStyleType: 'disc' }} className='project-text md:project-text-md px-4 md:px-7 mb-5 space-y-1'>
                <li>Dashboard Overview: Quick access to key metrics and recent activity.</li>
                <li>Performance Analysis: Interactive graphs and detailed tables for data analysis.</li>
                <li>Campaign Management: Tools for budget allocation and ad creative updates.</li>
                <li>Reports: Customizable, exportable, and scheduled reports.</li>
                <li>Offers and Promotional Materials: Browsing and filtering options with access to promotional assets.</li>
                <li>Communication: In-app messaging and real-time alerts.</li>
                <li>Account Settings: Profile management, payment settings, support, and help desk access.</li>
              </ul>
              <p className="py-2 project-title md:project-title-md pt-5">Conclusion</p>
              <span className="project-text md:project-text-md">
                The redesigned TradeTracker.com dashboard provides an intuitive interface, clear information hierarchy, and efficient navigation, meeting the specific needs of Wade Warren and Sandra Olus. This ensures a productive and satisfying user experience, enhancing their ability to manage and optimize affiliate marketing campaigns effectively.
              </span>


            </div>
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
        <PrevLink link={"/work/cr"} isBack={false} projectTitle="CareerRoyale - AI Powered Career Platform" />
        <NextLink link={"/work/mt"} isNext={true} projectTitle="Momentum - A life operating system built with AI" />
      </div>
      <LetsConnect />


    </article >
  );
}

export default TradeTracker;