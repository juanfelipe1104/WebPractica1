import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import SeriesList from "./components/SeriesList.jsx";
import FavoritesPanel from "./components/FavoritesPanel.jsx";
import Modal from "./components/Modal.jsx";
import ShowDetail from "./components/ShowDetail.jsx";
import { searchShows, fetchShowDetail } from "./api/tvmaze.js";

// LocalStorage
const LS_KEY = "tvmaze_favorites_v1";

function loadFavorites() {
	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function saveFavorites(items) {
	try {
		localStorage.setItem(LS_KEY, JSON.stringify(items));
	} catch {

	}
}

export default function App() {
	// Búsqueda
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Favoritos
	const [favorites, setFavorites] = useState(() => loadFavorites());
	useEffect(() => {
		saveFavorites(favorites);
	}, [favorites]);

	// Modal de Detalle
	const [open, setOpen] = useState(false);
	const [detail, setDetail] = useState(null);
	const [detailLoading, setDetailLoading] = useState(false);
	const [detailError, setDetailError] = useState("");

	// Buscar series
	async function handleSearch() {
		if (!query) return;
		setLoading(true);
		setError("");

		try {
			const shows = await searchShows(query.trim());
			setResults(shows);
		} catch (e) {
			setError(e.message || "Error inesperado");
		} finally {
			setLoading(false);
		}
	}

	// Añadir / quitar favoritos
	function toggleFavorite(show) {
		setFavorites((prev) => {
			const exists = prev.some((s) => s.id === show.id);
			if (exists) {
				return prev.filter((s) => s.id !== show.id);
			}
			const newShow = {
				id: show.id,
				name: show.name,
				image: show.image || null,
			};
			return [newShow, ...prev];
		});
	}

	// Abrir modal y cargar detalle
	async function openDetail(id) {
		setOpen(true);
		setDetail(null);
		setDetailError("");
		setDetailLoading(true);

		try {
			const d = await fetchShowDetail(id);
			setDetail(d);
		} catch (e) {
			setDetailError(e.message || "Error cargando detalle");
		} finally {
			setDetailLoading(false);
		}
	}

	return (
		<div className="app">
			<header className="topbar">
				<h1>TVMaze • Buscador de Series</h1>
			</header>

			<main className="container">
				<SearchBar
					query={query}
					onChange={setQuery}
					onSubmit={handleSearch}
					isLoading={loading}
				/>

				<FavoritesPanel
					favorites={favorites}
					onToggleFavorite={toggleFavorite}
					onOpenDetail={openDetail}
				/>

				{error && <div className="error">{error}</div>}
				{loading && <div className="loading">Cargando resultados…</div>}

				{!loading && !results.length && !error && (
					<div className="empty">
						<h3>Busca tu serie favorita</h3>
						<p className="muted">
							Escribe el título arriba. Usa el botón de favorito para añadir una
							serie.
						</p>
					</div>
				)}

				{!loading && results.length > 0 && (
					<section>
						<h3>Resultados</h3>
						<SeriesList
							shows={results}
							favorites={favorites}
							onToggleFavorite={toggleFavorite}
							onOpenDetail={openDetail}
						/>
					</section>
				)}
			</main>

			<Modal open={open} onClose={() => setOpen(false)}>
				{detailLoading && <div className="loading">Cargando detalle…</div>}
				{detailError && <div className="error">{detailError}</div>}

				{!detailLoading && !detailError && detail && (
					<ShowDetail detail={detail} />
				)}

				{!detailLoading && !detailError && !detail && (
					<div className="empty">
						<h3>Sin datos</h3>
						<p className="muted">No se pudo cargar el detalle.</p>
					</div>
				)}
			</Modal>
		</div>
	);
}
