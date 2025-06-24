import ATCButton from "@/Components/ATCButton";
import Breadcrumbs from "@/Components/BreadCrumbs";



export default function Shop(){

    const shopItems = [
  {
    id: "tank-truck-rollover-simulator",
    name: "Tank Truck Rollover Simulator",
    description: "High-impact training simulator for hazmat teams.",
    image: "/img/Tank-Truck-Rollover.jpg",
    price: 8120.00,
    category: "simulator"
  },
  {
    id: "tank-truck-accessory-pack",
    name: "Tank Truck Accessory Pack",
    description: "Complete add-on kit for tank truck simulators.",
    image: "/img/Tank-Truck.jpg",
    price: 975.00,
    category: "simulator"
  },
  {
    id: "basic-hot-tap-rollover-kit",
    name: "Basic Hot Tap Rollover Kit",
    description: "Entry-level kit for hot tap rollover scenarios.",
    image: "/img/1-Basic-Hot.jpg",
    price: 1075.00,
    category: "simulator"
  },
  {
    id: "deluxe-hot-tap-rollover-kit",
    name: "Deluxe Hot Tap Rollover Kit",
    description: "Enhanced rollover kit for advanced training use.",
    image: "/img/hot-delux.jpg",
    price: 1400.00,
    category: "simulator"
  },
  {
    id: "pop-up-pool-basin-100",
    name: "Pop-Up Pool - Catch Basin 100 Gallon",
    description: "Flexible containment basin for spill response.",
    image: "/img/Basin_4.jpg",
    price: 99.00,
    category: "Containment"
  },
  {
    id: "storm-drain-filter",
    name: "Storm Drain Filter",
    description: "Simple and effective storm drain filter solution.",
    image: "/img/storm-drain.jpg",
    price: 29.95,
    category: "Drain Filters"
  },
  {
    id: "spill-responder-kit-bags",
    name: "Spill Responder Kit Bags",
    description: "Portable kits for rapid spill containment.",
    image: "/img/Large-Spill.jpg",
    price: 104.00,
    category: "Spill Kits"
  },
  {
    id: "plug-n-dike",
    name: "Plug N' Dike",
    description: "Quick-sealing material for leaks and spills.",
    image: "/img/plug.jpg",
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
    image: "/img/2178-Clamp.jpg",
    price: 2178.00,
    category: "Equipment"
  }
];


    return(

        <>
        <Breadcrumbs />
        
        {/* <FilterBar /> */}

        <div className="  mt-10 w-3/4 gap-y-4 mx-auto grid grid-cols-1 lg:grid-cols-3">
            
            {/* CARDS    */}

            {shopItems.map((item) => (
  <div
    key={item.id}
    className="w-64 h-[460px] mx-auto relative shadow-md rounded-[20px] bg-white border border-black/20 flex flex-col justify-between p-3"
  >
    {/* Image */}
    <div className="flex justify-center">
      <img
        className="w-60 h-60 object-cover border border-black shadow rounded-[16px]"
        src={item.image}
        alt={item.name}
      />
    </div>

    {/* Name + Divider */}
    <div className="mt-2">
      <h3 className="fjalla-one text-xl">{item.name}</h3>
      <div className="bg-black h-[1px] w-12 mt-1" />
    </div>

    {/* Description */}
    <div className="text-sm mt-2 flex-grow overflow-hidden">
      <p className="line-clamp-3">{item.description}</p>
    </div>

    {/* Price + Button */}
    <div className="flex justify-between items-center mt-4">
      <p className="font-bold text-2xl">${item.price}</p>
      <ATCButton />
    </div>
  </div>
))}

        </div>

        
        
        </>


    );
}
