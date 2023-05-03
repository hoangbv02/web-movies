import instance from "./axios";

export const register = async (data) => {
    try {
        const res = await instance.post("register", data);
        return res.data;
    } catch (err) {
        alert(err.message);
    }
};
export const login = async (data) => {
    try {
        const res = await instance.post("login", data);
        return res.data;
    } catch (err) {
        alert(err.message);
    }
};
export const getMovies = async (
    pageIndex,
    sortParams,
    sortTypeParams,
    pageSize,
    searchParams = ""
) => {
    try {
        const res = await instance.get("moviesPaging/", {
            params: {
                pageIndex,
                sortParams,
                sortTypeParams,
                pageSize,
                searchParams: searchParams,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};
export const getMovieByGenres = async (id) => {
    try {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        const res = await instance.get("movies/genres/" + id, {
            headers: {
                authorization: accessToken,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};

export const getOddMovie = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await instance.get("movies/movieType", {
            headers: {
                authorization: accessToken,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};
export const getSeriesMovie = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await instance.get("movies/movieType", {
            params: {
                seriesMovies: true,
            },
            headers: {
                authorization: accessToken,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};

export const getMovieById = async (id) => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await instance.get("movies/" + id, {
            headers: {
                authorization: accessToken,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};

export const getGenres = async () => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const res = await instance.get("genres", {
            headers: {
                authorization: accessToken,
            },
        });
        return res.data.data;
    } catch (err) {
        alert(err.message);
        window.location = "/login";
    }
};
