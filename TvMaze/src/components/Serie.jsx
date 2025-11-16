import { FaStar, FaRegStar, FaCalendarAlt } from "react-icons/fa";

export default function Serie({ show, isFavorite, onToggleFavorite, onOpenDetail }) {
    // show: { id, name, image, genres:[], rating, premiered }
    return (
        <div className="card">
            <button
                className="thumb"
                onClick={() => onOpenDetail(show.id)}
            >
                {show.image ? (
                    <img src={show.image} alt={`Póster de ${show.name}`} />
                ) : (
                    <div className="placeholder">Sin imagen</div>
                )}
            </button>

            <div className="card-body">
                <h4>{show.name}</h4>
                {show.genres.length > 0 && (
                    <p className="muted">{show.genres.slice(0, 3).join(" · ")}</p>
                )}

                <div className="row">
                    {show.rating != null && (
                        <span className="badge">
                            <FaStar /> {show.rating}
                        </span>
                    )}

                    {show.premiered && (
                        <span className="badge">
                            <FaCalendarAlt /> {show.premiered}
                        </span>
                    )}
                </div>

                <div className="row">
                    <button
                        className={"fav " + (isFavorite ? "is-fav" : "")}
                        onClick={() => onToggleFavorite(show)}
                    >
                        {isFavorite ? (
                            <>
                                <FaStar /> Favorito
                            </>
                        ) : (
                            <>
                                <FaRegStar /> Favorito
                            </>
                        )}
                    </button>

                    <button onClick={() => onOpenDetail(show.id)}>Ver detalle</button>
                </div>

            </div>
        </div>
    );
}
