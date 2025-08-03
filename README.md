# Portfolio

A modern, interactive portfolio website showcasing projects and skills with immersive 3D visuals and smooth animations.

## Features

- **Interactive 3D Environment**: Built with Three.js and React Three Fiber featuring:
  - Cosmic flower animation with custom GLSL shaders
  - Twinkling star field background
  - Dynamic dust particle cursor effects

- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Responsive Design**: Tailwind CSS for mobile-first responsive layouts
- **Project Showcase**: Dynamic project pages with image galleries
- **Contact Integration**: EmailJS integration for contact form functionality
- **Modern Stack**: Next.js 15 with TypeScript and Turbopack

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Build Tool**: Turbopack (Next.js)
- **Package Manager**: pnpm

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── three-d/           # 3D components and shaders
│   └── ui/                # UI components
├── contexts/              # React contexts
├── data/                  # Project data
├── styles/                # Global styles
└── types/                 # TypeScript definitions
```

## Development

- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Start production**: `pnpm start`

## Key Components

- **3D Canvas**: Interactive Three.js scene with custom shaders
- **Project Gallery**: Dynamic project showcase with detailed pages
- **Smooth Scrolling**: GSAP ScrollTrigger animations
- **Responsive Navigation**: Mobile-friendly navigation system
