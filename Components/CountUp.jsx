'use client';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const StatsCard = ({widths, bottom, textSize, textSizep}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.2 
  });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  

  return (
    <motion.div
    ref={ref}
    initial="hidden"
    animate={controls}
    variants={containerVariants}
    className={`bg-[#1e1e1e] ${widths} fjalla-one rounded-xl absolute ${bottom}   mx-auto flex justify-around items-center text-white p-5 gap-5`}
  >
  
      <motion.div className="text-center flex-1 min-w-[90px]" >
        <p className={`${textSize} font-bold`}>
          {isInView && <CountUp end={25} duration={2} />}+
        </p>
        <p className={`${textSizep}`}>Years in <br/> Business</p>
      </motion.div>

      <motion.div className="text-center flex-1 min-w-[90px]" >
        <p className={`${textSize} font-bold`}>
          {isInView && <CountUp end={500} duration={2} />}+
        </p>
        <p className={`${textSizep}`}>Tons of Waste Handled</p>
      </motion.div>

      <motion.div className="text-center flex-1 min-w-[90px]" >
        <p className={`${textSize} font-bold`}>
          {isInView && <CountUp end={51} duration={3} separator="," />}k
        </p>
        <p className={`${textSizep}`}>Clients <br/> Served</p>
      </motion.div>
    </motion.div>
  );
};

export default StatsCard;