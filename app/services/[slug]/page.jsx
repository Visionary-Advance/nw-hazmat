import { notFound } from 'next/navigation';
import { services } from '@/data/ServicesData';
import Breadcrumbs from '@/Components/BreadCrumbs';
import Link from 'next/link';
import GoButton from '@/Components/Go-Button';

export function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }) {

  
  const slug =  params.slug;

  const service = services.find(s => s.slug === slug);

  if (!service) return notFound();

  return (
  <>
    <Breadcrumbs />
    <div className="flex flex-col-reverse md:flex-row ms-10 me-10 py-2 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:max-w-sm space-y-4">
        {/* Service List */}
        <div className="bg-white rounded-[60px] p-4 shadow-xl border border-black/20">
          <h2 className="text-3xl text-center fjalla-one font-semibold mb-4">Our Services</h2>
          <ul className="space-y-2">
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.slug}>
                <li
                  className={`flex justify-between group items-center p-2 rounded cursor-pointer ${
                    s.slug === slug ? "bg-black rounded-[60px] text-white" : "hover:bg-gray-200 rounded-[60px]"
                  }`}
                >
                  <span className="text-2xl ms-2 py-3 fjalla-one">{s.title}</span>
                  <span>{s.slug === slug ? "⬤" : <GoButton />}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

      {/* Contact Box */}
<div className="bg-white rounded-[60px] p-4 shadow border text-center relative flex items-center justify-center h-[400px]">
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-[60px]"></div>

  {/* Image */}
  <img className='absolute inset-0 w-full h-full object-cover rounded-[60px]' src='/img/Call_Now_Side.png' alt='' />

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-10">
    <Link href="tel:541-988-9823">
      <button className="text-xl text-white border border-white rounded-full inline-block mb-2 px-4">
        541-988-9823
      </button>
    </Link>
    <h3 className="text-white font-bold text-4xl mb-2">Get in Touch With Us</h3>
    <Link href='/contact'>
    <button className="bg-black text-white px-4 py-2 rounded">Contact Us</button>
    </Link>
  </div>
</div>



      </aside>

      {/* Main Content */}
      <main className="md:w-2/3 mx-auto">
        {/* Emergency Banner */}
        {service.eButton && (
          <div>
            <button className="bg-red-500 text-white rounded-[20px] text-center lg:text-3xl p-1 mb-4 w-full poppins active:scale-95 duration-150">
              <span className="font-bold">Click Here </span> to Call 24/7 Emergency Services
            </button>
          </div>
        )}

        {service.img && (
          <img
            src={service.img}
            alt={service.title}
            className="rounded-[60px] shadow mb-10 h-96 object-cover w-full"
          />
        )}

        <h1 className="text-5xl font-bold mb-4">{service.title}</h1>

        {service.description && (
          <p className="text-gray-800 mb-4">{service.description}</p>
        )}

        {service.pageInfo?.map((section, index) => (
          <div key={index}>
            {section.title && <h2 className="text-2xl font-bold mt-6 mb-2">{section.title}</h2>}
            {section.description && <p className="mb-2">{section.description}</p>}
            {section.img && <img className='w-full rounded-[60px] mb-10 h-96 object-cover'src={section.img} alt={section.title}/>} 

            {/* Render the list items dynamically with <span> */}
            {section.listItems && (
              <ul className="list-disc pl-6">
                {section.listItems.map((item, i) => (
                  <li key={i} className="mb-2">
                    <span className="font-bold text-lg">{item.spanText}:</span> {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </main>
    </div>
  </>
);
}