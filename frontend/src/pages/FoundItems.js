import React, { useEffect, useState } from "react";
import API, { getAuthHeader } from "../api/api";

const BASE_URL = "http://localhost:5000";

function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔄 FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await API.get("/items", getAuthHeader());

      const foundItems = res.data.filter(
        (item) => item.status === "Found"
      );

      setItems(foundItems);
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert("Failed to fetch found items");
    }
  };

  // 🗑 DELETE ITEM
  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/items/${id}`, getAuthHeader());
      fetchItems(); // refresh list
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("You are not allowed to delete this item");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎉 Found Items</h2>

      <div className="row">
        {items.length === 0 ? (
          <div className="text-center">
            <h5>No found items available</h5>
          </div>
        ) : (
          items.map((item) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card shadow-sm">

                {/* 🖼 IMAGE */}
                {item.image?.trim() && (
                  <img
                    src={`${BASE_URL}/uploads/${item.image}`}
                    className="card-img-top"
                    alt={item.itemName}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>

                  <p className="card-text">{item.description}</p>

                  <p>
                    📍 <strong>{item.location}</strong>
                  </p>

                  <span className="badge bg-success">Found</span>

                  <hr />

                  <p className="text-muted">
                    Posted By: {item.createdBy?.name || "Unknown"}
                  </p>

                  {/* 🗑 DELETE BUTTON */}
                  <button
                    className="btn btn-danger btn-sm mt-2 w-100"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoundItems;