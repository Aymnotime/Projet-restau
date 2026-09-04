import { useEffect, type ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingOrder from "./components/FloatingOrder";
import { OrderProvider } from "./components/OrderContext";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Histoire from "./pages/Histoire";
import Restaurant from "./pages/Restaurant";
import Contact from "./pages/Contact";
import Mentions from "./pages/Mentions";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function Page({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.main
      className="page-surface"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function Shell() {
  const location = useLocation();
  return (
    <div className="grain relative min-h-screen bg-coal text-cream">
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/menu" element={<Page><MenuPage /></Page>} />
          <Route path="/notre-histoire" element={<Page><Histoire /></Page>} />
          <Route path="/restaurant" element={<Page><Restaurant /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/mentions-legales" element={<Page><Mentions /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingOrder />
      <div className="h-16 md:hidden" aria-hidden />
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </OrderProvider>
  );
}
