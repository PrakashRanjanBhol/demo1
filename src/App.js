// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/AppLayout/AppLayout";
import InactivityHandler from "./components/InactivityHandler/InactivityHandler";
import MyAppRoutes from "./components/MyAppRoutes";
import { ToastProvider } from "./context/Toast/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated root /myapp */}
          <Route
            path="/myapp/*"
            element={
              <ProtectedRoute>
                <InactivityHandler>
                  <AppLayout>
                    <MyAppRoutes />
                  </AppLayout>
                </InactivityHandler>
              </ProtectedRoute>
            }
          />

          {/* Default fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
