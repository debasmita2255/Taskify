const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");

const userApis = require("./controllers/user");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// api's
app.use("/api/v1", userApis);

app.listen(`${process.env.PORT}`, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

 
// --------------------------------------------------
// if (process.env.NODE_ENV === "development") {
//   require('dns').setServers(['8.8.8.8', '1.1.1.1']);
// }
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// require("dotenv").config();

// const PORT = process.env.PORT || 1000;
// const DB_URL = process.env.MONGO_URI;

// // Connect to DB
// mongoose.connect(DB_URL)
//   .then(() => console.log("✅ DB connected"))
//   .catch(err => console.log("❌ DB error:", err));

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello from backend");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log("Server started\n");
//   console.log(`Listening on http://localhost:${PORT}`);
// });

// -------------------------------------------------------
// require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT;
// const DB_URL = process.env.MONGO_URI;

// let server; // 👈 store server reference

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello from backend");
// });

// async function start() {
//   try {
//     await mongoose.connect(DB_URL);
//     console.log("✅ DB connected");

//     server = app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Startup error:", err);
//   }
// }

// start();

// // ✅ Graceful shutdown
// let isShuttingDown = false;

// async function shutdown() {
//   if (isShuttingDown) return; // ✅ prevent multiple calls
//   isShuttingDown = true;

//   console.log("\n🛑 Shutting down...");

//   try {
//     // 1. Stop server first
//     if (server) {
//       await new Promise((resolve) => {
//         server.close(() => {
//           console.log("✅ Server closed");
//           resolve();
//         });
//       });
//     }

//     // 2. Then close DB
//     await mongoose.connection.close();
//     console.log("✅ DB connection closed");

//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Error during shutdown:", err);
//     process.exit(1);
//   }
// }

// // Listen for termination signals
// process.once("SIGINT", shutdown);
// process.once("SIGTERM", shutdown);
