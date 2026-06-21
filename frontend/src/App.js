import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import Items from "./pages/Items";
import MyClaims from "./pages/MyClaims";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  <Link className="navbar-brand fw-bold" to="/">
    🔍 Lost & Found
  </Link>

  <div className="ms-auto d-flex gap-3">
    <Link className="nav-link text-white" to="/">Home</Link>
    <Link className="nav-link text-white" to="/items">Items</Link>
    <Link className="nav-link text-white" to="/add-item">Add</Link>

    {!localStorage.getItem("token") ? (
      <>
        <Link className="nav-link text-warning" to="/login">Login</Link>
        <Link className="nav-link text-success" to="/signup">Signup</Link>
      </>
    ) : (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    )}
  </div>
</nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />
        <Route path="/items" element={<Items />} />
        <Route path="/my-claims" element={<MyClaims />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;