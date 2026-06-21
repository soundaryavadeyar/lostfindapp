import React, { useEffect, useState } from "react";
import axios from "axios";

function LostItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/items");
      setItems(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">📋 Lost Items</h1>

      <input
        className="form-control mb-4"
        type="text"
        placeholder="🔍 Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredItems.length === 0 ? (
          <p>No items found</p>
        ) : (
          filteredItems.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card shadow m-3">
                {item.image && (
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.itemName}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body">
                  <h4>{item.itemName}</h4>

                  <p>{item.description}</p>

                  <p>📍 {item.location}</p>

                  <span
                    className={
                      item.status === "Lost"
                        ? "badge bg-danger"
                        : "badge bg-success"
                    }
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LostItems;