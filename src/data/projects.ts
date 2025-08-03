import {Project} from '@/types/projects'

export const projects: Project[] = [
  {
    id: "naila",
    num: '1',
    title: "NAILA Robotics: Local AI Companion Robot",
    status: "In Development (Co-founder & Lead Developer)",
    description: "Developing a personalized AI companion robot with local, privacy-focused AI, utilizing MQTT for efficient communication protocols.",
    overview: "As a co-founder and lead developer, I am building NAILA Robotics – a personalized AI companion robot inspired by devices like EMO and Vector. The core objective is to create an interactive and intelligent desktop robot that offers companionship, entertainment, and utility.\n\nUnlike traditional smart devices, NAILA's intelligence is powered by on-device, privacy-focused AI. This approach, combined with efficient MQTT communication protocols, ensures a low-latency, highly responsive experience with minimal reliance on cloud services.",
    technologies: ["MQTT", "Python", "C/C++", "Rust", "ESP32-S3", "LangChain", "LangGraph"],
    features: [
      "Modular AI & Systems Architecture: Designing and implementing an architecture that leverages on-device AI models for natural language processing and interaction, ensuring user data privacy and reducing cloud dependency. This includes a multi-agent framework using LangChain and LangGraph for advanced reasoning, memory, and personalized interactions.",
      "Robust Communication Protocol: Utilizing MQTT for low-latency, efficient, and reliable communication across the robot's embedded system, AI server, and web interface.",
      "Local AI Integration: Integrating and applying iterative fine-tuning of foundational LLMs from Hugging Face to serve as the core conversational intelligence. This strategy focuses on continuous refinement to enhance model performance and reduce cloud dependency."
    ],
    outcome: "This is a passion project currently in active development. Key achievements to date include successful establishment of MQTT communication across hardware components and synchronization of wifi capabilities. Challenges involve optimizing on-device AI performance and managing complex inter-component communication for real-time responsiveness.",
    future: "Upcoming milestones include refining core AI features, integrating advanced sensory inputs, enhanced personality expressiveness, and developing a robust user customization interface to truly personalize the NAILA experience.",
    images: [
      {
        src: "nailaConcept.png",
        alt: "Concept image of NAILA.",
        type: "main"
      },
      {
        src: "nailaComms.png",
        alt: "Communication flow diagram.",
        type: "feature"
      },
      {
        src: "nailaArch.png",
        alt: "Architectural diagram illustrating MQTT communication protocol between NAILA's components.",
        type: "feature"
      }
    ],
    note: "This is an ongoing personal project being developed with a partner. The public GitHub repository provides insight into our progress and core components.",
    githubUrl: "https://github.com/LilliDarling/robo-naila",
    isHighlight: true,
    completedDate: "In Progress"
  },
  {
    id: "nixit",
    num: '2',
    title: "AI-Powered Task Management MVP",
    status: "Client MVP (Currently private, seeking further development)",
    description: "Developed an AI-driven task management MVP, leveraging LLMs to simplify complex tasks for neurodivergent users.",
    overview: "Identified a critical need for neurodivergent individuals facing cognitive overload in task management. I developed an AI-powered task management MVP to address this by offering intelligent task breakdowns and streamlined organization.",
    technologies: ["Expo", "React", "Google Cloud Platform (GCP)", "Python", "Anthropic LLM API", "MongoDB"],
    features: [
      "Core AI Integration: Engineered the integration with the Anthropic LLM API to dynamically break down complex tasks into manageable sub-tasks, significantly reducing user overwhelm.",
      "Seamless Calendar Synchronization: Implemented Google Calendar API integration, allowing users to automatically schedule tasks and receive notifications, enhancing timely completion.",
      "Robust Data Management: Designed and built the backend with Python and MongoDB on Google Cloud Platform (GCP), ensuring scalable and secure data storage for user tasks and preferences.",
      "Intuitive User Interface: Developed the cross-platform frontend using Expo and React, focusing on a clean, accessible, and responsive design for an optimal user experience."
    ],
    outcome: "Initial user testing of the MVP yielded positive feedback, with users reporting increased task completion and reduced stress, validating the core solution. This project deepened my understanding of cloud deployment (GCP), managing large language models, and designing for user-specific accessibility needs. A particular challenge was handling complex API integrations and data consistency across multiple external services, which I overcame by developing a robust middleware layer.",
    future: "Currently, the project is exploring a strategic pivot towards a 'notification-first' model, enabling direct AI interaction via text, further enhancing user accessibility and engagement based on early feedback.",
    images: [
      { 
        src: "stars.jpg",
        alt: "Main screenshot of the AI Task Helper app demonstrating core features.", 
        type: "main"
      }, 
      { 
        src: "galaxy.jpg", 
        alt: "Screenshot illustrating AI-powered task breakdown from a complex task into smaller steps.", 
        type: "feature"
      }, 
      { 
        src: "stars.jpg", 
        alt: "Screenshot showing Google Calendar integration and notification setup within the app.", 
        type: "feature"
      }, 
      {
        src: "galaxy.jpg",
        alt: "Mobile view of the task helper app on a smartphone, highlighting responsive design.",
        type: "feature"
      }
    ],
    note: "Private Repository (Available for review upon request)",
    isHighlight: true,
    completedDate: "2025-05"
  },
  {
    id: "kora",
    num: '3',
    title: "AI Wellness Coach Mobile App",
    status: "In Development (Client MVP Stage)",
    description: "Developed an AI-powered mobile wellness coach for a client, creating personalized health plans and offering real-time guidance through an agentic chat interface.",
    overview: "For a private client, I am currently developing Kora, a mobile application engineered to empower users in achieving their health goals through dynamic AI-driven coaching. The application leverages advanced AI to create personalized wellness plans, categorize goals (fitness, nutrition, mindfulness), and adapt to individual user needs. Kora's core innovation lies in its agentic AI flow, allowing the system to intelligently interpret user requests for new plans, plan refinements, daily advice, and more. By integrating with user health data and profile information, Kora aims to provide highly informed, adaptive, and personalized wellness guidance. The project is currently under active development, focusing on core functionality and AI robustness to meet client specifications.",
    technologies: ["Flutter", "Typescript", "Firebase", "Swift", "Kotlin", "Google Cloud Platform (GCP)", "Gemini LLM API"],
    features: [
      "Personalized Wellness Plans: AI-driven generation of customized fitness, nutrition, and mindfulness plans based on individual user goals and preferences.",
      "Agentic AI Flow: Implemented a sophisticated agentic AI architecture using Gemini LLM API to intelligently understand user intent (e.g., 'create new plan,' 'refine existing plan,' 'seeking daily advice') and respond contextually.",
      "Health Data Integration: Designed the architecture for integrating with user health data and profile information to enable highly informed and adaptive coaching decisions.",
      "Cross-Platform Mobile Development: Building a native-feel mobile experience across iOS and Android using Flutter, with underlying platform-specific integrations (Swift for iOS, Kotlin for Android) where necessary.",
      "Scalable Backend Infrastructure: Utilizing Firebase for secure user authentication, real-time data storage, and scalable cloud functions on GCP to support AI processing and data management."
    ],
    outcome: "Currently in active development for a private client, this MVP has successfully implemented the core agentic AI chat flow and initial personalized plan generation. Key milestones achieved include seamless integration with the Gemini LLM API and robust backend setup using Firebase on GCP, all delivered according to client requirements. The primary challenge involves fine-tuning the AI's agentic reasoning for nuanced user interactions and ensuring secure, efficient health data integration without compromising user privacy, which are critical for the client's vision. This project is significantly enhancing my expertise in large language model application development, mobile cross-platform frameworks, and secure cloud architectures for health-focused client applications.",
    future: "Upcoming development focuses on expanding the AI's contextual awareness and memory, and preparing for initial internal client testing rounds to gather user feedback for further refinement of the MVP.",
    images: [
      {
        src: "screen.jpg",
        alt: "Main chat screen of the Kora AI Wellness Coach app, showing a conversation with the AI.",
        type: "main"
      },
      {
        src: "creation.jpg",
        alt: "Screenshot illustrating Kora's AI generating a personalized wellness plan based on user goals.",
        type: "feature"
      },
      {
        src: "diagram.png",
        alt: "Architectural diagram demonstrating Kora's agentic AI flow for interpreting user intent.",
        type: "feature"
      }
    ],
    note: "This project was developed for a private client. Due to confidentiality agreements and the handling of sensitive health data, public code access is restricted. However, specific code examples, architectural insights, and a walkthrough of implemented features can be provided during a technical discussion, subject to client approval.",
    isHighlight: false,
    completedDate: "In Progress"
  },
  {
    id: "portfolio",
    num: '4',
    title: "My Portfolio",
    status: "Deployed",
    description: "Designed and developed this modern portfolio using Next.js with React Three Fiber for immersive 3D experiences and smooth animations.",
    overview: "After realizing my previous portfolio needed a complete refresh, I embarked on rebuilding it from scratch to create something truly unique. This project represents a fusion of modern web technologies and creative design, featuring immersive 3D elements powered by React Three Fiber and smooth, responsive animations throughout.\n\nMy goal was to craft an experience that goes beyond a traditional portfolio – one that showcases my technical skills while demonstrating creativity and attention to detail. Every interaction, from the particle effects to the project gallery, was carefully designed to create a memorable user experience while maintaining performance and accessibility.",
    technologies: ["Next.js", "React", "TypeScript", "React Three Fiber", "Three.js", "Tailwind CSS", "GSAP"],
    features: [
      "Interactive 3D Experience: Built an immersive landing page with React Three Fiber, featuring a responsive particle system, animated 3D text, and smooth camera movements that react to user interaction.",
      "Advanced Animation System: Implemented scroll-triggered animations, parallax effects, and seamless page transitions using GSAP and custom React hooks for a fluid user experience.",
      "Dynamic Project Showcase: Created a sophisticated project gallery with custom image carousels, hover effects, and detailed project pages with section-based navigation.",
      "Performance Optimized: Leveraged Next.js features including app router, image optimization, and code splitting to ensure fast load times despite rich 3D content."
    ],
    outcome: "Successfully launched a modern portfolio that effectively showcases my work while demonstrating advanced frontend skills. This project significantly deepened my expertise in React Three Fiber, WebGL optimization, and creating performant 3D web experiences. The main challenge was balancing visual richness with performance – solved through careful optimization, lazy loading, and progressive enhancement techniques. The portfolio has received positive feedback for its unique design and smooth user experience.",
    future: "Planning to enhance the portfolio with additional interactive features including a blog section for technical articles, more advanced 3D animations, integration with GitHub API to display real-time project statistics, and a cryptocurrency tip button feature to support my work.",
    images: [
      { 
        src: "hero.png",
        alt: "Hero section of the portfolio showcasing 3D particle effects and animated text.", 
        type: "main"
      }, 
      { 
        src: "mvpPort.png", 
        alt: "Previous version of my portfolio.", 
        type: "feature"
      }
    ],
    note: "This portfolio is the very site you're viewing right now! The source code showcases modern React patterns, performance optimization techniques, and creative use of 3D graphics on the web.",
    githubUrl: "https://github.com/LilliDarling/portfolio",
    demoUrl: "https://lillithlong.pro",
    isHighlight: true,
    completedDate: "2025-08"
  },
  {
    id: "ai-text-summary",
    num: '5',
    title: "AI Text Summary: Cost-Optimized Flask Web App",
    status: "Deployed & Operational (Self-Managed)",
    description: "A Flask web application using the BART transformer model for text summarization, deployed on a cost-optimized AWS serverless architecture.",
    overview: "This project showcases a Flask web application designed for automated text summarization using the **BART transformer model** from Hugging Face. My primary goal was to build a functional AI application while simultaneously demonstrating proficiency in **cost-optimized, event-driven serverless architectures on AWS**. The application is deployed via a Docker container on an EC2 instance, managed dynamically through a series of AWS Lambda functions and API Gateway.",
    technologies: ["Flask", "AWS EC2", "AWS Lambda", "AWS API Gateway", "Docker", "Python", "Hugging Face (BART Model)"],
    features: [
      "Automated Text Summarization: Implemented text summarization capabilities leveraging the BART transformer model from Hugging Face, enabling concise content generation from lengthy texts.",
      "Cost-Optimized Serverless Architecture: Designed and deployed a custom AWS infrastructure to mitigate operational costs. This involves: \n    - Dynamic EC2 Management: Lambda functions control the lifecycle of the EC2 instance, starting it only when needed.\n    - Scheduled Shutdown: A dedicated Lambda function monitors instance activity and automatically stops the EC2 after 10 minutes of inactivity, significantly reducing idle costs.",
      "Event-Driven Deployment & Health Checks: Utilized AWS API Gateway to trigger Lambda functions for instance management. Dedicated functions report the EC2's status (started, pending, running) and provide real-time application health checks, ensuring readiness.",
      "Containerized Deployment: Packaged the Flask application within a Docker container, ensuring consistent deployment and environment isolation on the EC2 instance.",
      "Real-Time Status & Access: Users receive live updates on the application's status and its public IP address once the UI is accessible."
    ],
    outcome: "Successfully deployed a functional AI text summarization service on a custom, cost-effective AWS serverless architecture. This project provided invaluable hands-on experience in orchestrating cloud resources, managing Dockerized applications in production environments, and implementing strategies for cloud cost mitigation. It also deepened my understanding of large transformer models and their practical deployment challenges.",
    future: "Future enhancements could include implementing a queueing mechanism for summary requests to handle higher loads, exploring alternative cost-optimization strategies (e.g., AWS Fargate Spot), and integrating additional transformer models for varied summarization needs.",
    images: [
      {
        src: "main.jpg",
        alt: "Main user interface of the AI Text Summary web application, showing text input and summarized output.",
        type: "main"
      },
      {
        src: "architecture.png",
        alt: "Architectural diagram of the AI Text Summary deployment on AWS, illustrating EC2, Lambda, and API Gateway interactions.",
        type: "feature"
      },
      {
        src: "flow.png",
        alt: "Flowchart or screenshot illustrating Docker containerization and deployment process for the Flask application.",
        type: "feature"
      }
    ],
    note: "Note on Initialization: Due to the dynamic nature of the AWS infrastructure designed for cost optimization and the download of the large BART model upon instance activation, accessing the live demo may require an initialization period of up to 15-20 minutes. The API will provide status updates during this time until the UI is ready.",
    demoUrl: "https://2zd4vw2pe7.execute-api.us-east-2.amazonaws.com/prod/start",
    githubUrl: "https://github.com/LilliDarling/ai-text-summary",
    isHighlight: false,
    completedDate: "2024-11"
  },
  {
    id: "witchy-cooking",
    num: '6',
    title: "Intuitive Recipe Management Platform",
    status: "Deployed",
    description: "A full-stack Django application designed for streamlined user recipe management, focusing on a clean, ad-free experience.",
    overview: "Originally built in an intensive program for software development, I took the project and expanded on it by adding elements such as a contact page, the ability to favorite recipes that aren't your own, and adjusted the create/edit functions with javascript to make them more dynamic. The project's core mission is to provide a clean, ad-free, and intuitive platform for users to save, organize, and discover recipes, offering a welcome alternative to cluttered commercial recipe sites.",
    technologies: ["Django", "Python", "PostgreSQL", "JavaScript", "CSS (Vanilla)", "DigitalOcean", "Google Cloud Platform (GCP)"],
    features: [
      "Comprehensive Recipe Management: Users can create, edit, and store their personal recipes with detailed fields for ingredients, instructions, and notes. They are also able to upload an image to showcase their own tasty dishes.",
      "Enhanced User Interaction: Implemented dynamic JavaScript functionalities for creation and editing workflows, improving the user experience and responsiveness without page reloads.",
      "Recipe Discovery, Favoriting, & Commenting: Enabled users to 'favorite' recipes created by others, facilitating easy discovery and saving of beloved dishes. Users are also able to provide comments and feedback on each individual recipe, creating a dynamic community.",
      "Scalable Cloud Deployment: Deployed the application on DigitalOcean, leveraging PostgreSQL for robust data storage and GCP services for user image storage."
    ],
    outcome: "Successfully transformed a foundational project into a robust web application with a strong focus on user experience. This independent expansion deepened my expertise in Django's full-stack capabilities, advanced JavaScript interactivity, and meticulous front-end styling with vanilla CSS. The project also provided hands-on experience with cloud deployment and continuous maintenance of a live application. Challenges that I faced included needing to learn a new language without direction as well as full deployment.",
    future: "Future enhancements include implementing user authentication via social logins, language translation, AI chat interface for quick recipe help, and exploring advanced performance optimizations for faster load times. I will also be doing a complete overhaul on the codebase and moving it out of GitLab.",
    images: [
      {
        src: "wcHome.png",
        alt: "Homepage of Witchy Cooking, showing recipe cards.",
        type: "main"
      },
      {
        src: "wcComms.png",
        alt: "Comment section for users who have an account.",
        type: "feature"
      },
      {
        src: "wcLogin.png",
        alt: "Login page for Witchy Cooking.",
        type: "feature"
      },
      {
        src: "wcRec.png",
        alt: "Detailed view of a recipe on Witchy Cooking.",
        type: "feature"
      }
    ],
    note: "Not currently worked on. I have future plans for an overhaul as there are several optimizations and changes that need to be made. Due to this being my first project, it has some serious work that needs to be done that I recognize, thanks to my continuous growth in this field.",
    demoUrl: "https://witchycooking.com",
    githubUrl: "https://gitlab.com/LilliDarling/witchycooking",
    isHighlight: false,
    completedDate: "2024-08"
  }
];

export const getHighlightProjects = () => projects.filter(project => project.isHighlight);
export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(project => project.id === id);