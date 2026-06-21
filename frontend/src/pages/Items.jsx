import React, { useEffect, useState } from "react";
import API, { getAuthHeader } from "../api/api";

function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const filteredItems = items.filter(
  (item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
);
  const fetchItems = async () => {
    try {
      const res = await API.get("/items", getAuthHeader());
      setItems(res.data);
    } catch (err) {
      console.log(
        "Error fetching items:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ DELETE FUNCTION
  const deleteItem = async (id) => {
    try {
      await API.delete(`/items/${id}`, getAuthHeader());
      fetchItems();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Not allowed to delete this item");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h4>Loading items...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        📦 Lost & Found Items
      </h2>
<div className="mb-4">
  <input
    type="text"
    className="form-control form-control-lg"
    placeholder="🔍 Search items..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
      {filteredItems.length === 0 ? (
        <h5 className="text-center">No items available</h5>
      ) : (
        <div className="row">
          {filteredItems.map((item) => (
            <div className="col-md-4 mb-3" key={item._id}>
              <div className="card shadow-sm">

                {item.image && (
  <img
    src={`http://localhost:5000/uploads/${item.image}`}
    className="card-img-top"
    alt={item.itemName}
    style={{
      width: "100%",
      height: "250px",
      objectFit: "contain",
      backgroundColor: "#f8f9fa"
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

                  <span
                    className={
                      item.status === "Lost"
                        ? "badge bg-danger"
                        : "badge bg-success"
                    }
                  >
                    {item.status}
                  </span>

                  <hr />

                  <p className="text-muted">
                    Posted by:{" "}
                    {item.createdBy?.name || "Unknown"}
                  </p>

                  {/* ✅ DELETE BUTTON (ONLY OWNER/ADMIN WILL BE CHECKED BY BACKEND) */}
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete Item
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;