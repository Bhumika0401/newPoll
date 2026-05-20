
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser = require("cookie-parser");

// Load passport config
require("./config/passport");

const passport = require("passport");

const app = express();


// =====================================
// ENV VARIABLES
// =====================================

const PORT =
  process.env.PORT || 5001;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "https://new-poll-rouge.vercel.app";


// =====================================
// MIDDLEWARE
// =====================================

// CORS
app.use(
  cors({
    origin: CLIENT_URL,

    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Passport
app.use(passport.initialize());


// =====================================
// DATABASE CONNECTION
// =====================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ DB connected");
  })
  .catch((err) => {
    console.log(
      "❌ DB error:",
      err.message
    );
  });


// =====================================
// ROUTES
// =====================================

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/polls",
  require("./routes/pollRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/questions",
  require("./routes/questionRoutes")
);

app.use(
  "/api/surveys",
  require("./routes/surveyRoutes")
);

app.use(
  "/api/responses",
  require("./routes/responseRoutes")
);
app.use("/api/analytics", require("./routes/analyticRoutes"));
app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);


// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {
  res.send("API is running...");
});


// =====================================
// START SERVER
// =====================================

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});