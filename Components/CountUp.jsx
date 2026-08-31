'use client';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// PENDING CLIENT CONFIRMATION (punch list #12): Jon asked for "numbers we
// approve or remove the counters." These are the figures already live on the
// site — "51k Clients Served" in particular needs sign-off before it stays.
const stats = [
  { end: 25, duration: 2, suffix: '+', label: 'Years in Business' },
  { end: 500, duration: 2, suffix: '+', label: 'Tons of Waste Handled' },
  { end: 51, duration: 3, suffix: 'k', separator: ',', label: 'Clients Served' },
];

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
    className={`bg-[#1e1e1e] ${widths} fjalla-one rounded-xl absolute ${bottom} left-0 right-0 mx-auto flex justify-around items-center text-white p-5 gap-5`}
  >
  
      {stats.map(({ end, duration, suffix, separator, label }) => (
        <motion.div key={label} className="text-center flex-1 min-w-[90px]">
          <p className={`${textSize} font-bold`}>
            {/* The number is always rendered — the count-up is a progressive
                enhancement on top of it. Gating the whole value behind
                isInView left crawlers and screenshots showing a bare "+ Years"
                / "k Clients" and shifted layout on scroll. */}
            {isInView ? (
              <CountUp end={end} duration={duration} separator={separator} />
            ) : (
              end.toLocaleString()
            )}
            {suffix}
          </p>
          <p className={`${textSizep}`}>{label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCard;