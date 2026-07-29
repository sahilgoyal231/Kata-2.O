# AI Tooling Chat History

This file contains the prompts and interactions used to build the Car Dealership Inventory System.

## Step 1: Initialization
- **Prompt (User):** Initial request to build the system with Node.js, MongoDB Atlas, and React.
- **AI Action:** Proposed the stack and generated the initial implementation plan. Created repository structure, initialized git, and created README/PROMPTS files.

## Step 2: Backend Setup & Authentication
- **Prompt (User):** Confirmed tech stack with modification: Use MongoDB Atlas URI. Also requested realistic design (real images as icons) and an initial landing page that directs to registration.
- **AI Action:** Updated `implementation_plan.md` and `task.md`.
- **Prompt (User):** "proceed, but make sure to ask for my permission after each step and wait for the confirmation and yuor role must remain as if a senior fullstack developer with hands-on experience of more than a decade"
- **AI Action:** Initialized backend project, installed dependencies, configured TS and Jest.
- **Prompt (User):** "Update these dependencies as of the latest and make sure that the installation must be successfully done without a single vulnerability"
- **AI Action:** Replaced legacy jest tools with modern `vitest` to resolve deprecation warnings and upgraded all packages to `latest`, swapping `bcryptjs` with `bcrypt`.
- **Prompt (User):** "now i want you test the entire backend and make sure to add the further prompts in prompts.md as well except the ones in which i explicitly mention you not to and proceeed"
- **AI Action:** Documented prompts and attempted to run backend tests.

## Step 3: Backend Vehicles API
- **Prompt (User):** "Proceed to the next step and make sure not to forget the context i had given you at the very start"
- **AI Action:** Created `Vehicle` model, wrote test suite for vehicle CRUD endpoints and search/filter. Implemented routes and connected them to the Express app.

## Step 4: Backend Inventory Management API
- **Prompt (User):** "done proceed to the backend inventory management"
- **AI Action:** Created `inventory.test.ts` for purchase and restock endpoints. Added `/purchase` (Customer/Admin) and `/restock` (Admin) logic to `vehicleRoutes.ts`, correctly handling stock quantity updates.

## Step 5: Frontend Setup & Landing Page
- **Prompt (User):** "proceed to the frontnd part"
- **AI Action:** Transitioned to frontend architecture, initiating Vite + React boilerplate.
