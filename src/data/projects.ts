
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  isHighlight: boolean;
  completedDate: string;
}

export const projects: Project[] = [
  {
    id: "audhd",
    title: "MVP AI Task Helper",
    description: "A task management app for Neurodivergent individuals.",
    fullDescription: "A sophisticated task management app, designed with task breakdowns by AI to help neurodivergent individuals beat cognitive overload. It integrates Google Calendar to also add the tasks to a users calendar and receive notifications that way. Built as an MVP, we saw users actively use the app with positive feedback. Currently, the app is pivoting to notification first, with users being able to directly text the AI like you would a friend.",
    technologies: ["Expo", "GCP", "Python", "Anthropic LLM API", "MongoDB", "React"],
    imageUrl: "hold",
    githubUrl: "https://github.com/LilliDarling/audhd",
    isHighlight: true,
    completedDate: "2025-04"
  },
  {
    id: "naila",
    title: "NAILA Robotics",
    description: "Interactive robot with custom built AI utilizing MQTT for communication protocols.",
    fullDescription: "This project aims to build a personalized AI companion robot inspired by devices like EMO or Vector. The goal is to create an interactive and intelligent robot that lives on your desk, providing companionship, entertainment, and utility, all powered by local, privacy-focused AI. By leveraging powerful local AI models and efficient communication protocols, NAILA aims to offer a low-latency, responsive experience without constant reliance on cloud services for the time being.",
    technologies: ["MQTT", "Python", "C/C++", "Rust", "LangChain/LangGraph"],
    githubUrl: "https://github.com/LilliDarling/robo-naila",
    isHighlight: true,
    completedDate: "2025"
  },
  {
    id: "kora",
    title: "Kora Wellness",
    description: "An AI chat wellness coach.",
    fullDescription: "An mobile application that uses AI to help a user reach their health goals through open chat. The AI creates wellness plans based on the users goals and categorizes those goals into 3 different categories: fitness, nutrition, and mindfulness. Using an agentic flow, the AI will figure out if the user is asking for a new plan, refining a current plan, advice for the day, and many other features. Integrating with a users health data and profile information, Kora is able to make informed decisions best suited for the individual user and adapt as needed. Currently under active development.",
    technologies: ["Flutter", "GCP", "Typescript", "Gemini LLM API", "Firebase", "Swift", "Kotlin"],
    isHighlight: false,
    completedDate: "2025"
  },
  {
    id: "ai-text-summary",
    title: "AI Text Summary",
    description: "A Flask web application that uses the BART transformer model to automatically summarize text content.",
    fullDescription: "This project was created for fun and I have deployed it using an AWS EC2 instance. The instance contains the Docker image and container that spins up when the instance is activated. I connected an API Gateway that triggers two of three Lambda functions. The first Lambda function spins up the instance and will tell you if the instance is started, pending, or running, and provide health checks. The second function will tell you the status of the application within the instance itself. Once the application is ready, the function will give you the IP address to access the UI for the application. The third and final function runs a check to see if the instance is running. If it is, it will wait 10 minutes before stopping the instance. I implemented this infrastructure to help mitigate costs and practice a different architecture within AWS. During demo, it may take up to 15 minutes for initialization due to the BART model download.",
    technologies: ["Flask", "AWS", "Python", "Docker", "Hugging Face"],
    demoUrl: "https://2zd4vw2pe7.execute-api.us-east-2.amazonaws.com/prod/start",
    githubUrl: "https://github.com/LilliDarling/ai-text-summary",
    isHighlight: false,
    completedDate: "2024-11"
  },
  {
    id: "witchy-cooking",
    title: "Witchy Cooking",
    description: "Full stack Django application for user recipe management.",
    fullDescription: "This project was originally built in an intensive program for software development called Hack Reactor. After the initial build I took the project and expanded on it by adding elements such as a contact page, the ability to favorite recipes that aren't your own, adjusting the create and edit functions with javascript to make them more dynamic, as well as using css at the very base level without bootstrap or tailwind. This project is now designed to allow people the option to save recipes and utilize a site without all the fluff and ads that are common on most recipe sites.",
    technologies: ["Django", "Digital Ocean", "Python", "GCP", "PostgreSQL"],
    demoUrl: "https://witchycooking.com",
    githubUrl: "https://gitlab.com/LilliDarling/witchycooking",
    isHighlight: false,
    completedDate: "2024-08"
  }
];

export const getHighlightProjects = () => projects.filter(project => project.isHighlight);
export const getAllProjects = () => projects;
export const getProjectById = (id: string) => projects.find(project => project.id === id);