import { IFilm } from "../interfaces/IFilm";

interface Props {
  film: IFilm;
  onEdit: (film: IFilm) => void;
  onDelete: (id: number) => void;
}

export default function FilmCard({ film, onEdit, onDelete }: Props) {
  function getRatingColor(rating: number): string {
    if (rating >= 8) return "success";
    if (rating >= 5) return "warning";
    return "danger";
  }

  return (
    <div className="col-md-6 col-lg-4 mb-3">
      <div className="card h-100 shadow-sm">

        <div className={`card-header ${film.status === "izlendi" ? "bg-success" : "bg-secondary"} text-white`}>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold text-truncate">{film.title}</span>
            <span className="badge bg-light text-dark ms-2">{film.year}</span>
          </div>
        </div>

        <div className="card-body">
          <p className="card-text mb-1">
            <span className="fw-bold">Yönetmen:</span> {film.director}
          </p>

          <p className="card-text mb-1">
            <span className="fw-bold">Tür:</span>{" "}
            <span className="badge bg-info text-dark">{film.genre}</span>
          </p>

          <p className="card-text mb-1">
            <span className="fw-bold">⭐ Puan:</span>{" "}
            <span className={`badge bg-${getRatingColor(film.rating)}`}>
              {film.rating} / 10
            </span>
          </p>

          <p className="card-text mb-0">
            <span className="fw-bold">Durum:</span>{" "}
            {film.status === "izlendi" ? "İzlendi" : "İzlenecek"}
          </p>
        </div>

        <div className="card-footer d-flex gap-2">
          <button
            className="btn btn-warning btn-sm w-50"
            onClick={() => onEdit(film)}
          >
           Düzenle
          </button>
          <button
            className="btn btn-danger btn-sm w-50"
            onClick={() => onDelete(film.id)}
          >
            Sil
          </button>
        </div>

      </div>
    </div>
  );
}
