import Link from 'next/link';

const NextLink = ({ link, isNext, projectTitle }: { link: string, isNext: boolean, projectTitle: string }) => {

    return (
        <Link href={link} className="">
            <div className="flex">
                <div className="grid grid-cols-6 justify-items-start">
                    {/* --------- */}
                    <div className="col-span-12 text-[8px] md:text-xs">
                        {
                            isNext && <span className="pr-2">View Next Project</span>
                        }
                        {
                            !isNext && <span className="pr-2">All Project</span>
                        }
                        <i className="fas fa-arrow-right text-primary" />
                    </div>
                    {/* ---------*/}
                    {
                        isNext &&
                        <div className="text-xs md:text-base col-span-12">
                            {projectTitle}
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}
export default NextLink;