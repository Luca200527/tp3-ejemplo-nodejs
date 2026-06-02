const { Router } = require('express')
const { getNotaAll, getNotaByLegajo } = require('../../controllers/nota.controller')

const rutas = Router()

rutas.get('/', getNotaAll)
rutas.get('/:legajo', getNotaByLegajo)

module.exports = rutas
