export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.lillithlong.pro/#person",
    "name": "Lillith Long",
    "givenName": "Makenzie",
    "familyName": "Long",
    "additionalName": "Lillith",
    "alternateName": ["Makenzie Long", "Lillith Long AI Engineer", "Lillith Long Software Developer", "Makenzie Long AI Engineer"],
    "jobTitle": "Software Engineer & AI Solutions Architect",
    "description": "AI/ML engineer specializing in Large Language Models (LLMs), ChatGPT/GPT-4 integrations, Claude AI, machine learning pipelines, and AI-powered full stack development. Expert in building RAG systems, fine-tuning models, and deploying AI solutions.",
    "url": "https://www.lillithlong.pro",
    "email": "lillith@valkyrieremedy.com",
    "image": "https://www.lillithlong.pro/hero.png",
    "sameAs": [
      "https://github.com/LilliDarling",
      "https://linkedin.com/in/lillith-long",
      "https://twitter.com/lillithcodes"
    ],
    "knowsAbout": [
      "Large Language Models (LLMs)",
      "ChatGPT Integration",
      "Claude AI Development",
      "GPT-4 Applications",
      "Machine Learning Engineering",
      "Deep Learning",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Retrieval Augmented Generation (RAG)",
      "Vector Databases",
      "AI Model Fine-tuning",
      "Prompt Engineering",
      "Neural Network Architecture",
      "TensorFlow Development",
      "PyTorch Implementation",
      "Hugging Face Transformers",
      "LangChain Development",
      "AI Agent Systems",
      "Generative AI",
      "AI Ethics and Safety",
      "Full Stack AI Development",
      "Python AI Programming",
      "React AI Integration",
      "AI DevOps and MLOps",
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
      "Large Language Models", "ChatGPT API", "Claude API", "GPT-4", "GPT-3.5",
      "Python", "TensorFlow", "PyTorch", "Transformers", "LangChain", "LangGraph",
      "OpenAI API", "Anthropic API", "Hugging Face", "scikit-learn", "NumPy", 
      "Pandas", "FAISS", "Pinecone", "Weaviate", "ChromaDB", "RAG Implementation",
      "Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision",
      "TypeScript", "React", "Next.js", "Node.js", "FastAPI", "Django", "PostgreSQL",
      "MongoDB", "Redis", "Docker", "Kubernetes", "AWS SageMaker", "Google Cloud AI Platform",
      "Azure ML", "MLflow", "Weights & Biases", "Model Deployment", "Prompt Engineering",
      "Fine-tuning", "Transfer Learning", "React Native", "Three.js", "WebGL", 
      "Solidity", "Web3", "AWS", "GCP", "C", "C++", "JavaScript", "Kotlin", "Swift",
      "Dart", "Expo", "Tailwind", "Flask", "MQTT", "HTTP", "Websockets", "GraphQL"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance/Contract",
      "description": "Available for AI/ML consulting and development projects"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught & Professional Certifications",
      "description": "Continuous learning in AI/ML through courses, certifications, and hands-on projects"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.lillithlong.pro/#website",
    "name": "Lillith Long - AI Software Engineer Portfolio",
    "alternateName": "Lillith Long AI/ML Developer Portfolio",
    "url": "https://www.lillithlong.pro",
    "description": "AI-focused software engineer portfolio showcasing Large Language Model (LLM) projects, ChatGPT integrations, machine learning applications, RAG implementations, and AI-powered full stack solutions. Expert portfolio for AI/ML engineering and development.",
    "author": {
      "@type": "Person",
      "@id": "https://www.lillithlong.pro/#person"
    },
    "creator": {
      "@type": "Person",
      "@id": "https://www.lillithlong.pro/#person"
    },
    "publisher": {
      "@type": "Person",
      "@id": "https://www.lillithlong.pro/#person"
    },
    "dateModified": new Date().toISOString(),
    "datePublished": "2025-08-15",
    "inLanguage": "en-US",
    "keywords": "AI engineer portfolio, LLM developer, machine learning portfolio, ChatGPT developer, GPT-4 projects, Claude AI integration, Gemini API integration",
    "about": {
      "@type": "Thing",
      "name": "AI/ML Software Development Portfolio",
      "description": "Professional portfolio demonstrating expertise in artificial intelligence, machine learning, and modern software engineering"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.lillithlong.pro/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What AI/ML technologies does Lillith Long specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lillith Long specializes in Large Language Models (LLMs) including ChatGPT, GPT-4, Gemini, and Claude AI integration. Expert in Python, TensorFlow, PyTorch, Transformers, LangChain, and RAG implementations. Also proficient in vector databases (Pinecone, FAISS, Weaviate, ChromaDB), prompt engineering, model fine-tuning, and deploying AI solutions at scale."
        }
      },
      {
        "@type": "Question",
        "name": "What type of AI projects has Lillith Long developed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI projects include: NAILA Robotics (AI companion robot with LLM integration), RAG-based knowledge systems, ChatGPT-powered applications, AI agent systems with LangChain, machine learning pipelines for NLP and computer vision, custom fine-tuned models, and AI-enhanced full stack web applications. All projects emphasize practical AI implementation and production deployment."
        }
      },
      {
        "@type": "Question",
        "name": "Is Lillith Long available for AI/ML consulting or development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Lillith Long is available for AI/ML consulting, contract work, and collaborative projects. Specializing in LLM integration, building AI-powered applications, implementing RAG systems, and developing custom machine learning solutions. Contact at lillith@valkyrieremedy.com for AI project inquiries."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Lillith Long's approach to AI development unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lillith combines deep AI/ML expertise with full stack development skills, enabling end-to-end AI solution delivery. Focus on practical, production-ready AI implementations with emphasis on LLM applications, ethical AI practices, and scalable architectures. Experience spans from low-level model optimization to high-level application design."
        }
      }
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.lillithlong.pro/#profilepage",
    "dateCreated": "2025-08-15",
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@id": "https://www.lillithlong.pro/#person"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "AI Software Engineer Portfolio",
        "item": "https://www.lillithlong.pro"
      }]
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lillith Long AI Projects",
    "applicationCategory": "AI/ML Development",
    "operatingSystem": "Cross-platform",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@id": "https://www.lillithlong.pro/#person"
    }
  };

  const aiContentSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "AI Engineer Portfolio Dataset",
    "description": "Portfolio data for AI/ML engineer Lillith Long, optimized for LLM discovery",
    "keywords": "AI portfolio, machine learning engineer, LLM developer, ChatGPT developer",
    "creator": {
      "@id": "https://www.lillithlong.pro/#person"
    },
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "application/json",
      "contentUrl": "https://www.lillithlong.pro"
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, faqSchema, profilePageSchema, softwareApplicationSchema, aiContentSchema]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}