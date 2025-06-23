# API RESTful para CMDB (Configuration Management Database)

Esta API permite gestionar elementos de configuración (CIs) de una CMDB, con operaciones para registrar, consultar, actualizar y eliminar. Está desarrollada con Node.js y Express, y utiliza MySQL como base de datos. No incluye autenticación.

---

## Tecnologías utilizadas

- Node.js
- Express
- MySQL

---

## Requisitos

- Node.js v14 o superior
- MySQL instalado y en ejecución
- Cliente para hacer peticiones HTTP (Postman, curl, etc.)

---

## Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   cd nombre-del-proyecto
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la conexión a MySQL:  
   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_de_datos
   DB_PORT=3306
   ```

4. Crear la base de datos desde MySQL:

   ```sql
   CREATE DATABASE nombre_base_de_datos;
   ```

5. Ejecutar el proyecto:

   ```bash
   node index.js
   ```

---

## Endpoints principales

| Método | Ruta               | Descripción                                      |
|--------|--------------------|--------------------------------------------------|
| GET    | /api/cis           | Obtener todos los elementos de configuración     |
| GET    | /api/cis/:id       | Obtener un elemento de configuración por ID      |
| POST   | /api/cis           | Crear un nuevo elemento de configuración         |
| PUT    | /api/cis/:id       | Actualizar un elemento de configuración por ID   |
| DELETE | /api/cis/:id       | Eliminar un elemento de configuración por ID     |

---

## Ejemplos de uso

### Crear un CI
```bash
curl -X POST http://localhost:3000/api/cis \
-H "Content-Type: application/json" \
-d '{"nombre":"Servidor Web", "tipo":"Servidor", "descripcion":"Servidor Apache"}'
```

### Obtener todos los CIs
```bash
curl http://localhost:3000/api/cis
```

---

## Notas

- Asegúrate de tener corriendo el servidor MySQL y que los datos en `.env` sean correctos.
- El proyecto no incluye autenticación por simplicidad.
- Puedes adaptar este backend para integrarlo con interfaces web u otros sistemas.

---