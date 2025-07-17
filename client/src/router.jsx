import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UpdateUser from "./pages/UpdateUser";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🟢 Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* 🟠 Auth Pages and Protected Routes inside Layout */}
      <Route path="/" element={<Layout />}>
        {/* Public Auth Pages */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="update/:id"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);
