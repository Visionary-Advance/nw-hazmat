'use client';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsCard = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="bg-[#1e1e1e] fjalla-one rounded-xl absolute bottom-20 left-1/2 -translate-x-1/2 translate-y-1/2 
                 flex flex-wrap md:flex-nowrap justify-around items-center text-white p-5 gap-5 w-[107%]
                 md:w-[125%] "
    >
      <div className="text-center flex-1 min-w-[90px]">
        <p className="text-3xl md:text-4xl font-bold">
          {inView && <CountUp end={25} duration={2} />}+
        </p>
        <p className="text-lg lg:text-2xl">Years in Business</p>
      </div>

      <div className="text-center flex-1 min-w-[90px]">
        <p className="text-3xl md:text-4xl font-bold">
          {inView && <CountUp end={500} duration={2} />}+
        </p>
        <p className="text-lg lg:text-2xl">Tons of Waste Handled</p>
      </div>

      <div className="text-center flex-1 min-w-[90px] ">
        <p className="text-3xl md:text-4xl font-bold ">
          {inView && <CountUp end={51} duration={3} separator="," />}k
        </p>
        <p className="text-lg lg:text-2xl">Clients <br/> Served</p>
      </div>
    </div>
  );
};

export default StatsCard;
