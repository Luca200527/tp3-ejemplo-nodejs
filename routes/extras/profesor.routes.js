const { Router } = require('express')
const { getProfesorAll, getProfesorById } = require('../../controllers/profesor.controller')

const rutas = Router()

rutas.get('/', getProfesorAll)
rutas.get('/:id', getProfesorById)

module.exports = rutas