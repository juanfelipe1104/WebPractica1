import { FaStar, FaRegStar, FaCalendarAlt } from "react-icons/fa";

export default function SeriesCard({ show, isFavorite, onToggleFavorite, onOpenDetail }) {
	if (!show) return null;

	const {
		name,
		image,
		genres = [],
		rating,
		premiered,
	} = show;

	const genreLine = genres.slice(0, 3).join(" · ");

	return (
		<div className="card">
			<button className="thumb" onClick={() => onOpenDetail(show.id)}>
				{image ? (
					<img src={image} alt={`Póster de ${name}`} />
				) : (
					<div className="placeholder">Sin imagen</div>
				)}
			</button>

			<div className="card-body">
				<h4>{name}</h4>
				{genreLine && <p className="muted">{genreLine}</p>}

				<div className="row">
					{rating != null && (
						<span className="badge">
							<FaStar /> {rating}
						</span>
					)}

					{premiered && (
						<span className="badge">
							<FaCalendarAlt /> {premiered}
						</span>
					)}
				</div>

				<button
					className={`fav ${isFavorite ? "is-fav" : ""}`}
					onClick={() => onToggleFavorite(show)}
				>
					{isFavorite ? <FaStar /> : <FaRegStar />} Favorito
				</button>
			</div>
		</div>
	);
}
