import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Stocks from "./pages/Stocks";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/stocks" element={<Stocks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
