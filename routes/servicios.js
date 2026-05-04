
const { Router } = require('express')
const { getServicios, getServiciosById, getDetalle } = require('../controllers/serviciosController.js')

const rutas = Router()

rutas.get('/', getServicios)
rutas.get('/s/:id', getServiciosById)
// rutas.get('/detalles', getDetalle)
rutas.get('/detalles/:id', getDetalle)

module.exports = rutas