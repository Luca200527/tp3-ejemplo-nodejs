const { Router } = require('express')
const { getMateriaAll, getMateriaById } = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.get('/:id', getMateriaById)

module.exports = rutas
