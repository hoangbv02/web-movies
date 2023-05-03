const dotenv = require("dotenv");
dotenv.config();
const {
    PORT,
    HOST,
    SQL_USER,
    SQL_SERVER,
    SQL_DATABASE,
    SQL_PASSWORD,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASURENENT_ID,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE,
} = process.env;

module.exports = {
    port: PORT,
    ACCESS_TOKEN_SECRET: ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFE: ACCESS_TOKEN_LIFE,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASURENENT_ID,
    },
    connect: {
        server: SQL_SERVER,
        database: SQL_DATABASE,
        user: SQL_USER,
        password: SQL_PASSWORD,
        options: {
            encrypt: true,
            requestTimeout: 300000,
            trustServerCertificate: true,
        },
    },
};
