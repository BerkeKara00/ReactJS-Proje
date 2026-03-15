interface Props {
  search: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function FilterBar({ search, statusFilter, onSearchChange, onStatusChange }: Props) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-2 align-items-center">

          
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Film veya yönetmen ara..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          
          <div className="col-md-4">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="hepsi">Tümü</option>
              <option value="izlendi">İzlendi</option>
              <option value="izlenecek">İzlenecek</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}
