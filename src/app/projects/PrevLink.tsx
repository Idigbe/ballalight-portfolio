import Link from 'next/link';

const PrevLink = ({ link, isBack, projectTitle }: { link: string, isBack: boolean, projectTitle: string }) => {

    return (
        <Link href={link} className="">
            <div className="flex">
                <div className="grid grid-cols-6 justify-items-end">
                    {/* --------- */}
                    <div className="col-span-12 text-[8px] md:text-xs">
                        <i className="fas fa-arrow-left text-primary" />
                        {
                            isBack && <span className="pl-2">All Project</span>
                        }
                        {
                            !isBack && <span className="pl-2">View Previous Project</span>
                        }
                    </div>
                    {/* ---------*/}
                    {
                        !isBack &&
                        <div className="col-span-12 text-xs md:text-base ">
                            {projectTitle}
                        </div>
                    }
                </div>
            </div>
        </Link>
    )
}
export default PrevLink;