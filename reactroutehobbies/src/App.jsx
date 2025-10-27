import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hobbies from "./pages/Hobbies";
import HobbyDetail from "./pages/HobbyDetail";
import About from "./pages/About";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hobbies" element={<Hobbies />} />
      <Route path="/hobbies/:id" element={<HobbyDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default App;
