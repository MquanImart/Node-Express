require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();

// Middleware
app.use(express.json({limit: '50mb'})); // parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/login", require("./routes/loginRoutes"));
app.use("/genre", require("./routes/genreRoutes"));
app.use("/book", require("./routes/bookRoutes"));
app.use("/search", require("./routes/searchRoutes"));
app.use("/detail", require("./routes/detailRoutes"));
app.use("/propose", require("./routes/proposeRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/nxb", require("./routes/NXBRoutes"));
// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
