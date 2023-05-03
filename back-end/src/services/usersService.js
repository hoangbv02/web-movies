const sql = require("mssql");
const config = require("../common/config");
const bcrypt = require("bcrypt");
const {
    ERROR_SUCCESS,
    MESSAGE_SUCCESS,
    ERROR_FAILED,
    MESSAGE_EXIST_USER_NAME,
    MESSAGE_EMPTY,
    MESSAGE_ERROR,
    MESSAGE_OVER_LENGTH,
} = require("../common/messageList");
const authMethod = require("../common/auth");
const {
    isNullOrWhiteSpace,
    isNullOrEmptyArray,
    isOverMaxLength,
} = require("../common/utils");
String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

const login = async (data) => {
    try {
        var messages = [];
        if (isNullOrWhiteSpace(data.username)) {
            messages.push(String.format(MESSAGE_EMPTY, "username"));
        } else if (isOverMaxLength(data.username, 20)) {
            messages.push(String.format(MESSAGE_OVER_LENGTH, "username", 20));
        }
        if (isNullOrWhiteSpace(data.password)) {
            messages.push(String.format(MESSAGE_EMPTY, "password"));
        }
        if (!isNullOrEmptyArray(messages)) {
            var result = {
                error: ERROR_SUCCESS,
                data: null,
                message: messages,
            };
            return result;
        }
        const user = await getUsersByUsername(data.username);
        if (!user) {
            var result = {
                error: ERROR_SUCCESS,
                message: MESSAGE_EXIST_USER_NAME,
            };
            return result;
        }
        const password = user.password;
        const userOutput = {
            username: user.username,
            userId: user.id,
        };
        const isPassword = bcrypt.compareSync(data.password, password);
        if (!isPassword) {
            var result = {
                error: ERROR_SUCCESS,
                message: MESSAGE_EXIST_USER_NAME,
            };
            return result;
        }
        const dataForAccessToken = {
            username: user.username,
        };
        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            config.ACCESS_TOKEN_SECRET,
            config.ACCESS_TOKEN_LIFE
        );
        var result = {
            error: ERROR_FAILED,
            data: { accessToken, user: userOutput },
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    }
};
const getAll = async () => {
    try {
        var pool = await sql.connect(config.connect);
        var sqlQueries = "select * from users";
        var users = await pool.query(sqlQueries);
        var result = {
            error: ERROR_FAILED,
            data: users.recordset,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const getUsersById = async (id) => {
    try {
        var pool = await sql.connect(config.connect);
        var sqlQueries = "select * from users where id =" + id;
        var users = await pool.query(sqlQueries);
        var result = {
            error: ERROR_FAILED,
            data: users.recordset[0],
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const getUsersByUsername = async (username) => {
    try {
        var pool = await sql.connect(config.connect);
        var sqlQueries = `select * from users where username = '${username}'`;
        var users = await pool.query(sqlQueries);
        return users.recordset[0];
    } catch (error) {
        return null;
    } finally {
        pool.close();
    }
};
const addUsers = async (data) => {
    try {
        var messages = [];
        if (isNullOrWhiteSpace(data.name)) {
            messages.push(String.format(MESSAGE_EMPTY, "name"));
        }
        if (isNullOrWhiteSpace(data.birth)) {
            messages.push(String.format(MESSAGE_EMPTY, "birth"));
        }
        if (isNullOrWhiteSpace(data.gender)) {
            messages.push(String.format(MESSAGE_EMPTY, "gender"));
        }
        if (isNullOrWhiteSpace(data.address)) {
            messages.push(String.format(MESSAGE_EMPTY, "address"));
        }
        if (isNullOrWhiteSpace(data.username)) {
            messages.push(String.format(MESSAGE_EMPTY, "username"));
        }
        if (isNullOrWhiteSpace(data.password)) {
            messages.push(String.format(MESSAGE_EMPTY, "password"));
        }
        if (!isNullOrEmptyArray(messages)) {
            var result = {
                error: ERROR_SUCCESS,
                data: null,
                message: messages,
            };
            return result;
        }
        var pool = await sql.connect(config.connect);
        var hashedPassword = bcrypt.hashSync(data.password, 10);
        var sqlQueries = `insert into users values(N'${data.name}','${data.birth}',N'${data.gender}',N'${data.address}',
        '${data.username}','${hashedPassword}')`;
        var added = await pool.query(sqlQueries);
        var result = {
            error: ERROR_FAILED,
            data: null,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const updateUsers = async (id, data) => {
    try {
        var pool = await sql.connect(config.connect);
        var hashedPassword = bcrypt.hashSync(data.password, 10);
        var sqlQueries = `update users set name = N'${data.name}', birth = '${data.birth}', gender = N'${data.gender}',
        address= N'${data.address}', username = '${data.username}',password = '${hashedPassword}' where id = '${id}'`;
        var updated = await pool.query(sqlQueries);
        var result = {
            error: ERROR_FAILED,
            data: null,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
const deleteUsers = async (id) => {
    try {
        var pool = await sql.connect(config.connect);
        var sqlQueries = `delete from users where id = ${id}`;
        var deleted = await pool.query(sqlQueries);
        var result = {
            error: ERROR_FAILED,
            data: null,
            message: MESSAGE_SUCCESS,
        };
        return result;
    } catch (error) {
        var result = {
            error: ERROR_SUCCESS,
            message: error.message,
        };
        return result;
    } finally {
        pool.close();
    }
};
module.exports = {
    login,
    getAll,
    getUsersById,
    addUsers,
    updateUsers,
    deleteUsers,
};
