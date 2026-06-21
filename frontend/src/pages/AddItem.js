import React, { useState } from "react";
import API from "../api/api";

function AddItem() {
  const [item, setItem] = useState({
    itemName: "",
    description: "",
    location: "",
    status: "Lost",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();

    formData.append("itemName", item.itemName);
    formData.append("description", item.description);
    formData.append("location", item.location);
    formData.append("status", item.status);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await API.post(
        "/items",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Item Added Successfully!");

      setItem({
        itemName: "",
        description: "",
        location: "",
        status: "Lost",
      });

      setImage(null);

      const fileInput = document.getElementById("imageInput");
      if (fileInput) {
        fileInput.value = "";
      }

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to add item"
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Lost / Found Item</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            className="form-control"
            value={item.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={item.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={item.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={item.status}
            onChange={handleChange}
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Upload Image</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;