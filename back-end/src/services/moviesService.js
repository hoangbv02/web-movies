const sql = require("mssql");
const {
    getExtensionFromFileName,
    uploadFileToFirebase,
    customDateTime,
} = require("../common/utils");
const { connect } = require("../common/config");
const { join, dirname } = require("path");
const {
    ERROR_FAILED,
    MESSAGE_SUCCESS,
    ERROR_SUCCESS,
} = require("../common/messageList");
const getMovies = async (seriesMovie = false) => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = `select *,(select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias,
        (select count(*) totalPart from medias m where m.relationId = mv.id and m.mediaType like '%video_part%' for json path) totalPart from movies mv  `;
        var movies = await pool.request().query(movieStatement);
        const data = [];
        if (movies.recordset) {
            movies.recordset.forEach((item) => {
                var medias = JSON.parse(item.medias);
                var totalPart = JSON.parse(item.totalPart);
                for (let subItem of totalPart) {
                    if (seriesMovie && subItem.totalPart > 1) {
                        data.push({
                            ...item,
                            medias,
                            totalPart,
                        });
                    } else if (!seriesMovie && subItem.totalPart == 1) {
                        data.push({
                            ...item,
                            medias,
                            totalPart,
                        });
                    }
                }
            });
        }
        const result = {
            error: ERROR_FAILED,
            data: data,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const getMovieByGenres = async (id) => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = `select mv.id, mv.title, mv.description, mv.releaseTime, mv.country, mv.create_at, mv.update_at,
        (select g.id, g.name from genres g inner join movieGenres mg on g.id = mg.genreId where mg.movieId = mv.id for json path) genres,
        (select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias  from movies mv
        inner join movieGenres mg on mv.id = mg.movieId inner join genres g on g.id = mg.genreId where g.id =${id}`;
        const movies = await pool.request().query(movieStatement);
        const data = [];
        movies.recordset.forEach((item) => {
            const medias = JSON.parse(item.medias);
            const genres = JSON.parse(item.genres);
            data.push({
                ...item,
                medias,
                genres,
            });
        });
        const result = {
            error: ERROR_FAILED,
            data: data,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const getAll = async () => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = `select *,(select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias  from movies mv`;
        const movies = await pool.request().query(movieStatement);
        const data = [];
        movies.recordset.forEach((item) => {
            const medias = JSON.parse(item.medias);
            data.push({
                ...item,
                medias,
            });
        });
        const result = {
            error: ERROR_FAILED,
            data: data,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const getMovieById = async (id) => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement =
            "select *,(select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias  from movies mv where mv.id = " +
            id;
        const movie = await pool.request().query(movieStatement);
        const medias = JSON.parse(movie.recordset[0].medias);
        const data = {
            ...movie.recordset[0],
            medias,
        };
        const result = {
            error: ERROR_FAILED,
            data: data,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const countMovies = async () => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = "select count(*) as totalRecord from movies";
        const movies = await pool.request().query(movieStatement);
        return movies.recordset[0].totalRecord;
    } catch (error) {
        return null;
    } finally {
        pool.close();
    }
};
const countMoviesByKeySearch = async (keySearch) => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = `select count(*) as totalRecord from movies mv where mv.title like N'${keySearch}' or mv.description like N'${keySearch}' or mv.country like N'${keySearch}'`;
        const movies = await pool.request().query(movieStatement);
        return movies.recordset[0].totalRecord;
    } catch (error) {
        return null;
    } finally {
        pool.close();
    }
};
const getMovieByPaging = async (
    pageIndex,
    searchParams,
    sortParams,
    sortTypeParams,
    pageSize
) => {
    try {
        var pool = await sql.connect(connect);
        var skip = (pageIndex - 1) * pageSize;
        var totalRecord = 0;
        var totalPage = 0;
        if (
            pageIndex &&
            searchParams &&
            sortParams &&
            sortTypeParams &&
            pageSize
        ) {
            const keySearch = `%${searchParams}%`;
            const movieStatement = `select *,(select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias,
            (select g.id, g.name from genres g inner join movieGenres mg on g.id = mg.genreId where mg.movieId = mv.id for json path) genres
            from movies mv where mv.title like N'${keySearch}' or mv.description like N'${keySearch}' or mv.country like N'${keySearch}'
            order by ${sortParams} ${sortTypeParams} OFFSET ${skip} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
            var movies = await pool.query(movieStatement);
            totalRecord = await countMoviesByKeySearch(keySearch);
            totalPage = Math.ceil(totalRecord / pageSize);
        } else if (pageIndex && sortParams && sortTypeParams && pageSize) {
            var movieStatement = `select *,(select m.mediaType, m.mediaPath from medias m where m.relationId = mv.id for json path) medias,
            (select g.id, g.name from genres g inner join movieGenres mg on g.id = mg.genreId where mg.movieId = mv.id for json path) genres
            from movies mv order by mv.${sortParams} ${sortTypeParams} OFFSET ${skip} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;
            var movies = await pool.query(movieStatement);
            totalRecord = await countMovies();
            totalPage = Math.ceil(totalRecord / pageSize);
        }
        var data = [];
        movies.recordset.forEach((item) => {
            const medias = JSON.parse(item.medias);
            const genres = JSON.parse(item.genres);
            data.push({
                ...item,
                medias,
                genres,
            });
        });
        const result = {
            error: ERROR_FAILED,
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalRecord: totalRecord,
            totalPage: totalPage,
            data: data,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const addMovie = async (data, file) => {
    try {
        var pool = await sql.connect(connect);
        const fileImgInput = file.image;
        if (fileImgInput) {
            var image = await uploadFile(fileImgInput);
        }
        const fileImgLogoInput = file.image_logo;
        if (fileImgLogoInput) {
            var image_logo = await uploadFile(fileImgLogoInput);
        }
        const fileVideoInput = file.video;
        if (fileVideoInput) {
            var videos = await uploadFile(fileVideoInput);
        }
        const dateTime = customDateTime();
        const movieStatement = `insert into movies values(N'${data.title}', N'${data.description}', '${data.releaseTime}', N'${data.country}','${dateTime}', null)`;
        const addMovie = await pool.request().query(movieStatement);
        const movieIdQuery = await pool
            .request()
            .query("select max(id) id from movies");
        const movieId = movieIdQuery.recordset[0].id;
        const listGenres = data.genres.split(",");
        var movieGenres = [];
        for (let item of listGenres) {
            const movieGenresStatement = `insert into movieGenres values(${item}, ${movieId})`;
            movieGenres.push(await pool.request().query(movieGenresStatement));
        }
        const addMovieGenres = Promise.all(movieGenres);
        var medias = [];
        const mediaImageStatement = `insert into medias values ('image', '${image[0].pathFirebase}', ${movieId}, null, '${dateTime}', null, '${image[0].fileName}')`;
        medias.push(await pool.request().query(mediaImageStatement));
        const mediaImageLogoStatement = `insert into medias values ('image_logo', '${image_logo[0].pathFirebase}', ${movieId}, null, '${dateTime}', null, '${image[0].fileName}')`;
        medias.push(await pool.request().query(mediaImageLogoStatement));
        for (let i = 0; i < videos.length; i++) {
            const mediaVideoStatement = `insert into medias values ('video_part_${
                i + 1
            }', '${
                videos[i].pathFirebase
            }', ${movieId}, null, '${dateTime}', null, '${
                videos[i].fileName
            }')`;
            medias.push(await pool.request().query(mediaVideoStatement));
        }
        const addMedias = Promise.all(medias);
        const result = {
            error: ERROR_FAILED,
            data: null,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const deleteMovies = async (id) => {
    try {
        var pool = await sql.connect(connect);
        const movieStatement = "delete from movies where id = " + id;
        const deleted = await pool.request().query(movieStatement);
        const result = {
            error: ERROR_FAILED,
            data: null,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        const result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const uploadFile = async (fileInput) => {
    const appDir = dirname(require.main.filename);
    var uploads = [];
    var listObj = [];
    if (Array.isArray(fileInput) && fileInput.length > 0) {
        for (let item of fileInput) {
            const fileName = getExtensionFromFileName(item.name);
            const savePath = join(appDir, "uploads", fileName);
            uploads.push(await item.mv(savePath));
            listObj.push({
                fileName: fileName,
                pathFirebase: await uploadFileToFirebase(item),
            });
        }
        Promise.all(listObj);
        Promise.all(uploads);
    } else {
        const fileName = getExtensionFromFileName(fileInput.name);
        const savePath = join(appDir, "uploads", fileName);
        fileInput.mv(savePath);
        listObj.push({
            fileName: fileName,
            pathFirebase: await uploadFileToFirebase(fileInput),
        });
    }
    return listObj;
};
module.exports = {
    getAll,
    getMovieById,
    addMovie,
    getMovieByPaging,
    deleteMovies,
    getMovies,
    getMovieByGenres,
};
