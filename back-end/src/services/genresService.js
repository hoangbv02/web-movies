const sql = require("mssql");
const { connect } = require("../common/config");
const { ERROR_FAILED, MESSAGE_SUCCESS, ERROR_SUCCESS } = require("../common/messageList");
const getGenres = async () => {
    try {
        const pool = await sql.connect(connect);
        const genresStatement = "select * from genres";
        const genres = await pool.request().query(genresStatement);
        const result = {
            error: ERROR_FAILED,
            data: genres.recordset,
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
        sql.close();
    }
};
const getGenresById = async (id) => {
    try {
        const pool = await sql.connect(connect);
        const genresStatement = "select * from genres where id = " + id;
        const genre = await pool.request().query(genresStatement);
        const result = {
            error: ERROR_FAILED,
            data: genre.recordset[0],
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
        sql.close();
    }
};
const addGenres = async (data) => {
    try {
        const pool = await sql.connect(connect);
        const genresStatement = `insert into genres values(N'${data.name}')`;
        const added = await pool.request().query(genresStatement);
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
        sql.close();
    }
};
const updateGenres = async (data, id) => {
    try {
        const pool = await sql.connect(connect);
        const genresStatement = `update genres set name = N'${data.name}' where id = ${id}`;
        const updated = await pool.request().query(genresStatement);
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
        sql.close();
    }
};
const deleteGenres = async (id) => {
    try {
        const pool = await sql.connect(connect);
        const genresStatement = `delete from genres where id = ${id}`;
        const deleted = await pool.request().query(genresStatement);
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
        sql.close();
    }
};
module.exports = {
    getGenres,
    getGenresById,
    addGenres,
    updateGenres,
    deleteGenres,
};
