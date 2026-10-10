/**
 * NAHJA VP - PORTFOLIO DATA ARCHITECTURE
 * Sourced STRICTLY and EXACTLY from Nahja's official resume.
 * No invented contact details, metrics, dates, companies, or categories.
 */

const portfolioData = {
  personal: {
    name: "NAHJA VP",
    role: "Software Development Intern",
    secondaryRole: "Computer Science Engineering Student",
    phone: "8078073525",
    phoneDisplay: "+91 8078073525",
    phoneUrl: "tel:8078073525",
    email: "nahjavp@gmail.com",
    emailUrl: "mailto:nahjavp@gmail.com",
    location: "Elamaram, Malappuram, Kerala, India - 673645",
    linkedin: "linkedin.com/in/nahja-vp-64320033a",
    linkedinUrl: "https://linkedin.com/in/nahja-vp-64320033a",
    github: "github.com/nahjavp",
    githubUrl: "https://github.com/nahjavp",
    resumePdfPath: "/resume.pdf"
  },

  summary:
    "Computer Science Engineering student with hands-on experience in software development, application development, and website testing. Currently working as a Software Development Intern at Cognilearn, with previous experience as an App Development Intern at Genzec Technologies LLP. Skilled in Python, Java, C, HTML, CSS, MySQL, Git, and GitHub. Experienced in developing web-based and Java applications, participating in hackathons, and gaining practical exposure to software testing and Quality Assurance processes. Strong interest in software development, application development, web development, and software testing.",

  experience: [
    {
      id: "exp-1",
      role: "Software Development Intern",
      company: "Cognilearn",
      period: "2026 - Present",
      location: "Remote / Internship",
      description:
        "Currently gaining hands-on experience in software and application development through internship-based projects and development activities.",
      responsibilities: [
        "Currently gaining hands-on experience in software and application development through internship-based projects and development activities.",
        "Applying programming and software development concepts to practical application development tasks.",
        "Collaborating on development activities while gaining exposure to real-world software development practices."
      ],
      technologies: ["Software Development", "Application Development", "Programming Concepts"]
    },
    {
      id: "exp-2",
      role: "App Development Intern",
      company: "Genzec Technologies LLP",
      period: "2025",
      location: "Internship",
      description:
        "Gained practical exposure to application development through internship-based learning and development activities.",
      responsibilities: [
        "Gained practical exposure to application development through internship-based learning and development activities.",
        "Applied programming concepts to understand application development workflows and implementation practices.",
        "Developed familiarity with mobile application development concepts and software development processes."
      ],
      technologies: ["Application Development", "Mobile Workflows", "Software Processes"]
    },
    {
      id: "exp-3",
      role: "Industrial Visit / Software Testing & QA Exposure",
      company: "Obsqura Zone, Calicut",
      period: "2026",
      location: "Calicut, Kerala",
      description:
        "Gained practical exposure to software testing and Quality Assurance (QA) processes during an industrial visit.",
      responsibilities: [
        "Gained practical exposure to software testing and Quality Assurance (QA) processes during an industrial visit.",
        "Explored website testing practices, including functional testing, defect identification, and verification of web application behavior.",
        "Learned about industry-level testing workflows and the importance of software quality, reliability, and user experience."
      ],
      technologies: ["Software Testing", "Quality Assurance (QA)", "Functional Testing", "Defect Identification"]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science Engineering",
      institution: "AWH Engineering College, Kuttikkattoor, Calicut",
      year: "Expected Graduation: 2028",
      score: "CGPA: 8.12",
      description:
        "Pursuing Bachelor of Technology in Computer Science Engineering with strong academic foundation in software, programming, and algorithms."
    },
    {
      id: "edu-2",
      degree: "Higher Secondary Education (+2)",
      institution: "GHSS VKD",
      year: "2022 - 2024",
      score: "Percentage: 94%",
      description: "Completed higher secondary education with 94% score."
    },
    {
      id: "edu-3",
      degree: "Secondary School Education (10th)",
      institution: "CHMKMHS, Vazhakkad",
      year: "2022",
      score: "Percentage: 100%",
      description: "Completed secondary school education with 100% full marks."
    }
  ],

  projects: [
    {
      id: "proj-1",
      title: "SafeSite — Construction Safety Monitoring System",
      type: "Hackathon Prototype & Web Application",
      technologies: ["Antigravity", "GitHub", "HTML", "CSS", "Web Technologies"],
      description:
        "Built a web-based construction safety monitoring platform for real-time hazard reporting, risk tracking, SOS alerts, and supervisor monitoring.",
      highlights: [
        "Built a web-based construction safety monitoring platform for real-time hazard reporting, risk tracking, SOS alerts, and supervisor monitoring.",
        "Developed role-based dashboards to support different user responsibilities and improve safety monitoring workflows.",
        "Designed the prototype to streamline workplace safety reporting and incident response.",
        "Developed as a hackathon prototype using web technologies and GitHub-based development."
      ]
    },
    {
      id: "proj-2",
      title: "Medicine Reminder App",
      type: "Java Application",
      technologies: ["Java"],
      description:
        "Developed a Java-based application designed to help users manage medicine schedules and reminders with timely notifications.",
      highlights: [
        "Developed a Java-based application designed to help users manage medicine schedules and reminders.",
        "Implemented application functionality focused on organizing medicine reminders and supporting timely notifications.",
        "Applied Java programming concepts to develop a practical, user-focused application."
      ]
    }
  ],

  skills: {
    programming: ["Python", "Java", "C"],
    web: ["HTML", "CSS"],
    database: ["MySQL"],
    tools: ["Git", "GitHub", "Canva", "CapCut"],
    areasOfInterest: [
      "Software Development",
      "Application Development",
      "Web Development",
      "Software Testing"
    ],
    soft: [
      "Problem Solving & Analytical Thinking",
      "Team Collaboration",
      "Effective Communication",
      "Adaptability & Quick Learning",
      "Time Management",
      "Critical Thinking",
      "Attention to Detail",
      "Leadership & Responsibility"
    ]
  },

  languages: ["Malayalam", "English", "Hindi", "Arabic"],

  certificates: [
    {
      id: "cert-1",
      title: "National Level Technical Quiz - App Development (Flutter)",
      organization: "Genzec Technologies LLP",
      category: "Technical Quiz"
    },
    {
      id: "cert-2",
      title: "Career Options and Industry Orientation for Engineers",
      organization: "Genzec Technologies LLP",
      category: "Webinar"
    },
    {
      id: "cert-3",
      title: "Tink-Her-Hack 3.0 - Kerala's Largest Women's Hackathon",
      organization: "IEDC, AWH Engineering College",
      year: "2024",
      category: "Hackathon"
    },
    {
      id: "cert-4",
      title: "Athmatcolleg 2.0 Hackathon",
      organization: "AWH Engineering College",
      year: "2026",
      category: "Hackathon"
    },
    {
      id: "cert-5",
      title: "Introduction to GitHub Workshop",
      organization: "IEDC, AWH Engineering College",
      category: "Workshop"
    },
    {
      id: "cert-6",
      title: "Level Up With AI Workshop",
      organization: "IEEE Student Branch, AWH Engineering College",
      category: "Workshop"
    },
    {
      id: "cert-7",
      title: "Figma Poster Design Workshop",
      organization: "IEDC, AWH Engineering College",
      category: "Workshop"
    }
  ],

  leadership: [
    {
      id: "lead-1",
      role: "Core Leader",
      organization: "National Service Scheme (NSS)",
      responsibilities: [
        "Supporting NSS activities, coordination, and community-oriented initiatives.",
        "Developing teamwork, communication, leadership, and organizational skills through volunteering activities."
      ]
    }
  ]
};

export default portfolioData;
