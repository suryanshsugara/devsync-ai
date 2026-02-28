import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// DEMO MODE: Auto-auth enabled
localStorage.setItem('access_token', 'mock-demo-token');
localStorage.setItem('user', JSON.stringify({
  id: 1,
  email: "demo@devsync.com",
  role: "admin"
}));

const path = window.location.pathname;
if (path === '/' || path === '/auth') {
  window.location.replace('/dashboard');
}

createRoot(document.getElementById("root")!).render(<App />);