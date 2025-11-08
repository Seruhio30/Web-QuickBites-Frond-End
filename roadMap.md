# 🛣️ Roadmap de Desarrollo - QuickBites Web

Este documento detalla el plan de desarrollo para la aplicación web de pedidos de comida rápida *QuickBites*. El objetivo es construir una plataforma funcional, escalable y bien organizada, retomando el proyecto como reto personal.

---

## 🔹 Fase 1: Preparación y Organización
- [x] Limpiar el repositorio y archivar archivos antiguos
- [x] Crear estructura base de carpetas y archivos
- [x] Configurar `.gitignore` para evitar archivos innecesarios
- [x] Iniciar documentación en `README.md` y `roadmap.md`

---

## 🔹 Fase 2: Frontend Básico
- [x ] Diseñar `index.html` como página principal
- [ x] Crear componente visual para productos (tarjetas)
- [x ] Implementar navegación entre secciones con `navigation.js`
- [ x] Crear vista de carrito con resumen de orden
- [x ] Añadir lógica para seleccionar retiro o entrega

---

## 🔹 Fase 3: Backend (Java + PostgreSQL/MySQL)
- [ ] Crear API REST con Java (Spring Boot)
- [ ] Definir modelo de datos: productos, clientes, órdenes, inventario
- [ ] Implementar endpoints para:
  - [ ] Obtener productos
  - [ ] Crear orden
  - [ ] Registrar cliente
  - [ ] Gestionar inventario
- [ ] Configurar subida de imágenes (local o Cloudinary)
- [ ] Añadir autenticación para administrador

---

## 🔹 Fase 4: Integración Frontend + Backend
- [ ] Conectar frontend con backend usando `fetch` o AJAX
- [ ] Mostrar productos dinámicamente desde la base de datos
- [ ] Enviar orden al backend y recibir confirmación
- [ ] Mostrar estado de orden y resumen final

---

## 🔹 Fase 5: Panel de Administración
- [ ] CRUD de productos (crear, editar, eliminar)
- [ ] Gestión de inventario (stock, alertas)
- [ ] Registro y consulta de clientes
- [ ] Sistema de rifas y promociones

---

## 🔹 Fase 6: Pruebas y Despliegue
- [ ] Pruebas funcionales del sistema completo
- [ ] Documentación final del proyecto
- [ ] Despliegue en servidor o hosting (local o nube)

---

## 🧠 Notas
- Este roadmap puede ajustarse según el avance y nuevas ideas.
- Cada fase puede dividirse en ramas de Git para mantener orden.
