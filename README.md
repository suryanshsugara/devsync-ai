# DevSync AI SaaS

![DevSync AI Banner](https://via.placeholder.com/1200x400?text=DevSync+AI)

DevSync AI is an AI-powered developer collaboration platform. It allows developers to create or join rooms, share code context, and interact with an AI assistant for contextual debugging help, code suggestions, and explanations. Team leads can also view analytics of AI usage and room activity.

## 🚀 Features

*   **Real-time Dev Rooms**: Create or join dedicated rooms for specific projects or tasks.
*   **AI-Powered Collaboration**: Mentions `@ai` in chat to get instant, context-aware assistance from the AI Copilot.
*   **Role-Based Access Control**: Different views and capabilities for `DEVELOPER` and `TEAM_LEAD` roles.
*   **Analytics Dashboard**: Team leads get detailed insights into platform usage, bug resolution times, and active rooms.
*   **Demo Mode included**: Easy setup with an auto-auth demo mode to test the flows instantly.

## 🛠️ Technology Stack

**Frontend:**
*   React 18
*   Vite
*   Tailwind CSS (via setup)
*   Socket.io-client (Real-time WebSockets)
*   Lucide React (Icons)
*   React Router v7

**Backend:**
*   Node.js
*   NestJS (TypeScript Framework)
*   Prisma ORM
*   SQLite (Development) / PostgreSQL (Production)
*   Socket.io (WebSocket Gateway)
*   JWT Authentication

## 📦 Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd "DevSync AI SaaS UI Design"
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend will be available at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Push the Prisma schema to the SQLite dev database
npx prisma db push

# (Optional) Seed the demo user to bypass login for testing
node scripts/seed-demo-user.js

# Start the NestJS backend
npm run start:dev
```
The backend API will run on `http://localhost:3000`.

## 🔐 Demo Mode
Currently, the application includes a **Demo Mode** in `src/main.tsx` to easily explore the UI without needing to register a real user. 
When accessing `http://localhost:5173/`, it auto-authenticates a mock `demo@devsync.com` user and redirects straight to the Dashboard.

## 📁 Project Structure

*   `/src/app/pages`: React UI templates.
*   `/src/app/lib/api.ts`: Centralized fetch wrapper handling JWT tokens.
*   `/backend/src/auth`: JWT Login/Register and Roles Guard.
*   `/backend/src/chat`: WebSocket Gateway for real-time messaging and AI interaction.
*   `/backend/src/rooms`: CRUD endpoints for Rooms.
*   `/backend/src/analytics`: Analytics data aggregation using Prisma.

## 💡 Planned Enhancements
*   Live Multi-cursor Code View capabilities.

---

## ☁️ Deployment Guide

### Deploying the Backend on Render
1. Go to [Render.com](https://render.com) and create a new **Web Service**.
2. Connect this GitHub repository.
3. Configure the following matching the repository setup:
   *   **Root Directory:** `backend`
   *   **Environment:** `Node`
   *   **Build Command:** `npm ci && npm run build`
   *   **Start Command:** `npm run start:prod`
4. In the **Environment Variables** section, add the following missing secrets:
   *   `DATABASE_URL`: Set this to your PostgreSQL database URL (you can provision a free Postgres instance directly on Render first).
   *   `JWT_SECRET`: Generate a random long string.
   *   `JWT_REFRESH_SECRET`: Generate a random long string.
   *   `OPENAI_API_KEY`: Add your provider API keys.
5. Deploy!

### Deploying the Frontend on Vercel
1. Go to [Vercel.com](https://vercel.com) and create a new project.
2. Import this GitHub repository.
3. Configure the following:
   *   **Framework Preset:** `Vite`
   *   **Root Directory:** `./` (Root)
4. Open the **Environment Variables** tab and add the following:
   *   `VITE_API_URL`: The URL of your **Render Backend** (e.g., `https://devsync-ai.onrender.com`).
5. Deploy! Vercel will automatically build the React Vite application and hook the API.