import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthPage from "./AuthPage.jsx";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("mockUser");
  return user ? children : <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
