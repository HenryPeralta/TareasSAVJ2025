-- Crear base de datos
CREATE DATABASE IF NOT EXISTS cmdb;
USE cmdb;

-- Tabla principal: Configuration Items (CIs)
CREATE TABLE configuration_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('Hardware', 'Software', 'Base de Datos', 'Aplicación') NOT NULL,
    descripcion TEXT,
    numero_serie VARCHAR(100),
    version VARCHAR(50),
    fecha_adquisicion DATE,
    estado_actual ENUM('Activo', 'Inactivo', 'Mantenimiento') DEFAULT 'Activo',
    ambiente ENUM('DEV', 'QA', 'PROD') NOT NULL,
    propietario VARCHAR(100),
    fecha_cambio DATE,
    descripcion_cambio TEXT,
    documentacion_url TEXT,
    incidente_url TEXT,
    nivel_seguridad ENUM('Bajo', 'Medio', 'Alto') DEFAULT 'Medio',
    cumplimiento ENUM('Cumple', 'No Cumple') DEFAULT 'Cumple',
    estado_configuracion VARCHAR(100),
    numero_licencia VARCHAR(100),
    fecha_vencimiento DATE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de relaciones CI-CI (ej. un servidor depende de una aplicación)
CREATE TABLE ci_relaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_padre_id INT NOT NULL,
    ci_hijo_id INT NOT NULL,
    tipo_relacion VARCHAR(100) DEFAULT 'depende de',
    FOREIGN KEY (ci_padre_id) REFERENCES configuration_items(id) ON DELETE CASCADE,
    FOREIGN KEY (ci_hijo_id) REFERENCES configuration_items(id) ON DELETE CASCADE
);

-- Auditoría básica de cambios
CREATE TABLE ci_auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_id INT NOT NULL,
    accion ENUM('CREADO', 'ACTUALIZADO', 'ELIMINADO') NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ci_id) REFERENCES configuration_items(id) ON DELETE CASCADE
);
