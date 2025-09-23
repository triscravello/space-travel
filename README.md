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
src/
├── components/ # Reusable UI components (with CSS)
├── context/ # React Context providers for global state
├── pages/ # Route-based page components
├── routes/ # Routing configuration
├── services/ # API service layer
│ ├── SpaceTravelMockApi.js # (Do not edit)
│ └── SpaceTravelApi.js # Wrapper for API interaction
├── App.jsx # Main layout and route shell
├── main.jsx # App entry point
└── index.css # Global styles

## Installation & Setup
**1. Clone the respository**

**2. Install dependencies**

**3. Start the development server**

**4. Open in browser**

## Mock API Usage
- The project uses a mock API (SpaceTravelMockApi.js) that stores data in localStorage.
- You should not edit the SpaceTravelMockApi.js file directly.
- Instead, use the abstraction layer in services/SpaceTravelApi.js to interact with it, simulating real-world axios usage.