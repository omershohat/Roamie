import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/page";
import About from "./pages/About/page";
import Signin from "./pages/SignIn/page";
import Signup from "./pages/SignUp/page";
import Profile from "./pages/MyTrips/page";
import TripHub from "./pages/TripHub/page";

function App() {
  return (
    <div className="bg-amber-50 h-fit">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/SignIn" element={<Signin />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/MyTrips" element={<Profile />} />

          {/* Trip Hub */}
          <Route path="/trips/:tripId" element={<TripHub />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
