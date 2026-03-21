import { z } from "zod";

const nonEmptyString = z.string().min(1);
const nonEmptyStringArray = z.array(nonEmptyString).min(1);

const pageHeaderSchema = z.object({
  badge: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
});

export const contactPageCopySchema = z.object({
  badge: nonEmptyString,
  intro: nonEmptyString,
  formTitle: nonEmptyString,
  formDescription: nonEmptyString,
  firstNameLabel: nonEmptyString,
  lastNameLabel: nonEmptyString,
  emailLabel: nonEmptyString,
  messageLabel: nonEmptyString,
  submitLabel: nonEmptyString,
  submittingLabel: nonEmptyString,
  detailsTitle: nonEmptyString,
  detailsDescription: nonEmptyString,
  mobileLabel: nonEmptyString,
  emailInfoLabel: nonEmptyString,
  websiteLabel: nonEmptyString,
  salesOfficeLabel: nonEmptyString,
  managementOfficeLabel: nonEmptyString,
});

export const aboutPageCopySchema = z.object({
  header: pageHeaderSchema,
  overviewTitle: nonEmptyString,
  overviewParagraphs: nonEmptyStringArray,
  mandateTitle: nonEmptyString,
  mandateItems: nonEmptyStringArray,
});

export const compliancePageCopySchema = z.object({
  header: pageHeaderSchema,
  heroTitle: nonEmptyString,
  heroDescription: nonEmptyString,
  highlightItems: nonEmptyStringArray,
  complianceTitles: nonEmptyStringArray,
  complianceDescriptions: nonEmptyStringArray,
  mandatesTitle: nonEmptyString,
  mandateTitles: nonEmptyStringArray,
  mandateDescriptions: nonEmptyStringArray,
});

export const technologyPageCopySchema = z.object({
  header: pageHeaderSchema,
  stackTitle: nonEmptyString,
  stackTitles: nonEmptyStringArray,
  stackDescriptions: nonEmptyStringArray,
  benefitsTitle: nonEmptyString,
  benefits: nonEmptyStringArray,
});

export const impactPageCopySchema = z.object({
  header: pageHeaderSchema,
  cardTitles: nonEmptyStringArray,
  cardDescriptions: nonEmptyStringArray,
  standardsTitle: nonEmptyString,
  standardsDescription: nonEmptyString,
});

export const clientServicesPageCopySchema = z.object({
  header: pageHeaderSchema,
  serviceTitles: nonEmptyStringArray,
  serviceDescriptions: nonEmptyStringArray,
  serviceBullets: z.array(nonEmptyStringArray).min(1),
  visitationTitle: nonEmptyString,
  visitationDescription: nonEmptyString,
  logisticsTitle: nonEmptyString,
  logisticsDescription: nonEmptyString,
  itineraryTitle: nonEmptyString,
  itineraryDescription: nonEmptyString,
});

export const mangoProgramPageCopySchema = z.object({
  header: pageHeaderSchema,
  overviewTitle: nonEmptyString,
  overviewPoints: nonEmptyStringArray,
  insuranceTitle: nonEmptyString,
  insuranceDescription: nonEmptyString,
  insurancePoints: nonEmptyStringArray,
  benefitsTitle: nonEmptyString,
  benefitsPoints: nonEmptyStringArray,
  snapshotTitle: nonEmptyString,
  snapshotLabels: nonEmptyStringArray,
  snapshotValues: nonEmptyStringArray,
  snapshotFootnote: nonEmptyString,
});

export const agarwoodLifeCyclePageCopySchema = z.object({
  header: pageHeaderSchema,
  overviewTitle: nonEmptyString,
  overviewPoints: nonEmptyStringArray,
  commercialTitle: nonEmptyString,
  commercialPoints: nonEmptyStringArray,
  insuranceTitle: nonEmptyString,
  insuranceDescription: nonEmptyString,
  insurancePoints: nonEmptyStringArray,
  stageTitles: nonEmptyStringArray,
  stagePeriods: nonEmptyStringArray,
  stageDetails: nonEmptyStringArray,
});

export const ecotourismPageCopySchema = z.object({
  header: pageHeaderSchema,
  introParagraphs: nonEmptyStringArray,
  guideTitle: nonEmptyString,
  guideItems: nonEmptyStringArray,
  flightsTitle: nonEmptyString,
  flightItems: nonEmptyStringArray,
  routeTitle: nonEmptyString,
  routeSteps: nonEmptyStringArray,
  contextTitle: nonEmptyString,
  contextItems: nonEmptyStringArray,
  galleryTitle: nonEmptyString,
});

export const homePageCopySchema = z.object({
  heroBadge: nonEmptyString,
  heroTitlePrefix: nonEmptyString,
  heroTitleHighlight: nonEmptyString,
  heroDescription: nonEmptyString,
  primaryCtaLabel: nonEmptyString,
  secondaryCtaLabel: nonEmptyString,
  statsLabels: nonEmptyStringArray,
  statsValues: nonEmptyStringArray,
  statsDescriptions: nonEmptyStringArray,
  liveMetricsTitle: nonEmptyString,
  currentStockLabel: nonEmptyString,
  stockLabels: nonEmptyStringArray,
  summaryCardLabels: nonEmptyStringArray,
  summaryCardDescriptions: nonEmptyStringArray,
  nurseryCtaLabel: nonEmptyString,
  snapshotTitle: nonEmptyString,
  snapshotDescription: nonEmptyString,
  galleryCtaLabel: nonEmptyString,
  snapshotCardTitles: nonEmptyStringArray,
  snapshotCardDescriptions: nonEmptyStringArray,
  governanceTitles: nonEmptyStringArray,
  governanceDescriptions: nonEmptyStringArray,
  visitsTitle: nonEmptyString,
  visitsDescription: nonEmptyString,
  visitsBullets: nonEmptyStringArray,
});

export const nurseryPageCopySchema = z.object({
  header: pageHeaderSchema,
  overviewEyebrow: nonEmptyString,
  overviewTitle: nonEmptyString,
  overviewDescription: nonEmptyString,
  stockLabels: nonEmptyStringArray,
  stockDescriptions: nonEmptyStringArray,
  saleHeaderPrefix: nonEmptyString,
  galleryTitle: nonEmptyString,
  galleryLinkLabel: nonEmptyString,
  propagationTitle: nonEmptyString,
  propagationDescriptions: nonEmptyStringArray,
  dashboardTitle: nonEmptyString,
  growthLabels: nonEmptyStringArray,
  growthDescriptions: nonEmptyStringArray,
  mortalityLabel: nonEmptyString,
  updatedPrefix: nonEmptyString,
  technologyTitle: nonEmptyString,
  technologyTitles: nonEmptyStringArray,
  technologyDescriptions: nonEmptyStringArray,
});

export const plantationPageCopySchema = z.object({
  header: pageHeaderSchema,
  galleryTitle: nonEmptyString,
  galleryDescription: nonEmptyString,
  milestoneTitle: nonEmptyString,
  milestoneDescription: nonEmptyString,
  milestoneLabels: nonEmptyStringArray,
  milestoneValues: nonEmptyStringArray,
  milestoneNotes: nonEmptyStringArray,
  landPreparationTitle: nonEmptyString,
  soilProtocolTitle: nonEmptyString,
  soilProtocolDescription: nonEmptyString,
  cassavaTitle: nonEmptyString,
  cassavaDescription: nonEmptyString,
  lifecycleTitle: nonEmptyString,
  agarwoodLabel: nonEmptyString,
  agarwoodSubtitle: nonEmptyString,
  mangoLabel: nonEmptyString,
  mangoSubtitle: nonEmptyString,
  agarwoodLifecycleTitles: nonEmptyStringArray,
  agarwoodLifecycleDescriptions: nonEmptyStringArray,
  mangoLifecycleTitles: nonEmptyStringArray,
  mangoLifecycleDescriptions: nonEmptyStringArray,
});

export const managementPageCopySchema = z.object({
  header: pageHeaderSchema,
  helperText: nonEmptyString,
  categoryTitles: nonEmptyStringArray,
});

export const photoGalleryPageCopySchema = z.object({
  backButtonLabel: nonEmptyString,
  heroBadge: nonEmptyString,
  heroTitle: nonEmptyString,
  heroDescription: nonEmptyString,
  statLabels: nonEmptyStringArray,
  browseCollectionsTitle: nonEmptyString,
  browseCollectionsDescription: nonEmptyString,
  currentCollectionLabel: nonEmptyString,
  noResultsTitle: nonEmptyString,
  noResultsDescription: nonEmptyString,
  searchPlaceholder: nonEmptyString,
  viewHint: nonEmptyString,
  categoryLabels: nonEmptyStringArray,
  categorySubtitles: nonEmptyStringArray,
});

export const siteCopySchema = z.object({
  contact: contactPageCopySchema,
  about: aboutPageCopySchema,
  compliance: compliancePageCopySchema,
  technology: technologyPageCopySchema,
  impact: impactPageCopySchema,
  clientServices: clientServicesPageCopySchema,
  mangoProgram: mangoProgramPageCopySchema,
  agarwoodLifeCycle: agarwoodLifeCyclePageCopySchema,
  ecotourism: ecotourismPageCopySchema,
  home: homePageCopySchema,
  nursery: nurseryPageCopySchema,
  plantation: plantationPageCopySchema,
  management: managementPageCopySchema,
  photoGallery: photoGalleryPageCopySchema,
});

export type SiteCopy = z.infer<typeof siteCopySchema>;

export const defaultSiteCopy: SiteCopy = {
  contact: {
    badge: "Direct Contact",
    intro: "Get in touch with Golden Forests for partnership, operations, and client support.",
    formTitle: "Contact us",
    formDescription:
      "Share your inquiry and our team will get back to you regarding partnerships, operations, and client support.",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    emailLabel: "Email *",
    messageLabel: "Message *",
    submitLabel: "Submit",
    submittingLabel: "Submitting...",
    detailsTitle: "Contact Details",
    detailsDescription: "Reach our offices directly through the contact points below.",
    mobileLabel: "Mobile",
    emailInfoLabel: "Email",
    websiteLabel: "Website",
    salesOfficeLabel: "Sales & Marketing Head Office",
    managementOfficeLabel: "Plantation Management Office",
  },
  about: {
    header: {
      badge: "Corporate Profile",
      title: "About Us",
      description:
        "Crassna Agroforestry Development Inc. (CADI) is the Philippine plantation management company within the Golden Forests group, executing agarwood and mango operations for global clients.",
    },
    overviewTitle: "Corporate Overview",
    overviewParagraphs: [
      "Golden Forests operates through an international model: an ADGM holding company in Abu Dhabi, a Dubai FZCO sales and marketing arm, and CADI as the Philippine operating platform.",
      "Under this structure, CADI executes nursery propagation, out-planting, maintenance, inoculation scheduling, harvest support, product sales, and reporting for client-owned trees in Zambales province.",
    ],
    mandateTitle: "Operating Mandate",
    mandateItems: [
      "Dual-Crop Delivery: Integrated management of Aquilaria crassna agarwood and Sweet Elena Carabao Mango to diversify cash flow across short and long maturity timelines.",
      "Regulatory Execution: Operating workflows align with DENR and CITES II requirements with traceable ownership, export documentations, and internationally recognized export standards.",
      "Agroforestry Intelligence: AI-enabled monitoring, sensors, and drones support yield optimization and risk-managed operations.",
      "Stewardship Commitment: For each commercial tree purchased, CADI plants one exotic species tree. With 50,000 trees available for investment and 50,000 local exotic trees planted alongside them, the programme manages 100,000 trees in total.",
    ],
  },
  compliance: {
    header: {
      badge: "Legal & Regulatory",
      title: "Compliance Framework",
      description:
        "The operating model is built around regulated cultivation, documented trade pathways, and auditable governance controls for clients.",
    },
    heroTitle: "Permitting and Regulatory Position",
    heroDescription:
      "Regulatory preparedness is a strategic operating requirement in agroforestry. CADI execute under defined permits, compliance documentation, and structured oversight to support lawful cultivation and export operations.",
    highlightItems: [
      "Pre-established permitting foundations for Aquilaria crassna operations",
      "CITES-aligned export pathway integrated into operational planning",
      "Structured ownership contracts with annual audits and GPS verification",
      "PEFC/FSC certification pathway targeted for 2027",
      "Regional Wildlife Culture permit for plantation operations",
      "Bureau of Customs (BOC) certifications for import and export",
    ],
    complianceTitles: [
      "DENR Approval",
      "CITES Compliance",
      "Supply Chain Accreditation",
      "Client Governance Controls",
    ],
    complianceDescriptions: [
      "Golden Forests is positioned as a first mover with regulatory approvals for Aquilaria crassna cultivation in the Philippines.",
      "Operations are structured for CITES-aligned documentation, traceability, and legal trade workflows for agarwood exports.",
      "Program roadmap targets PEFC and FSC certification by 2027 to strengthen responsible supply chain credibility.",
      "Sales and management contracts, annual audits, GPS verification, and portal reporting are embedded into the client model.",
    ],
    mandatesTitle: "Further Legal Mandates",
    mandateTitles: [
      "PEFC Certification Pathway for Mango",
      "FSC Certification Pathway for Agarwood",
      "Contract and Governance Controls",
    ],
    mandateDescriptions: [
      "The mango program targets PEFC (Programme for the Endorsement of Forest Certification) certification by 2027 to support responsible environmental stewardship, sustainable practices, and premium export market access.",
      "The agarwood program targets FSC (Forest Stewardship Council) certification, with the application scheduled for Q4 2027, to strengthen compliant forestry operations and premium market access.",
      "The client model is supported by sales and management contracts, annual reporting protocols, and governance controls designed for transparent operational oversight.",
    ],
  },
  technology: {
    header: {
      badge: "AI Precision Farming",
      title: "Agroforestry Intelligence",
      description:
        "Golden Forests Agroforestry Intelligence integrates crop, soil, and microclimate insights with AI-enabled monitoring to improve field decisions, risk controls, and yield performance.",
    },
    stackTitle: "The Technology Stack",
    stackTitles: [
      "Drones & Yield Optimization",
      "IoT Soil Sensors",
      "Smart Irrigation",
      "AI-Enabled Monitoring",
    ],
    stackDescriptions: [
      "Aerial crop health mapping helps operations teams apply targeted interventions to improve output consistency and harvest quality.",
      "Continuous moisture and nutrient tracking provides real-time input for irrigation and crop health decisions at field-block level.",
      "Sensor-led flow control helps optimize water and input usage, supporting sustainable field management and healthier tree development.",
      "Real-time anomaly detection and predictive alerts support earlier response to stress, disease, and operational risks.",
    ],
    benefitsTitle: "Operational Benefits",
    benefits: [
      "Integrated crop, soil, and microclimate visibility for better operational decisions.",
      "Earlier anomaly detection to reduce field loss risk.",
      "Optimized irrigation and nutrient use through sensor data.",
      "Targeted drone-assisted interventions to improve yield outcomes.",
      "Higher confidence reporting with measurable field evidence.",
      "Scalable standards across agarwood and mango programs.",
    ],
  },
  impact: {
    header: {
      badge: "Community & Environment",
      title: "Positive Impact",
      description:
        "The investment model links commercial performance with measurable environmental and social outcomes in Zambales province.",
    },
    cardTitles: ["1:1 Reforestation Programme", "Local Employment & Training"],
    cardDescriptions: [
      "For each commercial agarwood or mango tree purchased, one exotic species tree is planted alongside it. With 50,000 trees available for investment and 50,000 local exotic trees planted in parallel, the reforestation programme manages 100,000 trees in total.",
      "Operations prioritize local employment and community engagement, with field teams trained on plantation care, monitoring procedures, and responsible production practices.",
    ],
    standardsTitle: "Responsible Production Standards",
    standardsDescription:
      "Production systems are designed for certified, traceable, and responsible outputs, linking client participation to long-term ecological restoration and transparent sustainability reporting.",
  },
  clientServices: {
    header: {
      badge: "Asset Administration",
      title: "Client Services",
      description:
        "Client services are structured around secure ownership, lifecycle management, and transparent reporting across the full plantation cycle.",
    },
    serviceTitles: ["Individual Tree Tracking", "Professional Reporting"],
    serviceDescriptions: [
      "Each client receives individually an identified geotagged tree and ownership certificate under sales and management contracts with GPS-verified allocation.",
      "Reporting frameworks are designed for private and institutional clients requiring annual audited updates and continuous lifecycle visibility.",
    ],
    serviceBullets: [
      [
        "Identified asset records per client holding",
        "GPS-geotagged reference location mapping",
        "Official ownership certificate per allocation",
        "Digital portal access for all clients",
        "Ownership can be transferred or inherited",
      ],
      [
        "Annual independent plantation reports",
        "Photo and field progress updates",
        "GPS-verified replacement tree reporting",
        "Real-time dashboard and documentation access",
      ],
    ],
    visitationTitle: "Client Visitation Programme",
    visitationDescription:
      "Golden Forests clients can inspect operations directly through a structured plantation visit program, including curated two-night premium accommodation options including transportation.",
    logisticsTitle: "Logistics",
    logisticsDescription:
      "Zambales province operations are accessible from Clark, Manila, and Subic corridors, with Clark approximately 1.5 hours away and Manila about 4.5 hours by road, plus onward access from Clark to major island destinations.",
    itineraryTitle: "Itinerary",
    itineraryDescription:
      "Typical itineraries include nursery review, plantation walkthrough, management briefing, and optional extended travel from Clark.",
  },
  mangoProgram: {
    header: {
      badge: "Mango Initiative",
      title: "Sweet Elena Carabao Mango Program",
      description:
        "Executive summary of the Sweet Elena Carabao mango investment model, including market demand, plantation parameters, and long-term return assumptions.",
    },
    overviewTitle: "Program Overview",
    overviewPoints: [
      "Focus crop: proprietary Carabao x Elena dwarf mango, selectively grafted to improve sweetness and quality, with dwarfing techniques applied to provide high density planting",
      "Commercial planting in Zambales province is aligned to the July 2026 rollout, with density of 416 trees per hectare.",
      "Induced flowering protocols are designed to support year-round production windows and recurring annual income.",
      "The mango model is integrated into Agroforestry Intelligence with real-time monitoring for irrigation, pests, and productivity.",
    ],
    insuranceTitle: "Harvest Guarantee Insurance",
    insuranceDescription:
      "Mango risk controls prioritize capital protection through conservative assumptions, surplus planting, and replacement commitments under managed operations.",
    insurancePoints: [
      "20% surplus trees are planted as mortality buffer.",
      "100% replacement guarantee is applied for covered loss events.",
      "Yield and pricing assumptions use conservative baselines.",
      "Only 80% of planted mango trees are assumed to produce fruit in projections.",
    ],
    benefitsTitle: "Client Benefits",
    benefitsPoints: [
      "Legal sales and management contracts with identified tree allocation.",
      "Owner certificate with GPS coordinates for full traceability.",
      "Digital portal access and annual audited plantation reporting.",
      "Tree ownership is transferable and inheritable.",
      "Plantation visit program for on-site inspection and management briefings.",
      "One endemic native tree planted for each commercial tree sold.",
      "Net proceeds are distributed after 20% management commission as defined in contract.",
    ],
    snapshotTitle: "Projected Yield & Return Snapshot",
    snapshotLabels: [
      "Lifecycle Duration",
      "Commercial Fruiting",
      "Yield Assumption",
      "Mature Yield Assumption",
      "Base Tree Sales Price",
      "Projected Annual Returns",
      "Projected Annual Returns",
    ],
    snapshotValues: [
      "25 years",
      "From year 5",
      "~30 kg per tree (year 5)",
      "~100 kg per tree (year 10+)",
      "USD 592.50 per tree",
      "~14% (years 1–15)",
      ">23% (years 16–25)",
    ],
    snapshotFootnote:
      "Net client proceeds are distributed under contract after the 20% mango harvest commission, using conservative pricing and yield assumptions.",
  },
  agarwoodLifeCycle: {
    header: {
      badge: "Process Flow",
      title: "The Life Cycle of Aquilaria crassna Agarwood",
      description:
        "Ten-year lifecycle reference for agarwood plantation development, from seed collection to inoculation, harvesting, and resin extraction.",
    },
    overviewTitle: "General Agarwood Overview",
    overviewPoints: [
      "Aquilaria crassna is cultivated in Zambales province under a professionally managed 10-year plantation cycle.",
      "Agarwood is a premium commodity used in luxury fragrance, incense, oils, and wellness applications.",
      "Global demand is concentrated in the Middle East, Asia, and Europe, while legal wild supply is constrained by CITES controls.",
      "The model combines controlled inoculation, traceable production, and regulated export pathways.",
      "The 2026 rollout targets 35,000 agarwood trees, scaling by 10% per year.",
    ],
    commercialTitle: "Commercial & Financial Model",
    commercialPoints: [
      "Projected annualized return is approximately 18.5% over a 10-year lifecycle.",
      "Base tree sales assumptions use USD 292.50 per tree with market-linked export realization.",
      "Projected yield benchmarks are ~1.5 kg per tree in year 9 and ~2.0 kg in year 10.",
      "Harvest realization is modeled 50% in year 9 and 50% in year 10.",
      "Net proceeds are distributed after 10% management commission under sales and management contracts.",
    ],
    insuranceTitle: "Harvest Guarantee Insurance",
    insuranceDescription:
      "Agarwood protection measures are structured to support long-cycle asset security through surplus planting, replacement coverage, and disciplined yield planning.",
    insurancePoints: [
      "20% surplus trees are planted as mortality buffer.",
      "100% replacement guarantee is applied for covered loss events.",
      "Yield and pricing assumptions use conservative baselines.",
    ],
    stageTitles: [
      "1. Propagation and Field Planting",
      "2. Establishment and Growth",
      "3. Controlled Inoculation",
      "4. Harvest and Extraction",
    ],
    stagePeriods: ["Year 0", "Years 1 to 6", "Years 7 to 8", "Years 9 to 10"],
    stageDetails: [
      "Nursery propagation supports July 2026 out-planting in Zambales province. Planting density is targeted at about 1,667 trees per hectare, with cassava intercropping during years 1-2 to support early canopy protection.",
      "Trees are managed under structured maintenance protocols including irrigation, nutrition, and health monitoring. This phase focuses on vigorous growth and orchard stability before resin induction.",
      "Controlled inoculation induces resin formation in mature trees. Golden Forests applies exclusively licensed inoculation technology and technical protocols to support quality and consistency in oud formation.",
      "Harvesting and oud/resin chip extraction are scheduled across two seasons, typically 50% in year 9 and 50% in year 10. Returns remain linked to actual export sales using conservative assumptions.",
    ],
  },
  ecotourism: {
    header: {
      badge: "Experience Program",
      title: "Ecotourism: Experience Your Investment",
      description:
        "Premium client travel experiences linked to plantation oversight in Zambales province and onward island destinations via Clark International Airport.",
    },
    introParagraphs: [
      "Through our exclusive ecotourism program, clients are welcomed to visit their plantation sites and see their assets performing on the ground. Each visit includes a two-night stay at a premium hotel and transportation, supported by dedicated staff to ensure a smooth, well-coordinated experience across the Philippines.",
      "The program is designed to pair financial oversight with personal travel value. Clients can combine field visibility in Zambales province with convenient onward routes to Cebu, Coron, Boracay, Bohol, El Nido, and Surigao through Clark.",
    ],
    guideTitle: "Travel Guide Overview",
    guideItems: [
      "Beaches in San Antonio, Zambales",
      "Sundowners Resort in Botolan, Zambales",
      "Clark International Airport (CRK), Pampanga",
      "Flight routes to Cebu, Coron, El Nido, Bohol, Surigao, and Boracay",
    ],
    flightsTitle: "Clark Flight Destinations",
    flightItems: [
      "Cebu (CEB)",
      "Coron / Busuanga (USU)",
      "Boracay via Caticlan (MPH)",
      "Bohol-Panglao (TAG)",
      "El Nido (ENI)",
      "Surigao (SUG), gateway to Siargao and Sohoton Cove",
    ],
    routeTitle: "Suggested Route From Manila",
    routeSteps: [
      "Travel north from Metro Manila to Zambales province by car (Approx. 4.5 hours).",
      "Visit Pundaquit, Anawangin, Nagsasa, and Capones.",
      "Continue north to Botolan for Sundowners Zambales.",
      "Travel east to Clark International Airport (about 2 hours by car).",
      "Fly from Clark to Cebu, Coron, Surigao, El Nido, Bohol, or Boracay.",
    ],
    contextTitle: "Travel Context",
    contextItems: [
      "Zambales combines plantation oversight with high-value leisure access.",
      "Clark International Airport functions as the practical connector for island circuits.",
      "Clients can structure visits as: Zambales coast + resort + island destination.",
    ],
    galleryTitle: "Destination Gallery",
  },
  home: {
    heroBadge: "Golden Forests Philippines",
    heroTitlePrefix: "Professionally Managed",
    heroTitleHighlight: "Agroforestry Investments",
    heroDescription:
      "Crassna Agroforestry Development Inc. (CADI) manages Aquilaria crassna and Sweet Elena Carabao mango plantations in Zambales province for Golden Forests clients, combining professional operations, operations ownership and product sales.",
    primaryCtaLabel: "Review Plantation Timeline",
    secondaryCtaLabel: "Open Nursery Dashboard",
    statsLabels: [
      "Agarwood Return Profile",
      "Mango Return Profile",
      "Out-Planting Milestone",
      "Diversification Pathway",
    ],
    statsValues: ["~18.5% p.a.", "~14% to 23%", "July 2026", "100,000 Trees"],
    statsDescriptions: [
      "10-year cycle with harvest in years 9-10",
      "25-year lifecycle with annual harvests from year 5",
      "Zambales field deployment for both crop lines",
      "50,000 investment trees + 50,000 local exotic trees managed",
    ],
    liveMetricsTitle: "Live Nursery Metrics",
    currentStockLabel: "Current nursery stock",
    stockLabels: ["Aquilaria crassna agarwood seedlings", "Sweet Elena Carabao mango seedlings"],
    summaryCardLabels: ["Field Deployment", "Panay Planting", "Inventory Date"],
    summaryCardDescriptions: [
      "Zambales rollout for agarwood and Sweet Elena mango",
      "Carabao mango trees currently planted in Panay",
      "Current stock and sales inventory shown as of this date",
    ],
    nurseryCtaLabel: "View Full Dashboard",
    snapshotTitle: "Operations Snapshot",
    snapshotDescription: "Visual documentation from nursery, plantation, and support facilities.",
    galleryCtaLabel: "Open Full Gallery",
    snapshotCardTitles: ["Nursery Operations", "Plantation Site", "Operations Technology"],
    snapshotCardDescriptions: [
      "Seedling propagation, grafting, health tracking, and staging for field transfer.",
      "Land preparation, deployment planning, and maintenance workflows.",
      "Monitoring, geotagging, data capture, and reporting tools used in day-to-day operations and client reporting.",
    ],
    governanceTitles: ["Regulatory Compliance", "Precision Operations", "Transparent Reporting"],
    governanceDescriptions: [
      "Operations are aligned with DENR and CITES II pathways, with legal documentation structured for export and stakeholder review.",
      "AI-enabled monitoring, soil sensors, agricultural drone, and smart irrigation support measurable field decisions across mango and agarwood plantations.",
      "Clients receive GPS-verified ownership certificates, geotagged references, annual reports, and annual reports which portray visibility across the full asset lifecycle.",
    ],
    visitsTitle: "Zambales Access and Client Visits",
    visitsDescription:
      "Client visits include a plantation program with premium two nights hotel stay, plus Clark-linked access to Cebu, Coron, Boracay, Bohol, El Nido, and Surigao.",
    visitsBullets: [
      "Zambales province operations corridor",
      "Accessible from Clark and Subic routes",
      "On-site nursery and field readiness monitoring",
    ],
  },
  nursery: {
    header: {
      badge: "Propagation Site",
      title: "Nursery Operations",
      description:
        "The nursery facility in Zambales province prepares agarwood and mango planting stock for July 2026 deployment, with continuous visual documentation for client transparency.",
    },
    overviewEyebrow: "Current nursery stock",
    overviewTitle: "Propagation Overview",
    overviewDescription: "Live nursery counts for Aquilaria crassna agarwood and Sweet Elena Carabao mango.",
    stockLabels: ["Aquilaria crassna agarwood seedlings", "Sweet Elena Carabao mango seedlings"],
    stockDescriptions: [
      "Healthy nursery stock prepared for the current Aquilaria crassna program.",
      "Healthy nursery stock prepared for the current Sweet Elena Carabao program.",
    ],
    saleHeaderPrefix: "Available for sale as of",
    galleryTitle: "Live Seedling Gallery",
    galleryLinkLabel: "View full gallery",
    propagationTitle: "Stock Propagation",
    propagationDescriptions: [
      "Aquilaria crassna stock is raised under standardized nursery protocols before field deployment. A 20% surplus planting buffer is maintained to support replacement commitments and mortality controls.",
      "Carabao x Elena mango stock is propagated using grafting and dwarfing techniques, induced flowering applications that support earlier fruiting, pest & disease control, and manageable canopy structure for high-density planting. A 20% surplus planting buffer is maintained to support replacement commitments and mortality controls.",
    ],
    dashboardTitle: "Growth Dashboard",
    growthLabels: ["Agarwood Height", "Mango Height"],
    growthDescriptions: [
      "Average tracked nursery growth for Aquilaria crassna.",
      "Average tracked nursery growth for Sweet Elena Carabao mango.",
    ],
    mortalityLabel: "Mortality Rate",
    updatedPrefix: "Updated:",
    technologyTitle: "Nursery Technology Protocol",
    technologyTitles: ["Smart Irrigation", "Climate Control", "Pest Management", "Soil Analytics"],
    technologyDescriptions: [
      "Automated moisture-based watering systems reduce water waste and prevent root rot.",
      "UV-filtered shade netting and ambient temperature regulation for optimized photosynthesis.",
      "Organic, preemptive prophylactic treatments to ensure robust disease resistance.",
      "Continuous pH and macronutrient monitoring of custom substrate blends.",
    ],
  },
  plantation: {
    header: {
      badge: "Field Execution",
      title: "Plantation Operations – Zambales",
      description:
        "Operational rollout for Aquilaria crassna agarwood and Sweet Elena Carabao mango in Zambales province, including July 2026 deployment and 2026 scale targets of 35,000 agarwood trees and 15,000 mango trees.",
    },
    galleryTitle: "Secured Land & Preparations",
    galleryDescription: "Current documentation of field preparation and July 2026 deployment readiness.",
    milestoneTitle: "July 2026: Field Deployment Milestone",
    milestoneDescription:
      "The July 2026 program transitions nursery stock into field planting. Deployment includes spacing compliance, irrigation setup, AI-assisted monitoring readiness, and early-stage intercropping of cassava for agarwood shade (Years 1-2).",
    milestoneLabels: ["Agarwood Spacing", "Mango Spacing", "Cassava Intercrop", "2026 Plantation Scale"],
    milestoneValues: ["3m x 2m", "6m x 4m", "Years 1-2", "50,000 Trees"],
    milestoneNotes: [
      "Approx. 1,667 trees per hectare",
      "Approx. 416 trees per hectare",
      "Shade support for young agarwood trees",
      "35,000 agarwood + 15,000 mango, each scaling by 10% p.a.",
    ],
    landPreparationTitle: "Land Preparation",
    soilProtocolTitle: "Soil Protocol",
    soilProtocolDescription:
      "Deep ripping and mechanical leveling. Construction of complex contour drainage and terracing to prevent soil erosion during heavy rains while capturing optimal surface moisture.",
    cassavaTitle: "Cassava Intercropping",
    cassavaDescription:
      "During years 1-2, cassava is planted between young agarwood rows as a shade-support intercrop while seedlings establish root systems and canopy resilience.",
    lifecycleTitle: "Lifecycle Management",
    agarwoodLabel: "Agarwood",
    agarwoodSubtitle: "Aquilaria crassna 10-year resin cycle",
    mangoLabel: "Mango",
    mangoSubtitle: "Carabao x Elena annual fruiting cycle",
    agarwoodLifecycleTitles: [
      "Years 0-2: Establishment",
      "Years 3-6: Monitoring & Maintenance",
      "Years 7-8: Innoculation",
      "Years 9-10: Harvest & Extraction",
    ],
    agarwoodLifecycleDescriptions: [
      "Field planting, cassava shade support, irrigation setup, and structured nutrition management focus on strong root anchoring and early canopy development.",
      "Trees remain under scheduled pruning, weed suppression, and AI-assisted health monitoring while trunk and canopy mass build toward inoculation maturity.",
      "Aquilaria crassna enters the controlled inoculation phase, using documented technical protocols to induce resin formation in mature trees.",
      "Harvest and resin extraction are scheduled across years 9 and 10 under documented compliance workflows and controlled realization planning.",
    ],
    mangoLifecycleTitles: [
      "Year 0: Grafting & Nursery",
      "Years 1-4: Establishment & Growth",
      "Years 5-9: Fruiting & Yield Ramp-Up",
      "Years 10-25: Stable Production, Harvest & Sales",
    ],
    mangoLifecycleDescriptions: [
      "Carabao-Elena hybrid mangoes are prepared on dwarf rootstock for high-density planting, with nursery conditioning aligned to the field rollout.",
      "Young trees receive regular care, irrigation, pruning, induced flowering applications, and pest & disease management to build canopy structure and orchard stability.",
      "First fruiting begins in year 5 at about 30 kg per tree, then ramps up annually through years 6 to 9 as productivity increases toward mature output.",
      "Trees target about 100 kg per year under stable annual production, with flower induction supporting harvest cycles and output allocated across export and domestic sales.",
    ],
  },
  management: {
    header: {
      badge: "Leadership",
      title: "Management Team",
      description:
        "Our operations are guided by a multi-disciplinary team combining 80 years within corporate governance, agricultural science, and large-scale operational logistics.",
    },
    helperText: "Click any profile card to view the member's full profile.",
    categoryTitles: ["Executive Management", "Board of Directors", "Senior Management"],
  },
  photoGallery: {
    backButtonLabel: "Back to Home",
    heroBadge: "Visual Archive",
    heroTitle: "Operational Photo Gallery",
    heroDescription:
      "A curated visual record of nursery propagation, plantation rollout, facilities, and field operations across the CADI plantation management program.",
    statLabels: ["Total Media", "Categories", "Videos", "Current Collection"],
    browseCollectionsTitle: "Browse Collections",
    browseCollectionsDescription: "Switch between the main visual archives.",
    currentCollectionLabel: "Current Collection",
    noResultsTitle: "No matching media found",
    noResultsDescription: "Try a different search term or switch to another category to browse the archive.",
    searchPlaceholder: "Search by title, description, or location...",
    viewHint: "Click any photo to open the full media view.",
    categoryLabels: ["Nursery", "Plantation", "Facilities", "Team"],
    categorySubtitles: [
      "Propagation, conditioning, and seedling health tracking",
      "Field deployment, land preparation, and growing blocks",
      "Operational assets, infrastructure, and support environments",
      "Management, field staff, and personnel documentation",
    ],
  },
};
