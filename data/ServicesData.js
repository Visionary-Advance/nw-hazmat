import Link from 'next/link';

export const services = [
  {
    id: "hazmat-services",
    title: "Hazmat Services",
    slug: "hazmat-services",
    img: "/img/Hazmat-Services.jpg",
    metaTitle: "24/7 Hazmat Services Eugene OR | NorthWest HazMat",
    metaDescription: "Licensed hazmat response in Eugene, Oregon. 24/7 emergency spills, containment & disposal. Serving Lane County since 2000. Call 541-988-9823 today.",
    shortDescription: "Expert hazmat handling, containment, and disposal to protect your environment and ensure safety.",
    description: (
      <>
        Our hazardous materials services provide complete solutions for the safe handling, transport, disposal, and remediation of dangerous substances. We specialize in emergency hazmat response, hazardous waste disposal, chemical spill cleanup, <Link href="/training/hazmat-technician" className="text-blue-600 hover:underline">hazmat training</Link>, and compliance consulting. Backed by certifications and strict adherence to OSHA, EPA, and DOT regulations, our certified hazmat contractors are equipped to protect people, property, and the environment from harmful exposures.
      </>
    ),
    keywords: ["hazmat services Oregon", "hazardous materials", "emergency hazmat"],
    eButton: true,
    callToAction: "Call our 24/7 Response Line: (XXX) XXX-XXXX",
    pageInfo: [
      {
        title: "24/7 Emergency Spill Response",
        description: (
          <>
            When time is critical, count on our emergency hazardous material services. Our team is on-call day and night for chemical spill cleanup, unknown substance identification, and high-risk hazmat incidents. We ensure rapid hazmat spill response, site safety, and contamination containment using proven hazmat site remediation methods. Our team includes certified <Link href="/training/spill-response-training" className="text-blue-600 hover:underline">spill response specialists</Link> who follow strict safety protocols.
          </>
        ),
        img: "/img/Spill_Response.jpg"
      },
      {
        title: "Hazardous Waste Transportation",
        description: (
          <>
            We are fully licensed for hazardous waste transport, offering safe and compliant delivery of chemicals, biohazards, and industrial waste. All hazardous material transportation complies with DOT and EPA regulations, minimizing risks during transit and ensuring your legal obligations are met. Learn more about our <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management consulting</Link> services.
          </>
        )
      },
      {
        title: "Containment & Remediation",
        description: (
          <>
            Our hazmat containment and remediation services are tailored to the severity of contamination. From hazardous waste cleanup to full hazmat site decontamination, we use advanced techniques and equipment to reduce environmental impact and protect human health. For contaminated soil issues, see our <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation services</Link>.
          </>
        )
      },
      {
        title: "Regulatory Compliance Assistance",
        description: (
          <>
            Navigating compliance requirements can be complex. Our hazmat safety consulting ensures your business stays aligned with OSHA, EPA, and DOT standards. We conduct hazmat risk assessments, regulatory audits, and provide actionable steps for hazardous waste management compliance. Our <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER training programs</Link> help ensure your team stays certified.
          </>
        )
      },
      {
        title: "Customized Hazmat Solutions",
        description: (
          <>
            No two facilities are the same. We evaluate your operations and design a custom hazmat management plan that includes spill kits, hazardous material storage solutions, regular hazmat site inspections, and <Link href="/training/hazmat-technician" className="text-blue-600 hover:underline">hazmat training programs</Link>—ensuring workplace safety and long-term compliance.
          </>
        )
      },
    ]
  },
  {
    id: "lab-services",
    title: "Lab Services",
    slug: "lab-services",
    img: "/img/Lab-Testing.jpg",
    metaTitle: "Asbestos & Environmental Lab Testing | Eugene OR",
    metaDescription: "Fast, accurate asbestos testing & environmental lab analysis in Eugene, Oregon. Local results, no out-of-state delays. Free quotes — call 541-988-9823.",
    shortDescription: "Accurate asbestos testing and lab analysis to identify hazards and ensure safe removal.",
    description: (
      <>
        Accurate data is the foundation of every effective cleanup or compliance plan. That's why Northwest Hazmat offers in-house environmental lab services to identify hazardous materials and assess contamination levels. Our lab technicians deliver detailed, fast results to support decision-making for <Link href="/services/mold-remediation" className="text-blue-600 hover:underline">remediation</Link>, development, and regulatory reporting. We also provide dedicated <Link href="/services/asbestos-testing" className="text-blue-600 hover:underline">asbestos testing services</Link> with fast turnaround. Every sample is handled with precision, documented carefully, and tested under strict industry standards to provide you with the clear, actionable insights you need.
      </>
    ),
    keywords: ["environmental lab services Oregon", "hazardous material testing", "asbestos testing eugene oregon", "asbestos testing eugene", "asbestos"],
    callToAction: "Call today for sample testing or contamination analysis.",
    pageInfo: [
      {
        title: "Why Choose Us",
        description: "Here are the benefits of using our services:",
        listItems: [
          { text: "Faster turnaround times for results", spanText: "Speed" },
          { text: "Greater accuracy and quality control", spanText: "Accuracy" },
          { text: "No need to send samples out of state", spanText: "Local" },
          { text: "Local experts you can talk to directly", spanText: "Expertise" }
        ]
      },
      {
        title: "Hazardous Materials Identification",
        description: (
          <>
            Understanding what you're dealing with is the first step to handling it safely. Our team uses advanced techniques to identify hazardous materials quickly and accurately, helping you maintain a safe environment and meet strict compliance requirements. Whether it's on a job site, in a facility, or during transport, we make sure nothing is overlooked. For comprehensive cleanup services, explore our <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat services</Link>.
          </>
        ),
        img: ''
      },
      {
        title: "Mold and Microbial Testing",
        description: (
          <>
            Invisible threats like <span id="mold-services">mold and microbial growth</span> can compromise both property and health. We offer in-depth testing and analysis to uncover hidden issues before they spread. Our careful inspections help you make informed decisions about remediation and ensure a healthier space for everyone who enters your building. Once mold is detected, our <Link href="/services/mold-remediation" className="text-blue-600 hover:underline">mold remediation specialists</Link> can safely remove it.
          </>
        ),
        img: ''
      },
      {
        title: "Soil and Groundwater Analysis",
        description: (
          <>
            Contamination can run deeper than it appears. Our soil and groundwater testing services dig below the surface to reveal environmental concerns that could impact your property or operations. With clear, detailed reports, we help you take the right steps toward cleanup, permitting, and long-term site stability. For contaminated soil cleanup, see our <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation services</Link>.
          </>
        ),
        img: '/img/Soil_Analysis.jpg'
      },
      {
        title: "Air Quality Testing",
        description: (
          <>
            The air you breathe matters. Our air quality testing services monitor for harmful particles, chemical vapors, and other invisible risks that can endanger your team's health and your facility's reputation. Through careful measurement and expert analysis, we help you create cleaner, safer spaces where people can work and thrive. Air quality issues often require <Link href="/training/confined-space-entry" className="text-blue-600 hover:underline">confined space training</Link> for safe remediation.
          </>
        ),
        img: ''
      },
    ],
    faqData: [
      {
        question: "What types of environmental testing do you offer?",
        answer: "We offer asbestos testing (PLM and TEM analysis), mold and microbial testing, soil and groundwater analysis, air quality monitoring, and hazardous materials identification. All testing is performed in our local Eugene, Oregon lab for faster turnaround."
      },
      {
        question: "How fast can I get lab results?",
        answer: "Standard turnaround is 3-5 business days. Rush services are available for time-sensitive projects like real estate transactions or renovation deadlines. Because our lab is local in Eugene, you avoid the delays of sending samples out of state."
      },
      {
        question: "Do you provide chain-of-custody documentation?",
        answer: "Yes, every sample we process includes full chain-of-custody documentation. This ensures your results are legally defensible and meet all regulatory requirements for compliance reporting."
      },
      {
        question: "Can you test for asbestos in my home before renovation?",
        answer: "Absolutely. Oregon law requires asbestos testing before renovating or demolishing buildings built before 2004. We collect samples on-site and analyze them in our lab. Visit our dedicated asbestos testing page for more details."
      },
    ]
  },
  {
    id: "mold-remediation",
    title: "Mold Remediation",
    slug: "mold-remediation",
    img: "/img/Mold-Remi.jpg",
    metaTitle: "Mold Remediation Eugene Oregon | Free Inspection",
    metaDescription: "Professional mold removal in Eugene, Oregon. Free inspection, certified specialists, air quality testing. Protect your property — call 541-988-9823 now.",
    shortDescription: "Professional mold removal to prevent health risks, improve air quality, and protect property.",
    description: (
      <>
        Mold is a health hazard and a sign of deeper moisture issues that can damage structures and air quality. At Northwest Hazmat, we offer expert mold remediation for residential, commercial, and institutional properties throughout Oregon. Our certified specialists locate the source, contain the spread, and remove mold completely using industry-best practices. With advanced tools and attention to detail, we ensure your space is safe, clean, and protected from future growth. We provide mold remediation services throughout Eugene-Springfield and Lane County. All our work begins with comprehensive <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab testing and analysis</Link> to identify the extent of contamination, or get help fast with <Link href="/emergency-mold-removal-eugene-oregon" className="text-blue-600 hover:underline">24/7 emergency black mold removal</Link>.
      </>
    ),
    keywords: ["mold remediation Oregon", "black mold removal"],
    callToAction: "Call 541-988-9823 for mold remediation today.",
    pageInfo: [
      {
        title: "Mold Inspection",
        description: (
          <>
            Mold inspection is crucial to ensure the safety and health of your home or workplace. Our mold inspection service uses advanced techniques and tools to detect hidden mold growth, even in areas that may not be visible. We thoroughly examine potential problem areas, such as walls, ceilings, attics, and basements, to identify any mold issues. If mold is found, we provide a detailed report with recommendations for remediation, ensuring a healthy environment for you and your loved ones. Our <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab services</Link> provide accurate testing results to guide the remediation process.
          </>
        ),
        img: ""
      },
      {
        title: "Black Mold Removal",
        description: (
          <>
            Black mold can be hazardous to your health and should be removed promptly. Our black mold removal service is designed to eliminate dangerous mold growth safely and efficiently. We employ proven methods to contain and remove mold, preventing it from spreading throughout your property. Our certified technicians ensure that the area is thoroughly cleaned and treated, offering you peace of mind and a mold-free environment. For severe contamination cases, we may also recommend <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">biohazard cleanup services</Link>.
          </>
        ),
        img: ""
      },
      {
        title: "Dehumidification",
        description: "Excess moisture in the air can lead to mold growth, wood rot, and other issues. Our dehumidification service is designed to reduce humidity levels in your property, preventing the conditions that promote mold and mildew growth. We use high-efficiency dehumidifiers to remove moisture from the air, improving indoor air quality and protecting your home or business from water damage. Whether it's a small room or a large commercial space, we tailor our dehumidification solutions to fit your needs.",
        img: ""
      },
      {
        title: "Air Purification",
        description: (
          <>
            Breathe easier with our air purification service, designed to remove airborne contaminants like dust, allergens, and mold spores. Using high-quality air purifiers, we help improve indoor air quality and create a healthier environment. This service is especially beneficial for those with respiratory issues, allergies, or those living in areas prone to mold growth. Our air purification systems are effective in homes, offices, and other indoor spaces, providing clean, fresh air that supports overall well-being. Combined with our <Link href="/services/lab-services" className="text-blue-600 hover:underline">air quality testing</Link>, we ensure your space meets safety standards.
          </>
        ),
        img: ""
      },
    ]
  },
  {
    id: "soil-remediation",
    title: "Soil Remediation",
    slug: "soil-remediation",
    img: "/img/Soil-Remidiation.jpg",
    metaTitle: "Soil Remediation Services Oregon | NorthWest HazMat",
    metaDescription: "Contaminated soil cleanup in Eugene & Lane County, Oregon. On-site treatment, disposal & post-remediation restoration. Licensed experts — get a free quote.",
    shortDescription: "Effective soil remediation services to restore contaminated ground for safe use.",
    description: (
      <>
        Contaminated soil is a major liability for property owners and developers. At Northwest Hazmat, we offer soil remediation services to treat or remove soil that has been exposed to hazardous substances. From petroleum spills to industrial waste, our expert team assesses the contamination, selects the best treatment method, and restores the land to regulatory standards. We support cleanup efforts for everything from urban developments to agricultural land. Our process begins with thorough <Link href="/services/lab-services" className="text-blue-600 hover:underline">soil and groundwater analysis</Link> to determine the best approach.
      </>
    ),
    keywords: ["soil remediation Oregon", "contaminated soil cleanup"],
    callToAction: "Contact us for site evaluations and cleanup support.",
    pageInfo: [
      {
        title: "Contaminated Soil Disposal",
        description: (
          <>
            When hazardous materials contaminate the soil, it's crucial to handle disposal safely and in compliance with environmental regulations. Our contaminated soil disposal service ensures that hazardous soil is properly removed and disposed of in licensed facilities. We adhere to all local, state, and federal guidelines to ensure that the affected land is cleaned up responsibly, reducing environmental impact and ensuring the health and safety of surrounding communities. This service works hand-in-hand with our <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management consulting</Link> to ensure full compliance.
          </>
        ),
        img: ""
      },
      {
        title: "On-Site Treatment",
        description: (
          <>
            On-site treatment allows for the safe and efficient remediation of hazardous materials without the need for transporting them off-site. We offer a range of on-site treatment methods, including bioremediation, chemical treatment, and soil stabilization, to neutralize or remove contaminants directly at the source. This approach is faster and often more cost-effective, ensuring that the area is restored quickly while minimizing disruption to the environment and surrounding areas. Our teams are trained in <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER protocols</Link> for safe on-site operations.
          </>
        ),
        img: "/img/Soil_Analysis.jpg"
      },
      {
        title: "Soil Vapor and Water Analysis",
        description: (
          <>
            Soil vapor and water analysis are critical for identifying and assessing the presence of volatile organic compounds (VOCs) and other harmful contaminants in soil and groundwater. Our experts use advanced testing methods to analyze soil vapors and water sources, providing detailed results about contamination levels. This service helps determine the extent of contamination and informs decisions about further treatment, ensuring your property is safe and compliant with environmental regulations. All testing is conducted through our certified <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab services</Link>.
          </>
        ),
        img: ""
      },
      {
        title: "Post-Remediation Restoration",
        description: (
          <>
            After successful remediation efforts, it's essential to restore the affected area to its original condition. Our post-remediation restoration service includes everything from replanting vegetation to repairing damaged structures, ensuring your property looks and functions like it did before the contamination. We work closely with you to assess the extent of any damage and provide tailored restoration solutions that not only improve aesthetics but also enhance the long-term health and stability of the environment. For major reconstruction needs, see our <Link href="/services/dedication-services" className="text-blue-600 hover:underline">dedication services</Link>.
          </>
        ),
        img: ""
      },
    ]
  },
  {
    id: "asbestos-testing",
    title: "Asbestos Testing & Removal",
    slug: "asbestos-testing",
    img: "/img/Lab-Testing.jpg",
    metaTitle: "Asbestos Testing & Removal Eugene Oregon | Lane County",
    metaDescription: "Certified asbestos testing & removal in Eugene, Oregon. PLM & TEM lab analysis, safe abatement, and chain-of-custody. Serving Lane County since 2000.",
    shortDescription: "Certified asbestos testing and removal services in Eugene, Oregon with fast lab results, safe abatement, and full chain-of-custody documentation.",
    keywords: ["asbestos removal eugene oregon", "asbestos testing eugene oregon", "asbestos abatement eugene", "asbestos testing eugene", "asbestos removal lane county", "asbestos inspection oregon", "asbestos analysis", "PLM asbestos testing", "TEM asbestos testing"],
    description: (
      <>
        Asbestos remains one of the most common hazardous materials found in Oregon buildings constructed before 2004. At Northwest Hazmat, we provide certified asbestos testing services in Eugene and throughout Lane County. Our in-house <Link href="/services/lab-services" className="text-blue-600 hover:underline">environmental lab</Link> performs both PLM and TEM analysis, delivering fast, accurate results without the delays of sending samples out of state. Whether you need testing for a renovation project, real estate transaction, or suspected asbestos exposure, our licensed inspectors and lab technicians ensure you get reliable data to make informed decisions. If asbestos is confirmed, our <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat services team</Link> can handle safe abatement and disposal.
      </>
    ),
    callToAction: "Schedule your asbestos test today — call 541-988-9823.",
    pageInfo: [
      {
        title: "Asbestos Testing Process",
        description: (
          <>
            Our asbestos testing process begins with a certified inspector visiting your property to collect bulk material samples from suspected asbestos-containing materials. Samples are carefully sealed, labeled, and transported to our Eugene lab under full chain-of-custody protocols. We perform Polarized Light Microscopy (PLM) analysis as the standard method, with Transmission Electron Microscopy (TEM) available for air samples and situations requiring higher sensitivity. Standard results are delivered within 3-5 business days, with rush turnaround available for urgent projects. You receive a detailed report identifying the type and percentage of asbestos fibers found, along with recommendations for next steps.
          </>
        ),
        img: ''
      },
      {
        title: "When to Test for Asbestos",
        description: (
          <>
            Oregon law requires asbestos testing before renovating or demolishing buildings constructed before 2004. Beyond legal requirements, you should consider asbestos testing before any remodeling project that disturbs walls, flooring, ceiling tiles, insulation, or roofing materials. Real estate transactions often require asbestos inspections, especially for older properties. If you notice damaged or deteriorating building materials that appear fibrous, crumbly, or are releasing dust, testing is strongly recommended. Common materials that may contain asbestos include vinyl floor tiles, popcorn ceilings, pipe insulation, cement siding, and vermiculite attic insulation.
          </>
        ),
        img: ''
      },
      {
        title: "Types of Asbestos Analysis",
        description: (
          <>
            We offer two primary methods of asbestos analysis. <strong>PLM (Polarized Light Microscopy)</strong> is the standard EPA-approved method for analyzing bulk building material samples. It identifies asbestos fiber type (chrysotile, amosite, crocidolite) and concentration. <strong>TEM (Transmission Electron Microscopy)</strong> is used for air monitoring samples and provides higher sensitivity, capable of detecting fibers too small for PLM. TEM is typically required for clearance air monitoring after abatement projects. Our <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab services</Link> team can advise which method is appropriate for your situation.
          </>
        ),
        img: ''
      },
      {
        title: "Asbestos in Eugene, Oregon",
        description: (
          <>
            Many homes and commercial buildings in Eugene were constructed during the peak years of asbestos use (1940s–1980s). Neighborhoods with older housing stock, including the Whiteaker, South Hills, and downtown areas, frequently contain asbestos in flooring, insulation, siding, and roofing materials. Oregon DEQ regulations require proper testing and notification before any renovation or demolition work on pre-2004 structures. As a local Eugene company serving Lane County since 2000, we understand the specific building materials and construction methods common to our area, helping us identify suspect materials quickly and accurately.
          </>
        ),
        img: ''
      },
      {
        title: "Chain of Custody & Documentation",
        description: (
          <>
            Every asbestos sample we collect and analyze follows strict chain-of-custody procedures. From the moment a sample is taken, it is sealed, labeled with a unique identifier, and documented at every transfer point until analysis is complete. This ensures your results are legally defensible and accepted by Oregon DEQ, EPA, and other regulatory agencies. Our reports include sample locations, photographs, analytical results, laboratory accreditation information, and recommendations. We maintain all records for regulatory compliance and can provide documentation for real estate transactions, permit applications, and legal proceedings.
          </>
        ),
        img: ''
      },
    ],
    faqData: [
      {
        question: "How much does asbestos testing cost in Eugene, Oregon?",
        answer: "Asbestos testing costs vary based on the number of samples and type of analysis required. A single bulk sample PLM analysis typically starts around $25-35. Most residential inspections involve 3-10 samples depending on the size and age of the building. Contact us at 541-988-9823 for a free quote based on your specific project."
      },
      {
        question: "How long does asbestos testing take?",
        answer: "Standard turnaround for PLM analysis is 3-5 business days from when samples arrive at our lab. Rush service is available for an additional fee, with results possible within 24 hours. Because our lab is local in Eugene, you avoid the shipping delays of out-of-state laboratories."
      },
      {
        question: "Do I need asbestos testing before renovating my home in Oregon?",
        answer: "Yes. Oregon DEQ requires an asbestos survey before renovating or demolishing any structure built before 2004. This applies to both residential and commercial properties. Failing to test can result in fines and potential health hazards for workers and occupants."
      },
      {
        question: "What happens if asbestos is found in my building?",
        answer: "If asbestos is confirmed, you have several options depending on the material's condition. Intact, undamaged asbestos materials can often be managed in place through encapsulation or an operations and maintenance plan. Damaged or friable materials, or those that will be disturbed during renovation, must be removed by a licensed abatement contractor. Our hazmat services team can handle the entire removal process safely and in compliance with Oregon regulations."
      },
      {
        question: "Is asbestos common in Eugene, Oregon homes?",
        answer: "Yes, asbestos is very common in Eugene homes built before the mid-1980s. It was widely used in floor tiles, pipe insulation, popcorn ceilings, cement siding, roof shingles, and vermiculite attic insulation. Even homes built up to 2004 may contain some asbestos-containing materials, as certain products were not fully banned until then."
      },
      {
        question: "Can I collect asbestos samples myself?",
        answer: "While homeowners can legally collect their own samples in Oregon, we strongly recommend hiring a certified inspector. Disturbing asbestos-containing materials without proper precautions can release dangerous fibers into the air. A certified inspector knows how to safely collect samples while minimizing fiber release and follows proper wet-sampling techniques to reduce risk."
      },
    ],
  },
  {
    id: "biohazard-cleanup",
    title: "Biohazard & Crime Scene Cleanup",
    slug: "biohazard-cleanup",
    img: "/img/Cleanup.jpg",
    metaTitle: "Biohazard & Crime Scene Cleanup Eugene | Lane County, Oregon",
    metaDescription: "Discreet biohazard, crime scene, trauma, and unattended death cleanup in Eugene-Springfield and Lane County, Oregon. 24/7 response. Call 541-988-9823.",
    shortDescription: "Safe and thorough biohazard and crime scene cleanup in Lane County to remove health risks and contamination.",
    description: (
      <>
        Biohazard incidents require a fast, discreet, and professional response. At Northwest Hazmat, we are trained to manage high-risk situations such as trauma scenes, unattended deaths, infectious waste, and hoarding conditions. We remove hazardous materials, decontaminate affected areas, and restore sites to a safe and livable condition. Our teams are compassionate, efficient, and fully equipped to handle even the most extreme cases with dignity and care. All technicians are trained in <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER protocols</Link> and emergency response procedures.
      </>
    ),
    keywords: ["biohazard cleanup lane county", "crime scene cleanup eugene", "biohazard cleanup eugene oregon", "trauma cleanup oregon", "unattended death cleanup eugene", "crime scene cleaning oregon"],
    eButton: true,
    callToAction: "In a crisis? Contact Northwest Hazmat immediately.",
    pageInfo: [
      {
        title: "Crime Scene Cleanup",
        description: (
          <>
            Crime scene cleanup is a sensitive and crucial service that requires specialized expertise. Our team is trained to handle hazardous materials such as blood, bodily fluids, and other biohazards following a traumatic event. We ensure that the area is thoroughly disinfected and sanitized to meet health and safety standards. Our discreet and compassionate service provides peace of mind to families, businesses, and property owners during a challenging time, restoring the space to a safe, clean condition. Our <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab testing services</Link> can verify complete decontamination.
          </>
        ),
        img: ""
      },
      {
        title: "Unattended Death Response",
        description: (
          <>
            Unattended death response is a specialized service for cleaning and sanitizing areas where a death has occurred, especially when the body has been undiscovered for some time. Our professionals carefully and respectfully handle the situation, removing any biohazardous materials and thoroughly cleaning the environment to prevent the spread of disease and odors. We work quickly and efficiently to restore the area to a safe, habitable condition while offering compassionate support during a difficult time. For additional cleanup needs, our <Link href="/services/dedication-services" className="text-blue-600 hover:underline">dedication services</Link> can help with complete restoration.
          </>
        ),
        img: ""
      },
      {
        title: "Infectious Waste Removal",
        description: (
          <>
            Infectious waste removal is an essential service for healthcare facilities, laboratories, and businesses dealing with medical or biological hazards. We ensure that all infectious waste, such as used medical supplies, syringes, contaminated materials, and other biohazards, are safely collected, transported, and disposed of in accordance with environmental regulations. Our team is equipped with the proper protective gear and protocols to minimize risks, ensuring the safety of both workers and the public. We also provide comprehensive <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management consulting</Link> for ongoing compliance.
          </>
        ),
        img: ""
      },
      {
        title: "Hoarding and Drug Lab Decontamination",
        description: (
          <>
            Hoarding and drug lab decontamination are specialized services designed to address unique and dangerous contamination issues. Whether it's the accumulation of unsanitary items or the hazardous chemicals and residue left behind in illegal drug labs, we provide thorough cleaning and decontamination to restore the property. Our team follows strict guidelines to handle the removal of hazardous materials, disinfect the area, and eliminate health risks, ensuring that the property is safe for reentry. These situations often require additional <Link href="/services/mold-remediation" className="text-blue-600 hover:underline">mold remediation</Link> due to moisture and contamination issues.
          </>
        ),
        img: ""
      },
    ]
  },
  {
    id: "waste-management-consulting",
    title: "Hazardous Waste Disposal & Consulting",
    slug: "waste-management-consulting",
    img: "/img/Managment-Services.jpg",
    metaTitle: "Hazardous Waste Disposal Eugene Oregon | Lane County",
    metaDescription: "Licensed hazardous waste disposal, transportation, and consulting in Eugene-Springfield and Lane County, Oregon. EPA/DOT compliant. Call 541-988-9823.",
    shortDescription: "Expert hazardous waste disposal and consulting in Eugene, Oregon — project management, transport, and compliance solutions.",
    description: (
      <>
        Hazardous waste disposal is highly regulated and logistically complex. Northwest Hazmat offers professional waste management solutions that help clients navigate compliance and reduce risk. Our hazardous waste consultants evaluate your waste streams, recommend best practices, and handle transportation and disposal with complete documentation. As experienced hazardous waste consultants, our team is designed to improve operational safety, reduce environmental liability, and ensure all protocols meet local, state, and federal requirements. Our hazardous waste consultants include certified experts trained in <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER standards</Link> and emergency response.
      </>
    ),
    keywords: ["hazardous waste disposal Oregon", "environmental consulting", "hazardous waste consultants Oregon"],
    callToAction: "Call today for a compliance consultation.",
    pageInfo: [
      {
        title: "Waste Stream Classification",
        description: (
          <>
            Waste stream classification is the process of identifying and categorizing various types of waste based on their composition, hazardous nature, and disposal requirements. Our waste stream classification service helps businesses and facilities ensure that their waste is properly sorted and handled in compliance with environmental regulations. By accurately classifying waste, we help minimize risks, reduce environmental impact, and streamline disposal processes for safe and efficient waste management. Our <Link href="/services/lab-services" className="text-blue-600 hover:underline">lab testing services</Link> provide accurate analysis to support proper classification.
          </>
        ),
        img: ""
      },
      {
        title: "Disposal Logistics",
        description: (
          <>
            Disposal logistics involves the planning, coordination, and execution of waste removal and disposal services. Our team ensures that hazardous and non-hazardous materials are safely transported, handled, and disposed of according to regulatory guidelines. We manage every step of the disposal process, from pick-up to transportation, and ensure that all disposal practices are environmentally responsible. With our efficient disposal logistics, we help businesses meet compliance standards and avoid costly fines. For complex hazardous materials, we coordinate with our <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat specialists</Link> for safe handling.
          </>
        ),
        img: "/img/Disposal_Logi.jpg"
      },
      {
        title: "Compliance Reviews",
        description: (
          <>
            Compliance reviews are essential for ensuring that businesses and facilities meet all local, state, and federal regulations related to waste management, health, safety, and environmental protection. Our compliance review service involves a comprehensive assessment of your operations to identify areas of non-compliance, potential risks, and areas for improvement. After reviewing your practices, we provide clear recommendations for achieving compliance, helping you avoid penalties and maintain a safe, legal, and environmentally responsible operation. We often recommend <Link href="/training/hazmat-technician" className="text-blue-600 hover:underline">hazmat training</Link> for your staff as part of compliance improvements.
          </>
        ),
        img: ""
      },
      {
        title: "On-Site Audits",
        description: (
          <>
            On-site audits are an in-depth evaluation of a facility's operations, waste management practices, and overall compliance with environmental regulations. Our team conducts thorough inspections of your property to assess the handling, storage, and disposal of hazardous and non-hazardous materials. We identify potential risks, inefficiencies, and compliance gaps, providing you with a detailed audit report that outlines corrective actions and best practices. Our on-site audits help ensure that your operations are safe, compliant, and optimized for environmental responsibility. Training recommendations often include <Link href="/training/spill-response-training" className="text-blue-600 hover:underline">spill response training</Link> for key personnel.
          </>
        ),
        img: ""
      },
    ]
  },
  {
    id: "dedication-services",
    title: "Dedication Services",
    slug: "dedication-services",
    img: "/img/Dedication-Services.jpg",
    metaTitle: "Dedication & Ceremonial Space Cleaning | Eugene, Oregon",
    metaDescription: "Professional cleaning and restoration for dedication and ceremonial spaces in Eugene & Lane County, Oregon — memorials, worship sites, and more. Call 541-988-9823.",
    shortDescription: "Committed to delivering safe, high-quality solutions for every project.",
    description: (
      <>
        Respect and cleanliness go hand-in-hand when preparing for a dedication or ceremonial event. Northwest Hazmat offers professional cleaning and restoration services tailored to sacred, historical, or emotionally significant spaces. Whether you're hosting a memorial, reclaiming a site for community use, or preparing a space of worship, we bring precision, care, and professionalism to every detail. Our comprehensive services range from basic cleanup to full restoration, and we work closely with our <Link href="/services/mold-remediation" className="text-blue-600 hover:underline">mold remediation</Link> and <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">biohazard cleanup</Link> teams when specialized decontamination is needed.
      </>
    ),
    keywords: ["dedication cleaning Oregon", "ceremonial site preparation"],
    callToAction: "Contact us for respectful and professional dedication services.",
    pageInfo: [
      {
        title: "Demolition",
        description: (
          <>
            Our demolition service is designed to safely and efficiently tear down structures of all sizes, whether residential, commercial, or industrial. We use state-of-the-art equipment and follow strict safety protocols to ensure that demolition is completed without compromising the surrounding area. Whether you're remodeling, rebuilding, or clearing land for new construction, we manage all aspects of the demolition process, from permits to debris removal, leaving the site ready for the next phase of your project. All demolition work includes proper <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management</Link> and disposal of materials.
          </>
        ),
        img: ""
      },
      {
        title: "Excavation / Dirt Work",
        description: (
          <>
            Excavation and dirt work services are essential for preparing land for construction, landscaping, or other site developments. Our experienced team uses heavy equipment to perform tasks such as trenching, grading, leveling, and clearing land. Whether you need a foundation dug, soil moved, or a site prepped for a new structure, we provide reliable, efficient excavation and dirt work to ensure a solid, safe base for your project. When contaminated soil is discovered, we coordinate with our <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation specialists</Link> for proper handling.
          </>
        ),
        img: "/img/Dirt_Work.jpg"
      },
      {
        title: "Debris Removal",
        description: (
          <>
            Debris removal is critical for maintaining a clean and safe environment after a construction project, storm damage, or other cleanup efforts. Our team handles the removal of all types of debris, from construction materials to natural debris, and transports it to appropriate disposal facilities. We ensure the area is cleared quickly and responsibly, leaving your property clean and ready for its next use. For hazardous debris, we coordinate with our <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat specialists</Link> to ensure safe handling and disposal.
          </>
        ),
        img: ""
      },
      {
        title: "Board-up Services",
        description: "Board-up services are essential for securing vacant or damaged buildings, particularly after a disaster such as a fire, storm, or break-in. We provide fast, reliable board-up solutions to protect your property from further damage, vandalism, or weather conditions. Our team will carefully board up windows, doors, and other vulnerable openings, ensuring that your property is secure until repairs can be made.",
        img: ""
      },
      {
        title: "Homeless Camp Debris Removal",
        description: (
          <>
            Homeless camp debris removal is a specialized service designed to clean up areas impacted by illegal encampments. We handle the safe and respectful removal of waste, abandoned belongings, and other debris left behind. Our team works efficiently to restore the affected area, ensuring that it's clean, safe, and free of hazardous materials. We adhere to local laws and regulations, ensuring that the cleanup process is handled with care and sensitivity. Sites often require additional <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">biohazard cleanup</Link> services for complete decontamination.
          </>
        ),
        img: "/img/Homeless.jpg"
      },
      {
        title: "Maintenance for Foreclosed Property",
        description: "Foreclosed properties often require regular maintenance and upkeep to ensure they remain in good condition during the transition process. Our maintenance service for foreclosed properties includes everything from lawn care and general cleaning to securing the property and addressing minor repairs. We help prevent further damage and deterioration, ensuring that the property is ready for resale or further inspection by potential buyers.",
        img: ""
      },
      {
        title: "Mold Abatement",
        description: (
          <>
            Mold abatement is a vital service for removing mold and preventing its return. We use advanced techniques to identify and eliminate mold from affected areas, including walls, ceilings, and air systems. Our team not only removes visible mold but also treats the underlying causes, such as excess moisture, to ensure the mold does not return. With our thorough mold abatement services, we help restore a healthy indoor environment for your home or business. For comprehensive mold services, visit our <Link href="/services/mold-remediation" className="text-blue-600 hover:underline">mold remediation page</Link>.
          </>
        ),
        img: ""
      },
      {
        title: "ORSO",
        description: (
          <>
            The OSRO certification is crucial for Northwest Hazmat and when it comes to oil spill response due to its focus on public and environmental safety. It ensures that we are equipped with the necessary expertise, equipment, and resources to respond effectively to oil spills. The certification process involves rigorous evaluation by the USCG, assessing factors such as response equipment, personnel training, response planning, and financial capability. Northwest Hazmat meets the OSRO certification requirements our crews can mobilize and deploy resources quickly in the event of an oil spill, significantly reducing response times and limiting the spread of oil. This proactive approach helps minimize the long-term environmental, economic, and social impacts of oil spills, safeguarding both natural resources and human livelihoods. Our response teams are trained in <Link href="/training/spill-response-training" className="text-blue-600 hover:underline">specialized spill response techniques</Link> and maintain current <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER certifications</Link>.
          </>
        ),
        img: "/img/Orso_Img.png"
      },
    ]
  }
];