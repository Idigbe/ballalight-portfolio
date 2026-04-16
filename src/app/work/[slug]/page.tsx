// 'use client';


import BetKingPayments from '@/app/projects/bp/page';
import TradeTracker from '@/app/projects/tt/page';
import UB from '@/app/projects/ub/page';
import DS from '@/app/projects/ds/page';
import SixStreet from '@/app/projects/ss/page';
import WoozeeeCom from '@/app/projects/wz/page';

let ps = "sss";

export async function generateStaticParams() {
    return [
        { dets: 'bp' },
        { dets: 'tt' },
        { dets: 'ub' },
        { dets: 'ds' },
        { dets: 'ss' },
        { dets: 'wz' }
    ];
}


export default function PortfolioDetailsPage({ params }: { params: { dets: string } }) {
    // const { dets } = params
    return (
        <main className="">
            {
                params.dets == "bp" &&
                <BetKingPayments />
            }
            {
                params.dets == "tt" &&
                <TradeTracker />
            }
            {
                params.dets == "ub" &&
                <UB />
            }
            {
                params.dets == "ds" &&
                <DS />
            }
            {
                params.dets == "ss" &&
                <SixStreet />
            }
            {
                params.dets == "wz" &&
                <WoozeeeCom />
            }
        </main>
    );
}

