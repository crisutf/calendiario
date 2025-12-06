# 📅 Calendario Escolar — Crisutf

Este proyecto es un **calendario escolar** diseñado para informar a los alumnos sobre **exámenes, entregas, excursiones, festivos** y otros eventos importantes del curso.

## 🌐 URLs del proyecto

- Página principal: **[https://crisu.qzz.io/](https://crisu.qzz.io/)**
- Alternativa/hosting: **[https://calendario-escolar.pages.dev](https://calendario-escolar.pages.dev)**

## 🛠️ Tecnologías utilizadas

- **Vite**
- **React**
- **TailwindCSS**

La web es rápida, ligera y fácil de actualizar.

---

## ✏️ Cómo añadir o editar eventos

Los eventos están almacenados en el archivo:

```
src/data/events.json
```

Cada evento debe seguir esta estructura:

```json
{"date": "AAAA-MM-DD", "title": "Nombre del evento", "type": "event|exam|holiday"}
```

### 🔍 Explicación de los campos

- **date** → Fecha en formato `Año-Mes-Día` (ejemplo: `2025-03-18`).
- **title** → Nombre del evento.
- **type** → Tipo de evento:
  - `event` → Azul. Para entregas, excursiones o actividades.
  - `exam` → Rojo. Para exámenes.
  - `holiday` → Verde. Para festivos como Navidad, Semana Santa, etc.

### 📌 Ejemplo

```json
{"date": "2025-02-14", "title": "Examen de Matemáticas", "type": "exam"}
```

---

## 📖 Descripción del proyecto

Este calendario permite a los alumnos estar informados de todo lo importante durante el curso. Su diseño simple y visual hace que sea fácil ver los días clave y mantenerse organizado.

---

## 🚀 Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Construir para producción:

```bash
npm run build
```
