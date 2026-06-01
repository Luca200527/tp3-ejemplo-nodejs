const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  createAlumno,
  deleteAlumno,
  updateAlumno
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', createAlumno)

rutas.put('/:legajo', updateAlumno)
rutas.delete('/:legajo', deleteAlumno)
module.exports = rutas
