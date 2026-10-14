export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);

const en = {
  label: "EN",
  htmlLang: "en",
  ogLocale: "en_US",
  tagline: "AI-first full stack developer, focused on software architecture.",
  email: "hi@darioalbor.dev",
  nav: { home: "home", writing: "writing", projects: "projects", cv: "cv", contact: "contact" },
  meta: {
    home: "Darío Albor, AI-first full stack developer in Buenos Aires. Software architecture, NestJS, Next.js and the servers they run on.",
    writing: "Posts by Darío Albor about software, architecture and the tools he uses every day.",
    projects: "Projects by Darío Albor.",
    cv: "CV of Darío Albor: full stack developer with 5+ years of experience in capital markets, insurance, cloud services and pharma.",
    contact: "Get in touch with Darío Albor.",
  },
  home: {
    intro: [
      "Hi, I'm Darío. I write software and I like knowing how things work underneath: the database, the network, the server everything runs on. If something breaks, I usually want to know why before I want it fixed.",
      "I work AI-first. Over time, AI became part of how I write code every day, one more tool of the trade. What I don't hand off is judgment: I keep pushing on software architecture and on what studying systems engineering teaches me, to decide what to build and how.",
      "In my spare time I run my own servers, tinker with game engines and rebuild old games, just to see how they were made.",
    ],
    writing: "Writing",
    work: "Work",
    projects: "Projects",
  },
  soon: "Soon…",
  writing: { title: "Writing", draft: "draft", back: "← all posts" },
  projects: { title: "Projects" },
  cv: {
    title: "CV",
    pdf: "PDF",
    profile: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    tech: "Technologies",
  },
  job: { back: "← work experience" },
  contact: {
    title: "Contact",
    form: {
      name: "Name",
      email: "Your email",
      message: "Message",
      send: "Send",
      sending: "Sending…",
      sent: "Thanks! Your message is on its way. I'll reply to the email you left.",
      error: "Something went wrong and the message wasn't sent. You can write to me directly at",
      errors: {
        captcha: "Please wait for the captcha check to finish and try again.",
        rate: "You just sent a message. Please wait a minute before sending another one.",
        invalid: "Please check the fields: your name, a valid email and a message.",
      },
      close: "Close",
    },
    email: "Email",
    elsewhere: "Elsewhere",
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  label: "ES",
  htmlLang: "es",
  ogLocale: "es_AR",
  tagline: "Desarrollador full stack AI-first, enfocado en arquitectura de software.",
  email: "hola@darioalbor.dev",
  nav: { home: "inicio", writing: "posts", projects: "proyectos", cv: "cv", contact: "contacto" },
  meta: {
    home: "Darío Albor, desarrollador full stack AI-first en Buenos Aires. Arquitectura de software, NestJS, Next.js y los servidores donde corren.",
    writing: "Posts de Darío Albor sobre software, arquitectura y las herramientas que usa todos los días.",
    projects: "Proyectos de Darío Albor.",
    cv: "CV de Darío Albor: desarrollador full stack con más de 5 años de experiencia en mercado de capitales, seguros, servicios cloud y el sector farmacéutico.",
    contact: "Contacto con Darío Albor.",
  },
  home: {
    intro: [
      "Hola, soy Darío. Escribo software y me gusta entender cómo funcionan las cosas por dentro: la base de datos, la red, el servidor donde corre todo. Cuando algo se rompe, primero quiero saber por qué y después arreglarlo.",
      "Trabajo AI-first. Con el tiempo, la IA se volvió parte de mi día a día para programar y escribir código, una herramienta más del oficio. Lo que no delego es el criterio: sigo creciendo en arquitectura de software y en lo que me da estudiar ingeniería en sistemas, para decidir qué construir y cómo.",
      "En mi tiempo libre administro mis propios servidores, juego con motores de juegos y recreo juegos viejos, solo para ver cómo estaban hechos.",
    ],
    writing: "Posts",
    work: "Experiencia",
    projects: "Proyectos",
  },
  soon: "Próximamente…",
  writing: { title: "Posts", draft: "borrador", back: "← todos los posts" },
  projects: { title: "Proyectos" },
  cv: {
    title: "CV",
    pdf: "PDF",
    profile: "Perfil Profesional",
    experience: "Experiencia Laboral",
    education: "Educación",
    skills: "Habilidades",
    tech: "Tecnologías",
  },
  job: { back: "← experiencia laboral" },
  contact: {
    title: "Contacto",
    form: {
      name: "Nombre",
      email: "Tu correo",
      message: "Mensaje",
      send: "Enviar",
      sending: "Enviando…",
      sent: "¡Gracias! Tu mensaje ya está en camino. Te respondo al correo que dejaste.",
      error: "Algo falló y el mensaje no se envió. Podés escribirme directo a",
      errors: {
        captcha: "Esperá a que termine la verificación del captcha y volvé a intentar.",
        rate: "Acabás de enviar un mensaje. Esperá un minuto antes de mandar otro.",
        invalid: "Revisá los campos: tu nombre, un correo válido y el mensaje.",
      },
      close: "Cerrar",
    },
    email: "Correo",
    elsewhere: "En otros lados",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, es };

export const getDictionary = (locale: Locale) => dictionaries[locale];
