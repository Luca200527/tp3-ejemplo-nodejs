const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')
const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo obtener el detalle del alumno con legajo n° {legajo}'
    })
  }
}

const createAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body

    if (!nombre || !apellido || !email) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' })
    }
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const newLegajo = Math.max(...alumnos.map((alumno) => alumno.legajo)) + 1
    const newAlumno = new AlumnoModel(newLegajo, nombre, apellido, email)
    alumnos.push(newAlumno.getAllAttributes())
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    return res.status(201).json({ msg: 'Alumno creado' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo crear el alumno'
    })
  }
}
const deleteAlumno = async (req, res) => {
  try {
    const { legajo } = req.params
    if (!legajo) {
      return res.status(400).json({ msg: 'Faltan el legajo' })
    }
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const alumnoToDelete = alumnos.find((a) => a.legajo == Number(legajo))

    if (!alumnoToDelete) {
      return res.status(400).json({ msg: `El legajo ${legajo} no existe` })
    }
    const updatedAlumnos = alumnos.filter((a) => a.legajo !== Number(legajo))
    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(updatedAlumnos, null, 2)
    )

    return res
      .status(200)
      .json({ msg: 'Alumno eliminado', alumno: alumnoToDelete })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo eliminar el alumno'
    })
  }
}
const updateAlumno = async (req, res) => {
  try {
    const { legajo } = req.params
    if (!legajo) {
      return res.status(400).json({ msg: 'Faltan el legajo' })
    }

    const { nombre, apellido, email, isActive } = req.body
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const alumnoToUpdate = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumnoToUpdate) {
      return res.status(400).json({ msg: `El legajo ${legajo} no existe` })
    }
    const alumnoAuxiliar = { ...alumnoToUpdate }
    if (nombre) alumnoAuxiliar.nombre = nombre
    if (apellido) alumnoAuxiliar.apellido = apellido
    if (email) alumnoAuxiliar.email = email
    if (isActive !== null) alumnoAuxiliar.isActive = isActive

    const updatedAlumnos = alumnos.filter((a) => a.legajo !== Number(legajo))
    alumnoAuxiliar.modificacion = new Date().toISOString().split('T')[0]

    updatedAlumnos.push(alumnoAuxiliar)

    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(updatedAlumnos, null, 2)
    )

    return res
      .status(200)
      .json({ msg: 'Alumno actualizado', alumno: alumnoAuxiliar })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo actualizar el alumno'
    })
  }
}
module.exports = {
  getAlumnoAll,
  getAlumnoById,
  createAlumno,
  deleteAlumno,
  updateAlumno
}
