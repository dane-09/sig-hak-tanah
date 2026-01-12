const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "HakTanahPekanbaru.json");

const readJSON = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeJSON = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET ALL
app.get("/hak-tanah/all", (req, res) => {
  try {
    res.json(readJSON());
  } catch (err) {
    res.status(500).json({ message: "Gagal membaca data" });
  }
});

// CREATE
app.post("/hak-tanah", (req, res) => {
  try {
    const data = readJSON();
    const { TIPEHAK, Kecamatan } = req.body.properties;

    const newFeature = {
      id: Date.now(),
      type: "Feature",
      geometry: req.body.geometry,
      properties: {
        FID: data.features.length > 0 ? Math.max(...data.features.map(f => f.properties.FID || 0)) + 1 : 1,
        TIPEHAK: TIPEHAK,
        Kecamatan: Kecamatan
      }
    };

    data.features.push(newFeature);
    writeJSON(data);
    res.json({ message: "Berhasil simpan", data: newFeature });
  } catch (err) {
    res.status(500).json({ message: "Gagal simpan" });
  }
});

// DELETE
app.delete("/hak-tanah/:id", (req, res) => {
  try {
    const data = readJSON();
    data.features = data.features.filter((f) => f.id !== parseInt(req.params.id));
    writeJSON(data);
    res.json({ message: "Berhasil hapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal hapus" });
  }
});

app.listen(PORT, () => console.log(`🚀 API: http://localhost:${PORT}`));