# 🛍️ Online Shopping

Online Shopping es una refactorización de un sistema de compras en línea previamente monolítico, transformado en una arquitectura moderna basada en microservicios. Implementa separación de responsabilidades, comunicación asincrónica y despliegue independiente mediante contenedores Docker.

---

## 📦 Arquitectura de Microservicios

- **User Service**: Gestión de usuarios y autenticación (PostgreSQL)
- **Product Service**: Catálogo de productos (MongoDB)
- **Cart Service**: Carrito de compras (Redis)
- **Order Service**: Gestión de pedidos (PostgreSQL)
- **Payment Service**: Procesamiento de pagos
- **Shipping Service**: Envío de productos
- **Review Service**: Comentarios y valoraciones (MongoDB)
- **Return & Refund Service**: Devoluciones y reembolsos (RabbitMQ)
- **Analytics Service**: Reportes y análisis (Kafka)
- **Supplier Service**: Gestión de proveedores (PostgreSQL)
- **API Gateway**: Punto único de entrada a los servicios

---

## 🧰 Tecnologías Utilizadas

- Node.js + Express
- PostgreSQL, MongoDB, Redis
- RabbitMQ, Kafka
- Docker y Docker Compose

---

## 🚀 Instrucciones de Despliegue

### Requisitos Previos

- Docker
- Docker Compose
- Git

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/HenryPeralta/TareasSAVJ2025.git
   cd online-shopping-microservices
   ```

2. Levantar todos los servicios:
   ```bash
   docker-compose up --build
   ```

3. Accede al sistema desde el API Gateway:
   ```
   http://localhost:8080
   ```

### Puertos Adicionales

- RabbitMQ UI: http://localhost:15672 (usuario: guest / contraseña: guest)
- Kafka: localhost:9092 (expuesto para pruebas internas)

---

## 📂 Estructura del Proyecto

```
online-shopping-microservices/
├── api-gateway/
├── user-service/
├── product-service/
├── cart-service/
├── order-service/
├── payment-service/
├── shipping-service/
├── review-service/
├── return-refund-service/
├── analytics-service/
├── supplier-service/
├── docker-compose.yml
└── README.md
```

Cada carpeta contiene:
- Código fuente del servicio
- Dockerfile para su construcción
- Variables de entorno propias
