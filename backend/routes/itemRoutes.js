const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const verifyToken = require("../middleware/auth");

const multer = require("multer");
const path = require("path");

// ======================
// MULTER CONFIG (IMAGE UPLOAD)
// ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ======================
// GET ALL ITEMS
// ======================
router.get("/", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// ADD ITEM (WITH IMAGE UPLOAD)
// ======================
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
      const item = new Item({
        itemName: req.body.itemName,
        description: req.body.description,
        location: req.body.location,
        status: req.body.status,
        image: req.file ? req.file.filename : null,
        createdBy: req.user.id
      });

      await item.save();
      res.status(201).json(item);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
);

// ======================
// CLAIM ITEM
// ======================
router.put("/claim/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.createdBy.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot claim your own item" });
    }

    if (item.claimed) {
      return res.status(400).json({ message: "Already claimed" });
    }

    item.claimed = true;
    item.claimedBy = req.user.id;

    await item.save();

    res.json({ message: "Item claimed successfully", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// MY CLAIMS
// ======================
router.get("/my-claims", verifyToken, async (req, res) => {
  try {
    const items = await Item.find({
      claimedBy: req.user.id
    }).populate("createdBy", "name email");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// DELETE ITEM
// ======================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (
      String(item.createdBy) !== String(req.user.id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;