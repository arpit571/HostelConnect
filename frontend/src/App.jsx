import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Complaint from "./pages/Complaint";
import Notices from "./pages/Notices";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Redirect "/" to Login */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Shared Layout */}
          <Route element={<Layout />}>

            <Route
              path="/student"
              element={<StudentDashboard />}
            />

            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/complaints"
              element={<Complaint />}
            />

            <Route
              path="/notices"
              element={<Notices />}
            />

          </Route>

        </Route>

        {/* 404 Page */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;