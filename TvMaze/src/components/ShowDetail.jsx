import { FaStar, FaTv, FaClock, FaCalendarAlt, FaFlagCheckered } from "react-icons/fa";

export default function ShowDetail({ detail }) {
	if (!detail) return null;

	const {
		name,
		image,
		genres = [],
		language,
		status,
		runtime,
		rating,
		premiered,
		ended,
		officialSite,
		summary = "",
		episodes = [],
		cast = [],
	} = detail;

	const topEpisodes = episodes.slice(0, 15);
	const topCast = cast.slice(0, 8);
	const metaLine = [language, ...genres].filter(Boolean).join(" · ");
	return (
		<div className="detail">
			<header className="detail-header">
				{image ? (
					<img src={image} alt={`Póster de ${name}`} />
				) : (
					<div className="placeholder lg">Sin imagen</div>
				)}
				<div>
					<h2 id="show-detail-title">{name}</h2>
					{metaLine && <p className="muted">{metaLine}</p>}
					<div className="row">
						{rating != null && (
							<span className="badge">
								<FaStar /> {rating}
							</span>
						)}

						{status && (
							<span className="badge">
								<FaTv /> {status}
							</span>
						)}

						{runtime && (
							<span className="badge">
								<FaClock /> {runtime} min
							</span>
						)}

						{premiered && (
							<span className="badge">
								<FaCalendarAlt /> {premiered}
							</span>
						)}

						{ended && (
							<span className="badge">
								<FaFlagCheckered /> {ended}
							</span>
						)}
					</div>

					{officialSite && (
						<p>
							<a href={officialSite} target="_blank">
								Sitio oficial
							</a>
						</p>
					)}
				</div>
			</header>

			{summary && (
				<section className="summary">
					<div dangerouslySetInnerHTML={{ __html: summary }} />
				</section>
			)}

			{topEpisodes.length > 0 && (
				<section>
					<h3>Episodios ({episodes.length})</h3>
					<ul className="list">
						{topEpisodes.map((e) => (
							<li key={e.id}>
								{formatEpCode(e)} — {e.name}
							</li>
						))}
					</ul>
				</section>
			)}

			{topCast.length > 0 && (
				<section>
					<h3>Reparto</h3>
					<ul className="list">
						{topCast.map((c, i) => (
							<li key={i}>
								{c.person?.name ? c.person.name : "—"}
								{c.character?.name ? ` como ${c.character.name}` : ""}
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	);
}

function formatEpCode(e) {
	const s = e.season != null ? String(e.season).padStart(2, "0") : "??";
	const n = e.number != null ? String(e.number).padStart(2, "0") : "??";
	return `S${s}E${n}`;
}
