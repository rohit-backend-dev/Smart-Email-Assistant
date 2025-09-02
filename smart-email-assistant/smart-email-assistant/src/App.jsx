import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SuccessPage from "./components/payment/SuccessPage";
import CancelPage from "./components/payment/CancelPage";

export default function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
