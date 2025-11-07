

import { MotionPortfolio } from '@/components/ui/MotionPortfolio';
import Pageheaders from '@/components/ui/Pageheaders';

const Portfolio = () => {

  return (
    // <article className="min-h-screen max-w-7xl mx-auto py-2 p-2 md:px-4 lg:py-2 lg:px-8">
    <article className="pr-2 md:pr-0">
      <Pageheaders information={`My Work`} />
      <div className="grid grid-cols-12 my-1 ">
        {/* Project 1 */}
        <MotionPortfolio
          link="/work/bp"
          title='BetKing-Payment'
          subTitle='Revamping the payment experience'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-1/1.png"}
          alt="Portfolio"
        />
        {/* Project 2 */}
        <MotionPortfolio
          link="/work/tt"
          title='Trade Tracker - SaaS'
          subTitle='Dashboard design'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-1/2.png"}
          alt="Portfolio"
        />
        {/* Project 3 */}
        <MotionPortfolio
          link="/work/ub"
          title='Union Bank - Financials'
          subTitle='Improving the mobile banking experience'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-2/2.png"}
          alt="Portfolio"
        />
        {/* Project 4 */}
        <MotionPortfolio
          link="/work/ds"
          title='Design System'
          subTitle='Open-source design system'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-2/1.png"}
          alt="Portfolio"
        />
        {/* Project 5 */}
        <MotionPortfolio
          link="/work/ss"
          title='6th Street- E-commerce'
          subTitle='Improving the shopping bag and checkout process'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-3/1.png"}
          alt="Portfolio"
        />
        {/* Project 6 */}
        <MotionPortfolio
          link="/work/wz"
          title='Woozeee - E-commerce'
          subTitle='E-commerce UI design'
          xWidth="auto"
          xHeight="auto"
          imageSrc={"https://breakoutng-assets.s3.eu-west-2.amazonaws.com/ld/portfolio-files/nd/assets/work/home/row-3/2.png"}
          alt="Portfolio"
        />
      </div>
    </article>
  );
}

export default Portfolio;