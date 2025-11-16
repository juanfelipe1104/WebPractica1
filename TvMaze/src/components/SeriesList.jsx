import Serie from "./Serie.jsx";


export default function SeriesList({ shows, favorites, onToggleFavorite, onOpenDetail }) {
    // shows: array de objetos show: { id, name, image, genres:[], rating, premiered }
    // favorites: array de objetos favorite: { id, name, image }
    if (shows.length === 0) {
        return (
            <div className="empty">
                <h3>Sin resultados</h3>
                <p className="muted">Prueba con otro término de búsqueda.</p>
            </div>
        );
    }

    const favIds = new Set(favorites.map((f) => f.id));

    return (
        <div className="cardList">
            {shows.map((s) => (
                <div key={s.id}>
                    <Serie
                        show={s}
                        isFavorite={favIds.has(s.id)}
                        onToggleFavorite={onToggleFavorite}
                        onOpenDetail={onOpenDetail}
                    />
                </div>
            ))}
        </div>
    );
}