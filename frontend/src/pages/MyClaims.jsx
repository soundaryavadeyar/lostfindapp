import React, { useEffect, useState } from "react";
import API, { getAuthHeader } from "../api/api";

function MyClaims() {
  const [items, setItems] = useState([]);

  const fetchClaims = async () => {
    try {
      const res = await API.get(
        "/items/my-claims",
        getAuthHeader()
      );

      setItems(res.data);
    } catch (err) {
      console.log(
        "Error:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        ⭐ My Claimed Items
      </h2>

      <div className="row">
        {items.length === 0 ? (
          <div className="text-center">
            <h5>No claimed items yet</h5>
          </div>
        ) : (
          items.map((item) => (
            <div
              className="col-md-4 mb-3"
              key={item._id}
            >
              <div className="card shadow-sm">

                {item.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    className="card-img-top"
                    alt={item.itemName}
                    style={{
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">
                    {item.itemName}
                  </h5>

                  <p className="card-text">
                    {item.description}
                  </p>

                  <p>
                    📍 <strong>{item.location}</strong>
                  </p>

                  <p>
                    Status:{" "}
                    <span className="badge bg-success">
                      Claimed
                    </span>
                  </p>

                  <hr />

                  <p className="text-muted">
                    Owner:{" "}
                    {item.createdBy?.name || "Unknown"}
                  </p>

                  <p className="text-muted">
                    Email:{" "}
                    {item.createdBy?.email || "N/A"}
                  </p>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyClaims;