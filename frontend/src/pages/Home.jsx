import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-bg">
      <div className="container py-5">

        {/* Hero Section */}
        <div className="home-hero text-center">

          <div className="icon-box">🔍</div>

          <h1>Smart Lost & Found</h1>

          <p>
            Report lost items, upload found items, search belongings,
            and help people recover their valuables.
          </p>

          <div className="mt-4">
            {token ? (
              <>
                <span className="badge bg-success p-2">
                  ✅ Logged In
                </span>

                <br />

                <button
                  className="btn btn-danger mt-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="row mt-5">

          <div className="col-md-4">
            <div className="feature-card">
              <h3>📦 Report Lost Items</h3>
              <p>
                Add lost item details with images and location.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <h3>🔎 Search Items</h3>
              <p>
                Browse all lost and found items easily.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <h3>🤝 Claim Items</h3>
              <p>
                Claim an item securely if it belongs to you.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;