const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ciRoutes = require("./routes/ciRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", ciRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("CMDB API corriendo 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
