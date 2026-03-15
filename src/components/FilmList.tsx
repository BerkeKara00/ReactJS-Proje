import { IFilm } from "../interfaces/IFilm";
import FilmCard from "./FilmCard";

interface Props {
  films: IFilm[];
  onEdit: (film: IFilm) => void;
  onDelete: (id: number) => void;
}

export default function FilmList({ films, onEdit, onDelete }: Props) {
  
  if (films.length === 0) {
    return (
      <div className="alert alert-info text-center mt-3">
        Henüz hiç film eklenmedi. Yukarıdan film ekleyebilirsin!
      </div>
    );
  }

  return (
    <div className="row">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
