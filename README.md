# TP4 - API REST de Gestión de Alumnos

## Grupo 17

### Integrantes

- Jano Rodriguez
- Luca Aversano
- Dino Detzel
- Joaquin Robles
- Owen Braggi Bamberger Carrasco
- Garcia Amado Juan Manuel

---

## Descripción del proyecto

API REST desarrollada con Node.js y Express que permite gestionar alumnos, materias, notas y profesores. Los datos se almacenan en archivos JSON que simulan una base de datos. El proyecto sigue la arquitectura MVC (Modelo - Vista - Controlador) y está dockerizado para su deploy en Render.

---

## Links

- **Deploy en Render:** https://tp4grupo17.onrender.com
- **Repositorio Frontend:** https://github.com/Luca200527/tp4-frontend/tree/main

---

## Metodología de trabajo con Git y GitHub

Se trabajó con ramas por alumno. Cada integrante creó su propia rama con el formato `alumno_nombre`, realizó sus cambios y abrió un Pull Request hacia `main`. Cada alumno tiene mínimo un commit en su rama.

---

## División de archivos entre integrantes

| Integrante               | Archivos                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Joaquin Robles           | `alumno.model.ts`, `materia.controller.js`, `nota.controller.js`, `profesor.controller.js`, `materia.routes.js`, `nota.routes.js`, `profesor.routes.js`, `core/server.js` |
| Luca Aversano            | `index.html`, `main.js`                                                                                                                                                   |
| Jano Rodriguez           | Por completar                                                                                                                                                             |
| Dino Detzel              | Por completar                                                                                                                                                             |
| Owen Braggi              | Por completar                                                                                                                                                             |
| Garcia Amado Juan Manuel | Por completar                                                                                                                                                             |

---

## Distribución de archivos y carpetas

```
  tp3-ejemplo-nodejs/
  ├── controllers/
  │   ├── alumno.controller.js
  │   ├── materia.controller.js
  │   ├── nota.controller.js
  │   └── profesor.controller.js
  ├── core/
  │   └── server.js
  ├── data/
  │   ├── extras/
  │   │   ├── sys-materias.json
  │   │   ├── sys-notas.json
  │   │   └── sys-profesores.json
  │   └── alumnos.json
  ├── models/
  │   ├── alumno.model.ts
  │   └── persona.model.ts
  ├── routes/
  │   ├── extras/
  │   │   ├── materia.routes.js
  │   │   ├── nota.routes.js
  │   │   └── profesor.routes.js
  │   └── alumno.routes.js
  ├── .env
  ├── .gitignore
  ├── app.js
  ├── Dockerfile
  └── package.json
```

---

## Funciones explicadas

### alumno.controller.js

**`getAlumnoAll`**
Lee el archivo `alumnos.json` y devuelve la lista completa de alumnos. Responde con status 200 si tiene éxito, 500 si hay error.

**`getAlumnoById`**
Recibe el legajo por parámetro en la URL (`req.params`), busca el alumno en el JSON y lo devuelve. Responde con 200 si lo encuentra, 404 si no existe, 500 si hay error.

**`createAlumno`**
Recibe los datos del alumno por `req.body`, valida que los campos obligatorios estén presentes y que el legajo no exista ya. Agrega el nuevo alumno al JSON y responde con 201 si tuvo éxito, 400 si faltan datos o el legajo ya existe, 500 si hay error.

**`updateAlumno`**
Recibe el legajo por URL y los nuevos datos por `req.body`. Busca el alumno, actualiza solo los campos enviados y guarda el archivo. Responde con 200, 400 o 500.

**`deleteAlumno`**
Recibe el legajo por URL, filtra el alumno del array y guarda el archivo actualizado. Responde con 200 si se eliminó, 400 si no existe, 500 si hay error.

### materia.controller.js

**`getMateriaAll`**
Lee `sys-materias.json` y devuelve todas las materias. Responde con 200 o 500.

**`getMateriaById`**
Recibe el `idMateria` por URL y devuelve la materia correspondiente. Responde con 200, 404 o 500.

### nota.controller.js

**`getNotaAll`**
Lee `sys-notas.json` y devuelve todas las notas. Responde con 200 o 500.

**`getNotaByLegajo`**
Recibe el legajo por URL y devuelve todas las notas de ese alumno. Responde con 200, 404 o 500.

### profesor.controller.js

**`getProfesorAll`**
Lee `sys-profesores.json` y devuelve todos los profesores. Responde con 200 o 500.

**`getProfesorById`**
Recibe el id por URL y devuelve el profesor correspondiente. Responde con 200, 404 o 500.

### alumno.model.ts

Clase `AlumnoModel` que extiende `PersonaModel`. Define los atributos del alumno (`legajo`, `nombre`, `apellido`, `email`, `fechaAlta`, `modificacion`, `isActive`) con sus getters y setters. El método `getAllAttributes()` devuelve todos los datos como objeto plano.

---

## Ejemplos de estructura JSON

### alumnos.json

```json
{
  "legajo": 10001,
  "nombre": "Mora",
  "apellido": "García",
  "email": "m.garcia@facultad.edu.ar",
  "fechaAlta": "2026-03-02",
  "modificacion": "2026-03-02",
  "isActive": true
}
```

### sys-materias.json

```json
{
  "idMateria": "MAT101",
  "nombre": "Matemática I",
  "cuatrimestre": 1
}
```

### sys-notas.json

```json
{
  "id": 1,
  "legajo": 10001,
  "idMateria": "MAT101",
  "nota": 9,
  "fecha": "03-04-24"
}
```

### sys-profesores.json

```json
[]
```

---

## Documentación Postman

Ver colección exportada en el archivo `tp3-postman-collection.json` incluido en el repositorio.
