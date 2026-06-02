const fs = require('fs').promises

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
    return res.status(500).JSON({
      error: 'No se pudo obtener el datalle del alumno con legajo n° {legajo}'
    })
  }
}
const createAlumno = async (req, res) => {
  try {
    const {
      legajo,
      nombre,
      apellido,
      email,
      fechaAlta,
      modificacion,
      isActive
    } = req.body

    if (!legajo || !nombre || !apellido || !email || !fechaAlta) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' })
    }
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    if (alumnos.find((a) => a.legajo === Number(legajo))) {
      return res.status(400).json({ msg: `El legajo ${legajo} ya existe` })
    }
    alumnos.push({
      legajo,
      nombre,
      apellido,
      email,
      fechaAlta,
      modificacion,
      isActive
    })
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    return res.status(201).json({ msg: 'Alumno creado' })
  } catch (error) {
    console.log(error)
    return res.status(500).JSON({
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
    const { nombre, apellido, email, fechaAlta, modificacion, isActive } =
      req.body
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const alumnoToUpdate = alumnos.find((a) => a.legajo === Number(legajo))

    if (!alumnoToUpdate) {
      return res.status(400).json({ msg: `El legajo ${legajo} no existe` })
    }
    if (nombre) alumnoToUpdate.nombre = nombre
    if (apellido) alumnoToUpdate.apellido = apellido
    if (email) alumnoToUpdate.email = email
    if (fechaAlta) alumnoToUpdate.fechaAlta = fechaAlta
    if (modificacion) alumnoToUpdate.modificacion = modificacion
    if (isActive) alumnoToUpdate.isActive = isActive
    const updatedAlumnos = alumnos.filter((a) => a.legajo !== Number(legajo))
    updatedAlumnos.push(alumnoToUpdate)
    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(updatedAlumnos, null, 2)
    )

    return res
      .status(200)
      .json({ msg: 'Alumno actualizado', alumno: alumnoToUpdate })
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
