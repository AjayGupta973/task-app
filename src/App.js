import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  return (
    <div style={appStyles.app}>
      <div
        style={{
          ...appStyles.scrollGradient,
          ...scrollProgress > 0 && appStyles.scrollGradientVisible,
        }}
      />
      <Header />
      <main style={appStyles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={
            <div style={{
              padding: "100px 24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "24px",
            }}>
              Page not found. <a href="/">Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;


const appStyles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  main: {
    flex: 1,
    paddingTop: "20px",
    paddingBottom: "140px",
    maxWidth: "1600px",
    margin: "0 auto",
    width: "100%",
  },
  scrollGradient: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #10b981 100%)",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
    zIndex: 9999,
  },
  scrollGradientVisible: {
    transform: "translateX(0)",
  },
};