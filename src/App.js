import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductList from "./pages/ProductList";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const handleCreatedUser = () => {
  };

  const handleLogin = () => {
  };

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RegisterPage" element={<RegisterPage onCreatedUser={handleCreatedUser} />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
