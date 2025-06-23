const ciModel = require("../models/ciModel");

// Obtener todos los CIs, con filtros opcionales por tipo o ambiente
const getAllCIs = async (req, res) => {
  try {
    const [rows] = await ciModel.getAllCIs(req.query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener CIs", error });
  }
};

// Obtener un CI por su ID
const getCIById = async (req, res) => {
  try {
    const [rows] = await ciModel.getCIById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: "CI no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener CI", error });
  }
};

// Crear un nuevo CI
const createCI = async (req, res) => {
  try {
    const [result] = await ciModel.createCI(req.body);
    await ciModel.logAudit(result.insertId, 'CREADO', 'CI creado desde API');
    res.status(201).json({ message: "CI creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear CI", error });
  }
};

// Actualizar un CI existente
const updateCI = async (req, res) => {
  try {
    const { id } = req.params;
    await ciModel.updateCI(id, req.body);
    await ciModel.logAudit(id, 'ACTUALIZADO', 'CI actualizado desde API');
    res.json({ message: "CI actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar CI", error });
  }
};

// Eliminar un CI
const deleteCI = async (req, res) => {
  try {
    const { id } = req.params;
    await ciModel.deleteCI(id);
    await ciModel.logAudit(id, 'ELIMINADO', 'CI eliminado desde API');
    res.json({ message: "CI eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar CI", error });
  }
};

// Obtener relaciones de un CI
const getRelacionesByCI = async (req, res) => {
  try {
    const [rows] = await ciModel.getRelacionesByCI(req.params.id);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener relaciones", error });
  }
};

// Crear relación entre CIs
const crearRelacion = async (req, res) => {
  try {
    const { padreId, hijoId, tipo_relacion } = req.body;
    await ciModel.crearRelacion(padreId, hijoId, tipo_relacion || 'depende de');
    res.status(201).json({ message: "Relación creada" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación", error });
  }
};

module.exports = {
  getAllCIs,
  getCIById,
  createCI,
  updateCI,
  deleteCI,
  getRelacionesByCI,
  crearRelacion
};
