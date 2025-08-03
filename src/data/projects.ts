import {Project} from '@/types/projects'

export const projects: Project[] = [
  {
    id: "naila",
    num: '01',
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
    num: '02',
    title: "AI-Powered Task Management MVP",
    status: "Client MVP",
    description: "Developed an AI-driven task management MVP, leveraging LLMs to simplify complex tasks for neurodivergent users.",
    overview: "Led the complete product development lifecycle for NixIt, a neurodivergent-focused productivity application addressing a critical gap in accessible task management tools. Through targeted user research and accessibility studies with the autism and ADHD community, we identified key pain points around cognitive overload and executive function challenges, driving a user-centric product approach that resulted in a successful cross-platform MVP deployment.",
    technologies: ["Expo", "React", "Google Cloud Platform (GCP)", "Python", "Anthropic LLM API", "MongoDB", "Tailwind", "EAS"],
    features: [
      "Neurodivergent-Specialized AI Assistant: Engineered a sophisticated integration with Anthropic's Claude API that goes beyond generic task management. The AI understands neurodivergent-specific challenges like executive dysfunction, rejection sensitivity, and sensory overwhelm.",
      "Seamless Calendar Synchronization: Implemented Google Calendar API integration, allowing users to automatically schedule tasks and receive notifications, enhancing timely completion.",
      "Robust Data Management: Designed and built the backend with Python and MongoDB on Google Cloud Platform (GCP), ensuring scalable and secure data storage for user tasks and preferences.",
      "Intuitive User Interface: Developed the cross-platform frontend using Expo and React, focusing on a clean, accessible, and responsive design for an optimal user experience."
    ],
    outcome: "NixIt represented a unique intersection of technical challenge and social impact. Initial user testing of the MVP yielded positive feedback validating the core solution and providing necessary insight into next steps. This project deepened my understanding of cloud deployment (GCP), managing large language models, and designing for user-specific accessibility needs. A particular challenge was handling complex API integrations and data consistency across multiple external services, which I overcame by developing a robust middleware layer.",
    future: "Currently, the project is exploring a strategic pivot towards a 'notification-first' model, enabling direct AI interaction via text, further enhancing user accessibility and engagement based on early feedback. The goal is to apply advanced personalization using behavioral pattern recocgnition, allowing the AI to adapt to the individual user.",
    images: [
      { 
        src: "nixMvp.png",
        alt: "System Architecture", 
        type: "main"
      }, 
      { 
        src: "nixArch.png", 
        alt: "Screenshots illustrating AI-powered task breakdown, home screen, and calendar view.", 
        type: "feature"
      }
    ],
    note: "Private Repository (Available for review upon request)",
    isHighlight: true,
    completedDate: "2025-05"
  },
  {
    id: "stealth",
    num: '03',
    title: "AI Wellness Coach Mobile App",
    status: "In Development (Client MVP Stage)",
    description: "Developing an AI-powered mobile wellness coach for a client, creating personalized health plans and offering real-time guidance through an agentic chat interface.",
    overview: "For a private client, I am currently developing a mobile application engineered to empower users in achieving their health goals through dynamic AI-driven coaching. The application leverages advanced AI to create personalized wellness plans, categorize goals, and adapt to individual user needs. The apps core innovation lies in its agentic AI flow, allowing the system to intelligently interpret user requests for new plans, plan refinements, daily advice, and more. By integrating with user health data and profile information, it aims to provide highly informed, adaptive, and personalized wellness guidance. The project is currently under active development, focusing on core functionality and AI robustness to meet client specifications.",
    technologies: ["Flutter", "Typescript", "Firebase", "Swift", "Kotlin", "Google Cloud Platform (GCP)", "Gemini LLM API"],
    features: [
      "Advanced Prompt Engineering: Developed and iteratively refined sophisticated prompt strategies for Gemini API, implementing context-aware conversation flows, fact-checking mechanisms, and goal-alignment protocols that improved AI response accuracy by ensuring medically appropriate and personalized guidance.",
      "Native Health Platform Integration:  Implemented comprehensive HealthKit (iOS) and Health Connect (Android) integrations to access user fitness metrics, sleep patterns, and health indicators, enabling the AI to generate data-informed recommendations.",
      "Cross-Platform Mobile Development: Building a native-feel mobile experience across iOS and Android using Flutter, with underlying platform-specific integrations (Swift for iOS, Kotlin for Android) where necessary and enabling push notifications.",
      "Key Problem-Solving Areas: Developing robust error handling for LLM API inconsistencies, creating seamless cross-platform native integrations that maintain performance across iOS and Android ecosystems, and maintaing up-to-date health data for personalized insights with each user."
    ],
    outcome: "Currently in active development for a private client, this MVP has successfully implemented the core agentic AI chat flow and initial personalized plan generation. Key milestones achieved include seamless integration with the Gemini LLM API and robust backend setup using Firebase and GCP, all delivered according to client requirements. The primary challenge involves fine-tuning the AI's agentic reasoning for nuanced user interactions and ensuring secure, efficient health data integration without compromising user privacy, which are critical for the client's vision. This project is significantly enhancing my expertise in large language model application development, mobile cross-platform frameworks, and secure cloud architectures for health-focused client applications.",
    future: "Upcoming development focuses on expanding the AI's contextual awareness and memory, and preparing for initial internal client testing rounds to gather user feedback for further refinement of the MVP.",
    images: [
      {
        src: "sysArch.png",
        alt: "System Architecture.",
        type: "main"
      },
      {
        src: "aiArch.png",
        alt: "Advanced Prompt Engineering Architecture.",
        type: "feature"
      }
    ],
    note: "This project was developed for a private client. Due to confidentiality agreements and the handling of sensitive health data, public code access is restricted. However, specific code examples, architectural insights, and a walkthrough of implemented features can be provided during a technical discussion, subject to client approval.",
    isHighlight: false,
    completedDate: "In Progress"
  },
  {
    id: "portfolio",
    num: '04',
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
        src: "proConcept.png", 
        alt: "Concept inspiration image for the portfolio.", 
        type: "feature"
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
    num: '05',
    title: "AI Text Summary: Cost-Optimized Flask Web App",
    status: "Under Maintenance",
    description: "A Flask web application using the BART transformer model for text summarization.",
    overview: "This project began as a deep dive into building a functional AI application with a highly cost-optimized, event-driven serverless architecture on AWS. The initial deployment leveraged a clever orchestration of AWS API Gateway, a series of Lambda functions, and a Dockerized Flask application on an EC2 instance.\n\nThis architecture was a valuable exercise in cloud resource orchestration and serverless design. However, the lengthy initialization time for the large BART model ultimately made the user experience suboptimal and incurred higher-than-expected costs when not regularly maintained.",
    technologies: ["Flask", "AWS EC2", "AWS Lambda", "AWS API Gateway", "Docker", "Python", "Hugging Face (BART Model)"],
    features: [
      "Automated Resource Management: Implemented a robust cleanup process that automatically clears the Hugging Face cache and temporary files post-summary generation. This feature provides a crucial method for controlling disk usage, which is essential when dealing with large model files.",
      "Containerized & Local Deployment: The application is packaged in a Docker container, guaranteeing a consistent environment and seamless local deployment. The project also supports virtual environment setup with a clear requirements.txt file.",
      "Efficient Processing: For long texts, the application divides the content into smaller chunks and processes them in parallel using a ThreadPoolExecutor, which significantly speeds up summarization. It also intelligently detects available hardware, using GPU (CUDA) for faster processing when possible."
    ],
    outcome: "Successfully deployed a functional AI text summarization service on a custom, cost-effective AWS serverless architecture. This project provided invaluable hands-on experience in orchestrating cloud resources, managing Dockerized applications in production environments, and implementing strategies for cloud cost mitigation. It also deepened my understanding of large transformer models and their practical deployment challenges.",
    future: "Future enhancements will be quantizing the model for lower deployment costs, optimizing the AWS architecture for better cost management on load times, refining the model for a higher accurate output on a quanitzed model, and creating a better UI/UX for long term use.",
    images: [
      {
        src: "final.png",
        alt: "Main user interface of the AI Text Summary web application, showing text input and summarized output.",
        type: "main"
      },
      {
        src: "logs.png",
        alt: "Terminal output showing cleanup before and after use.",
        type: "feature"
      }
    ],
    note: "While currently under maintenance, please feel free to fork the repository and run it locally. While this architecture was good in theory, long term practice has proven to be insufficient when mitigating costs.",
    githubUrl: "https://github.com/LilliDarling/ai-text-summary",
    isHighlight: false,
    completedDate: "2024-11"
  },
  {
    id: "witchy-cooking",
    num: '06',
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