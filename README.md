# Space Travel

**Space Travel** is a futuristic web application designed for interplanetary evacuation and colonization. In a time when Earth is no longer habitable, humanity looks to you - the Commander - to manage spacefrft, explore new planets, and lead the mission for survival. 

This React project simulates a real-world single-page application using a mock API stored in local storage and built with React, CSS, and modular architecture principles. 

## Features
- View all available spacecraft
- See detailed information on each spacecraft
- Construct new spacecraft with validations
- Decommision outdated spacecraft
- View planets and their stationed spacecraft
- Dispatch spacecraft from one planet to another
- Responsive UI with loading indicators
- Route-based page navigation
- Fallback redirect to homepage for unmatched routes

## Tech Stack
- **React** - Frontend UI library
- **React Router** - For SPA routing
- **CSS** - Scopred styling for components
- **Local Storage Mock API** - Simulates backend API
- **Context API** - For global state mangagement (if used)

## Folder Structure
```
├── 📜 README.md
├── 📄 index.html
├── 🗂️ package-lock.json
├── 🗂️ package.json
├── 📁 src
│ ├── 🟦 App.jsx
│ ├── 🎨 App.module.css
│ ├── 📁 components
│ │ ├── 📁 Button
│ │ │ ├── 🟦 Button.jsx
│ │ │ ├── 🎨 Button.module.css
│ │ ├── 📁 DispatchControl
│ │ │ ├── 🟦 DispatchControl.jsx
│ │ │ ├── 🎨 DispatchControl.module.css
│ │ ├── 📁 Footer
│ │ │ ├── 🟦 Footer.jsx
│ │ │ ├── 🎨 Footer.module.css
│ │ ├── 📁 Header
│ │ │ ├── 🟦 Header.jsx
│ │ │ ├── 🎨 Header.module.css
│ │ ├── 📁 LoadingSpinner
│ │ │ ├── 🟦 LoadingSpinner.jsx
│ │ │ ├── 🎨 LoadingSpinner.module.css
│ │ ├── 📁 PlanetCard
│ │ │ ├── 🟦 PlanetCard.jsx
│ │ │ ├── 🎨 PlanetCard.module.css
│ │ ├── 📁 SpacecraftCard
│ │ │ ├── 🟦 SpacecraftCard.jsx
│ │ │ ├── 🎨 SpacecraftCard.module.css
│ ├── 📁 context
│ │ ├── 🟦 SpaceTravelContext.jsx
│ ├── 🎨 index.css
│ ├── 🟦 main.jsx
│ ├── 📁 pages
│ │ ├── 📁 ConstructSpacecraft
│ │ │ ├── 🟦 ConstructSpacecraft.jsx
│ │ │ ├── 🎨 ConstructSpacecraft.module.css
│ │ ├── 📁 Home
│ │ │ ├── 🟦 Home.jsx
│ │ │ ├── 🎨 Home.module.css
│ │ ├── 📁 NotFound
│ │ │ ├── 🟦 NotFoundPage.jsx
│ │ │ ├── 🎨 NotFoundPage.module.css
│ │ ├── 📁 Planets
│ │ │ ├── 🟦 Planets.jsx
│ │ │ ├── 🎨 Planets.module.css
│ │ ├── 📁 SpacecraftDetail
│ │ │ ├── 🟦 SpacecraftDetail.jsx
│ │ │ ├── 🎨 SpacecraftDetail.module.css
│ │ ├── 📁 Spacecrafts
│ │ │ ├── 🟦 Spacecrafts.jsx
│ │ │ ├── 🎨 Spacecrafts.module.css
│ ├── 📁 routes
│ │ ├── 🟦 AppRoutes.jsx
│ ├── 📁 services
│ │ ├── 🟨 SpaceTravelApi.js
│ │ ├── 🟨 SpaceTravelMockApi.js
├── 🟨 vite.config.js

```

## Installation & Setup
**1. Clone the respository**

**2. Install dependencies**

**3. Start the development server**

**4. Open in browser**

## Mock API Usage
- The project uses a mock API (SpaceTravelMockApi.js) that stores data in localStorage.
- You should not edit the SpaceTravelMockApi.js file directly.
- Instead, use the abstraction layer in services/SpaceTravelApi.js to interact with it, simulating real-world axios usage.