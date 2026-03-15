# 🎬 Film Listem

React + TypeScript + Bootstrap ile yapılmış basit film takip uygulaması.

## 📁 Klasör Yapısı

```
film-junior/
├── src/
│   ├── components/
│   │   ├── FilmForm.tsx      # Ekle & Güncelle formu
│   │   ├── FilmCard.tsx      # Tek film kartı
│   │   ├── FilmList.tsx      # Film kartlarını listeler
│   │   ├── FilterBar.tsx     # Arama ve durum filtresi
│   │   └── StatsBar.tsx      # İstatistik kartları
│   ├── pages/
│   │   └── HomePage.tsx      # Ana sayfa – tüm CRUD işlemleri burada
│   └── interfaces/
│       └── IFilm.ts          # Film veri tipi
├── server/
│   └── index.js              # Express backend
└── index.html                # Bootstrap CDN burada
```

## 🚀 Çalıştırma

### Frontend
```bash
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd server
npm install
node index.js
# → http://localhost:3001
```

## 🔌 API

| Method | Endpoint          | Ne yapar?       |
|--------|-------------------|-----------------|
| GET    | /api/filmler      | Filmleri listele |
| POST   | /api/filmler      | Yeni film ekle  |
| PUT    | /api/filmler/:id  | Filmi güncelle  |
| DELETE | /api/filmler/:id  | Filmi sil       |
