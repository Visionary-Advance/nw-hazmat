import ATCButton from "@/Components/ATCButton";
import Breadcrumbs from "@/Components/BreadCrumbs";
import FilterBar from "@/Components/FilterBar";



export default function Shop(){

    const shopItems = [
  {
    id: "tank-truck-rollover-simulator",
    name: "Tank Truck Rollover Simulator",
    description: "High-impact training simulator for hazmat teams.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/01/Tank-Truck-Rollover-Simulator.jpg",
    price: 8120.00,
    category: "simulator"
  },
  {
    id: "tank-truck-accessory-pack",
    name: "Tank Truck Accessory Pack",
    description: "Complete add-on kit for tank truck simulators.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/04/Tank-Truck-Accessory-Pack.jpg",
    price: 975.00,
    category: "simulator"
  },
  {
    id: "basic-hot-tap-rollover-kit",
    name: "Basic Hot Tap Rollover Kit",
    description: "Entry-level kit for hot tap rollover scenarios.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/03/1-Basic-Hot-Tap-Rollover-Kit-web-06242020.jpg",
    price: 1075.00,
    category: "simulator"
  },
  {
    id: "deluxe-hot-tap-rollover-kit",
    name: "Deluxe Hot Tap Rollover Kit",
    description: "Enhanced rollover kit for advanced training use.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/03/hot-delux-06242020.jpg",
    price: 1400.00,
    category: "simulator"
  },
  {
    id: "pop-up-pool-basin-100",
    name: "Pop-Up Pool - Catch Basin 100 Gallon",
    description: "Flexible containment basin for spill response.",
    image: "https://nwhazmat.com/wp-content/uploads/2021/04/Basin_4.jpg",
    price: 99.00,
    category: "Containment"
  },
  {
    id: "storm-drain-filter",
    name: "Storm Drain Filter",
    description: "Simple and effective storm drain filter solution.",
    image: "https://nwhazmat.com/wp-content/uploads/2021/06/storm-drain-filter-edited.jpg",
    price: 29.95,
    category: "Drain Filters"
  },
  {
    id: "spill-responder-kit-bags",
    name: "Spill Responder Kit Bags",
    description: "Portable kits for rapid spill containment.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/01/Large-Spill-Responder-Kit-Bag.jpg",
    price: 104.00,
    category: "Spill Kits"
  },
  {
    id: "plug-n-dike",
    name: "Plug N' Dike",
    description: "Quick-sealing material for leaks and spills.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/03/plug06242020.jpg",
    price: 14.50,
    category: "Materials"
  },
  {
    id: "spill-kit-bucket-5g",
    name: "5 Gallon Spill Kit Bucket",
    description: "Compact spill kit in a 5-gallon bucket.",
    image: null,
    price: 77.00,
    category: "Spill Kits"
  },
  {
    id: "2178-clamps",
    name: "2178 Clamps",
    description: "Heavy-duty clamps for hazmat containment.",
    image: "https://nwhazmat.com/wp-content/uploads/2016/03/2178-Clamp.jpg",
    price: 2178.00,
    category: "Equipment"
  }
];


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
