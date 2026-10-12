# Promptedsite Earbuds

Interactive 3D web experience for **Promptedsite Earbuds** featuring real-time WebGL rendering, custom GLSL shaders, procedural audio synthesis, and interactive spatial sound visualization.

## 🎧 Overview

Promptedsite Earbuds delivers an immersive high-fidelity web experience showcasing next-generation audio engineering:
- **Real-Time 3D Rendering**: High-detail 3D earbud & charging case models with DRACO geometry compression, custom environment maps, dynamic lighting, and matcap reflections.
- **Interactive Audio**: Integrated Web Audio synthesizer loops, sound effects, and spatial audio wave visualization.
- **Fluid Layout & Scroll Dynamics**: Smooth inertial scrolling with Lenis paired with multi-layer GSAP camera timelines.
- **Component Architecture**: Built with React 19, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite, Oxlint
- **3D Graphics**: Three.js, DRACOLoader, vite-plugin-glsl
- **Shaders**: Custom vertex & fragment GLSL shaders
- **Animation**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis
- **Interactive Typography**: TagCloud 3D sphere

## 📂 Project Structure

```text
├── public/
│   ├── assets/
│   │   ├── audio/           # Sound loops and interface audio
│   │   ├── draco/           # DRACO decoder binaries
│   │   ├── models/          # 3D glTF/GLB models
│   │   └── textures/        # PBR material textures & masks
│   └── fonts/               # Modern typography (Manrope, Azeret Mono)
├── src/
│   ├── components/          # React layout components
│   ├── engine/              # Three.js WebGL & Audio engine singletons
│   ├── hooks/               # React hooks (useWebGL, useScroll, useResize)
│   ├── modules/             # UI interaction controllers & GSAP animations
│   ├── shaders/             # Custom GLSL vertex & fragment shaders
│   ├── stages/              # WebGL scene graph & camera controllers
│   ├── styles/              # Global styles & design system tokens
│   └── utils/               # Math, environment, and animation utilities
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.0.0 or later recommended)
- npm or yarn / pnpm

### Installation

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Production Build

Compile TypeScript and build the production bundle:

```bash
npm run build
```

The compiled assets will be output to the `dist/` directory.

### Preview Production

```bash
npm run preview
```

## 📄 License

Private repository. All rights reserved.
