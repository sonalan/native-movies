export const TMDB_CONFIG = {
    API_KEY: process.env.TMDB_API_PUBLIC_KEY,
    API_URL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_PUBLIC_KEY}`,
    },
};

export const fetchMovies = async ({keyword}: {keyword: string}) => {
    //https://api.themoviedb.org/3/keyword/{keyword_id}/movies
    const endpoint = `${TMDB_CONFIG.API_URL}keyword/${keyword}/movies`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @s-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }
    const data = await response.json();
    return data.results;
}