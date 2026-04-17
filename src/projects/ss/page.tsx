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
    <div className="grid col-span-6 md:col-span-3 justify-items-left px-2 my-4">
      <MotionImage
        isInView={false}
        xWidth="auto"
        xHeight="auto"
        imageSrc={url}
        alt="Six Street"
      />
    </div>
  )
}

const SixStreet = () => {

  const [isValiated, setIsValiated] = useState(false);

  const verifyPS = (val: any) => {
    // console.log("BP verifyPS: ", val)
    if (val.verified) {
      // console.log("SS Verified");
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

      <div className="flex flex-col items-center px-2 my-10">
        <h1 className='project-main-header md:project-main-header-md'>6th Street - E-commerce</h1>
        <p className="project-main-sub md:project-main-sub-md">
          Improving the shopping bag and checkout process
        </p>
      </div>

      <div className="grid grid-cols-12 my-1 px-2">
        {/* Row */}
        <div className="grid col-span-12 justify-items-center px-2 my-2">
          <MotionImage
            isInView={false}
            xWidth="800"
            xHeight="auto"
            imageSrc={"/assets/work/projects/six-street/1.png"}
            alt="Six Street"
          />
        </div>

        {/* Start ==================================================================*/}
        <div className="grid col-span-12  px-0 md:px-2">
          <h1 className='project-header md:project-header-md py-5 md:py-10'> Overview</h1>
        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2 md:pr-16">
          <p className="py-2 project-title md:project-title-md">About</p>
          <article className='project-text md:project-text-md'>
            6thStreet.com is an online shopping platform based in the Gulf Cooperation Council (GCC) region, catering primarily to markets in Saudi Arabia, the United Arab Emirates, and Kuwait. It offers a wide range of fashion and lifestyle products, including footwear, clothing, accessories, and lifestyle items for men, women, and children.
          </article>

          <p className="py-2 project-title md:project-title-md">Challenge</p>
          <article className='project-text md:project-text-md'>
            Improving the User Experience (UX) for the shopping bag and checkout process of an e-commerce mobile application to enhance user satisfaction, reduce cart abandonment, and increase conversion rates.
          </article>

          <p className="py-2 project-title md:project-title-md">Problem Statement</p>
          <article className='project-text md:project-text-md'>
            The current shopping bag and checkout process is functional but could benefit from enhancements to make it more intuitive and seamless for users. The goal is to identify potential pain points and design improvements to streamline the process, ensuring a smooth transition from browsing to purchase.
          </article>

        </div>
        <div className="grid col-span-12 md:col-span-6 justify-items-left px-0 md:px-2 my-2">
          <div className="">
            <span className="project-title md:project-title-md">Role(s)</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5'>
              <li>Lead UI/UX Designer</li>
            </ol>

            <span className="project-title md:project-title-md">Designed For</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5'>
              <li>Mobile App</li>
            </ol>

            <span className="project-title md:project-title-md">Responsibilities</span>
            <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5'>
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
                  xWidth="400"
                  xHeight="auto"
                  imageSrc={"/assets/utility/ss-util.png"}
                  alt="Six Street"
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
          <div className="grid grid-cols-12 my-1 px-2">
            <div className="grid col-span-12  px-2  pb-2">
              <h1 className='project-header md:project-header-md   py-5 md:py-10'> Heuristic evaluation - Old UI</h1>
            </div>
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/2.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2 md:pr-16">
              <p className="py-2 text-sm md:text-base font-medium pt-5">Pros:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Clear Layout: Key information (shopping bag items, delivery address, payment methods) is displayed.</li>
                <li>Multiple Payment Options: Offering various payment methods increases accessibility and convenience for users.</li>
                <li>Personalized Recommendations: Suggesting items based on user preferences enhances the shopping experience.</li>
                <li className="md:pb-36">Delivery Information: Providing estimated delivery dates helps users plan accordingly.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2">
              <p className="py-2 text-sm md:text-base font-medium  pt-5"> Cons:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Visual Clutter: Some screens, especially with multiple items or options, can appear cluttered and overwhelming.</li>
                <li>Manual Entry: Lack of address auto-suggestions and manual entry requirements might lead to user frustration.</li>
                <li>Distracting Elements: Recommendations and promotions could distract users from completing their purchase. </li>
                <li>Limited Payment Details: More information on payment options and installment plans could help users make informed decisions.</li>
                <li>Design principles not followed: Lack visual hierarchy and misalignment can make the experience feel distorted because as a fashion brand details, aesthetics and sophistication helps with the behavioural pschology of status behind users using your product</li>
                <li>Accessibility: Using a light green without increasing the contrast makes it less visible and using destructive red colour to represent progress bar might not represent progress.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-2">
              <h1 className='project-header md:project-header-md  py-5 md:py-10'> Competitor Insights</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/3.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2 md:pr-16">
              <p className="py-2 text-sm md:text-base font-medium  pt-5">Pros:</p>
              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Clear and Intuitive Layout: Each step in the purchasing process is clearly delineated with actionable buttons.</li>
                <li>Multiple Payment Options: Catering to a broad audience by providing various payment methods.</li>
                <li>Express Delivery Options: The ability to choose expedited delivery can enhance user satisfaction.</li>
                <li>Address and Contact Confirmation: Ensures accurate delivery details, reducing the chance of errors.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2">

              <p className="py-2 text-sm md:text-base font-medium pt-5">Cons:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Visual Overload: Some screens, especially with multiple items or options, can appear cluttered.</li>
                <li>Limited Modification Options: Users might find it cumbersome to modify information directly from certain screens.</li>
                <li> Crowded Interface for Payment Options: Could benefit from more space or segmentation to reduce cognitive load.</li>
                <li>Interactive Elements: The map interface could be more interactive and user-friendly.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/4.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2 md:pr-16">

              <p className="py-2 text-sm md:text-base font-medium pt-5"> Pros:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Clear and Intuitive Layout: The page is well-organized, making it easy for users to navigate and find the information they need.</li>
                <li>Multiple Delivery and Payment Options: Offers a variety of choices, catering to different user preferences and needs.</li>
                <li>Detailed Order Summary: Provides transparency about the costs involved in the purchase.</li>
                <li className="md:pb-10">Promotional Highlights: Effectively highlights promotions and savings, which can enhance user satisfaction.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2">

              <p className="py-2 text-sm md:text-base font-medium pt-5"> Cons:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Potential Overload: Despite the minimalist design, the variety of options might still overwhelm some users, particularly those unfamiliar with installment plans.</li>
                <li>Visual overload: Some users might find the visuals and use of colors distracting as a lot of things are going on at the same time and it&apo;s difficult to complete the task which might make it not accessible to all.</li>
                <li>Delivery Fee Impact: Additional fees for faster delivery options could discourage budget-conscious users.</li>
                <li> User Experience: The experience feels like a marketplace and not ideal for a fashion brand that sells designer clothing.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/5.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2 md:pr-16">

              <p className="py-2 ttext-sm md:text-base font-medium pt-5"> Pros:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li>Clear and Detailed Information: Each step provides comprehensive details, helping users understand their order and delivery options.</li>
                <li> Multiple Delivery Options: Users can choose delivery methods based on their needs and preferences.</li>
                <li>Prominent Call to Actions: Action buttons are clearly displayed, guiding users through the checkout process smoothly.</li>
                <li> Transparency: The order summary and delivery details are transparent, reducing the likelihood of unexpected costs.</li>
              </ol>
            </div>
            <div className="grid col-span-12 md:col-span-6 justify-items-left px-2 my-2">
              <p className="py-2 text-sm md:text-base font-medium pt-5"> Cons:</p>

              <ol style={{ listStyleType: 'disc' }} className='project-text md:project-text-md  px-6 md:px-8 mb-5 space-y-2'>
                <li> Visual Clutter: The presence of multiple items and repeated information can make the interface appear crowded and overwhelming.</li>
                <li>Text-Heavy Screens: Some screens are text-heavy, which might be daunting for users, particularly on smaller screens.</li>
                <li className="md:pb-10">Complex Navigation: Navigating between cart review, delivery options, and final order placement can be complex without clear indicators.</li>
              </ol>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-2 ">
              <h1 className='project-header md:project-header-md  py-5 md:py-10'> Solution and Design Rationale - Shopping bag</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/6.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 justify-items-left px-2 my-2">
              <p className="py-5 project-text md:project-text-md">
                The overall layout is a single page design, keeping all the information in one page with a vertical scrolling to view all items. It gives a quick review and modification of the shopping bag with intuitive interface and clear labels and control with reduced clutter. It balances aesthetics and functionality, offering a seamless and enjoyable shopping experience.
              </p>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-2  ">
              <h1 className='project-header md:project-header-md  py-5 md:py-10'> Solution and Design Rationale - Checkout</h1>
            </div>
            {/* Row */}
            <div className="grid col-span-12 justify-items-center px-2 my-4">
              <MotionImage
                isInView={false}
                xWidth="auto"
                xHeight="auto"
                imageSrc={"/assets/work/projects/six-street/7.png"}
                alt="Six Street"
              />
            </div>
            <div className="grid col-span-12 justify-items-left px-2 my-2">
              <p className="py-5 project-text md:project-text-md">
                A single page checkout ensures all necessary information and actions for completing a purchase are available without additional navigation. Users can review their order, select delivery options, apply promo codes, and choose a payment method all on one page. Intuitive layout with clear labels and accessible controls ensures a seamless checkout experience. Visual elements and clear options help keep the user engaged and informed throughout the checkout process.
              </p>
            </div>
            {/* Row */}
            <div className="grid col-span-12  px-2 ">
              <h1 className='project-header md:project-header-md  py-5 md:py-10'> Designs</h1>
            </div>
            {/* Row */}
            <Designs url="/assets/work/projects/six-street/8.png" />
            <Designs url="/assets/work/projects/six-street/9.png" />
            <Designs url="/assets/work/projects/six-street/10.png" />
            <Designs url="/assets/work/projects/six-street/11.png" />
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
        <PrevLink link={"/work/ds"} isBack={false} projectTitle="Design System" />
        <NextLink link={"/work/wz"} isNext={true} projectTitle=" Woozeee - E-commerce" />
      </div>
      <LetsConnect />

    </article >
  );
}

export default SixStreet;
