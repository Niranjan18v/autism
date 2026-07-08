# AURA — Autism Care & Development Ecosystem

> **Empowering Autistic Minds to Shine Brighter**
> A clinically-backed bilingual sensory ecosystem designed to foster vocabulary, active communication, and emotional regulation at a calm, predictable pace.

AURA (also known as Autishta Care) is a high-fidelity digital platform tailored to bridge the accessibility gap for individuals on the autism spectrum in rural India. Built with dual-language support (English and Tamil), it provides caregivers, clinicians, and administrators with the specialized tools needed for tracking progress, injecting personalized therapy directives, and training cognitive skills.

---

## 🌟 Key Features

### 1. Unified Multi-Role Workspace
The platform is built around distinct dashboards customized for the key stakeholders in a child's developmental path:
*   **Parent/Caregiver Dashboard (`/dashboard/patient`):** 
    *   **Daily Routine Planner:** Allows parents to establish structured routines, complete scheduled tasks, and organize daily activities.
    *   **Activity Center:** Quick launch access to interactive modules (Emotion Matching, Communication AAC, Assessment, and Education).
    *   **Telehealth Contact:** Clean integration with clinical direct messaging.
*   **Clinician/Doctor Dashboard (`/dashboard/doctor`):**
    *   **Command Center:** Dynamic clinic overview containing patient rosters, active therapy queues, and quick status indicators.
    *   **Case Insights (Analytics):** Zero-dependency SVG telemetry tracking case severity trends and weekly therapy engagement rates.
    *   **Directive Injector:** Allows doctors to inject customized learning guidelines, daily tasks, and clinical to-dos directly into the child's routine planner.
*   **System Administrator Dashboard (`/dashboard/admin`):**
    *   System oversight panel managing active medical rosters, platform metrics, and administrative audit trails.

### 2. Cognitive & Communication Modules
*   **AAC Communication Module (`/activity/communication`):** Augmentative and Alternative Communication system built with high-fidelity visual cards representing daily needs, actions, feelings, and objects to support non-verbal children.
*   **Emotion Understanding Game (`/activity/emotion-matching`):** Interactive facial matching application designed to help children identify, match, and interpret facial cues and emotions.
*   **Self-Assessment Module (`/activity/assessment`):** Diagnostic questionnaire measuring sensory, social, cognitive, and physical attributes.
*   **Clinical Growth Report (`/report`):** High-contrast progress visualization compiling tracking metrics, clinician directives, and historical behavioral milestones.
*   **Education Module (`/activity/education`):** A clinical knowledge repository containing structured guides, articles, and training materials in both languages to support parent education.

### 3. Localization & Accessibility
*   **Bilingual Translation Engine:** Built on a unified, high-performance `LanguageContext` translating the interface seamlessly between **English** and **Tamil**.
*   **Persistent Configuration:** Automatically saves language selection using `localStorage` so the preference remains active across browser sessions.

---

## 🛠️ Technology Stack & Engineering Techniques

### Frontend Stack
*   **Framework:** [React 19](https://react.dev/) — Driving state-driven UI cycles and high-performance component rendering.
*   **Routing:** [React Router 7](https://reactrouter.com/) — Handles nested paths, secure redirection, and role-based portal endpoints.
*   **Build Pipeline:** [Vite 8](https://vite.dev/) — Provides fast Hot Module Replacement (HMR) and optimized build bundles.
*   **Icons:** [Lucide React](https://lucide.dev/) — Provides clean, customizable, scale-independent SVG icons.

### Advanced Design & Performance Techniques
*   **Bento Grid Architecture:** Organizes detailed data blocks, metrics, and activities into highly structured, premium card modules (`bento-card`).
*   **Zero-Dependency SVG Analytics:** Charts, progress circles, and active trends are rendered using raw math and SVG coordinates inside React rather than heavy third-party plotting packages. This ensures instant load times and perfect responsiveness.
*   **Micro-Animations & Easing Curves:** Implements smooth transitions (`transition: all 0.3s cubic-bezier(...)`) and physics-based card pops (`btn-pop`) to make interactions engaging and responsive.
*   **Glassmorphic Design:** Standardized modern design tokens, slate scales, and clean semi-transparent color overlays for a premium clinical aesthetic.

---

## 📂 Project Structure

```text
autism/
├── .github/workflows/   # CI/CD deployment configuration scripts
│   └── deploy.yml       # Automates building and deploying to GitHub Pages
├── assets/              # Built production JavaScript bundles and CSS styles
├── dist/                # Target compilation folder for production builds
├── public/              # Static public resources (mascot assets, translation items)
├── src/
│   ├── context/         # React Contexts (LanguageContext)
│   ├── pages/           # Screen components (LandingPage, Dashboards, Games, etc.)
│   ├── App.css          # App-wide visual modifications
│   ├── App.jsx          # Route mapping and central initialization
│   ├── index.css        # Core styling sheet containing variables & Bento classes
│   └── main.jsx         # DOM Mounting entry point
├── vite.config.js       # Vite build configurations and directory routing
├── index.html           # Main root deployment index
└── package.json         # Project manifests and package scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) and `npm` installed.

### 1. Clone & Install Dependencies
Navigate to your workspace directory and run:
```bash
npm install
```

### 2. Run Local Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Generate a Production Build
Compile and bundle the project for release:
```bash
npm run build
```
This outputs compiled, optimized assets to the `dist/` directory.

### 4. Deploy to GitHub Pages
To publish the latest build to the web:
```bash
npm run deploy
```
This runs the `predeploy` build with the base asset configuration and uploads the final output to the `gh-pages` branch. The site is live at:
👉 **[https://niranjan18v.github.io/autism/](https://niranjan18v.github.io/autism/)**
