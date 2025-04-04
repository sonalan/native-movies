export const TMDB_CONFIG = {
    API_KEY: process.env.TMDB_API_PUBLIC_KEY,
    API_URL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_PUBLIC_KEY}`,
    },
};

export const fetchMovies = async ({keyword}: {keyword: string}) => {
    //keyword/{keyword_id}/movies
    //movie/popular?language=en-US&page=1
    const endpoint = keyword
        ? `keyword/${keyword}/movies`
        : `movie/popular?language=en-US&page=1`;

    const response = await fetch(`${TMDB_CONFIG.API_URL}${endpoint}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText);
    }
    const data = await response.json();
    return data.results;
}