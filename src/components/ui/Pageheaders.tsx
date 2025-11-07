
interface PageheadersProps {
    information: string;
    className?: string;
}


const Pageheaders = ({ information, className = '' }: PageheadersProps) => {

    let cssClass = "page-title md:page-title-md max-w-3xl md:mt-6 md:mb-10";

    // const { className = '' } = { ...props };

    if (className) {
        cssClass += " " + className;
    }
    return (
        <p className={cssClass} >
            {information}
        </p>
    );
}
export default Pageheaders;