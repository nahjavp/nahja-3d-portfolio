# Nahja VP — 3D Interactive Portfolio & Personal Room

A cinematic, interactive 3D portfolio website for **Nahja VP** (Software Development Intern & Computer Science Engineering Student).

Built entirely from scratch, this portfolio transforms Nahja's official resume into a physical, explorable personal bedroom and study workspace. Visitors enter through a 3D wooden door, explore categorized bookshelves where resume items appear as physical books, interact with a study workstation computer, inspect a desk resume binder, and access verified contact links.

---

## ✨ Features

- **🚪 3D Closed-Door Intro**:
  - Realistic wooden entrance door with embossed brass nameplate displaying Nahja's verified name and title.
  - Interactive click-to-enter trigger featuring physical door swing animation and cinematic camera glide through the threshold.

- **🏡 Cozy Personal Bedroom & Study Room**:
  - Designed as a personal living and study sanctuary (not a cold IT laboratory).
  - Warm oak hardwood floor, woven rug, large window with streaming sunlight and curtains, study desk, comfortable bed, potted monstera plant, framed minimalist wall prints, and wall clock.
  - Warm, non-jarring lighting palette (cream, beige, walnut wood tones, soft amber).

- **📚 Physical Bookshelf Navigation**:
  - Categorized wooden shelves strictly derived from Nahja's resume:
    - **Experience**: Books for *Cognilearn*, *Genzec Technologies LLP*, and *Obsqura Zone, Calicut*.
    - **Projects**: Books for *SafeSite — Construction Safety Monitoring System* and *Medicine Reminder App*.
    - **Education**: Books for *B.Tech at AWH Engineering College* (CGPA: 8.12), *Higher Secondary (+2) at GHSS VKD* (94%), and *10th at CHMKMHS* (100%).
    - **Technical Skills**: Books for *Programming Languages* (Python, Java, C), *Web & Databases* (HTML, CSS, MySQL), *Tools & Platforms* (Git, GitHub, Canva, CapCut), *Areas of Interest*, and *Soft Skills & Spoken Languages*.
    - **Certifications & Workshops**: 7 physical books for hackathons, quizzes, and workshops.
    - **Leadership & Volunteering**: Book for *National Service Scheme (NSS) — Core Leader*.
  - Individual books slide forward and tilt on hover.
  - Clicking any book opens a detailed information panel with exact resume descriptions, responsibilities, and technologies.

- **💻 Interactive Study Desk & Computer Workstation**:
  - 3D monitor, mechanical keyboard, mouse, and interactive desk lamp (click to turn lamp on/off).
  - Clicking the computer monitor opens **NahjaOS**—a clean workstation dashboard with quick tabs for About, Experience, Projects, Education, Skills, Certificates, Contact, and an interactive Terminal.

- **📄 Desk Resume Binder**:
  - Physical leather folder on the desk titled "MY RESUME".
  - Opens a clean resume viewer with direct **View** and **Download PDF** buttons (`/resume.pdf`).

- **📌 Wall Contact Board**:
  - Framed board pinned with exact contact information.
  - Clickable direct links for Email (`mailto:`), Phone (`tel:`), LinkedIn, and GitHub.
  - 1-click clipboard copy functionality.

- **🤖 Local Portfolio Assistant**:
  - Embedded chatbot answering queries regarding Nahja's background, skills, and projects directly from local data.
  - 100% offline, zero API keys, zero external cost, zero network latency.

- **🎵 Ambient Sound Generator**:
  - Built-in soothing lofi synthesizer generated via Web Audio API.
  - Fully self-contained (no missing mp3 files, never breaks).
  - Muted by default with a visible Sound ON/OFF button.

- **📱 Fully Responsive**:
  - Touch drag, pinch-to-zoom, and responsive bottom sheets for mobile and tablet devices.

---

## 🛠️ Technologies

- **React 18** — Component architecture & UI state management
- **Vite 5** — Next-generation frontend build tooling
- **Three.js** — 3D graphics rendering & WebGL engine
- **@react-three/fiber** — React declarative wrapper for Three.js
- **@react-three/drei** — Useful 3D helpers and camera controls
- **GSAP (GreenSock)** — Smooth cinematic door and camera tweens
- **Lucide React** — Crisp icon system
- **Canvas-Confetti** — Celebration particle effects
- **Web Audio API** — Real-time synthesized ambient soundscape

---

## 📁 Project Structure

```
nahja-portfolio/
│
├── public/
│   ├── resume.pdf             # Place your latest resume PDF here
│   ├── models/
│   ├── textures/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Book.jsx           # Individual 3D book mesh with hover/click
│   │   ├── Bookshelf.jsx      # Categorized wooden shelving unit
│   │   ├── BookDetails.jsx    # Modal displaying resume item details
│   │   ├── CameraController.jsx # Camera transitions and OrbitControls
│   │   ├── Chatbot.jsx        # Local portfolio query assistant
│   │   ├── Computer.jsx       # 3D monitor, keyboard and mouse on desk
│   │   ├── ComputerModal.jsx  # NahjaOS workstation desktop UI
│   │   ├── ContactBoard.jsx   # 3D framed corkboard with contact pins
│   │   ├── ContactModal.jsx   # Clickable contact channels and copy buttons
│   │   ├── Desk.jsx           # Study desk with lamp, mug, headphones, chair
│   │   ├── Door.jsx           # 3D entrance door with hinges and nameplate
│   │   ├── LoadingScreen.jsx  # Initial loading progress bar
│   │   ├── Navigation.jsx     # Bottom quick-navigation dock
│   │   ├── ResumeBook.jsx     # Physical "MY RESUME" folder on desk
│   │   ├── ResumeModal.jsx    # Resume viewer and PDF download modal
│   │   ├── Room.jsx           # Complete 3D room, lighting, and decor
│   │   └── UIOverlay.jsx      # HUD, overlays, and modal manager
│   │
│   ├── scenes/
│   │   └── RoomScene.jsx      # 3D Canvas scene tree
│   │
│   ├── data/
│   │   └── portfolioData.js   # Single source of truth from resume
│   │
│   ├── utils/
│   │   └── audio.js           # Web Audio API ambient synth
│   │
│   ├── App.jsx                # Root application
│   ├── main.jsx               # React DOM entry
│   └── styles.css             # Global styling and animations
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

---

## 📄 Updating Your Resume PDF

To supply your own PDF file:
1. Export your latest resume as `resume.pdf`.
2. Copy it into `public/resume.pdf` (replacing the placeholder file).
3. The "VIEW RESUME" and "DOWNLOAD RESUME" buttons will automatically serve your updated PDF!

---

## 📱 Testing on Mobile

To test on your phone over your local Wi-Fi:
1. Start the Vite server with host exposed:
   ```bash
   npm run dev -- --host
   ```
2. Note the Network URL printed in the terminal (e.g., `http://192.168.1.X:5173`).
3. Connect your phone to the same Wi-Fi and open that URL in Safari or Chrome.

---

## 🚢 GitHub Deployment

To push this repository to GitHub:

```bash
git init
git add .
git commit -m "Initial 3D portfolio for Nahja VP"
git branch -M main
git remote add origin https://github.com/nahjavp/your-portfolio-repo.git
git push -u origin main
```

---

## ⚡ Vercel Deployment

This project is zero-config ready for Vercel:
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** → **Project**.
3. Import your GitHub repository (`your-portfolio-repo`).
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**.

Done! Your 3D animated portfolio will be live worldwide on HTTPS with edge CDN caching.
