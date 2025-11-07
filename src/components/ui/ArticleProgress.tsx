'use client';

import { motion, useScroll } from "framer-motion";

const ArticleProgress = () => {
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"],
    });


    return (
        <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
    )

}

export default ArticleProgress;