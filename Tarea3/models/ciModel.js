const db = require("../config/db");

// Obtener todos los CIs con filtros opcionales
const getAllCIs = async (filtros = {}) => {
  let query = "SELECT * FROM configuration_items WHERE 1=1";
  const params = [];

  if (filtros.tipo) {
    query += " AND tipo = ?";
    params.push(filtros.tipo);
  }
  if (filtros.ambiente) {
    query += " AND ambiente = ?";
    params.push(filtros.ambiente);
  }

  return db.execute(query, params);
};

// Obtener un CI por ID
const getCIById = async (id) => {
  return db.execute("SELECT * FROM configuration_items WHERE id = ?", [id]);
};

// Crear nuevo CI
const createCI = async (data) => {
  const query = `
    INSERT INTO configuration_items (
      nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
      estado_actual, ambiente, propietario, fecha_cambio, descripcion_cambio,
      documentacion_url, incidente_url, nivel_seguridad, cumplimiento,
      estado_configuracion, numero_licencia, fecha_vencimiento
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.nombre, data.tipo, data.descripcion, data.numero_serie, data.version, data.fecha_adquisicion,
    data.estado_actual, data.ambiente, data.propietario, data.fecha_cambio, data.descripcion_cambio,
    data.documentacion_url, data.incidente_url, data.nivel_seguridad, data.cumplimiento,
    data.estado_configuracion, data.numero_licencia, data.fecha_vencimiento
  ];
  return db.execute(query, values);
};

// Actualizar CI
const updateCI = async (id, data) => {
  const query = `
    UPDATE configuration_items SET
      nombre = ?, tipo = ?, descripcion = ?, numero_serie = ?, version = ?, fecha_adquisicion = ?,
      estado_actual = ?, ambiente = ?, propietario = ?, fecha_cambio = ?, descripcion_cambio = ?,
      documentacion_url = ?, incidente_url = ?, nivel_seguridad = ?, cumplimiento = ?,
      estado_configuracion = ?, numero_licencia = ?, fecha_vencimiento = ?
    WHERE id = ?
  `;
  const values = [
    data.nombre, data.tipo, data.descripcion, data.numero_serie, data.version, data.fecha_adquisicion,
    data.estado_actual, data.ambiente, data.propietario, data.fecha_cambio, data.descripcion_cambio,
    data.documentacion_url, data.incidente_url, data.nivel_seguridad, data.cumplimiento,
    data.estado_configuracion, data.numero_licencia, data.fecha_vencimiento, id
  ];
  return db.execute(query, values);
};

// Eliminar CI
const deleteCI = async (id) => {
  return db.execute("DELETE FROM configuration_items WHERE id = ?", [id]);
};

// Registrar acción en auditoría
const logAudit = async (ci_id, accion, descripcion) => {
  return db.execute(
    "INSERT INTO ci_auditoria (ci_id, accion, descripcion) VALUES (?, ?, ?)",
    [ci_id, accion, descripcion]
  );
};

// Obtener relaciones
const getRelacionesByCI = async (id) => {
  return db.execute(
    `SELECT r.*, p.nombre AS padre_nombre, h.nombre AS hijo_nombre
     FROM ci_relaciones r
     JOIN configuration_items p ON p.id = r.ci_padre_id
     JOIN configuration_items h ON h.id = r.ci_hijo_id
     WHERE r.ci_padre_id = ? OR r.ci_hijo_id = ?`, [id, id]
  );
};

// Crear relación
const crearRelacion = async (padreId, hijoId, tipo = "depende de") => {
  return db.execute(
    "INSERT INTO ci_relaciones (ci_padre_id, ci_hijo_id, tipo_relacion) VALUES (?, ?, ?)",
    [padreId, hijoId, tipo]
  );
};

module.exports = {
  getAllCIs,
  getCIById,
  createCI,
  updateCI,
  deleteCI,
  logAudit,
  getRelacionesByCI,
  crearRelacion
};
