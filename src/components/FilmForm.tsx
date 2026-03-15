import { useState } from "react";
import { IFilm } from "../interfaces/IFilm";

interface Props {
  editingFilm: IFilm | null;
  onSave: (film: IFilm) => void;
  onCancel: () => void;
}

const GENRES = ["Aksiyon", "Dram", "Komedi", "Korku", "Bilim Kurgu", "Animasyon", "Gerilim"];

export default function FilmForm({ editingFilm, onSave, onCancel }: Props) {
  const [title, setTitle]       = useState(editingFilm?.title     ?? "");
  const [director, setDirector] = useState(editingFilm?.director  ?? "");
  const [year, setYear]         = useState(editingFilm?.year      ?? 2024);
  const [genre, setGenre]       = useState(editingFilm?.genre     ?? "Dram");
  const [rating, setRating]     = useState(editingFilm?.rating    ?? 5);
  const [status, setStatus]     = useState(editingFilm?.status    ?? "izlenecek");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Film adı boş olamaz!");
      return;
    }
    if (!director.trim()) {
      alert("Yönetmen boş olamaz!");
      return;
    }

    const film: IFilm = {
      id: editingFilm?.id ?? Date.now(), 
      title: title.trim(),
      director: director.trim(),
      year,
      genre,
      rating,
      status,
    };

    onSave(film);
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {editingFilm ? "Filmi Düzenle" : "Yeni Film Ekle"}
        </h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-bold">Film Adı</label>
            <input
              type="text"
              className="form-control"
              placeholder="Örn: Inception"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="row mb-3">
            <div className="col-8">
              <label className="form-label fw-bold">Yönetmen</label>
              <input
                type="text"
                className="form-control"
                placeholder="Örn: Christopher Nolan"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label fw-bold">Yıl</label>
              <input
                type="number"
                className="form-control"
                min={1888}
                max={2030}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Tür</label>
            <select
              className="form-select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Puan: <span className="text-primary">{rating} / 10</span>
            </label>
            <input
              type="range"
              className="form-range"
              min={1}
              max={10}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Durum</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="izlendi"
                  value="izlendi"
                  checked={status === "izlendi"}
                  onChange={() => setStatus("izlendi")}
                />
                <label className="form-check-label" htmlFor="izlendi">
                  İzlendi
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="izlenecek"
                  value="izlenecek"
                  checked={status === "izlenecek"}
                  onChange={() => setStatus("izlenecek")}
                />
                <label className="form-check-label" htmlFor="izlenecek">
                 İzlenecek
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {editingFilm ? "Güncelle" : "Ekle"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              İptal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
