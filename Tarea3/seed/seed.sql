USE cmdb;

-- Insertar Configuration Items (CIs)
INSERT INTO configuration_items (
    nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion,
    estado_actual, ambiente, propietario, fecha_cambio, descripcion_cambio,
    documentacion_url, incidente_url, nivel_seguridad, cumplimiento,
    estado_configuracion, numero_licencia, fecha_vencimiento
) VALUES
-- Servidor
('Servidor1', 'Hardware', 'Servidor de aplicaciones', 'SN123456', 'v1.0', '2022-01-01',
 'Activo', 'PROD', 'Equipo de Infraestructura', '2022-02-01', 'Actualización de firmware',
 'https://docs.servidor1.com', 'https://incidente1.com', 'Alto', 'Cumple',
 'Aprobado', 'ABC123', '2023-01-01'),

-- Aplicación
('Aplicacion1', 'Aplicación', 'App contabilidad', NULL, 'v2.5', '2022-03-15',
 'Activo', 'PROD', 'Equipo de Desarrollo', '2022-04-01', 'Parche de seguridad',
 'https://docs.app1.com', 'https://incidente2.com', 'Medio', 'Cumple',
 'Aprobado', 'XYZ456', '2024-01-01'),

-- Base de Datos
('BD_Contabilidad', 'Base de Datos', 'Base de datos de contabilidad', NULL, '12c', '2022-01-10',
 'Activo', 'PROD', 'DBA Team', '2022-05-10', 'Migración de versión',
 'https://docs.db.com', NULL, 'Alto', 'Cumple',
 'Aprobado', 'DB123', '2025-01-01');

-- Relaciones entre CIs
INSERT INTO ci_relaciones (ci_padre_id, ci_hijo_id, tipo_relacion) VALUES
-- Servidor1 aloja Aplicacion1
(1, 2, 'alberga'),
-- Aplicacion1 depende de BD_Contabilidad
(2, 3, 'depende de');

-- Auditoría inicial
INSERT INTO ci_auditoria (ci_id, accion, descripcion) VALUES
(1, 'CREADO', 'Registro inicial del servidor'),
(2, 'CREADO', 'Registro inicial de la aplicación'),
(3, 'CREADO', 'Registro inicial de la base de datos');
