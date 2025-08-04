export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Lillith Long",
    "jobTitle": "Software Engineer & AI Solutions Architect",
    "description": "Software engineer specializing in AI, React, Python, and Flutter development",
    "url": "https://lillithlong.pro",
    "email": "lillith@valkyrieremedy.com",
    "sameAs": [
      "https://github.com/LilliDarling",
      "https://linkedin.com/in/lillith-long"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Artificial Intelligence",
      "Web Development",
      "Python",
      "React",
      "TypeScript",
      "Flutter",
      "Machine Learning",
      "Mobile Development"
    ],
    "skills": [
      "Python", "TypeScript", "React", "Next.js", "Node.js",
      "Django", "FastAPI", "PostgreSQL", "MongoDB", "Docker",
      "AWS", "GCP", "React Native", "Three.js", "Solidity",
      "C", "C++", "LangChain", "LangGraph", "JavaScript",
      "Kotlin", "Swift", "Dart", "Expo", "Tailwind", "Flask",
      "MQTT", "HTTP", "Websockets", "GraphQL"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lillith Long Portfolio",
    "url": "https://lillithlong.pro",
    "description": "Portfolio showcasing software engineering projects specializing in AI, web development, and innovative solutions",
    "author": {
      "@type": "Person",
      "name": "Lillith Long"
    },
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What technologies does Lillith Long specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lillith Long specializes in Python, TypeScript, React, Next.js, AI/ML development, Flutter, Django, FastAPI, Node.js, C, C++, Dart, mobile development, and full-stack development with expertise in both frontend and backend technologies."
        }
      },
      {
        "@type": "Question",
        "name": "What type of projects has Lillith Long worked on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Projects include NAILA Robotics (AI companion robot), AI agent systems, web applications, and innovative solutions combining hardware and software."
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, faqSchema]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}