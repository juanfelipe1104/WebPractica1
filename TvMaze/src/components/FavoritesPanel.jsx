import { FaStar, FaTimes } from "react-icons/fa"

export default function FavoritesPanel({ favorites, onToggleFavorite, onOpenDetail }) {
    if (!favorites.length) return null;

    return (
        <section className="panel">
            <h3> <FaStar/> Favoritas</h3>

            <div className="favorites">
                {favorites.map((fav) => (
                    <button
                        key={fav.id}
                        className="favorite"
                        onClick={() => onOpenDetail(fav.id)}
                    >
                        {fav.name}
                        <span
                            className="favorite-remove"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(fav);
                            }}
                        >
                            <FaTimes/>
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}