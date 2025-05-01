import Button from "@/Components/Button";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import ServiceList from "@/Components/ServiceList";
import { IoLocationSharp } from "react-icons/io5";
import StatsCard from "@/Components/CountUp";
import TestimonialSlider from "@/Components/ReviewSlide";

export default function Home() {
  return (
    <>
      <section className="grid grid-cols-1 pb-10 relative 2xl:grid-cols-[2fr_3fr] gap-x-4 lg:w-full overflow-x-hidden overflow-hidden ">
        <img
          className="absolute bottom-[-130px] right-[-110px] -z-20"
          src="/img/Hazmat_Symbol.png"
          width={500}
          height={500}
          alt="Hazmat Symbol"
        />
        <div className="relative w-11/12 lg:w-full  max-w-[800px] col-span-1 aspect-[8/7]">
          <img
            src="/img/Confined_Space.jpg"
            alt="Confined Space Worksite"
            fill = "true"
            className="object-cover h-full rounded-br-[80px]"
            // priority
          />
          <div className="bg-red-600 w-[102%] h-[102%] absolute inset-0 rounded-br-[90px] -z-10"></div>
        </div>
        <div className="col-span-1 pt-4 ps-2 relative lg:pt-12 flex flex-col">
          <h1 className="fjalla-one leading-tight text-4xl lg:text-5xl">
            Lane County's Longest Active <br className="lg:block hidden" />{" "}
            Hazmat Service
          </h1>
          <p className="w-11/12 lg:w-6/12 text-lg lg:text-xl pt-5 poppins">
            Founded in 2000, NorthWest HazMat, Inc. is a female owned and
            operated environmental company. We began as a spill response company
            based in the Eugene-Springfield, Oregon area. Since then we have
            grown into a full service environmental response and management
            company.
          </p>

          <div className="flex justify-center lg:justify-normal space-x-2 mt-auto pt-6">
            <Button
              text={"Shop Now"}
              color={
                "bg-red-600 hover:bg-white hover:text-red-600 text-white border border-red-600 arial-bold duration-200 "
              }
            />
            <Button
              text={
                <span className="flex items-center gap-2 arial-bold">
                  <FaPhone /> Call Us
                </span>
              }
              color={
                "bg-white hover:bg-red-600 hover:text-white text-red-600 border border-red-600 duration-200 "
              }
            />
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="bg-red-600 h-full w-full absolute top-0 left-0 -z-10 opacity-65"></div>
        <img
          src="/img/Trucks.jpg"
          alt="Truck Background"
          width={1000}
          height={250}
          className="absolute top-0 left-0 w-full h-full -z-20 object-cover"
        />
        <div className="text-center text-white fjalla-one pt-5 pb-5 text-3xl">
          <h3 className="pb-8">For an Immediate Emergency</h3>
          <Link href={"tel:555-555-5555"}>
            <Button
              text={
                <span className="flex items-center gap-2 arial-bold">
                  <FaPhone /> Call Us
                </span>
              }
              color={
                "bg-white hover:bg-black hover:text-white text-black border border-white px-10  duration-200 "
              }
            />
          </Link>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-black pb-10">
        <div className="text-white w-10/12 mx-auto  py-14 text-5xl fjalla-one">
          <h2 className=""> Our Services </h2>
        </div>
        <ServiceList />
      </section>

      <section className="relative">
        <div className="bg-red-600 h-full w-full absolute top-0 left-0 -z-10 opacity-65"></div>
        <img
          src="/img/Areas_bg.png"
          alt="Truck Background"
          width={1000}
          height={250}
          className="absolute top-0 left-0 w-full h-full -z-20 object-cover"
        />
        <div className="text-center text-white fjalla-one pt-5 pb-5 text-3xl">
          <h3 className="pb-3">Areas We Serve</h3>
          <div className="border-white -mt-3 border w-[60px] mx-auto"></div>
        </div>
        <div className="grid place-items-center text-white w-1/2 mx-auto lg:space-y-0 space-y-10 grid-cols-1 pb-10 lg:grid-cols-2">
          {["Eugene",  "Rainier"].map((item, index) => (
            <div
              className="text-center text-3xl place-items-center"
              key={index}
            >
              <IoLocationSharp />
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="">
        <div className="text-black w-10/12 mx-auto pt-5 pb-14 text-5xl fjalla-one">
          <h2 className=""> About Us </h2>
        </div>
        <div className="grid lg:grid-cols-2 relative grid-cols-1 lg:w-8/12 w-11/12 mx-auto">
          <div className="col-span-1 relative mx-auto w-fit">
            {/* Background Shadow */}
            <div className="bg-red-600 h-full w-full rounded-[25px] absolute -z-10 -translate-y-4 -translate-x-4"></div>

            {/* Main Image */}
  {/* Main Image */}
  <img
    className="rounded-[20px]"
    src="/img/Reading_Gauge.jpg"
    alt="Reading Gauge Image"
    width={400}
    height={900}
  />
            <div className="relative">

  {/* Stats Overlay — now inside the same relative parent */}
</div>
  <StatsCard
    widths="w-[105%] lg:w-[120%] max-w-[500px]"
    textSize="md:text-4xl text-3xl"
    textSizep="text-lg"
    bottom="bottom-[30px]"
  />
</div>


          
          <div className="col-span-1 flex flex-col gap-5 ps-10 pt-5 mx-auto lg:items-start items-center">
            <h3 className="fjalla-one text-4xl lg:w-7/12 text-center lg:text-left">
              <span className="text-red-600">Who We Are:</span> Your Trusted
              Partner in Hazmat Services
            </h3>
            <div className="border-black border w-[60px] lg:me-auto"></div>
            <p className="lg:w-9/12 w-11/12 text-2xl lg:text-xl">
              Founded in 2000, NorthWest HazMat, Inc. is a female-owned and
              operated environmental company. We began as a spill response
              company based in the Eugene-Springfield, Oregon area. Since then,
              we have grown into a full-service environmental response and
              management company.
            </p>

            {/* Button pushed to the bottom */}
            <div className=" my-auto flex">
              <Link href={"/about"}>
              <Button
                text={"View More"}
                color={
                  "arial font-semibold text-white bg-red-600 hover:bg-white border border-red-600 hover:text-red-600"
                }
              />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="my-20 py-10 bg-black relative overflow-visible">
  <div className="w-11/12 lg:w-10/12 grid grid-cols-1 lg:grid-cols-2 mx-auto items-center relative z-10">
    
    {/* Text Column */}
    <div className="text-white py-5">
      <h3 className="text-4xl fjalla-one">Need Training?</h3>
      <p className="pt-2 text-xl w-10/12">
        Take a look at what we offer to keep you and your company safe
      </p>
      <Button 
        text={"View Training"} 
        color={"mt-4 border border-red-600 bg-red-600 hover:bg-white text-white hover:text-red-600"} 
      />
    </div>

    {/* Image Column for mobile (relative position) */}
    <div className="block lg:hidden mt-10 relative z-0 w-full">
      <div className="absolute top-2 left-2 w-full h-full bg-red-600 rounded-[25px] z-0"></div>
      <img
        src="/img/Homeless.jpg"
        alt="Training Image"
        className="rounded-[25px] w-full relative z-10 shadow-lg object-cover"
      />
    </div>
  </div>

  {/* Image Column for desktop (absolute) */}
  <div className="hidden lg:block absolute top-[-40px] right-[5%] w-[105%] max-w-2xl z-0">
    <div className="absolute top-4 left-4 w-full h-full bg-red-600 rounded-[25px] z-0"></div>
    <img
      src="/img/Homeless.jpg"
      alt="Training Image"
      className="rounded-[25px] w-[115%] relative z-10 shadow-lg object-cover"
    />
  </div>
</section>


      <section className="mt-20 pt-10 relative overflow-visible">
  <div className="w-11/12 lg:w-10/12 grid grid-cols-1 lg:grid-cols-2 mx-auto items-center relative z-10">
    
    {/* Text Column */}
    <div className="block col-span-1 relative  max-w-3xl z-0">
    <div className="absolute bottom-4 right-4 w-11/12 h-full bg-red-600 rounded-[25px] z-0"></div>
    <img
      src="/img/Homeless.jpg"
      alt="Training Image"
      className="ms-auto rounded-[25px] w-11/12 relative z-10 shadow-lg object-cover"
    />
  </div>
    <div className="text-black ps-10 py-5">
      <h3 className="text-4xl fjalla-one">Are you Prepared for a Tank Rollover?</h3>
      <p className="pt-2 text-xl w-10/12">
      Stay prepared for tank rollovers with expert training and safety solutions. Explore our full range of services today!
      </p>
      <Button 
        text={"View Training"} 
        color={"mt-4 border border-red-600 bg-red-600 hover:bg-white text-white hover:text-red-600"} 
      />
    </div>

   
  </div>

  {/* Image Column for desktop (absolute) */}
 
</section>



<section className="">

                <TestimonialSlider />

</section>


    </>
  );
}
