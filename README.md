# Car Dealership Inventory System

A full-stack web application designed for car dealerships to manage their inventory, Built with a modern TDD approach.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, MongoDB (Atlas)
- **Frontend:** React, Vite, Tailwind CSS
- **Testing:** Jest, Vitest, React Testing Library

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas cluster URL

## Setup Instructions

### Backend Setup
1. Open a terminal and navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (or set `PORT` and `MONGO_URI`).
4. Start the development server: `npm run dev`
5. *(Optional)* Run tests: `npm run test`

### Frontend Setup
1. Open a terminal and navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Open your browser to the local URL provided by Vite (usually `http://localhost:5173`).

## My AI Usage

**Tools Used**: Antigravity (Google Deepmind)

**How I used them**:
- **Architecture & Scaffolding**: I used the AI assistant to bootstrap the React frontend with Vite and Tailwind, and to set up the Node.js/Express backend with Mongoose.
- **UI/UX Design**: I relied heavily on the AI to design a modern, glassmorphism-inspired aesthetic with dynamic floating background orbs and a responsive layout.
- **Authentication Flow**: The AI implemented the JWT-based authentication system and synchronized the React state to ensure the Navbar updates instantly upon login/logout without page refreshes.
- **Debugging**: I used the AI to resolve Mongoose deprecation warnings and troubleshoot styling opacity issues where background effects were being hidden.

**Reflection**: 
Using AI as a co-pilot drastically accelerated the development process. It allowed me to focus on high-level architecture and user experience while the AI handled boilerplate generation, complex CSS animations, and repetitive API endpoint wiring. It was particularly effective in instantly diagnosing and fixing state management edge cases in React.
