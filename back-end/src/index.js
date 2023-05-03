const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const config = require("./common/config");
const usersRoutes = require("./routes/usersRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const genresRoutes = require("./routes/genresRoutes");
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", usersRoutes.routes);
app.use("/api", moviesRoutes.routes);
app.use("/api", genresRoutes.routes);
app.listen(config.port, () => {
    console.log("Server is listening on port: " + config.port);
});
