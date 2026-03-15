export interface IFilm {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  status: "izlendi" | "izlenecek";
}
