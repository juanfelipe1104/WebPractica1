const API_BASE = "https://api.tvmaze.com";

// Busca series por nombre
export async function searchShows(query) {
	const result = await fetch(
		`${API_BASE}/search/shows?q=${encodeURIComponent(query)}`
	);

	if (!result.ok) {
		throw new Error("Error buscando series");
	}

	const data = await result.json();

	// Devolvemos un array con el formato esperado
	return data.map((d) => {
		const show = d.show;
		return {
			id: show.id,
			name: show.name,
			language: show.language,
			genres: show.genres || [],
			image: show.image?.medium || show.image?.original || null,
			premiered: show.premiered || null,
			rating: show.rating?.average ?? null,
			summary: show.summary || "",
		};
	});
}

// Detalle de una serie (incluye episodios y reparto)
export async function fetchShowDetail(id) {
	const url = `${API_BASE}/shows/${id}?embed[]=episodes&embed[]=cast`;

	const result = await fetch(url);
	if (!result.ok) {
		throw new Error("Error cargando detalle");
	}

	const serie = await result.json();

	return {
		id: serie.id,
		name: serie.name,
		image: serie.image?.original || serie.image?.medium || null,
		genres: serie.genres || [],
		language: serie.language,
		status: serie.status,
		runtime: serie.averageRuntime,
		rating: serie.rating?.average ?? null,
		premiered: serie.premiered,
		ended: serie.ended,
		officialSite: serie.officialSite || serie.url,
		summary: serie.summary || "",
		episodes: serie._embedded?.episodes || [],
		cast: serie._embedded?.cast || [],
	};
}
