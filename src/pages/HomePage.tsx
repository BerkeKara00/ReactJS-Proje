import { useState } from "react";
import { IFilm } from "../interfaces/IFilm";
import FilmForm from "../components/FilmForm";
import FilmList from "../components/FilmList";
import FilterBar from "../components/FilterBar";
import StatsBar from "../components/StatsBar";


const baslangicFilmleri: IFilm[] = [
  { id: 1, title: "Inception",      director: "Christopher Nolan",   year: 2010, genre: "Bilim Kurgu", rating: 9,  status: "izlendi"   },
  { id: 2, title: "The Godfather",  director: "Francis Ford Coppola", year: 1972, genre: "Dram",        rating: 10, status: "izlendi"   },
  { id: 3, title: "Dune: Part Two", director: "Denis Villeneuve",     year: 2024, genre: "Bilim Kurgu", rating: 8,  status: "izlenecek" },
  { id: 4, title: "Parasite",       director: "Bong Joon-ho",         year: 2019, genre: "Gerilim",     rating: 9,  status: "izlendi"   },
];

export default function HomePage() {
  const [filmler, setFilmler]           = useState<IFilm[]>(baslangicFilmleri);
  const [formAcik, setFormAcik]         = useState(false);
  const [duzenlenecekFilm, setDuzenlenecekFilm] = useState<IFilm | null>(null);
  const [aramaMetni, setAramaMetni]     = useState("");
  const [statusFiltre, setStatusFiltre] = useState("hepsi");

  function handleSave(film: IFilm) {
    if (duzenlenecekFilm) {
      const guncellenmis = filmler.map((f) => (f.id === film.id ? film : f));
      setFilmler(guncellenmis);
    } else {
      setFilmler([film, ...filmler]);
    }

    setFormAcik(false);
    setDuzenlenecekFilm(null);
  }

  function handleDelete(id: number) {
    const onay = window.confirm("Bu filmi silmek istediğine emin misin?");
    if (!onay) return;

    const kalanFilmler = filmler.filter((f) => f.id !== id);
    setFilmler(kalanFilmler);
  }

  function handleEdit(film: IFilm) {
    setDuzenlenecekFilm(film);
    setFormAcik(true);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancel() {
    setFormAcik(false);
    setDuzenlenecekFilm(null);
  }

  const filtrelenmisFilmler = filmler.filter((film) => {
    const aramaUyuyor =
      film.title.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      film.director.toLowerCase().includes(aramaMetni.toLowerCase());

    const statusUyuyor =
      statusFiltre === "hepsi" || film.status === statusFiltre;

    return aramaUyuyor && statusUyuyor;
  });

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">Film Listem</h1>
          <p className="text-muted mb-0">Kişisel film kütüphanesi</p>
        </div>
        {!formAcik && (
          <button
            className="btn btn-primary"
            onClick={() => setFormAcik(true)}
          >
            Film Ekle
          </button>
        )}
      </div>

      {formAcik && (
        <FilmForm
          editingFilm={duzenlenecekFilm}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <StatsBar films={filmler} />

      <FilterBar
        search={aramaMetni}
        statusFilter={statusFiltre}
        onSearchChange={setAramaMetni}
        onStatusChange={setStatusFiltre}
      />

      <p className="text-muted mb-2">
        {filtrelenmisFilmler.length} film gösteriliyor
      </p>

      <FilmList
        films={filtrelenmisFilmler}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}
