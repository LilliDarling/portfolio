
export interface ProjectImage {
  src: string;
  alt: string;
  type: "main" | "feature";
}

export interface Project {
  id: string;
  title: string;
  status: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
  outcome: string;
  future: string;
  images?: ProjectImage[];
  note: string;
  demoUrl?: string;
  githubUrl?: string;
  isHighlight: boolean;
  completedDate: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "My Portfolio",
    status: "Deployed",
    description: "Design and developed this portfolio in NextJS and used React Three Fiber for ThreeJS integration",
    overview: "Identified a critical need for neurodivergent individuals facing cognitive overload in task management. I developed an AI-powered task management MVP to address this by offering intelligent task breakdowns and streamlined organization.",
    technologies: ["NextJS", "React", "React Three Fiber", "ThreeJS", "AWS", "Tailwind"],
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
    id: "nixit",
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
    id: "naila",
    title: "NAILA Robotics: Local AI Companion Robot",
    status: "In Development (Co-founder & Lead Developer)",
    description: "Developing a personalized AI companion robot with local, privacy-focused AI, utilizing MQTT for efficient communication protocols.",
    overview: "As a co-founder and lead developer, I am building NAILA Robotics – a personalized AI companion robot inspired by devices like EMO or Vector. The core objective is to create an interactive and intelligent desktop robot that offers companionship, entertainment, and utility, all powered by on-device, privacy-focused AI. By leveraging powerful local AI models and efficient MQTT communication protocols, NAILA is designed to deliver a low-latency, highly responsive experience, minimizing reliance on cloud services.",
    technologies: ["MQTT", "Python", "C/C++", "Rust", "ESP32-S3", "LangChain/LangGraph"],
    features: [
      "Local, Privacy-Focused AI: Designing and implementing an architecture that leverages on-device AI models for natural language processing and interaction, ensuring user data privacy and reducing cloud dependency.",
      "Robust Communication Protocol: Utilizing MQTT for low-latency, efficient, and reliable communication between the robot's hardware components and its AI core.",
      "Interactive Companion Design: Developing the robot's interaction capabilities (e.g., facial expressions, movement, voice responses) to create an engaging and lifelike companion experience.",
      "Modular Software Architecture: Structuring the codebase with Python, C/C++, and Rust to support modularity, allowing for flexible feature expansion and performance optimization.",
      "AI Reasoning & Memory: Integrating LangChain/LangGraph to enable complex AI reasoning, context retention, and personalized interactions over time."
    ],
    outcome: "This is a passion project currently in active development. Key achievements to date include successful establishment of MQTT communication across hardware components, initial integration of local LLM inference, and development of core interaction modules. Challenges involve optimizing on-device AI performance and managing complex inter-component communication for real-time responsiveness. This project has significantly deepened my expertise in embedded systems, local AI deployment, and real-time communication protocols.",
    future: "Upcoming milestones include further refining local AI capabilities, integrating advanced sensory inputs (e.g., computer vision), and developing a robust user customization interface to truly personalize the NAILA experience.",
    images: [
      {
        src: "concept.jpg",
        alt: "Concept render of NAILA, an AI companion robot, on a desk.",
        type: "main"
      },
      {
        src: "prototype.jpg",
        alt: "Close-up photo of NAILA's internal hardware prototype, showcasing microcontroller and wiring.",
        type: "feature"
      },
      {
        src: "diagram.png",
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
    id: "kora",
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
    id: "ai-text-summary",
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
    title: "Intuitive Recipe Management Platform",
    status: "Deployed & Maintained",
    description: "A full-stack Django application designed for streamlined user recipe management, focusing on a clean, ad-free experience.",
    overview: "Originally built during an intensive software development program, I significantly expanded and refined 'Witchy Cooking' into a user-centric web application for personal recipe management. The project's core mission is to provide a clean, ad-free, and intuitive platform for users to save, organize, and discover recipes, offering a welcome alternative to cluttered commercial recipe sites.",
    technologies: ["Django", "Python", "PostgreSQL", "JavaScript", "CSS (Vanilla)", "DigitalOcean", "Google Cloud Platform (GCP)"],
    features: [
      "Comprehensive Recipe Management: Users can create, edit, and store their personal recipes with detailed fields for ingredients, instructions, and notes.",
      "Enhanced User Interaction: Implemented dynamic JavaScript functionalities for creation and editing workflows, improving the user experience and responsiveness without page reloads.",
      "Recipe Discovery & Favoriting: Enabled users to 'favorite' recipes created by others, facilitating easy discovery and saving of beloved dishes.",
      "Clean & Custom UI: Developed a custom user interface using pure CSS (without frameworks like Bootstrap or Tailwind), ensuring a lightweight, ad-free, and visually distinct experience.",
      "Direct User Communication: Integrated a dedicated contact page to facilitate direct feedback and support for users.",
      "Scalable Cloud Deployment: Deployed the application on DigitalOcean, leveraging PostgreSQL for robust data storage and potentially GCP services for complementary functionalities (e.g., storage, analytics)."
    ],
    outcome: "Successfully transformed a foundational project into a robust, feature-rich web application with a strong focus on user experience. This independent expansion deepened my expertise in Django's full-stack capabilities, advanced JavaScript interactivity, and meticulous front-end styling with vanilla CSS. The project also provided hands-on experience with cloud deployment and continuous maintenance of a live application.",
    future: "Future enhancements could include implementing user authentication via social logins, adding search and filtering capabilities for recipes, and exploring advanced performance optimizations for faster load times.",
    images: [
      {
        src: "homepage.jpg",
        alt: "Homepage of Witchy Cooking, showing a clean layout and recipe cards.",
        type: "main"
      },
      {
        src: "edit.jpg",
        alt: "Screenshot of Witchy Cooking's dynamic recipe creation/editing form, highlighting JavaScript enhancements.",
        type: "feature"
      },
      {
        src: "detail.jpg",
        alt: "Detailed view of a recipe on Witchy Cooking, showcasing ingredients and instructions.",
        type: "feature"
      }
    ],
    note: "This project was expanded significantly post-bootcamp to demonstrate advanced full-stack capabilities and a commitment to independent development.",
    demoUrl: "https://witchycooking.com",
    githubUrl: "https://gitlab.com/LilliDarling/witchycooking",
    isHighlight: false,
    completedDate: "2024-08"
  }
];

export const getHighlightProjects = () => projects.filter(project => project.isHighlight);
export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(project => project.id === id);