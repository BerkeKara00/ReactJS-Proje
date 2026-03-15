import { IFilm } from "../interfaces/IFilm";

interface Props {
  films: IFilm[];
}

export default function StatsBar({ films }: Props) {
  const toplam    = films.length;
  const izlendi   = films.filter((f) => f.status === "izlendi").length;
  const izlenecek = films.filter((f) => f.status === "izlenecek").length;

  
  const izlenenFilmler = films.filter((f) => f.status === "izlendi");
  const ortalamaPuan =
    izlenenFilmler.length === 0
      ? 0
      : (izlenenFilmler.reduce((toplam, f) => toplam + f.rating, 0) / izlenenFilmler.length).toFixed(1);

  return (
    <div className="row mb-4">

      <div className="col-6 col-md-3 mb-2">
        <div className="card text-center border-primary">
          <div className="card-body py-2">
            <h4 className="text-primary mb-0">{toplam}</h4>
            <small className="text-muted">Toplam Film</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-2">
        <div className="card text-center border-success">
          <div className="card-body py-2">
            <h4 className="text-success mb-0">{izlendi}</h4>
            <small className="text-muted">İzlendi</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-2">
        <div className="card text-center border-secondary">
          <div className="card-body py-2">
            <h4 className="text-secondary mb-0">{izlenecek}</h4>
            <small className="text-muted">İzlenecek</small>
          </div>
        </div>
      </div>

      <div className="col-6 col-md-3 mb-2">
        <div className="card text-center border-warning">
          <div className="card-body py-2">
            <h4 className="text-warning mb-0">⭐ {ortalamaPuan}</h4>
            <small className="text-muted">Ort. Puan</small>
          </div>
        </div>
      </div>

    </div>
  );
}
