const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
const LIMIT = 10;

// middleware
app.use(cors());
app.use(express.json());

// path ke file json
const DATA_FILE = path.join(__dirname, "data", "hak_tanah_fix.json");

/* ===============================
   HELPER
================================ */
const readJSON = () => {
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

const writeJSON = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};


app.get("/hak-tanah/all", (req, res) => {
  try {
    const data = readJSON();
    res.json(data); 
  } catch (err) {
    res.status(500).json({ message: "Gagal membaca data" });
  }
});


app.get("/hak-tanah", (req, res) => {
  try {
    const data = readJSON();
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    res.json({
      page,
      limit: LIMIT,
      totalData: data.features.length,
      totalPages: Math.ceil(data.features.length / LIMIT),
      features: data.features.slice(startIndex, endIndex),
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal membaca data" });
  }
});

/* ===============================
   CREATE
================================ */
app.post("/hak-tanah", (req, res) => {
  try {
    const data = readJSON();

    const newFeature = {
      id: Date.now(),
      type: "Feature",
      properties: req.body.properties,
      geometry: req.body.geometry,
    };

    data.features.push(newFeature);
    writeJSON(data);

    res.json({ message: "Data berhasil ditambahkan", data: newFeature });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah data" });
  }
});

/* ===============================
   UPDATE
================================ */
app.put("/hak-tanah/:id", (req, res) => {
  try {
    const data = readJSON();
    const id = parseInt(req.params.id);

    const index = data.features.findIndex((f) => f.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    data.features[index] = {
      ...data.features[index],
      properties: req.body.properties,
      geometry: req.body.geometry,
    };

    writeJSON(data);
    res.json({ message: "Data berhasil diupdate" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update data" });
  }
});

/* ===============================
   DELETE
================================ */
app.delete("/hak-tanah/:id", (req, res) => {
  try {
    const data = readJSON();
    const id = parseInt(req.params.id);

    data.features = data.features.filter((f) => f.id !== id);
    writeJSON(data);

    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus data" });
  }
});

/* ===============================
   SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 API berjalan di http://localhost:${PORT}`);
});
