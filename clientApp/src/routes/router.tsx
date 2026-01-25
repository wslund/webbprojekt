// src/routes/router.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { HorsesPage } from "../pages/HorsesPage";
import { ContactPage } from "../pages/ContactPage";
import { NewsPage } from "../pages/NewsPage";
import { NewsDetailPage } from "../pages/NewsDetailPage";
import { AdminLoginPage } from "../pages/AdminLoginPage";
import { AdminPage } from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: paths.about, element: <AboutPage /> },
      { path: paths.horses, element: <HorsesPage /> },
      { path: paths.contact, element: <ContactPage /> },

      { path: paths.news, element: <NewsPage /> },
      { path: paths.newsDetail, element: <NewsDetailPage /> },

      { path: paths.adminLogin, element: <AdminLoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: paths.admin, element: <AdminPage /> }],
      },
    ],
  },
]);
