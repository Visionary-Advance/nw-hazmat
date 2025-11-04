import Link from 'next/link';

// @/data/TrainingData.js
export const training = [
  {
    id: "hazwoper-40-hour",
    slug: "hazwoper-40-hour",
    title: "HAZWOPER 40-Hour Certification",
    img: "/img/40-Hour.jpg",
    shortDescription: "Comprehensive hazmat emergency response training and hazardous waste operations.",
    description: (
      <>
        This OSHA-mandated hazmat emergency response training course prepares workers for hazardous waste operations and emergency response. Topics include toxicology, PPE, decontamination, spill response, and regulatory standards. Perfect for workers handling hazardous materials or working on contaminated sites. This hazmat emergency response training certification is essential for anyone working in <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat services</Link>, <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation</Link>, or <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">biohazard cleanup</Link> operations.
      </>
    ),
    keywords: ["HAZWOPER training Oregon", "40-hour hazwoper course", "hazmat certification", "hazmat emergency response training"],
    eButton: true,
    callToAction: "Enroll in HAZWOPER training today to meet OSHA standards.",
    pageInfo: [
      {
        title: "Who Needs This Training?",
        description: (
          <>
            This training is required for employees working at uncontrolled hazardous waste sites, emergency response operations, or those involved in cleanup operations. Workers in our <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat services</Link> and <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation</Link> teams must maintain current HAZWOPER certification.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Hazardous waste site characterization",
      "Personal protective equipment (PPE) selection and use",
      "Decontamination procedures",
      "Emergency response protocols",
      "Air monitoring and detection",
      "Site control and safety procedures",
      "Toxicology basics",
      "Medical surveillance requirements",
      "Confined space entry procedures",
      "Hands-on training exercises",
      "Regulatory compliance (OSHA, EPA standards)"
    ]
  },
  
  {
    id: "general-site-worker",
    slug: "general-site-worker",
    title: "General Site Worker",
    img: "/img/General.jpg",
    shortDescription: "Essential training for workers at hazardous waste sites.",
    description: (
      <>
        The general site worker denotes those who are generally at the site where cleanup operations take place and whose job responsibilities place them in possible contact with hazardous waste above the permissible exposure limits (PEL) established by OSHA. Northwest HazMat presents the 40 hour Hazwoper/General Site Worker course that meets or exceeds the training requirements for OSHA's 29CFR1910.120. This training is essential for workers involved in <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat cleanup operations</Link> and <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">contaminated site remediation</Link>. Forty hours of comprehensive training incorporates both classroom with hands on training.
      </>
    ),
    keywords: ["general site worker", "hazmat training", "site cleanup"],
    callToAction: "Get certified for safe site work operations.",
    pageInfo: [
      {
        title: "Training Requirements",
        description: (
          <>
            This course meets OSHA requirements for general site workers and prepares employees for safe work at hazardous waste sites. Workers completing this training can safely participate in <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">soil remediation projects</Link> and emergency response operations under proper supervision.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Site characterization and analysis",
      "Hazard recognition and assessment",
      "Personal protective equipment selection",
      "Decontamination procedures",
      "Emergency response basics",
      "Air monitoring principles",
      "Site safety and health plan review",
      "Medical surveillance overview",
      "Hands-on exercises with PPE",
      "Regulatory compliance training"
    ]
  },
  
  {
    id: "occasional-site-worker",
    slug: "occasional-site-worker",
    title: "Occasional Site Worker",
    img: "/img/Occasional.jpg",
    shortDescription: "Training for workers with limited hazmat site exposure.",
    description: (
      <>
        Occasional Site Workers are those whose job responsibilities place them at a site only on an occasional basis and whose potential exposure is below the permissible exposure limit. We provide training that addresses the OSW requirements. The material presented parallels the technician level training but is tailored for workers with limited site exposure. This training is ideal for supervisors, managers, and support staff who may occasionally visit <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat cleanup sites</Link> or <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">remediation projects</Link>.
      </>
    ),
    keywords: ["occasional site worker", "limited hazmat exposure", "supervisor training"],
    callToAction: "Train occasional site visitors for safety compliance.",
    pageInfo: [
      {
        title: "Who Needs This Training?",
        description: (
          <>
            This training is designed for managers, supervisors, and support personnel who occasionally visit hazardous waste sites but have limited exposure potential. Perfect for those overseeing <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management projects</Link> or conducting site inspections.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Hazard recognition fundamentals",
      "Site safety basics",
      "Personal protective equipment overview",
      "Emergency procedures",
      "Decontamination awareness",
      "Communication protocols",
      "Site entry and exit procedures",
      "Regulatory overview",
      "Risk assessment basics",
      "Documentation requirements"
    ]
  },
  
  {
    id: "confined-space-entry",
    slug: "confined-space-entry",
    title: "Confined Space Entry",
    img: "/img/Confined.jpg",
    shortDescription: "OSHA-compliant training for identifying and working in confined spaces.",
    description: (
      <>
        Learn how to safely enter, monitor, and exit confined spaces with proper use of ventilation, PPE, and communication. This comprehensive training covers OSHA's confined space regulations and is essential for workers involved in <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat operations</Link>, tank cleaning, vault maintenance, and pipeline work. Workers completing this training can safely perform <Link href="/services/lab-services" className="text-blue-600 hover:underline">air quality testing</Link> and monitoring in confined environments.
      </>
    ),
    keywords: ["confined space training", "hazmat confined space", "OSHA compliance"],
    callToAction: "Train your team for safe confined space operations.",
    pageInfo: [
      {
        title: "Critical Safety Training",
        description: (
          <>
            Confined space entry is one of the most hazardous activities in industrial work. This training ensures workers can identify confined spaces, assess atmospheric hazards, and follow proper entry procedures. Essential for teams working on <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">underground remediation projects</Link> and industrial maintenance.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Confined space identification and classification",
      "Permit-required confined space procedures",
      "Atmospheric testing and monitoring",
      "Ventilation requirements and methods",
      "Personal protective equipment selection",
      "Entry permits and documentation",
      "Emergency rescue procedures",
      "Communication systems and protocols",
      "Entrant, attendant, and supervisor duties",
      "Hands-on practice with monitoring equipment",
      "OSHA regulatory compliance"
    ]
  },
  
  {
    id: "hazmat-technician",
    slug: "hazmat-technician",
    title: "Hazmat Technician",
    img: "/img/Hazmat_Tech.jpg",
    shortDescription: "Advanced training for hazmat response technicians.",
    description: (
      <>
        Hazardous Materials technicians are personnel who respond to an emergency in order to stop or prevent a release of hazardous substances. These people assume an offensive response role as they approach the point of release with the intent to stop the release at the source. This advanced training builds upon <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER 40-Hour certification</Link> and prepares technicians for complex <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat response operations</Link> and <Link href="/training/spill-response-training" className="text-blue-600 hover:underline">spill response scenarios</Link>. Northwest HazMat provides the training that will allow the student to demonstrate their ability and show competence in advanced hazmat operations.
      </>
    ),
    keywords: ["hazmat technician", "emergency response", "advanced hazmat training"],
    eButton: false,
    callToAction: "Advance your hazmat response capabilities.",
    pageInfo: [
      {
        title: "Advanced Response Training",
        description: (
          <>
            This course prepares technicians to take offensive action to stop hazmat releases at the source. Students learn advanced techniques used in <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">emergency response operations</Link> and gain expertise in complex containment and mitigation strategies.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Advanced emergency response planning implementation",
      "Sophisticated field survey instruments operation",
      "Unknown material identification and classification",
      "Incident Command System role integration",
      "Advanced personal protective equipment selection",
      "Complex hazard and risk assessment techniques",
      "Advanced containment and confinement operations",
      "Comprehensive decontamination procedures",
      "Incident termination and documentation",
      "Chemical and toxicological analysis",
      "Advanced equipment operation and maintenance"
    ]
  },
  
  {
    id: "spill-response-training",
    slug: "spill-response-training",
    title: "Spill Response Training",
    img: "/img/Spill.jpg",
    shortDescription: "Hands-on training for managing hazardous material spills.",
    description: (
      <>
        Spill response training can ensure that your staff knows just what to do in any given situation, from the first responder all the way up to incident commander. These training courses have been designed and developed to fulfill the training requirements of personnel working within the different areas of hazardous materials handling. This training complements our <Link href="/training/hazwoper-40-hour" className="text-blue-600 hover:underline">HAZWOPER certification</Link> and prepares teams for real-world <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">emergency response scenarios</Link>. Students learn techniques used in our <Link href="/services/dedication-services" className="text-blue-600 hover:underline">ORSO-certified spill response operations</Link>.
      </>
    ),
    keywords: ["spill cleanup training", "emergency response", "hazmat spill response"],
    callToAction: "Be ready — train for spill emergencies today.",
    pageInfo: [
      {
        title: "Emergency Response Readiness",
        description: (
          <>
            Quick and effective spill response can mean the difference between a minor incident and a major environmental disaster. This training prepares teams to respond immediately to spills and contains specialized modules for different types of incidents encountered in <Link href="/services/soil-remediation" className="text-blue-600 hover:underline">environmental cleanup</Link> and <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">biohazard situations</Link>.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Spill incident assessment and classification",
      "Emergency response plan activation",
      "Spill containment and control techniques",
      "Absorbent materials selection and application",
      "Personal protective equipment for spill response",
      "Environmental impact minimization",
      "Spill cleanup and waste disposal procedures",
      "Documentation and reporting requirements",
      "Multi-agency coordination and communication",
      "Hands-on spill response simulations",
      "Post-incident analysis and lessons learned"
    ]
  },
  
  {
    id: "first-responder-awareness",
    slug: "first-responder-awareness",
    title: "First Responder Awareness",
    img: "/img/First_Res_Aware.jpg",
    shortDescription: "Intro-level hazmat first responder training for identifying hazardous materials in emergencies.",
    description: (
      <>
        Designed for individuals likely to witness a hazardous release. This foundational hazmat first responder training course teaches recognition, reporting procedures, and the importance of not attempting to stop the release. It serves as the entry-level hazmat first responder training that can lead to more advanced certifications like <Link href="/training/first-responder-operations" className="text-blue-600 hover:underline">First Responder Operations</Link> and eventually <Link href="/training/hazmat-technician" className="text-blue-600 hover:underline">Hazmat Technician</Link> certification. Essential for personnel who may encounter hazardous materials in their workplace or during <Link href="/services/waste-management-consulting" className="text-blue-600 hover:underline">waste management operations</Link>.
      </>
    ),
    keywords: ["hazmat awareness training", "emergency hazmat", "first responder basics", "hazmat first responder training"],
    callToAction: "Train your frontline employees for fast and safe response.",
    pageInfo: [
      {
        title: "Foundation-Level Training",
        description: (
          <>
            This awareness-level training provides the foundation for all hazmat emergency response. It's designed for workers who may discover or witness a hazmat incident but are not expected to take direct action. Perfect for general employees, security personnel, and anyone who might encounter hazardous materials during routine operations or <Link href="/services/lab-services" className="text-blue-600 hover:underline">environmental testing</Link> activities.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Hazardous materials definition and classification",
      "Potential health and environmental risks",
      "Hazmat incident recognition techniques",
      "Emergency notification procedures",
      "Basic isolation and scene security",
      "DOT Emergency Response Guidebook usage",
      "Personal safety and evacuation procedures",
      "Role limitations and boundaries",
      "Communication protocols",
      "Initial incident assessment",
      "Resource identification and activation"
    ]
  },
  
  {
    id: "first-responder-operations",
    slug: "first-responder-operations",
    title: "First Responder Operations",
    img: "/img/First_Res_Op.jpg",
    shortDescription: "Defensive hazmat first responder training for hazmat incidents.",
    description: (
      <>
        First Responders at the operations level are personnel who are involved in an initial response for the purpose of protecting people, property and the environment from hazardous substances. This hazmat first responder training course teaches FRO to respond defensively, instead of actually trying to stop the release at the source. This hazmat first responder training builds upon <Link href="/training/first-responder-awareness" className="text-blue-600 hover:underline">First Responder Awareness</Link> and prepares responders for more active roles in <Link href="/services/hazmat-services" className="text-blue-600 hover:underline">hazmat incidents</Link>. Operations-level responders work alongside our <Link href="/training/hazmat-technician" className="text-blue-600 hover:underline">certified hazmat technicians</Link> during emergency response operations.
      </>
    ),
    keywords: ["first responder operations", "defensive hazmat response", "incident command", "hazmat first responder training"],
    callToAction: "Train for defensive hazmat response operations.",
    pageInfo: [
      {
        title: "Defensive Response Operations",
        description: (
          <>
            Operations-level responders take a more active role than awareness-level personnel but focus on defensive actions to protect people and property. This training is essential for fire departments, emergency medical services, and industrial response teams who may need to operate near hazmat incidents during <Link href="/services/biohazard-cleanup" className="text-blue-600 hover:underline">emergency cleanup operations</Link> or <Link href="/training/spill-response-training" className="text-blue-600 hover:underline">spill response scenarios</Link>.
          </>
        )
      }
    ],
    whatsIncluded: [
      "Hazard assessment and risk evaluation",
      "Defensive response strategy development",
      "Personal protective equipment selection and use",
      "Basic containment and control operations",
      "Decontamination procedures and setup",
      "Incident Command System operations",
      "Communication and coordination protocols",
      "Resource management and deployment",
      "Safety zone establishment and maintenance",
      "Environmental protection measures",
      "Documentation and reporting requirements"
    ]
  }
];