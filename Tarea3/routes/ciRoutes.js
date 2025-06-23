const express = require("express");
const router = express.Router();
const ciController = require("../controllers/ciController");

// CRUD de Configuration Items
router.get("/cis", ciController.getAllCIs);          // GET /api/cis?tipo=Aplicación&ambiente=PROD
router.get("/cis/:id", ciController.getCIById);      // GET /api/cis/1
router.post("/cis", ciController.createCI);          // POST /api/cis
router.put("/cis/:id", ciController.updateCI);       // PUT /api/cis/1
router.delete("/cis/:id", ciController.deleteCI);    // DELETE /api/cis/1

// Relaciones entre CIs
router.get("/cis/:id/relaciones", ciController.getRelacionesByCI);     // GET /api/cis/1/relaciones
router.post("/cis/relaciones", ciController.crearRelacion);            // POST /api/cis/relaciones

module.exports = router;
