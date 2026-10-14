import type { Locale } from "./i18n";

export type CvJob = {
  slug: string;
  company: string;
  role: string;
  place: string;
  dates: string;
  years: string;
  bullets: string[];
  tech: string;
};

export type Cv = {
  profile: string;
  jobs: CvJob[];
  education: { school: string; place: string; degree: string; dates: string };
  skills: [string, string][];
};

const es: Cv = {
  profile:
    "Desarrollador Full Stack con más de 5 años de experiencia construyendo aplicaciones internas y de cara al usuario para mercado de capitales, seguros, servicios cloud y el sector farmacéutico. Especializado en NestJS y Next.js, arquitecturas escalables, bases de datos relacionales y no relacionales, integraciones con sistemas de terceros y legacy, y automatización de procesos. Estudiante de 3.<sup>er</sup> año de Ingeniería en Sistemas de Información (UTN).",
  jobs: [
    {
      slug: "centaurus-securities",
      company: "Centaurus Securities S.A.",
      role: "Full Stack Developer",
      place: "Buenos Aires, Argentina · Híbrido",
      dates: "Jun 2026 – Actualidad",
      years: "2026–hoy",
      bullets: [
        "Desarrollo de aplicaciones internas y de cara al usuario para el mercado de capitales: onboarding de clientes, fondos comunes de inversión (FCI), administrador de instrumentos y varias funcionalidades del negocio.",
        "Integración y sincronización con los principales proveedores y sistemas del sector.",
      ],
      tech: "NestJS, Next.js, TypeScript, MariaDB, MongoDB, AWS (Cognito, S3, Secrets Manager, SNS, etc.).",
    },
    {
      slug: "vefixy",
      company: "Vefixy",
      role: "Full Stack Developer",
      place: "Buenos Aires, Argentina · Híbrido",
      dates: "Ago 2025 – May 2026",
      years: "2025–2026",
      bullets: [
        "Desarrollo de aplicaciones internas y de cara al usuario para un proveedor de servicios cloud: paneles de gestión, facturación y aprovisionamiento de servicios.",
        "Gestión y operación de nodos de virtualización Proxmox y automatización de infraestructura y despliegues.",
      ],
      tech: "NestJS, Next.js, TypeScript, PostgreSQL, Docker, Proxmox, Linux.",
    },
    {
      slug: "gestion-y-servicios",
      company: "Gestión y Servicios S.R.L.",
      role: "Full Stack Developer",
      place: "Argentina · Remoto",
      dates: "Oct 2024 – Ago 2025",
      years: "2024–2025",
      bullets: [
        "Desarrollo de portales internos para la administración y gestión de equipos en una empresa que administra diversas compañías de seguros en Argentina.",
        "Desarrollo de aplicaciones de cara al usuario para clientes y asegurados.",
      ],
      tech: "NestJS, Next.js, TypeScript, PostgreSQL, MongoDB.",
    },
    {
      slug: "drogueria-garzon",
      company: "Droguería Garzón S.A.",
      role: "Full Stack Developer",
      place: "Argentina · Presencial",
      dates: "Ene 2022 – Sep 2024",
      years: "2022–2024",
      bullets: [
        "Lideré la migración completa de sistemas legacy a tecnologías modernas.",
        "Desarrollé APIs de integración con sistemas COBOL, el e-commerce de la compañía y el portal empresarial.",
        "Implementé procesos ETL y automatizaciones de negocio con reportes en Power BI.",
      ],
      tech: "Node.js, React, Next.js, MySQL, Python, Power BI.",
    },
    {
      slug: "laboratorio-albula",
      company: "Laboratorio Albula S.R.L.",
      role: "Frontend Developer",
      place: "Argentina · Presencial",
      dates: "Ene 2021 – Ene 2022",
      years: "2021–2022",
      bullets: [
        "Desarrollo de landing pages y sitios institucionales con foco en SEO y rendimiento.",
        "Gestión de campañas en Meta Ads y Google Ads junto al equipo de marketing para fortalecer la presencia digital de la marca.",
      ],
      tech: "React, Vue, JavaScript, WordPress, Google Ads, Meta Ads, SEO.",
    },
  ],
  education: {
    school: "Universidad Tecnológica Nacional (UTN)",
    place: "Buenos Aires, Argentina",
    degree: "Ingeniería en Sistemas de Información (en curso)",
    dates: "2022 – Actualidad",
  },
  skills: [
    ["Lenguajes", "TypeScript, JavaScript, Python, Java, PHP, SQL"],
    ["Frontend", "Next.js, React, Angular, Vue, Redux, Tailwind CSS"],
    ["Backend", "NestJS, Node.js, Express.js"],
    ["Bases de datos", "PostgreSQL, MySQL, MariaDB, MongoDB, Redis"],
    ["Mensajería", "Kafka, RabbitMQ"],
    ["Cloud y DevOps", "AWS (Cognito, S3, Lambda, ECS, ECR, SNS, Secrets Manager), Docker, Proxmox, Linux, GitHub Actions"],
    ["Testing", "Jest, React Testing Library"],
    ["Datos y diseño", "Power BI, procesos ETL, Figma"],
  ],
};

const en: Cv = {
  profile:
    "Full Stack Developer with 5+ years of experience building internal and customer-facing applications for capital markets, insurance, cloud services and the pharmaceutical industry. Specialized in NestJS and Next.js, scalable architectures, relational and non-relational databases, third-party and legacy system integrations, and process automation. Third-year Information Systems Engineering student at UTN.",
  jobs: [
    {
      slug: "centaurus-securities",
      company: "Centaurus Securities S.A.",
      role: "Full Stack Developer",
      place: "Buenos Aires, Argentina · Hybrid",
      dates: "Jun 2026 – Present",
      years: "2026–now",
      bullets: [
        "Build internal and customer-facing applications for capital markets: client onboarding, mutual funds (FCI), instrument manager and several business features.",
        "Integrate and synchronize platforms with the industry's leading providers and systems.",
      ],
      tech: "NestJS, Next.js, TypeScript, MariaDB, MongoDB, AWS (Cognito, S3, Secrets Manager, SNS, etc.).",
    },
    {
      slug: "vefixy",
      company: "Vefixy",
      role: "Full Stack Developer",
      place: "Buenos Aires, Argentina · Hybrid",
      dates: "Aug 2025 – May 2026",
      years: "2025–2026",
      bullets: [
        "Built internal and customer-facing applications for a cloud services provider: management dashboards, billing and service provisioning.",
        "Managed and operated Proxmox virtualization nodes and automated infrastructure and deployments.",
      ],
      tech: "NestJS, Next.js, TypeScript, PostgreSQL, Docker, Proxmox, Linux.",
    },
    {
      slug: "gestion-y-servicios",
      company: "Gestión y Servicios S.R.L.",
      role: "Full Stack Developer",
      place: "Argentina · Remote",
      dates: "Oct 2024 – Aug 2025",
      years: "2024–2025",
      bullets: [
        "Built internal portals for team administration and management at a company that manages several insurance firms in Argentina.",
        "Developed customer-facing applications for clients and policyholders.",
      ],
      tech: "NestJS, Next.js, TypeScript, PostgreSQL, MongoDB.",
    },
    {
      slug: "drogueria-garzon",
      company: "Droguería Garzón S.A.",
      role: "Full Stack Developer",
      place: "Argentina · On-site",
      dates: "Jan 2022 – Sep 2024",
      years: "2022–2024",
      bullets: [
        "Led the full migration of legacy systems to modern technologies.",
        "Built integration APIs for COBOL systems, the company's e-commerce platform and its corporate portal.",
        "Implemented ETL processes and business automations with Power BI reporting.",
      ],
      tech: "Node.js, React, Next.js, MySQL, Python, Power BI.",
    },
    {
      slug: "laboratorio-albula",
      company: "Laboratorio Albula S.R.L.",
      role: "Frontend Developer",
      place: "Argentina · On-site",
      dates: "Jan 2021 – Jan 2022",
      years: "2021–2022",
      bullets: [
        "Developed landing pages and corporate websites focused on SEO and performance.",
        "Managed Meta Ads and Google Ads campaigns alongside the marketing team to strengthen the brand's digital presence.",
      ],
      tech: "React, Vue, JavaScript, WordPress, Google Ads, Meta Ads, SEO.",
    },
  ],
  education: {
    school: "Universidad Tecnológica Nacional (UTN)",
    place: "Buenos Aires, Argentina",
    degree: "Information Systems Engineering (in progress)",
    dates: "2022 – Present",
  },
  skills: [
    ["Languages", "TypeScript, JavaScript, Python, Java, PHP, SQL"],
    ["Frontend", "Next.js, React, Angular, Vue, Redux, Tailwind CSS"],
    ["Backend", "NestJS, Node.js, Express.js"],
    ["Databases", "PostgreSQL, MySQL, MariaDB, MongoDB, Redis"],
    ["Messaging", "Kafka, RabbitMQ"],
    ["Cloud & DevOps", "AWS (Cognito, S3, Lambda, ECS, ECR, SNS, Secrets Manager), Docker, Proxmox, Linux, GitHub Actions"],
    ["Testing", "Jest, React Testing Library"],
    ["Data & Design", "Power BI, ETL processes, Figma"],
  ],
};

const cvs: Record<Locale, Cv> = { en, es };

export const getCv = (locale: Locale) => cvs[locale];
