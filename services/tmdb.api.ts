//const api_key = process.env.TMDB_API_PUBLIC_KEY;
const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDYwNDVmNWFmZjhmOGUwODA0M2E0MmY4MWFjNDBlZSIsIm5iZiI6MTUyODQ4NjU0NC4xNjgsInN1YiI6IjViMWFkYTkwMGUwYTI2MWY5ZDAxNjY5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IZRy6gsUrfmrj0kkNqaNDuayOJn29ysJitkY_P2NOXc';
export const TMDB_CONFIG = {
    API_KEY: api_key,
    API_URL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`,
    },
};

//console.log('key', TMDB_CONFIG.API_KEY)
export const fetchMovies = async ({keyword}: {keyword: string}) => {
    //keyword/{keyword_id}/movies
    //movie/popular?language=en-US&page=1
    const endpoint = keyword
        ? `search/movie?query=${encodeURIComponent(keyword)}`
        : `movie/popular?language=en-US&page=1`;
        //discover/movie?sort_by=popularity.desc
    

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

export const fetchMovie = async ({id}: {id: string}) => {
    const endpoint = `movie/${id}?language=en-US`;
    const response = await fetch(`${TMDB_CONFIG.API_URL}${endpoint}`, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movie', response.statusText);
    }
    const data = await response.json();
    console.log('data', data)
    return data;
}