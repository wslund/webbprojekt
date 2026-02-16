import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { HorsesPage } from "./pages/HorsesPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { ContactPage } from "./pages/ContactPage";

// Admin
import { useAuth } from "./admin/AuthContext";
import { LoginPage } from "./admin/LoginPage";
import { AdminLayout } from "./admin/AdminLayout";
import { AdminDashboard } from "./admin/AdminDashboard";
import { AdminHorses } from "./admin/AdminHorses";
import { AdminNews } from "./admin/AdminNews";
import { AdminMessages } from "./admin/AdminMessages";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/hastar" element={<HorsesPage />} />
          <Route path="/nyheter" element={<NewsPage />} />
          <Route path="/nyheter/:slug" element={<NewsDetailPage />} />
          <Route path="/kontakt" element={<ContactPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route index element={<AdminDashboard />} />
            <Route path="hastar" element={<AdminHorses />} />
            <Route path="nyheter" element={<AdminNews />} />
            <Route path="meddelanden" element={<AdminMessages />} />
          </Route>
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
};

export default App;
