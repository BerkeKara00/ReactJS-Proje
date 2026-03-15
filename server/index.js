const express = require("express");
const cors    = require("cors");

const app  = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ── Veritabanı yerine basit bir dizi kullanıyoruz ──
let filmler = [
  { id: 1, title: "Inception",      director: "Christopher Nolan",    year: 2010, genre: "Bilim Kurgu", rating: 9,  status: "izlendi"   },
  { id: 2, title: "The Godfather",  director: "Francis Ford Coppola", year: 1972, genre: "Dram",        rating: 10, status: "izlendi"   },
  { id: 3, title: "Dune: Part Two", director: "Denis Villeneuve",     year: 2024, genre: "Bilim Kurgu", rating: 8,  status: "izlenecek" },
  { id: 4, title: "Parasite",       director: "Bong Joon-ho",         year: 2019, genre: "Gerilim",     rating: 9,  status: "izlendi"   },
];

// GET /api/filmler → Tüm filmleri getir
app.get("/api/filmler", (req, res) => {
  res.json(filmler);
});

// POST /api/filmler → Yeni film ekle
app.post("/api/filmler", (req, res) => {
  const { title, director, year, genre, rating, status } = req.body;

  // Basit kontrol
  if (!title || !director) {
    return res.status(400).json({ hata: "Film adı ve yönetmen zorunludur." });
  }

  const yeniFilm = {
    id: Date.now(), // Basit bir id üretme yöntemi
    title,
    director,
    year: Number(year) || 2024,
    genre: genre || "Dram",
    rating: Number(rating) || 5,
    status: status || "izlenecek",
  };

  filmler.unshift(yeniFilm); // Listenin başına ekle
  res.status(201).json(yeniFilm);
});

// PUT /api/filmler/:id → Filmi güncelle
app.put("/api/filmler/:id", (req, res) => {
  const id    = Number(req.params.id);
  const index = filmler.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ hata: "Film bulunamadı." });
  }

  // Mevcut filmin üzerine yeni verileri yaz
  filmler[index] = { ...filmler[index], ...req.body, id };
  res.json(filmler[index]);
});

// DELETE /api/filmler/:id → Filmi sil
app.delete("/api/filmler/:id", (req, res) => {
  const id = Number(req.params.id);
  const oncekiSayi = filmler.length;

  filmler = filmler.filter((f) => f.id !== id);

  if (filmler.length === oncekiSayi) {
    return res.status(404).json({ hata: "Film bulunamadı." });
  }

  res.json({ mesaj: "Film başarıyla silindi." });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
  console.log("Mevcut endpoint'ler:");
  console.log("  GET    /api/filmler");
  console.log("  POST   /api/filmler");
  console.log("  PUT    /api/filmler/:id");
  console.log("  DELETE /api/filmler/:id");
});
