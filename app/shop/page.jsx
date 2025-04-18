import ATCButton from "@/Components/ATCButton";
import Breadcrumbs from "@/Components/BreadCrumbs";
import FilterBar from "@/Components/FilterBar";



export default function Shop(){

    const shopItems = [
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
        {id:"hazmat-static-ground" , name:"Hazmat Static Ground", description:" Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids", img:"/img/Hazmat-Static-Ground.jpg", price:"124.00" },
    ]

    return(

        <>
        <Breadcrumbs />
        
        <FilterBar />

        <div className="  mt-10 w-3/4 gap-y-4 mx-auto grid grid-cols-1 lg:grid-cols-3">
            
            {/* CARDS    */}

            {shopItems.map((item) =>(

            
            <div key={item.id} className="w-64 mx-auto  shadow-md rounded-[20px] bg-white border border-black/20">
            <div className="">
            <img className="w-60 border border-black h-60 mx-auto shadow rounded-[16px] m-1" src="/img/Hazmat-Static-Ground.jpg" />
            </div>
            <div className="">
            <h3 className="fjalla-one text-xl p-1">{item.name}</h3>
            <div className="bg-black h-[0.2px] ms-1 w-12"></div>
            </div>
            <div className=" text-sm ms-1 mt-2 me-5">
            {item.description}
            </div>
            <div className="flex justify-evenly mb-4 mt-10">
                <p className="font-bold text-2xl">${item.price}</p>
                <ATCButton />
            </div>
            </div>
))}

        </div>

        
        
        </>


    );
}